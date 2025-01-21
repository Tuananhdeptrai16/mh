import React, { useState } from "react";
import { useEncryptDecrypt } from "../shared/utils/Object"; // Đường dẫn tới hàm custom của bạn

const ExampleUseEncryptData = () => {
  const [data, setData] = useState(null);
  const secretKey = "my-secret-key-123456"; // Khóa bí mật, đảm bảo dài ít nhất 16 ký tự
  const { encrypt, decrypt } = useEncryptDecrypt(secretKey);

  const handleEncrypt = () => {
    const data = { name: "Đức ăn cứt", tieude: "yeu chi Vy", age: 21 }; // Dữ liệu cần mã hóa
    const encryptedData = encrypt(data); // Mã hóa dữ liệu
    setData(encryptedData);
  };

  const handleDecrypt = () => {
    // Một chuỗi dữ liệu giả lập đã được mã hóa (giá trị thực tế sẽ do hàm `encrypt` tạo ra)
    const encryptedData = data;
    try {
      const decryptedData = decrypt(encryptedData); // Giải mã dữ liệu
      console.log("Dữ liệu sau khi giải mã:", decryptedData);
    } catch (error) {
      console.error("Lỗi khi giải mã:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleEncrypt}>Mã hóa</button>
      <button onClick={handleDecrypt}>Giải mã</button>
    </div>
  );
};

export default ExampleUseEncryptData;
