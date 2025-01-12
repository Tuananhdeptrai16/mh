import React from 'react';
import useFetch from '../hooks/useFetch'; // Đường dẫn tới file useFetch đã tạo

const ExampleUseFetch = () => {
  const { data, isLoading, error, fetchData } = useFetch({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET',
    useCache: true,
    loadInit: true,
    timeCache: 300000, // 5 phút
  });

  return (
    <div>
      <h1>Danh sách bài viết</h1>
      {isLoading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}
      {data && (
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => fetchData(true)}>Tải lại dữ liệu</button>
    </div>
  );
};

export default ExampleUseFetch;
