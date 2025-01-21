import { useState } from 'react';
import useCallApi from '../hooks/useCallApi'; // Đảm bảo đúng đường dẫn tới file useCallApi
const ExampleCustomApiCall = () => {
  const [users, setUsers] = useState([]); // Khởi tạo users là mảng rỗng
  const [error, setError] = useState(null); // State lưu trữ lỗi

  const { loading, send } = useCallApi({
    success: (data) => {
      console.log('Dữ liệu nhận được từ API:', data);
      setUsers(data); // Cập nhật dữ liệu vào state
      setError(null);  // Reset lỗi nếu thành công
    },
    error: (err) => {
      console.error('Lỗi gọi API:', err.message);
      setError(err.message); // Lưu thông báo lỗi vào state
    },
    callApi: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.cousers');
      if (!response.ok) {
        throw new Error('API Error: Không thể tải người dùng');
      }
      return response.json(); // Trả về dữ liệu nếu API gọi thành công
    }
  });

  return (
    <div>
      <h1>Danh sách người dùng</h1>

      {/* Nếu đang tải dữ liệu */}
      {loading && <p>Đang tải dữ liệu...</p>}

      {/* Nếu có lỗi */}
      {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}

      {/* Nếu không có dữ liệu hoặc lỗi */}
      {!loading && !error && users && users.length === 0 && <p>Không có dữ liệu để hiển thị</p>}

      {/* Hiển thị danh sách người dùng nếu có dữ liệu */}
      {users && users.length > 0 && (
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
