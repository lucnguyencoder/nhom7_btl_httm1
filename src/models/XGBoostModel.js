// src/models/XGBoostModel.js
class XGBoostModel {
  constructor(config = {}) {
    this.numTrees = config.numTrees || 50;
    this.learningRate = config.learningRate || 0.1;
    this.maxDepth = config.maxDepth || 6;
    this.minSamplesLeaf = config.minSamplesLeaf || 5;
    this.subsampleRate = config.subsampleRate || 0.8;
    this.trees = [];
    this.featureImportance = {};
    this.trainingMetrics = { rmse: 0, mae: 0, r2: 0, trainingTime: 0 };
    this.isTrained = false;
  }

  static prepareTrainingData(countriesData) {
    const trainingData = [];
    const featureNames = ['birthRate', 'deathRate', 'gdpPerCapita', 'urbanization', 'educationIndex', 'healthcareSpending', 'fertilityRate', 'medianAge', 'lifeExpectancy'];

    Object.values(countriesData).forEach(country => {
      const history = country.historicalData;
      for (let i = 0; i < history.length - 1; i++) {
        const current = history[i];
        const next = history[i + 1];
        const actualGrowth = ((next.pop - current.pop) / current.pop) * 100;
        const features = [
          current.birth / 50,
          current.death / 20,
          Math.log(current.gdp + 1) / 12,
          country.urbanization / 100,
          country.educationIndex,
          country.healthcareSpending / 20,
          country.fertilityRate / 8,
          country.medianAge / 100,
          country.lifeExpectancy / 100
        ];
        trainingData.push({ features, target: actualGrowth, year: current.year, country: country.name });
      }
    });
    return { data: trainingData, featureNames };
  }

  buildTree(data, residuals, depth = 0) {
    if (depth >= this.maxDepth || data.length < this.minSamplesLeaf) {
      const value = residuals.reduce((a, b) => a + b, 0) / residuals.length;
      return { isLeaf: true, value };
    }
    let bestSplit = this.findBestSplit(data, residuals);
    if (!bestSplit || bestSplit.gain < 0.001) {
      const value = residuals.reduce((a, b) => a + b, 0) / residuals.length;
      return { isLeaf: true, value };
    }
    const leftData = [], leftResiduals = [], rightData = [], rightResiduals = [];
    data.forEach((point, idx) => {
      if (point.features[bestSplit.feature] <= bestSplit.threshold) {
        leftData.push(point);
        leftResiduals.push(residuals[idx]);
      } else {
        rightData.push(point);
        rightResiduals.push(residuals[idx]);
      }
    });
    return {
      isLeaf: false,
      feature: bestSplit.feature,
      threshold: bestSplit.threshold,
      left: this.buildTree(leftData, leftResiduals, depth + 1),
      right: this.buildTree(rightData, rightResiduals, depth + 1)
    };
  }

  findBestSplit(data, residuals) {
    let bestGain = -Infinity;
    let bestSplit = null;
    const numFeatures = data[0].features.length;
    const featuresToTry = Math.floor(Math.sqrt(numFeatures));
    const features = this.randomSubset([...Array(numFeatures).keys()], featuresToTry);

    features.forEach(featureIdx => {
      const values = data.map(d => d.features[featureIdx]);
      const sortedValues = [...new Set(values)].sort((a, b) => a - b);
      for (let i = 0; i < sortedValues.length - 1; i++) {
        const threshold = (sortedValues[i] + sortedValues[i + 1]) / 2;
        const leftResiduals = [], rightResiduals = [];
        data.forEach((point, idx) => {
          if (point.features[featureIdx] <= threshold) {
            leftResiduals.push(residuals[idx]);
          } else {
            rightResiduals.push(residuals[idx]);
          }
        });
        if (leftResiduals.length < this.minSamplesLeaf || rightResiduals.length < this.minSamplesLeaf) continue;
        const gain = this.calculateGain(residuals, leftResiduals, rightResiduals);
        if (gain > bestGain) {
          bestGain = gain;
          bestSplit = { feature: featureIdx, threshold, gain };
        }
      }
    });
    return bestSplit;
  }

