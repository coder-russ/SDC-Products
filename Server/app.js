const express = require('express');
const sequelize = require('./db');

const app = express();
const port = 3000;
const router = require('./routes');

app.use(express.json());

app.use('/', router);

app.listen(port, () => console.log('Server listening on port ', port));

sequelize.authenticate()
  .then(() => console.log('Postgres connection has been established successfully'))
  .catch((err) => console.log('Unable to connect to Postgres DB: ', err));
