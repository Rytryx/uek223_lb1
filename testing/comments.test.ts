const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../server/content/posts');

// Mount the router on the app
app.use(router);

// Test the POST /comment route
describe('POST /comment', () => {
  it('should create a new comment', async () => {
    const response = await request(app)
      .post('/comment')
      .send({ userId: 1, tweetId: 1, content: 'Test comment' });

    expect(response.status).toBe(201);
    expect(response.text).toBe('Kommentar erfolgreich erstellt.');
  });

  it('should return a 400 Bad Request for missing fields', async () => {
    const response = await request(app)
      .post('/comment')
      .send({ userId: 1 });

    expect(response.status).toBe(400);
  });
});

// Test the PUT /comment/:id route
describe('PUT /comment/:id', () => {
  it('should update a comment', async () => {
    const response = await request(app)
      .put('/comment/1')
      .send({ content: 'Updated comment' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Kommentar erfolgreich aktualisiert.');
  });

  it('should return a 400 Bad Request for missing content', async () => {
    const response = await request(app)
      .put('/comment/1')
      .send({});

    expect(response.status).toBe(400);
  });
});

// Test the DELETE /comment/:id route
describe('DELETE /comment/:id', () => {
  it('should delete a comment', async () => {
    const response = await request(app).delete('/comment/1');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Kommentar erfolgreich gelöscht.');
  });
});

// Test the GET /comments/:tweetId route
describe('GET /comments/:tweetId', () => {
  it('should retrieve comments for a tweet', async () => {
    const response = await request(app).get('/comments/1');
    expect(response.status).toBe(200);
  });
});
