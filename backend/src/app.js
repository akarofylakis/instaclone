const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const project = require('./constants/project');
const createPost = require('../db/seeders/user-seeder');

const app = express();
app.use(express.json());

app.use(morgan('dev'));
app.use(helmet());

app.get('/', (req, res) => {
  res.send({ message: project.message });
});

app.use('/api/v1', api);

app.use(middlewares.errorHandler);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}-t4obp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection Successful!');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
