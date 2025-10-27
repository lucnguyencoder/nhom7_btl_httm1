// src/components/layout/HeaderStatus.jsx
import React from 'react';
import { Cpu, CheckCircle, AlertCircle, Globe } from 'lucide-react';

export default function HeaderStatus({ isTraining, trainingProgress, aiModel }) {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Globe className="w-12 h-12 text-indigo-600" />
        <h1 className="text-4xl font-bold text-gray-800">Mô Hình Phân Tích Dân Số </h1>
      </div>
      <p className="text-gray-600 text-lg">Machine Learning dự báo dân số </p>
      
      {isTraining ? (
        <div className="mt-4 inline-flex flex-col items-center gap-2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 animate-spin" />
            <span className="font-semibold">Đang huấn luyện... {trainingProgress}%</span>
          </div>
          <div className="w-48 h-2 bg-yellow-200 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-600 transition-all duration-300" style={{ width: `${trainingProgress}%` }}></div>
          </div>
        </div>
      ) : aiModel && aiModel.isTrained ? (
        <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Mô hình đã sẵn sàng • R²: {(aiModel.trainingMetrics.r2 * 100).toFixed(1)}%</span>
        </div>
      ) : (
        <div className="mt-4 inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full">
          <AlertCircle className="w-5 h-5" />
          <span className="font-semibold">Lỗi huấn luyện</span>
        </div>
      )}
    </header>
  );
}s