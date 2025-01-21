import { notification } from 'antd';

// Khai báo các kiểu thông báo
export const NOTIFICATION_TYPE = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

// Cấu hình mặc định cho thông báo
notification.config({
  duration: 5, // Thời gian hiển thị mặc định
  maxCount: 3, // Tối đa 3 thông báo cùng lúc
  placement: 'topRight', // Vị trí thông báo
});

// Custom hook để sử dụng thông báo
const useCustomNotification = () => {
  const [api, contextHolder] = notification.useNotification(); // Lấy API notification từ Ant Design

  // Hàm mở thông báo
  const openNotification = (type, { message = 'Thông báo', description = '' } = {}) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  // Các hàm giúp mở từng loại thông báo
  const success = (description) => {
    openNotification(NOTIFICATION_TYPE.SUCCESS, {
      message: 'Thông báo thành công',
      description,
    });
  };

  const info = (description) => {
    openNotification(NOTIFICATION_TYPE.INFO, {
      message: 'Thông báo thông tin',
      description,
    });
  };

  const warning = (description) => {
    openNotification(NOTIFICATION_TYPE.WARNING, {
      message: 'Cảnh báo',
      description,
    });
  };

  const error = (description) => {
    openNotification(NOTIFICATION_TYPE.ERROR, {
      message: 'Lỗi hệ thống',
      description,
    });
  };

  // Trả về contextHolder và các hàm thông báo
  return {
    contextHolder,
    success,
    info,
    warning,
    error,
  };
};

export default useCustomNotification;
