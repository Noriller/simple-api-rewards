const database = require('../database');
const users = require('./users.route')

function routes(app) {
  app.get('/', (_, res) => res.status(200).json({ message: 'Hello World!' }));

  app.get('/oi', (_, res) => res.status(200).json(database.get()));
  app.get('/oi2', (_, res) => res.status(200).json(database.get('oi')));

  app.use('/users', users);

  app.all('*', (_, res) => res.status(404).json({ message: 'Error 404: Not Found' }));
}

module.exports = routes;
