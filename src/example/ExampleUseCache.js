// Test script (test.js)

// Giả sử bạn đã bao gồm các tệp cần thiết ở trên
import { saveDataCache, getDataCache, removeCacheData } from 'src/shared/utils/Cache';

// 1. Lưu dữ liệu cache
saveDataCache('userData', { name: 'John', age: 30 }, 5000);  // Lưu dữ liệu với thời gian hết hạn là 5000ms (5 giây)
console.log('Dữ liệu đã lưu vào cache');

// 2. Lấy dữ liệu từ cache
setTimeout(() => {
  const cachedData = getDataCache('userData');
  console.log('Dữ liệu từ cache:', cachedData);  // Sau 3 giây, dữ liệu vẫn tồn tại

  // 3. Xóa dữ liệu cache
  removeCacheData('userData');
  console.log('Dữ liệu đã bị xóa khỏi cache');
}, 3000);

// Sau 6 giây, thử lại lấy dữ liệu, sẽ không có dữ liệu vì đã hết hạn
setTimeout(() => {
  const cachedData = getDataCache('userData');
  console.log('Dữ liệu sau khi hết hạn:', cachedData);  // Dữ liệu đã hết hạn, không trả về giá trị
}, 6000);
