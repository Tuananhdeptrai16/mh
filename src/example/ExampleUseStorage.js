// test.js
import { saveToken, getToken, removeToken, saveLongToken, getLongToken, removeLongToken, logout } from '../Application/AuthenStorage';

// Kiểm tra lưu và lấy token
console.log('--- Test saveToken and getToken ---');
let token = saveToken('sampleAccessToken123');
console.log('Saved token:', token);
console.log('Retrieved token:', getToken());

// Kiểm tra xóa token
console.log('--- Test removeToken ---');
removeToken();
console.log('Token after removal:', getToken()); // Should be empty or ''

// Kiểm tra lưu và lấy refresh token
console.log('--- Test saveLongToken and getLongToken ---');
let refreshToken = saveLongToken('sampleRefreshToken456');
console.log('Saved refresh token:', refreshToken);
console.log('Retrieved refresh token:', getLongToken());

// Kiểm tra xóa refresh token
console.log('--- Test removeLongToken ---');
removeLongToken();
console.log('Refresh token after removal:', getLongToken()); // Should be empty or ''

// Kiểm tra logout
console.log('--- Test logout ---');
logout('Session expired');
