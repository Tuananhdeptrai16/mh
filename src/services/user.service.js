import { instanceCoreApi } from './setupAxios';
import API, { AMBASSADOR_API } from './apis/index';
//User management service
export const postChangeStatusUser = (userId, status) => {
  return instanceCoreApi.post(
    API.CHANGE_STATUS_USER,
    {},
    {
      params: {
        userId,
        status,
      },
    },
  );
};

export const refreshToken = (query) => {
  return instanceCoreApi.post(
    API.REFRESH_TOKEN,
    {},
    {
      params: query,
    },
  );
};

export const changeUserInfo = ({ data }) => {
  return instanceCoreApi.post(API.CHANGE_USER_INFO, data);
};

export const changePassword = ({ data }) =>
  instanceCoreApi.post(API.CHANGE_PASSWORD, data);

export const updateAmbassadorInfo = ({ ambassadorId, data }) =>
  instanceCoreApi.post(`${AMBASSADOR_API.UPDATE_INFO}/${ambassadorId}`, data);

export const postExportExcelContact = ({ data }) =>
  instanceCoreApi.post(API.EXPORT_EXCEL_CONTACT, data, {
    responseType: 'blob',
  });

export const putForceLogoutUser = (userId) => {
  return instanceCoreApi.put(API.FORCE_LOGOUT_USER(userId));
};

export const putForceLockUnlockUser = ({ userId, status }) => {
  return instanceCoreApi.put(API.FORCE_LOCK_USER(userId), null, {
    params: {
      status_user: status,
    },
  });
};
