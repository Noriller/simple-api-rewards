# Simple Rewards API | Bruno Noriller

Project made in Node with only Express as a production dependency.

The storage solution was made in memory and will reset on every restart.

## What's going on here

We have basically two endpoints to use:

- Fetch the rewards of a user
- Redeem a reward

### Fetching the rewards

The basic usage is:

```
GET http://localhost:3456/users/1/rewards?at=2020-03-19T12:00:00Z
```

The `at` query parameter is optional and will default to the current time.

This will create and/or update the user's rewards for the week of the date
given.

The return for the exact URL above should look like this:

```json
{
  "data": {
    "2020-03-14T00:00:00Z": {
      "availableAt": "2020-03-14T00:00:00Z",
      "redeemedAt": null,
      "expiresAt": "2020-03-15T00:00:00Z"
    },
    "2020-03-15T00:00:00Z": {
      "availableAt": "2020-03-15T00:00:00Z",
      "redeemedAt": null,
      "expiresAt": "2020-03-16T00:00:00Z"
    },
    "2020-03-16T00:00:00Z": {
      "availableAt": "2020-03-16T00:00:00Z",
      "redeemedAt": null,
      "expiresAt": "2020-03-17T00:00:00Z"
    },
    "2020-03-17T00:00:00Z": {
      "availableAt": "2020-03-17T00:00:00Z",
      "redeemedAt": null,
      "expiresAt": "2020-03-18T00:00:00Z"
    },
    "2020-03-18T00:00:00Z": {
      "availableAt": "2020-03-18T00:00:00Z",
      "redeemedAt": null,
      "expiresAt": "2020-03-19T00:00:00Z"
    },
    "2020-03-19T00:00:00Z": {
      "availableAt": "2020-03-19T00:00:00Z",
      "redeemedAt": null,
      "expiresAt": "2020-03-20T00:00:00Z"
    },
    "2020-03-20T00:00:00Z": {
      "availableAt": "2020-03-20T00:00:00Z",
      "redeemedAt": null,
      "expiresAt": "2020-03-21T00:00:00Z"
    }
  }
}
```

### Redeeming a reward

After fetching the rewards, we can redeem a reward by doing:

```
PATCH http://localhost:3456/users/1/rewards/2020-03-19T00:00:00Z/redeem
```

If the current date were 2020-03-19T12:00:00Z, the response would look like this:

```json
{ "data": { "availableAt": "2020-03-19T00:00:00Z", "redeemedAt": "2020-03-19T12:00:00Z", "expiresAt": "2020-03-20T00:00:00Z" } }
```

But, if you try now to redeem the same reward, you'll get an error:

```json
{ "error": { "message": "This reward is already expired" } }
```

Other errors include not having fetched the rewards of that day yet, or trying to redeem a reward twice.


## How to use

By default it opens in PORT 3456, but you can pass a different number.

```bash
yarn install
yarn dev
```

### Testing

Testing was done with Jest plus Supertest.

While the coverage might not be 100%, it's pretty high getting all the tests
that actually matter.

```bash
yarn install
yarn test
```
