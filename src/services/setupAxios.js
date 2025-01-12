/* eslint-disable */
import {
  getLongToken,
  getToken,
  logout,
  saveToken,
} from './Application/AuthenStorage';
import axios from 'axios';
import { refreshToken } from 'src/@crema/services/user.service';
import API from 'src/@crema/services/apis';
import notification from 'src/shared/utils/notification';
import { getMessageResponse } from 'src/shared/utils/Service';
import {
  CLIENT_ID,
  getLocalData,
  saveLocalData,
} from './Application/LocalStorage';
import { generateUniqueID } from '../utility/Utils';
import { v4 as uuidv4 } from 'uuid';

const CORE_API = process.env.REACT_APP_CORE_API;
export const URL_PRODUCT = window.location.origin;

axios.defaults.headers.common['Accept'] = 'application/json'; // low priority

const addInterceptor = (instant) => {
  instant.interceptors.request.use(
    (config) => {
      if (!config?.headers?.Authorization) {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else if (!config.headers.Authorization) {
          delete config.headers.Authorization;
        }
      }
      const client_id = getLocalData(CLIENT_ID);
      if (!client_id) {
        const newClientId = uuidv4();
        config.headers.client_id = newClientId;
        saveLocalData(CLIENT_ID, newClientId);
      } else {
        config.headers.client_id = client_id;
      }

      return config;
    },
    (err) => Promise.reject(err),
  );

  instant.interceptors.response.use(
    async (response) => {
      const { code } = response?.data;
      if (
        code === 401 ||
        (code === 500 && !response.config.headers.Authorization)
      ) {
        if (response.config.url?.includes('/verify-user')) {
          return response;
        }
        console.log('dang nhap het han', response.config);
        if (
          response.config.headers.resend ||
          response.config.url?.includes(API.REFRESH_TOKEN)
        ) {
          logout('expired');
          return response;
        }
        const long_token = getLongToken();
        if (long_token) {
          try {
            const res = await refreshToken({ long_token });
            const newToken = res?.data?.result?.token;
            if (!newToken) {
              logout('expired');
              return;
            }
            saveToken(newToken);
            response.config.headers.Authorization = `Bearer ${newToken}`;
            response.config.headers.resend = true;
            return instant(response.config);
          } catch (error) {
            logout('expired');
            return Promise.reject(error);
          }
        } else {
          notification.warning('Phiên đăng nhập hết hạn');
          logout('expired');
          return;
        }
      }
      return response;
    },
    (error) => {
      const { code, data } = error.response || {};
      switch (code) {
        case 401:
          logout('expired');
          // error({ statusCode: 401 });
          break;
        case 403:
          // error({ statusCode: 403 });
          break;
        case 429:
          console.log('manyAction');
          break;
        case 404:
          if (data?.message) {
            console.error(data?.message);
          } else {
            console.log('NotFound');
          }
          break;
        case 400:
        case 432:
          notification.error(getMessageResponse(error.response));
          if (data?.message) {
            console.error(data?.message);
          } else {
            console.log('showInternalServerError');
          }
          break;
        case 422:
        case 1:
          break;
        default:
          console.log('Failed');
          break;
      }
      return Promise.reject(error);
    },
  );
};

function createInstance(api) {
  const instant = axios.create({
    baseURL: api,
  });

  addInterceptor(instant);

  return instant;
}

export const instanceCoreApi = createInstance(CORE_API);

export default function setupAxiosDefault() {
  axios.defaults.baseURL = CORE_API;
  addInterceptor(axios);
}
