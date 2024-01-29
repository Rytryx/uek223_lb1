const request = require('supertest');
const express = require('express');
const { register } = require('../server/user_managment/register');

// Create an Express app and add the register route
const app = express();
app.use(express.json());
app.post('/api/register', register);

describe('POST /api/register', () => {
  // Mock the database methods used by the register function
  const mockDb = {
    getUserByUsername: jest.fn(),
    registerUser: jest.fn(),
  };

  // Replace the actual database instance with the mock
  jest.mock('../database/database', () => ({ Database: jest.fn(() => mockDb) }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should successfully register a new user', async () => {
    mockDb.getUserByUsername.mockResolvedValue(null);
    mockDb.registerUser.mockResolvedValue({ insertId: 1 });

    const newUser = { username: 'testuser', password: 'testpassword' };

    // Make a POST request to the /api/register route
    const response = await request(app)
      .post('/api/register')
      .send(newUser);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(mockDb.getUserByUsername).toHaveBeenCalledWith(newUser.username);
    expect(mockDb.registerUser).toHaveBeenCalledWith(newUser.username, newUser.password, 'user');
  });

  test('it should return an error if the username is already taken', async () => {
    // Mock database responses
    mockDb.getUserByUsername.mockResolvedValue({ id: 1, username: 'testuser' });

    const newUser = { username: 'testuser', password: 'testpassword' };

    // Make a POST request to the /api/register route
    const response = await request(app)
      .post('/api/register')
      .send(newUser);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Benutzername bereits vergeben');
    expect(mockDb.getUserByUsername).toHaveBeenCalledWith(newUser.username);
    expect(mockDb.registerUser).not.toHaveBeenCalled();
  });

  test('it should return an error if there is a server error during registration', async () => {
    // Mock database responses
    mockDb.getUserByUsername.mockResolvedValue(null);
    mockDb.registerUser.mockRejectedValue(new Error('Database error'));

    const newUser = { username: 'testuser', password: 'testpassword' };

    // Make a POST request to the /api/register route
    const response = await request(app)
      .post('/api/register')
      .send(newUser);

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Fehler bei der Registrierung');
    expect(mockDb.getUserByUsername).toHaveBeenCalledWith(newUser.username);
    expect(mockDb.registerUser).toHaveBeenCalledWith(newUser.username, newUser.password, 'user');
  });
});
