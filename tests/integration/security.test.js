import { encryptData, decryptData } from '../src/services/security'; // Adjust the import path as necessary

describe('Security Service', () => {
  it('should encrypt data', () => {
    const data = 'Sensitive Information';
    const encrypted = encryptData(data);
    expect(encrypted).not.toBe(data); // Ensure the encrypted data is not the same as the original
  });

  it('should decrypt data', () => {
    const data = 'Sensitive Information';
    const encrypted = encryptData(data);
    const decrypted = decryptData(encrypted);
    expect(decrypted).toBe(data); // Ensure the decrypted data matches the original
  });
});
