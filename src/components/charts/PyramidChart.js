// src/components/charts/PyramidChart.jsx
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function PyramidChart({ data, countryName }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Tháp Dân Số - {countryName}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[-25, 25]} />
          <YAxis dataKey="age" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="male" fill="#3b82f6" name="Nam (%)" />
          <Bar dataKey="female" fill="#ec4899" name="Nữ (%)" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}