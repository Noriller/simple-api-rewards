const request = require('supertest');
const database = require('./database');
const app = require('./index');
const {
  userDataOn19,
  userDataOn26,
  redeemedReward,
  nowDateISOString,
  weekAfterDateISOString,
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

      database.clear();
    });

    describe('getUser', () => {
      it('should get an user passing at date', async () => {
        const response = await request(app).get('/users/user-id/rewards?at=2020-03-20T00:00:00Z');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ data: userDataOn19.rewards });
      });

      it('should get an user without passing at date', async () => {
        const response = await request(app).get('/users/user-id/rewards');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ data: userDataOn19.rewards });
      });

      it('should return an error if the date is invalid', async () => {
        const response = await request(app).get('/users/user-id/rewards?at=invalid-date');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ "message": "Invalid date" });
      });

      it('should keep data between requests', async () => {
        const response = await request(app).get(`/users/user-id/rewards?at=${nowDateISOString}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ data: userDataOn19.rewards });

        jest.advanceTimersByTime(1000);

        const response2 = await request(app).get(`/users/user-id/rewards?at=${weekAfterDateISOString}`);
        expect(response2.statusCode).toBe(200);
        expect(response2.body).toEqual({ data: userDataOn26.rewards });
      });

      it('should update the data after redeeming a reward', async () => {
        await request(app).get('/users/user-id/rewards?at=2020-03-20T00:00:00Z');
        await request(app).patch('/users/user-id/rewards/2020-03-19T00:00:00Z/redeem');
        const response = await request(app).get('/users/user-id/rewards?at=2020-03-20T00:00:00Z');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          data: {
            ...userDataOn19.rewards,
            [nowDateISOString]: redeemedReward,
          }
        });
      });
    });

    describe('redeemReward', () => {
      it('should redeem a reward', async () => {
        await request(app).get('/users/user-id/rewards?at=2020-03-20T00:00:00Z');
        const response = await request(app).patch('/users/user-id/rewards/2020-03-19T00:00:00Z/redeem');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ data: redeemedReward });
      });

      it('should return error without fetching the rewards first', async () => {
        const response = await request(app).patch('/users/user-id/rewards/2020-03-19T00:00:00Z/redeem');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: { message: "The user was not found" } });
      });

      it('should return error if the reward is not found', async () => {
        await request(app).get('/users/user-id/rewards?at=2020-03-20T00:00:00Z');
        const response = await request(app).patch('/users/user-id/rewards/2020-03-30T00:00:00Z/redeem');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: { message: "This reward was not found" } });
      });

      it('should return error message to expired reward', async () => {
        await request(app).get('/users/user-id/rewards?at=2020-03-20T00:00:00Z');
        const response = await request(app).patch('/users/user-id/rewards/2020-03-16T00:00:00Z/redeem');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: { message: "This reward is already expired" } });
      });

      it('should return error if reward was already redeemed', async () => {
        await request(app).get('/users/user-id/rewards?at=2020-03-20T00:00:00Z');
        await request(app).patch('/users/user-id/rewards/2020-03-19T00:00:00Z/redeem');
        const response = await request(app).patch('/users/user-id/rewards/2020-03-19T00:00:00Z/redeem');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: { message: "This reward was already redeemed" } });
      });
    });
  });
});
