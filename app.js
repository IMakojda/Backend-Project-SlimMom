const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { NotFound } = require('http-errors');
const { errorHandler } = require('./middlewares');

const usersRouter = require('./routes/api/users');
const productsRouter = require('./routes/api/products');
const calcRouter = require('./routes/api/calc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SlimMom API',
      version: '1.0.0',
      description:
        '<a  href="https://github.com/IMakojda/Backend-Project-SlimMom" target="_blank">Link to Github SlimMom Backend </a>',
    },
    servers: [
      {
        url: 'https://agile-cove-20040.herokuapp.com',
      },
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: 'http',
          name: 'x-auth-token',
          scheme: 'bearer',
          in: 'header',
        },
      },
    },
    security: [
      {
        Bearer: [],
      },
    ],
  },
  apis: ['./routes/api/*.js'],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/calc', calcRouter);
app.use((req, res, next) => {
  next(new NotFound());
});

app.use(errorHandler);

module.exports = app;