  calculateGain(parent, left, right) {
    const parentVar = this.variance(parent);
    const leftVar = this.variance(left);
    const rightVar = this.variance(right);
    const n = parent.length, nLeft = left.length, nRight = right.length;
    const weightedVar = (nLeft / n) * leftVar + (nRight / n) * rightVar;
    return parentVar - weightedVar;
  }

  variance(arr) {
    if (arr.length === 0) return 0;
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    return arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
  }

  randomSubset(arr, size) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
  }

  predictTree(tree, features) {
    if (tree.isLeaf) return tree.value;
    if (features[tree.feature] <= tree.threshold) {
      return this.predictTree(tree.left, features);
    } else {
      return this.predictTree(tree.right, features);
    }
  }

  train(countriesData) {
    const startTime = Date.now();
    const { data, featureNames } = XGBoostModel.prepareTrainingData(countriesData);
    let predictions = Array(data.length).fill(0);
    const targets = data.map(d => d.target);
    featureNames.forEach(name => { this.featureImportance[name] = 0; });

    for (let t = 0; t < this.numTrees; t++) {
      const residuals = data.map((d, i) => d.target - predictions[i]);
      const subsampleSize = Math.floor(data.length * this.subsampleRate);
      const indices = this.randomSubset([...Array(data.length).keys()], subsampleSize);
      const subsampledData = indices.map(i => data[i]);
      const subsampledResiduals = indices.map(i => residuals[i]);
      const tree = this.buildTree(subsampledData, subsampledResiduals);
      this.trees.push(tree);
      predictions = predictions.map((pred, i) => {
        const treeOutput = this.predictTree(tree, data[i].features);
        return pred + this.learningRate * treeOutput;
      });
      this.updateFeatureImportance(tree, featureNames);
    }

    this.trainingMetrics.rmse = this.calculateRMSE(targets, predictions);
    this.trainingMetrics.mae = this.calculateMAE(targets, predictions);
    this.trainingMetrics.r2 = this.calculateR2(targets, predictions);
    this.trainingMetrics.trainingTime = (Date.now() - startTime) / 1000;
    this.isTrained = true;
    return this.trainingMetrics;
  }

  updateFeatureImportance(tree, featureNames) {
    if (!tree.isLeaf && tree.feature !== undefined) {
      const featureName = featureNames[tree.feature];
      this.featureImportance[featureName] = (this.featureImportance[featureName] || 0) + 1;
      if (tree.left) this.updateFeatureImportance(tree.left, featureNames);
      if (tree.right) this.updateFeatureImportance(tree.right, featureNames);
    }
  }

  predict(features) {
    if (!this.isTrained) throw new Error('Model chưa được huấn luyện!');
    let prediction = 0;
    this.trees.forEach(tree => {
      const treeOutput = this.predictTree(tree, features);
      prediction += this.learningRate * treeOutput;
    });
    return prediction;
  }

  calculateRMSE(actual, predicted) {
    const mse = actual.reduce((sum, val, i) => sum + Math.pow(val - predicted[i], 2), 0) / actual.length;
    return Math.sqrt(mse);
  }

  calculateMAE(actual, predicted) {
    return actual.reduce((sum, val, i) => sum + Math.abs(val - predicted[i]), 0) / actual.length;
  }

  calculateR2(actual, predicted) {
    const mean = actual.reduce((a, b) => a + b, 0) / actual.length;
    const ssTotal = actual.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0);
    const ssResidual = actual.reduce((sum, val, i) => sum + Math.pow(val - predicted[i], 2), 0);
    return 1 - (ssResidual / ssTotal);
  }
}

export default XGBoostModel;