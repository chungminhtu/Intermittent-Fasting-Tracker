import React, { useState, useEffect } from 'react';
import { Clock, Play, Info } from 'lucide-react';

const translations = {
  en: {
    title: 'Intermittent Fasting Tracker',
    startTracking: 'Start Tracking',
    fastingFor: 'You have been fasting for:',
    currentState: 'Current State',
    hours: 'Hours',
    details: "Details",
    fastingState: 'Fasting State',
    percentage: 'Fat Burn %',
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
      { hours: 4, state: 'Digestive process completes.', benefit: 'Transition to post-absorptive state.', details: 'By this time, the body has typically finished digesting and absorbing most nutrients from the meal. Blood glucose levels begin to drop, and the body starts to use stored glycogen for energy.', fatBurnPercentage: '0%' },
      { hours: 6, state: 'Post-absorptive state.', benefit: 'Nutrient utilization.', details: 'During this time, your body continues to digest the meal and distribute nutrients to cells for energy, repair, and other functions. Insulin levels start to decrease as the body switches from storage mode to utilizing mode.', fatBurnPercentage: '0-10%' },
      { hours: 8, state: 'Fasted state begins.', benefit: 'Biochemical changes.', details: 'The body has used most of the glucose from the meal. Insulin levels are low, and the body starts to use glycogen (stored glucose) from the liver for energy. The metabolic shift to the fasted state begins, promoting fat burning.', fatBurnPercentage: '10-20%' },
      { hours: 12, state: 'Ketosis and glycogen release.', benefit: 'Energy from stored sources.', details: 'Glycogen stores are depleting, and the liver begins to produce ketone bodies from fatty acids. These ketones provide an alternative energy source for the brain and muscles, promoting fat loss.', fatBurnPercentage: '20-30%' },
      { hours: 16, state: 'Enhanced fat burning.', benefit: 'Increased fat burning and weight loss.', details: 'The body increases its reliance on fat as a fuel source. Growth hormone levels may increase, enhancing fat metabolism and muscle preservation. Autophagy, the process of cellular cleanup, begins.', fatBurnPercentage: '30-40%' },
      { hours: 20, state: 'Deep ketosis.', benefit: 'Improved mental clarity and energy.', details: 'Ketone levels in the blood are higher, providing a steady and efficient fuel source for the brain. Many people report heightened mental clarity and stable energy levels during this period.', fatBurnPercentage: '40-50%' },
      { hours: 24, state: 'Autophagy.', benefit: 'Cell repair and regeneration.', details: 'Autophagy intensifies, where the body breaks down old or damaged cells and proteins. This process helps in cellular repair, reducing inflammation, and protecting against diseases like cancer and Alzheimer\'s.', fatBurnPercentage: '50-60%' },
      { hours: 36, state: 'Increased autophagy.', benefit: 'Enhanced cell repair and detoxification.', details: 'The body continues deep cleaning through autophagy. The immune system is rejuvenated, and damaged cells are repaired more effectively. This period is also marked by increased stress resistance and metabolic health improvements.', fatBurnPercentage: '60-70%' },
      { hours: 48, state: 'Growth hormone release.', benefit: 'Muscle preservation and fat loss.', details: 'Growth hormone secretion peaks, helping to preserve lean muscle mass and further promoting fat breakdown. This hormone also aids in the repair and growth of tissues.', fatBurnPercentage: '70-80%' },
      { hours: 72, state: 'Fatty acids as primary fuel.', benefit: 'Protein sparing.', details: 'The body relies almost entirely on fatty acids and ketones for energy, conserving muscle protein. This metabolic state is beneficial for longevity and reducing the risk of chronic diseases.', fatBurnPercentage: '80-90%' }
    ]
  },
  vi: {
    title: 'Theo Dõi Nhịn Ăn Gián Đoạn',
    startTracking: 'Bắt Đầu Theo Dõi',
    fastingFor: 'Bạn đã nhịn ăn được:',
    currentState: 'Trạng Thái Hiện Tại',
    hours: 'Giờ',
    details:"Chi tiết",
    percentage: 'Tỷ lệ giảm mỡ',
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
      { hours: 4, state: 'Quá trình tiêu hóa hoàn thành.', benefit: 'Chuyển sang giai đoạn sau hấp thụ.', details: 'Lúc này, cơ thể đã tiêu hóa và hấp thụ hầu hết dưỡng chất từ bữa ăn. Mức glucose trong máu bắt đầu giảm, và cơ thể bắt đầu sử dụng glycogen dự trữ để cung cấp năng lượng.', fatBurnPercentage: '0%' },
      { hours: 6, state: 'Giai đoạn sau hấp thụ.', benefit: 'Sử dụng dưỡng chất.', details: 'Trong thời gian này, cơ thể tiếp tục tiêu hóa bữa ăn và phân phối dưỡng chất tới các tế bào để cung cấp năng lượng, sửa chữa và thực hiện các chức năng khác. Mức insulin bắt đầu giảm khi cơ thể chuyển từ chế độ lưu trữ sang chế độ sử dụng.', fatBurnPercentage: '0-10%' },
      { hours: 8, state: 'Bắt đầu trạng thái nhịn ăn.', benefit: 'Thay đổi sinh hóa.', details: 'Cơ thể đã sử dụng hầu hết glucose từ bữa ăn. Mức insulin thấp và cơ thể bắt đầu sử dụng glycogen (glucose dự trữ) từ gan để cung cấp năng lượng. Sự chuyển đổi trao đổi chất sang trạng thái nhịn ăn bắt đầu, thúc đẩy quá trình đốt cháy chất béo.', fatBurnPercentage: '10-20%' },
      { hours: 12, state: 'Ketosis và giải phóng glycogen.', benefit: 'Năng lượng từ nguồn dự trữ.', details: 'Các kho glycogen đang cạn kiệt và gan bắt đầu sản xuất ketone từ axit béo. Các ketone này cung cấp nguồn năng lượng thay thế cho não và cơ bắp, thúc đẩy giảm mỡ.', fatBurnPercentage: '20-30%' },
      { hours: 16, state: 'Đốt cháy chất béo tăng cường.', benefit: 'Tăng cường đốt cháy chất béo và giảm cân.', details: 'Cơ thể tăng cường sử dụng chất béo làm nguồn năng lượng. Mức hormone tăng trưởng có thể tăng, tăng cường quá trình trao đổi chất và bảo tồn cơ bắp. Quá trình tự thực, quá trình làm sạch tế bào, bắt đầu.', fatBurnPercentage: '30-40%' },
      { hours: 20, state: 'Ketosis sâu.', benefit: 'Cải thiện sự rõ ràng và năng lượng tinh thần.', details: 'Mức ketone trong máu cao hơn, cung cấp nguồn nhiên liệu ổn định và hiệu quả cho não. Nhiều người báo cáo sự rõ ràng tinh thần và mức năng lượng ổn định trong giai đoạn này.', fatBurnPercentage: '40-50%' },
      { hours: 24, state: 'Tự thực.', benefit: 'Sửa chữa và tái tạo tế bào.', details: 'Quá trình tự thực tăng cường, nơi cơ thể phá vỡ các tế bào và protein cũ hoặc bị hư hỏng. Quá trình này giúp sửa chữa tế bào, giảm viêm và bảo vệ chống lại các bệnh như ung thư và Alzheimer.', fatBurnPercentage: '50-60%' },
      { hours: 36, state: 'Tăng cường tự thực.', benefit: 'Tăng cường sửa chữa tế bào và thải độc.', details: 'Cơ thể tiếp tục làm sạch sâu thông qua quá trình tự thực. Hệ miễn dịch được trẻ hóa và các tế bào bị hư hỏng được sửa chữa hiệu quả hơn. Giai đoạn này cũng được đánh dấu bởi sự tăng cường sức đề kháng và cải thiện sức khỏe trao đổi chất.', fatBurnPercentage: '60-70%' },
      { hours: 48, state: 'Giải phóng hormone tăng trưởng.', benefit: 'Bảo tồn cơ bắp và giảm mỡ.', details: 'Tiết hormone tăng trưởng đạt đỉnh, giúp bảo tồn khối lượng cơ bắp và thúc đẩy sự phân giải chất béo. Hormone này cũng giúp sửa chữa và phát triển mô.', fatBurnPercentage: '70-80%' },
      { hours: 72, state: 'Axit béo là nhiên liệu chính.', benefit: 'Bảo toàn protein.', details: 'Cơ thể gần như hoàn toàn dựa vào axit béo và ketone để cung cấp năng lượng, bảo tồn protein cơ. Trạng thái trao đổi chất này có lợi cho tuổi thọ và giảm nguy cơ các bệnh mãn tính.', fatBurnPercentage: '80-90%' }
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
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-6xl">
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
                <th className="p-2 border">{translations[language].details}</th>
                <th className="p-2 border">{translations[language].percentage}</th>
              </tr>
            </thead>
            <tbody>
              {translations[language].states.map((state, index) => (
                <tr key={index} className={getCurrentState() === state.state ? 'bg-yellow-200' : ''}>
                  <td className="p-2 border">{state.hours}</td>
                  <td className="p-2 border">{state.state}</td>
                  <td className="p-2 border">{state.benefit}</td>
                  <td className="p-2 border">{state.details}</td>
                  <td className="p-2 border">{state.fatBurnPercentage}</td>
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
