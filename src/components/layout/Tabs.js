// src/components/layout/Tabs.jsx
import React from 'react';

export default function Tabs({ activeTab, setActiveTab, items }) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap justify-center">
      {items.map(tab => (
        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-indigo-50'
          }`}>
          <tab.icon className="w-5 h-5" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}