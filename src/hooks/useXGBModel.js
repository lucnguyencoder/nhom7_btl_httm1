// src/hooks/useXGBModel.js
import { useEffect, useState } from 'react';
import XGBoostModel from '../models/XGBoostModel';

export function useXGBModel(countriesData) {
  const [aiModel, setAiModel] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  useEffect(() => {
    const trainModel = async () => {
      setIsTraining(true);
      setTrainingProgress(10);
      const progressInterval = setInterval(() => {
        setTrainingProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      try {
        const model = new XGBoostModel({ numTrees: 50, learningRate: 0.1, maxDepth: 6, minSamplesLeaf: 3, subsampleRate: 0.8 });
        await new Promise(resolve => setTimeout(resolve, 100));
        model.train(countriesData);
        setAiModel(model);
        setTrainingProgress(100);
        clearInterval(progressInterval);
        setTimeout(() => setIsTraining(false), 500);
      } catch (error) {
        console.error('Training error:', error);
        clearInterval(progressInterval);
        setIsTraining(false);
      }
    };
    trainModel();
  }, [countriesData]);

  return { aiModel, isTraining, trainingProgress, setAiModel, setIsTraining, setTrainingProgress };
}