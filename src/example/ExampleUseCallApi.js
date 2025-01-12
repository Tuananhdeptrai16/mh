import React, { useState } from 'react';
import useCallApi from '../hooks/useCallApi'; // Đảm bảo đúng đường dẫn tới file useCallApi

const ExampleCustomApiCall = () => {
  const [users, setUsers] = useState([]); // Đảm bảo users khởi tạo là mảng rỗng

  const { loading, send } = useCallApi({
    success: (data) => {
      console.log('Dữ liệu nhận được từ API:', data);
      setUsers(data);
    },
    error: (err) => {
      console.error('Lỗi gọi API:', err.message);
    },
    callApi: async () => {
      const response = await fetch('https://jsonplaeholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('API Error');
      }
      return response.json();
    }
  });
  
console.log("users", users);
  return (
    <div>
      <h1>Danh sách người dùng</h1>

      {/* Nếu đang tải dữ liệu */}
      {loading && <p>Đang tải dữ liệu...</p>}

      {/* Nếu không có dữ liệu hoặc lỗi */}
      {!loading && users.length === 0 && <p>Không có dữ liệu để hiển thị</p>}

      {/* Hiển thị danh sách người dùng nếu có dữ liệu */}
      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong><br />
              Email: {user.email}<br />
              Phone: {user.phone}
            </li>
          ))}
        </ul>
      )}

      {/* Nút để tải lại dữ liệu */}
      <button onClick={() => send()}>Tải lại dữ liệu</button>
    </div>
  );
};

export default ExampleCustomApiCall;
