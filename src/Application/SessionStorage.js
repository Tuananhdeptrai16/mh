import { getCookie, deleteCookie } from './Cookie';

export function saveSessionData(name, data) {
  const savedData = typeof data !== 'string' ? JSON.stringify(data) : data;
  if (window.sessionStorage) {
    window.sessionStorage.setItem(name, savedData);
  } else {
    if (savedData?.length <= 512) {
      document.cookie = `name=${savedData}`;
    }
  }
}

export function getSessionData(name) {
  const data = window.sessionStorage
    ? window.sessionStorage.getItem(name)
    : getCookie(name);
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
}

export function removeSessionData(name) {
  if (window.sessionStorage) {
    window.sessionStorage.removeItem(name);
  } else {
    deleteCookie(name);
  }
}
