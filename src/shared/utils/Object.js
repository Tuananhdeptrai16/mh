import { useCallback } from 'react';
import forge from 'node-forge';

export function useEncryptDecrypt(secretKey) {
  const generateKey = useCallback(() => {
    const key = forge.md.sha256.create();
    key.update(secretKey);
    return key.digest().getBytes(16); // 16 bytes (128-bit key)
  }, [secretKey]);

  const encrypt = useCallback((obj) => {
    const jsonString = JSON.stringify(obj);
    const iv = forge.random.getBytesSync(16);
    const key = generateKey();

    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(jsonString, 'utf8'));
    cipher.finish();

    const encrypted = cipher.output.getBytes();
    return forge.util.encode64(JSON.stringify({ iv: forge.util.encode64(iv), encrypted: forge.util.encode64(encrypted) }));
  }, [generateKey]);

  const decrypt = useCallback((encryptedData) => {
    const parsed = JSON.parse(forge.util.decode64(encryptedData));
    const iv = forge.util.decode64(parsed.iv);
    const encrypted = forge.util.decode64(parsed.encrypted);

    const key = generateKey();
    const decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({ iv });
    decipher.update(forge.util.createBuffer(encrypted, 'raw'));

    if (!decipher.finish()) {
      throw new Error('Giải mã thất bại: dữ liệu không hợp lệ hoặc khóa sai.');
    }

    return JSON.parse(decipher.output.toString('utf8'));
  }, [generateKey]);

  return { encrypt, decrypt };
}
