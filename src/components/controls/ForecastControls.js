// src/components/controls/ForecastControls.jsx
import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function ForecastControls({ forecastYears, setForecastYears, birthRate, setBirthRate, deathRate, setDeathRate, reset }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Tùy Chỉnh</h2>
        <button onClick={reset} className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800">
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Số năm: {forecastYears}</label>
          <input type="range" min="10" max="100" step="10" value={forecastYears}
            onChange={(e) => setForecastYears(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tỷ lệ sinh: {birthRate}‰
          </label>
          <input type="range" min="5" max="45" step="0.5" value={birthRate}
            onChange={(e) => setBirthRate(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tỷ lệ tử: {deathRate}‰
          </label>
          <input type="range" min="3" max="20" step="0.5" value={deathRate}
            onChange={(e) => setDeathRate(Number(e.target.value))} className="w-full" />
        </div>
      </div>
    </div>
  );
}