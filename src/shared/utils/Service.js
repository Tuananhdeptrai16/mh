import { isError, isExistKey, isObject, isString } from './Typeof';
import notification from './notification';

export const isErrorResponse = (response) => {
  return !(
    !isExistKey(response, 'code') ||
    response.code === 0 ||
    response.code === 200
  );
};

export const getResultResponse = (response) => {
  console.log("respon============", response);
  return response;
};

export const getMessageResponse = (response) => {
  if (isError(response)) {
    try {
      return JSON.parse(response.message).message;
    } catch (e) {
      return response.message;
    }
  }

  if (response && (isErrorResponse(response) || isError(response))) {
    return response.message || '';
  } else {
    return '';
  }
};

export const getErrorsResponse = (response, messages) => {
  const responseData = response?.response || response || {};
  let errors = responseData?.data?.result;
  if (messages) {
    if (isObject(errors)) {
      Object.keys(errors).forEach((key) => {
        const value = errors[key];
        errors[key] = messages[value] || value;
      });
    } else if (isString(errors)) {
      errors = messages[errors] || errors;
    }
  }
  return errors;
};

export const getCodeResponse = (response) => {
  if (isError(response)) {
    try {
      return JSON.parse(response.message).status;
    } catch (e) {
      console.log(e);
    }
  }

  return response?.code || response?.data?.code;
};

export const renderErrorNotification = (error, form) => {
  const errors = getErrorsResponse(error?.raw);
  const errorMapper = Object.entries(errors).map(([key, value]) => {
    const keys = key.split('.');
    return {
      validating: false,
      errors: [value],
      name: keys,
    };
  });
  if (form) {
    form.setFields(errorMapper);
  }
  if (!errors) return notification.error(error?.message);
  return notification.error(Object.values(errors)?.[0]);
};
