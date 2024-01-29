import { login } from '../server/user_management/login';
import { Database } from '../server/database/database';

// Mock Database
jest.mock('../database/database', () => {
  return {
    Database: jest.fn().mockImplementation(() => {
      return {
        getUserByUsername: jest.fn().mockResolvedValue({
          id: 1,
          username: 'testuser',
          password: 'testpassword',
          role: 'user',
        }),
      };
    }),
  };
});

describe('Login Function', () => {
  test('it should successfully log in a user', async () => {
    const loginData = { username: 'testuser', password: 'testpassword' };
    const fakeReq = { body: loginData };
    const fakeRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(fakeReq, fakeRes);

    expect(fakeRes.status).toHaveBeenCalledWith(200);
    expect(fakeRes.json).toHaveBeenCalledWith(expect.any(Object));
  });
});
