import { generateToken, verifyToken } from '../server/user_managment/jwt';

describe('JWT Token Functions', () => {
  const payload = {
    id: 1,
    role: 'user',
    username: 'testuser',
  };

  let token: string;

  beforeAll(() => {
    token = generateToken(payload);
  });

  test('Generate a valid JWT token', () => {
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  test('Verify a valid JWT token', () => {
    const decoded = verifyToken(token);
    expect(decoded).toBeDefined();
    expect(decoded).toEqual(expect.objectContaining(payload));
  });

  test('Handle invalid JWT token', () => {
    expect(() => verifyToken('invalid_token')).toThrow('Ungültiges Token');
  });
});
