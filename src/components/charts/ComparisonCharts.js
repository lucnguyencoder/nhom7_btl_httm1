// src/components/charts/ComparisonCharts.jsx
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, Legend } from 'recharts';

export default function ComparisonCharts({ comparisonData }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">So Sánh Các Quốc Gia</h2>
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 mb-3">Dân Số (triệu người)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="population" fill="#6366f1" name="Dân số" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="font-bold text-gray-800 mb-3">Tỷ Lệ Sinh vs Tử</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="birthRate" stroke="#10b981" strokeWidth={2} name="Tỷ lệ sinh" />
            <Line type="monotone" dataKey="deathRate" stroke="#ef4444" strokeWidth={2} name="Tỷ lệ tử" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}