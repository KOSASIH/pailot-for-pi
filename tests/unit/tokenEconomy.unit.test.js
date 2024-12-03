import { createToken, validateToken } from '../src/services/tokenEconomy'; // Adjust the import path as necessary

describe('Token Economy Service', () => {
  it('should create a new token', () => {
    const token = createToken('user-123');
    expect(token).toBeDefined();
    expect(token).toMatch(/^[A-Za-z0-9-]+$/); // Example token format
  });

  it('should validate a token', () => {
    const token = createToken('user-123');
    const isValid = validateToken(token);
    expect(isValid).toBe(true);
  });

  it('should invalidate an incorrect token', () => {
    const isValid = validateToken('invalid-token');
    expect(isValid).toBe(false);
  });
});
