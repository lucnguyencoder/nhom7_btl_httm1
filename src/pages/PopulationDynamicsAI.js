// src/pages/PopulationDynamicsAI.jsx
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Activity, MapPin, Globe, Cpu } from 'lucide-react';

import { countriesData } from '../data/countries';
import { useXGBModel } from '../hooks/useXGBModel';
import { buildForecast } from '../utils/forecast';

import HeaderStatus from '../components/layout/HeaderStatus';
import Tabs from '../components/layout/Tabs';
import ForecastControls from '../components/controls/ForecastControls';
import ForecastChart from '../components/charts/ForecastChart';
import PyramidChart from '../components/charts/PyramidChart';
import ComparisonCharts from '../components/charts/ComparisonCharts';
import AIInsights from '../components/AIInsights';
import ChatBox from '../components/ChatBox';

export default function PopulationDynamicsAI() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCountry, setSelectedCountry] = useState('vietnam');
  const [forecastYears, setForecastYears] = useState(50);
  const [customBirthRate, setCustomBirthRate] = useState(null);
  const [customDeathRate, setCustomDeathRate] = useState(null);

  const { aiModel, isTraining, trainingProgress } = useXGBModel(countriesData);

  const currentData = countriesData[selectedCountry];
  const effectiveBirthRate = customBirthRate !== null ? customBirthRate : currentData.birthRate;
  const effectiveDeathRate = customDeathRate !== null ? customDeathRate : currentData.deathRate;

  const forecastData = useMemo(() => 
    buildForecast(aiModel, currentData, forecastYears, effectiveBirthRate, effectiveDeathRate),
  [aiModel, currentData, forecastYears, effectiveBirthRate, effectiveDeathRate]);

  const comparisonData = Object.entries(countriesData).map(([key, data]) => ({
    country: data.name, population: Math.round(data.population / 1000000), growthRate: data.growthRate,
    medianAge: data.medianAge, birthRate: data.birthRate, deathRate: data.deathRate
  }));

  const featureImportanceData = aiModel && aiModel.featureImportance ? 
    Object.entries(aiModel.featureImportance).sort((a, b) => b[1] - a[1]).slice(0, 7)
      .map(([name, value]) => ({ feature: name, importance: Math.round(value) })) : [];

  const resetCustomValues = () => {
    setCustomBirthRate(null);
    setCustomDeathRate(null);
    setForecastYears(50);
  };

  const tabs = [
    { id: 'overview', icon: Users, label: 'Tổng Quan' },
    { id: 'forecast', icon: TrendingUp, label: 'Dự Báo AI' },
    { id: 'pyramid', icon: Activity, label: 'Tháp Dân Số' },
    { id: 'comparison', icon: Globe, label: 'So Sánh' },
    { id: 'model', icon: Cpu, label: 'Mô Hình AI' }
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <HeaderStatus isTraining={isTraining} trainingProgress={trainingProgress} aiModel={aiModel} />

          {/* Chọn quốc gia */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-800">Chọn Quốc Gia:</h2>
              </div>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(countriesData).map(([key, data]) => (
                  <button key={key} onClick={() => setSelectedCountry(key)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCountry === key ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-indigo-50'
                    }`}>
                    {data.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} items={tabs} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Thống Kê Hiện Tại</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Dân số</span>
                    <span className="text-blue-600 font-bold">{(currentData.population / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Tỷ lệ sinh</span>
                    <span className="text-green-600 font-bold">{currentData.birthRate}‰</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Tỷ lệ tử</span>
                    <span className="text-red-600 font-bold">{currentData.deathRate}‰</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Tăng trưởng</span>
                    <span className="text-purple-600 font-bold">{currentData.growthRate}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-gray-700 font-medium">GDP/người</span>
                    <span className="text-yellow-600 font-bold">${currentData.gdpPerCapita}</span>
                  </div>
                </div>
              </div>

              {activeTab === 'forecast' && (
                <ForecastControls
                  forecastYears={forecastYears}
                  setForecastYears={setForecastYears}
                  birthRate={effectiveBirthRate}
                  setBirthRate={setCustomBirthRate}
                  deathRate={effectiveDeathRate}
                  setDeathRate={setCustomDeathRate}
                  reset={resetCustomValues}
                />
              )}

              <AIInsights
                aiModel={aiModel}
                forecastData={forecastData}
                forecastYears={forecastYears}
                currentData={currentData}
              />
            </div>

            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Tổng Quan - {currentData.name}</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                      <div className="text-sm text-gray-600 mb-2">Tổng Dân Số</div>
                      <div className="text-3xl font-bold text-blue-600">{(currentData.population / 1000000).toFixed(1)} triệu</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                      <div className="text-sm text-gray-600 mb-2">Tăng Trưởng</div>
                      <div className="text-3xl font-bold text-green-600">{currentData.growthRate > 0 ? '+' : ''}{currentData.growthRate}%</div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-800 mb-3">Phân Bố Độ Tuổi</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie data={[
                            { name: '0-14', value: currentData.pyramid[0].maleCount + currentData.pyramid[0].femaleCount },
                            { name: '15-29', value: currentData.pyramid[1].maleCount + currentData.pyramid[1].femaleCount },
                            { name: '30-44', value: currentData.pyramid[2].maleCount + currentData.pyramid[2].femaleCount },
                            { name: '45-59', value: currentData.pyramid[3].maleCount + currentData.pyramid[3].femaleCount },
                            { name: '60+', value: currentData.pyramid[4].maleCount + currentData.pyramid[4].femaleCount + currentData.pyramid[5].maleCount + currentData.pyramid[5].femaleCount }
                          ]}
                          cx="50%" cy="50%" labelLine={false}
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          outerRadius={80} dataKey="value">
                          {['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'].map((color, index) => (<Cell key={`cell-${index}`} fill={color} />))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {activeTab === 'forecast' && forecastData.length > 0 && (
                <ForecastChart
                  data={forecastData}
                  currentPopulation={currentData.population}
                  targetYear={2025 + forecastYears}
                />
              )}

              {activeTab === 'pyramid' && (
                <PyramidChart data={currentData.pyramid} countryName={currentData.name} />
              )}

              {activeTab === 'comparison' && (
                <ComparisonCharts comparisonData={comparisonData} />
              )}

              {activeTab === 'model' && aiModel && aiModel.isTrained && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Mô Hình XGBoost</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                      <div className="text-sm text-gray-600 mb-2">Số cây</div>
                      <div className="text-3xl font-bold text-blue-600">{aiModel.trees.length}</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                      <div className="text-sm text-gray-600 mb-2">R² Score</div>
                      <div className="text-3xl font-bold text-green-600">{(aiModel.trainingMetrics.r2 * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-800 mb-3">Feature Importance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={featureImportanceData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="feature" type="category" width={150} />
                        <Tooltip />
                        <Bar dataKey="importance" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <h3 className="font-bold mb-2">🤖 Về XGBoost</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• <strong>Gradient Boosting:</strong> Huấn luyện {aiModel.numTrees} cây tuần tự, mỗi cây học từ sai số</li>
                      <li>• <strong>Feature Importance:</strong> Xác định biến nào quan trọng nhất</li>
                      <li>• <strong>R² = {(aiModel.trainingMetrics.r2 * 100).toFixed(1)}%:</strong> Mô hình giải thích được bao nhiêu % biến động</li>
                      <li>• <strong>RMSE = {aiModel.trainingMetrics.rmse.toFixed(3)}%:</strong> Sai số trung bình</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI và Nghiên Cứu Dân Số</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold mb-2">Dự báo Chính Xác</h4>
                <p>AI phân tích 9 biến số (kinh tế, y tế, giáo dục) để tạo dự báo dân số chính xác hơn phương pháp truyền thống.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-bold mb-2">Mô Phỏng Chính Sách</h4>
                <p>Chạy kịch bản "nếu-thì" để đánh giá tác động của chính sách dân số trước khi thực thi.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-bold mb-2">Phát Hiện Xu Hướng</h4>
                <p>Machine Learning phát hiện mô hình phức tạp trong dữ liệu lịch sử 2000-2025.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatBox />
    </>
  );
}