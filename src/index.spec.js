const request = require('supertest');
const app = require('./index');
const {
  nowDate,
  userDataOn19,
  weekAfterDate,
  redeemedReward,
  nowDateISOString
} = require("./__mocks__/rewardsMock");

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

  describe('user rewards routes', () => {
    beforeEach(() => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2020-03-19T00:00:00Z').getTime());
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should get a user', async () => {
      const response = await request(app).get('/users/user-id/rewards?at=2020-03-20T00:00:00Z');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ data: userDataOn19.rewards });
    });
  });
});
