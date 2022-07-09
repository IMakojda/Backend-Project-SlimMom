const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { NotFound } = require('http-errors');
const { errorHandler } = require('./middlewares');

const usersRouter = require('./routes/api/users');
const calculatorRouter = require('./routes/api/calculator');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/calculator', calculatorRouter);
app.use((req, res, next) => {
  next(new NotFound());
});

app.use(errorHandler);

module.exports = app;
