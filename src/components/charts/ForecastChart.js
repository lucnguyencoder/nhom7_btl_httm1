// src/components/charts/ForecastChart.jsx
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function ForecastChart({ data, currentPopulation, targetYear }) {
  if (!data?.length) return null;
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Dự Báo AI</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="population" stroke="#6366f1" fillOpacity={1} fill="url(#colorPop)" name="Dân số (triệu)" />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">Hiện tại</div>
          <div className="text-2xl font-bold text-blue-600">{(currentPopulation / 1000000).toFixed(1)}M</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">Năm {targetYear}</div>
          <div className="text-2xl font-bold text-green-600">{data[data.length - 1].population.toFixed(1)}M</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">Thay đổi</div>
          <div className="text-2xl font-bold text-purple-600">
            {(((data[data.length - 1].population - currentPopulation / 1000000) / (currentPopulation / 1000000)) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </>
  );
}