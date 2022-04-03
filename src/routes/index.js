const users = require('./users.route')

function routes(app) {
  app.get('/', (_, res) => res.status(200).json({ message: 'Hello World!' }));

  app.use('/users/:userId/rewards', users);

  app.all('*', (_, res) => res.status(404).json({ message: 'Error 404: Not Found' }));
}

module.exports = routes;
