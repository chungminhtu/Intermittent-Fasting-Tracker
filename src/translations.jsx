export const translations = {
  en: {
    title: 'Intermittent Fasting Tracker',
    startTracking: 'Start Tracking',
    stopTracking: 'Stop Tracking',
    fastingFor: 'You have been fasting for:',
    currentState: 'Current State',
    hours: 'Hours',
    details: 'Details',
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
    stopTracking: 'Dừng Theo Dõi',
    fastingFor: 'Bạn đã nhịn ăn được:',
    currentState: 'Trạng Thái Hiện Tại',
    hours: 'Giờ',
    details: 'Chi tiết',
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
