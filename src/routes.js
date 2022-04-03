const Database = require('./database');

function routes(app) {
  const database = Database();

  app.get('/', (_, res) => res.send({ message: 'Hello World!' }));
  app.get('/database', (_, res) => res.send(database.get()));


  app.get('*', (_, res) => res.status(404).send({ message: 'Error 404: Not Found' }));
}

exports.routes = routes;
