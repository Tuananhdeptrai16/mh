// Kiểm tra lưu trữ, lấy và xóa dữ liệu
// Import các hàm từ tệp tin localStorage.js
import { saveLocalData, getLocalData, removeLocalData, CLIENT_ID, THEME } from './localStorage';

// 1. Lưu dữ liệu vào localStorage
saveLocalData(CLIENT_ID, 'user123');
saveLocalData(THEME, 'dark');

// 2. Lấy dữ liệu đã lưu
const clientId = getLocalData(CLIENT_ID);
const theme = getLocalData(THEME);

console.log('CLIENT_ID:', clientId);  // In ra: user123
console.log('THEME:', theme);  // In ra: dark

// 3. Xóa dữ liệu
removeLocalData(CLIENT_ID);
removeLocalData(THEME);

// 4. Kiểm tra lại xem dữ liệu đã bị xóa chưa
const clientIdAfterRemove = getLocalData(CLIENT_ID);
const themeAfterRemove = getLocalData(THEME);

console.log('CLIENT_ID after remove:', clientIdAfterRemove);  // In ra: null hoặc undefined
console.log('THEME after remove:', themeAfterRemove);  // In ra: null hoặc undefined
