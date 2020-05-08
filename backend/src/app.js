const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

console.log(process.env.PORT);

app.get('/', (req, res) => {
  res.send({ message: `🍉🍓 Working!! 🍓🍉` });
});

module.exports = app;
