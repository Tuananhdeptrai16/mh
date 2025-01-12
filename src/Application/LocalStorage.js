import { deleteCookie, getCookie } from './Cookie';
export const CLIENT_ID = 'client_id';
export const THEME = 'theme';

export function saveLocalData(name, data) {
  const savedData = typeof data !== 'string' ? JSON.stringify(data) : data;
  if (window.localStorage) {
    window.localStorage.setItem(name, savedData);
  } else {
    if (savedData?.length <= 512) {
      document.cookie = `name=${savedData}`;
    }
  }
}

export function getLocalData(name) {
  const data = window.localStorage
    ? window.localStorage.getItem(name)
    : getCookie(name);
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
}

export function removeLocalData(name) {
  if (window.localStorage) {
    window.localStorage.removeItem(name);
  } else {
    deleteCookie(name);
  }
}
