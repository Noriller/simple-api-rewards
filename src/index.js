const http = require('http');
const express = require('express');
const { routes } = require("./routes");

const app = express();
const port = process.env.PORT || 3456;

// routes were separated to be better readable
routes(app);

const server = http.createServer(app);

/**
 * This is just a boilerplate for a graceful shutdown
 */
process.on('SIGINT', () => {
  console.debug('\nSIGINT signal received: closing HTTP server');
  server.close(() => {
    console.debug('HTTP server closed');
  });
});

/**
 * On a test environment, this forces the use of random ports
 * This avoid conflicts with other tests and allows for parallel testing
 */
if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => console.log(`Rewards API | Bruno Noriller | listening on port ${port}!`));
}

module.exports = server;

/**
 * The index basically just takes care of the starting and the closing of the server.
 */
