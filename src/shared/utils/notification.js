import { notification } from 'antd';

export const NOTIFICATION_TYPE = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

notification.config({
  duration: 5,
  maxCount: 1,
});

const openNotification = (
  type,
  { message = 'Thông báo', description } = {},
) => {
  notification[type]({
    message: message,
    description: description,
  });
};

const success = (description) => {
  openNotification(NOTIFICATION_TYPE.SUCCESS, {
    message: 'Thông báo',
    description,
  });
};

const info = (description) => {
  openNotification(NOTIFICATION_TYPE.INFO, {
    message: 'Thông báo',
    description,
  });
};

const warning = (description) => {
  openNotification(NOTIFICATION_TYPE.WARNING, {
    message: 'Thông báo',
    description,
  });
};

const error = (description) => {
  openNotification(NOTIFICATION_TYPE.ERROR, { message: 'Lỗi', description });
};


export default {
  openNotification,
  success,
  info,
  warning,
  error,
};
