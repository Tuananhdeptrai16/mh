import React from 'react';
import { Button, Space } from 'antd';
import useCustomNotification from '../shared/utils/notification'; // Import hook

const App = () => {
  const {
    contextHolder, // contextHolder cần phải được đặt trong JSX
    success,
    info,
    warning,
    error,
  } = useCustomNotification();

  return (
    <>
      {contextHolder} {/* Đặt contextHolder vào trong JSX */}
      <Space>
        <Button onClick={() => success('Có khi lại thành công')}>Hiển thị Success</Button>
        <Button onClick={() => info('Đây là thông tin cần chú ý.')}>Hiển thị Info</Button>
        <Button onClick={() => warning('Hành động này có thể gây rủi ro!')}>Hiển thị Warning</Button>
        <Button onClick={() => error('Đã xảy ra lỗi trong hệ thống.')}>Hiển thị Error</Button>
      </Space>
    </>
  );
};

export default App;
