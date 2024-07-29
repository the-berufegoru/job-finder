import request from 'supertest';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

describe('GET /', () => {
  it('should return a message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello API' });
  });
});
