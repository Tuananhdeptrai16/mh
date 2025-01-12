import { getCookie } from './Cookie';
const AUTH_KEY_STORAGE = 'auth_token'; // Key cho Access Token (JWT)
const REFRESH_AUTH_KEY_STORAGE = 'refresh_token'; // Key cho Refresh Token
const IS_LOCALHOST = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
// Thiết lập DOMAIN
const DOMAIN = 'example.com'; // Nếu ứng dụng của bạn chạy trên miền này
//hàm này lưu token vào cookie
export function saveToken(newToken) {
  const minute = 24 * 60;
  let d = new Date();
  d.setTime(d.getTime() + minute * 60 * 1000);
  let expires = `expires=${d.toUTCString()}`;
  if (IS_LOCALHOST) {
    document.cookie = `${AUTH_KEY_STORAGE}=${newToken};${expires};path=/`;
  } else {
    document.cookie = `${AUTH_KEY_STORAGE}=${newToken};${expires};path=/;Domain=.${DOMAIN}`;
  }
  return newToken;
}
//Lấy giá trị token từ cookie.
export function getToken() {
  const jwt = getCookie(AUTH_KEY_STORAGE);
  if (
    jwt === undefined ||
    jwt === 'undefined' ||
    jwt === null ||
    jwt === 'null' ||
    !jwt
  ) {
    return '';
  }

  return jwt;
}

export function removeToken() {
  if (IS_LOCALHOST) {
    document.cookie = `${AUTH_KEY_STORAGE}=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
  } else {
    document.cookie = `${AUTH_KEY_STORAGE}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;Domain=.${DOMAIN}`;
  }
}

export function saveLongToken(newToken) {
  const exdays = 30;
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = `expires=${d.toUTCString()}`;
  if (IS_LOCALHOST) {
    document.cookie = `${REFRESH_AUTH_KEY_STORAGE}=${newToken};${expires};path=/`;
  } else {
    document.cookie = `${REFRESH_AUTH_KEY_STORAGE}=${newToken};${expires};path=/;Domain=.${DOMAIN}`;
  }
  return newToken;
}

export function getLongToken() {
  const jwt = getCookie(REFRESH_AUTH_KEY_STORAGE);
  if (
    jwt === undefined ||
    jwt === 'undefined' ||
    jwt === null ||
    jwt === 'null' ||
    !jwt
  ) {
    return '';
  }

  return jwt;
}

export function removeLongToken() {
  if (IS_LOCALHOST) {
    document.cookie = `${REFRESH_AUTH_KEY_STORAGE}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
  } else {
    document.cookie = `${REFRESH_AUTH_KEY_STORAGE}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;Domain=.${DOMAIN}`;
  }
}

export const logout = (reason = '', reload = true) => {
  removeLongToken();
  removeToken();
  if (reload) {
    window.location.href = reason ? `/signin?reason=${reason}` : `/signin`;
  }
};
