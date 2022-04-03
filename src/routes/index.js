function routes(app) {
  app.get('/', (_, res) => res.status(200).send({ message: 'Hello World!' }));

  app.get('*', (_, res) => res.status(404).send({ message: 'Error 404: Not Found' }));
}

module.exports = routes;
