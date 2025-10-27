// src/components/AIInsights.jsx
import React from 'react';
import { Brain } from 'lucide-react';

export default function AIInsights({ aiModel, forecastData, forecastYears, currentData }) {
  const insights = [];
  if (aiModel && aiModel.trainingMetrics) {
    const metrics = aiModel.trainingMetrics;
    insights.push(`🤖 Mô hình AI với ${aiModel.numTrees} cây quyết định đã huấn luyện thành công`);
    insights.push(`📊 Độ chính xác R²: ${(metrics.r2 * 100).toFixed(1)}% - ${metrics.r2 > 0.8 ? 'Độ chính xác cao' : metrics.r2 > 0.6 ? 'Tốt ✓' : 'Chấp nhận được'}`);
    insights.push(`⚡  RMSE: ${metrics.rmse.toFixed(3)}% - Sai số trung bình trong dự báo`);
  }
  const finalPop = forecastData.length > 0 ? forecastData[forecastData.length - 1].population : 0;
  const currentPop = currentData.population / 1000000;
  const change = ((finalPop - currentPop) / currentPop * 100).toFixed(1);
  
  if (currentData.stage === 2) insights.push('🚀 Giai đoạn bùng nổ - Cần đầu tư mạnh');
  else if (currentData.stage === 3) insights.push('⚡ "Cơ cấu dân số vàng" - Cơ hội kinh tế lớn');
  else if (currentData.stage >= 4) insights.push('⚠️ Già hóa dân số - Cần chính sách hỗ trợ');
  
  insights.push(`🔮 AI dự báo ${change > 0 ? 'tăng' : 'giảm'} ${Math.abs(change)}% trong ${forecastYears} năm`);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-800">Phân Tích AI</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-white bg-opacity-50 p-3 rounded-lg">
            <span className="mt-0.5">•</span>
            <span>{insight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}