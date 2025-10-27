// src/components/ChatBox.jsx
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Xin chào! Tôi có thể giúp gì cho bạn về phân tích dân số?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    const userQuestion = input;
    setInput('');

    setTimeout(() => {
      const botReply = getBotReply(userQuestion);
      setMessages([...newMessages, { text: botReply, sender: 'bot' }]);
    }, 500);
  };

  const getBotReply = (question) => {
    const q = question.toLowerCase();
    if (q.includes('xgboost') || q.includes('mô hình')) {
      return 'XGBoost là thuật toán Gradient Boosting mạnh mẽ với 50 cây quyết định. Mô hình đạt độ chính xác R² > 80% khi dự báo tăng trưởng dân số!';
    }
    if (q.includes('việt nam') || q.includes('vn')) {
      return 'Việt Nam có 98.8 triệu dân, đang ở "cơ cấu dân số vàng" với 70% dân số trong độ tuổi lao động. Đây là cơ hội lớn!';
    }
    if (q.includes('nhật') || q.includes('japan')) {
      return 'Nhật Bản đang già hóa nghiêm trọng với tuổi trung vị 49.1 tuổi và dân số giảm -0.53%/năm.';
    }
    if (q.includes('nigeria')) {
      return 'Nigeria đang bùng nổ dân số với tỷ lệ tăng trưởng 2.53%/năm, dân số rất trẻ (tuổi trung vị 18.6).';
    }
    if (q.includes('dự báo') || q.includes('forecast')) {
      return 'AI sử dụng 9 features (tỷ lệ sinh/tử, GDP, giáo dục, y tế...) để dự báo. Bạn có thể tùy chỉnh các thông số ở tab "Dự Báo AI"!';
    }
    return 'Bạn có thể hỏi tôi về:\n• Mô hình XGBoost\n• Dự báo dân số các quốc gia\n• Cách hoạt động của AI\n• So sánh giữa các nước';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-all hover:scale-110 animate-bounce">
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 flex flex-col" style={{ height: '500px' }}>
          <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-bold">Trợ lý AI Dân Số</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-700 rounded p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-3 rounded-lg shadow-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'}`}>
                  <p className="whitespace-pre-line text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t bg-white flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Hỏi về dân số..." className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
            <button onClick={handleSend} className="bg-indigo-600 text-white rounded-lg p-2 hover:bg-indigo-700 transition-all disabled:opacity-50" disabled={!input.trim()}>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}