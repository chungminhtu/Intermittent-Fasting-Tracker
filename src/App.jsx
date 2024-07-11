import React, { useState, useEffect } from 'react';
import { Clock, Play, Info } from 'lucide-react';

const translations = {
  en: {
    title: 'Intermittent Fasting Tracker',
    startTracking: 'Start Tracking',
    fastingFor: 'You have been fasting for:',
    currentState: 'Current State',
    hours: 'Hours',
    fastingState: 'Fasting State',
    benefit: 'Benefit',
    fastingTips: 'Fasting Tips',
    tips: [
      'Stay hydrated during fasting periods',
      'Start with shorter fasting periods and gradually increase',
      'Break your fast with a balanced, nutrient-rich meal',
      'Listen to your body and consult a healthcare professional before starting',
    ],
    close: 'Close',
    states: [
      { hours: 12, state: 'Ketosis and heavy fat burning', benefit: 'Fat burning' },
      { hours: 18, state: 'Autophagy', benefit: 'Cell repair' },
      { hours: 24, state: 'Growth hormone release', benefit: 'Cellular repair and regeneration' },
      { hours: 48, state: 'Insulin sensitivity increase', benefit: 'Improved blood sugar control' },
      { hours: 72, state: 'Immune system regeneration', benefit: 'Boosted immunity' }
    ]
  },
  vi: {
    title: 'Theo Dõi Nhịn Ăn Gián Đoạn',
    startTracking: 'Bắt Đầu Theo Dõi',
    fastingFor: 'Bạn đã nhịn ăn được:',
    currentState: 'Trạng Thái Hiện Tại',
    hours: 'Giờ',
    fastingState: 'Trạng Thái Nhịn Ăn',
    benefit: 'Lợi Ích',
    fastingTips: 'Mẹo Nhịn Ăn',
    tips: [
      'Uống đủ nước trong thời gian nhịn ăn',
      'Bắt đầu với các giai đoạn nhịn ăn ngắn hơn và tăng dần',
      'Kết thúc giai đoạn nhịn ăn với một bữa ăn cân đối, giàu dinh dưỡng',
      'Lắng nghe cơ thể của bạn và tham khảo ý kiến chuyên gia y tế trước khi bắt đầu',
    ],
    close: 'Đóng',
    states: [
      { hours: 12, state: 'Ketosis và đốt cháy chất béo nặng', benefit: 'Đốt cháy chất béo' },
      { hours: 18, state: 'Autophagy', benefit: 'Sửa chữa tế bào' },
      { hours: 24, state: 'Giải phóng hormone tăng trưởng', benefit: 'Sửa chữa và tái tạo tế bào' },
      { hours: 48, state: 'Tăng độ nhạy insulin', benefit: 'Cải thiện kiểm soát đường huyết' },
      { hours: 72, state: 'Tái tạo hệ thống miễn dịch', benefit: 'Tăng cường miễn dịch' }
    ]
  }
};

const FastingTracker = () => {
  const [startDateTime, setStartDateTime] = useState('');
  const [duration, setDuration] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    let timer;
    if (isTracking) {
      updateDuration();
      timer = setInterval(updateDuration, 1000);
    }
    return () => clearInterval(timer);
  }, [isTracking, startDateTime]);

  const updateDuration = () => {
    if (!startDateTime) return;
    const start = new Date(startDateTime);
    const now = new Date();
    const diff = now - start;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    setDuration({ days, hours, minutes, seconds });
  };

  const handleStartTimeChange = (e) => {
    setStartDateTime(e.target.value);
    setIsTracking(false);
    setDuration(null);
  };

  const handleCalculateClick = () => {
    if (startDateTime) {
      setIsTracking(true);
    }
  };

  const formatDuration = () => {
    if (!duration) return '';
    const { days, hours, minutes, seconds } = duration;
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  const getTotalHours = () => {
    if (!duration) return 0;
    return duration.days * 24 + duration.hours + duration.minutes / 60 + duration.seconds / 3600;
  };

  const getCurrentState = () => {
    const totalHours = getTotalHours();
    const states = translations[language].states;
    for (let i = states.length - 1; i >= 0; i--) {
      if (totalHours >= states[i].hours) {
        return states[i].state;
      }
    }
    return 'Fasting started';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-100 to-green-300 text-green-800 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-end mb-4">
          <button onClick={() => setLanguage('en')} className={`px-4 py-2 rounded ${language === 'en' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>English</button>
          <button onClick={() => setLanguage('vi')} className={`ml-2 px-4 py-2 rounded ${language === 'vi' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Tiếng Việt</button>
        </div>

        <h1 className="text-4xl font-bold mb-6 text-center">{translations[language].title}</h1>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Clock className="mr-2 flex-shrink-0" />
            <input
              type="datetime-local"
              value={startDateTime}
              onChange={handleStartTimeChange}
              className="p-2 border rounded flex-grow text-lg"
            />
          </div>
          <button
            onClick={handleCalculateClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full flex items-center justify-center text-xl"
            disabled={!startDateTime}
          >
            <Play className="mr-2" />
            {translations[language].startTracking}
          </button>
        </div>

        {isTracking && duration && (
          <div className="text-center mb-6">
            <p className="text-xl mb-2">{translations[language].fastingFor}</p>
            <p className="text-3xl font-bold mb-2">{formatDuration()}</p>
            <p className="text-2xl font-semibold">{translations[language].currentState}: {getCurrentState()}</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-200">
                <th className="p-2 border">{translations[language].hours}</th>
                <th className="p-2 border">{translations[language].fastingState}</th>
                <th className="p-2 border">{translations[language].benefit}</th>
              </tr>
            </thead>
            <tbody>
              {translations[language].states.map((state, index) => (
                <tr key={index} className={getCurrentState() === state.state ? 'bg-yellow-200' : ''}>
                  <td className="p-2 border">{state.hours}</td>
                  <td className="p-2 border">{state.state}</td>
                  <td className="p-2 border">{state.benefit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          <Info className="inline mr-2" />
          {translations[language].fastingTips}
        </button>
      </div>

      {/* Modal for Intermittent Fasting Information */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{translations[language].fastingTips}</h2>
            <ul className="list-disc list-inside mb-4">
              {translations[language].tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {translations[language].close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FastingTracker;
