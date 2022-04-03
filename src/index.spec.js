const request = require('supertest');
const app = require('./index');

describe('Rewards API', () => {
  it('should return a 200 response with hello world', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World!' });
  });

  it('should return a 404 response on a random url', async () => {
    const response = await request(app).get('/random');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ "message": "Error 404: Not Found" });
  });
});
