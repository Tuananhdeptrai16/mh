import React from 'react';
import { Button } from 'antd'; // Cần import Button từ Ant Design
import notification from '../shared/utils/notification';

const ExampleNotification = () => {

  // Hàm gọi các thông báo success, info, warning, error
  const handleSuccess = () => {
    notification.success("Đây là thông báo thành công!");
  };

  const handleInfo = () => {
    notification.info("Đây là thông báo thông tin!");
  };

  const handleWarning = () => {
    notification.warning("Đây là thông báo cảnh báo!");
  };

  const handleError = () => {
    notification.error("Đây là thông báo lỗi!");
  };

  return (
    <div>
      <h1>Thông báo Ant Design</h1>
      <Button onClick={handleSuccess} type="primary">
        Success Notification
      </Button>
      <Button onClick={handleInfo} type="default">
        Info Notification
      </Button>
      <Button onClick={handleWarning} type="dashed">
        Warning Notification
      </Button>
      <Button onClick={handleError} type="danger">
        Error Notification
      </Button>
    </div>
  );
};

export default ExampleNotification;
