const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const project = require('./constants/project');
const dbSetup = require('./db');
const createPost = require('../db/seeders/user-seeder');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

app.get('/', (req, res) => {
  res.send({ message: project.message });
});

app.use('/api/v1', api);

app.use(middlewares.errorHandler);

if (process.env.NODE_ENV !== 'test') {
  dbSetup();
}

module.exports = app;
