// src/utils/forecast.js
export function buildForecast(aiModel, currentData, forecastYears, effectiveBirthRate, effectiveDeathRate) {
  if (!aiModel || !aiModel.isTrained) return [];
  const data = [];
  let pop = currentData.population;
  let currentBirth = effectiveBirthRate;
  let currentDeath = effectiveDeathRate;
  let currentGDP = currentData.gdpPerCapita;
  
  for (let year = 0; year <= forecastYears; year++) {
    const features = [
      currentBirth / 50, currentDeath / 20, Math.log(currentGDP + 1) / 12,
      currentData.urbanization / 100, currentData.educationIndex, currentData.healthcareSpending / 20,
      currentData.fertilityRate / 8, currentData.medianAge / 100, currentData.lifeExpectancy / 100
    ];
    try {
      const predictedGrowth = aiModel.predict(features);
      const adjustedGrowth = predictedGrowth / 100;
      pop = pop * (1 + adjustedGrowth);
      currentBirth = Math.max(5, currentBirth - 0.05);
      currentDeath = Math.min(20, currentDeath + 0.03);
      currentGDP = currentGDP * 1.02;
      data.push({
        year: 2025 + year,
        population: Math.round(pop / 1000000 * 10) / 10,
        births: Math.round(pop * currentBirth / 1000 / 1000),
        deaths: Math.round(pop * currentDeath / 1000 / 1000),
        predictedGrowth: predictedGrowth.toFixed(3),
        confidence: Math.max(60, 95 - year * 0.3)
      });
    } catch (error) {
      break;
    }
  }
  return data;
}