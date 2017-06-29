'use strict';
const express = require('express');
const logger = require('morgan');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./server/common/error');
const swaggerJSDoc = require('swagger-jsdoc');
const config = require('./server/common/config').load('./app.yml');

const app = express();

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: config.swagger,
  apis: ['./server/routes/*.js']
});

app.get('/swagger.json', function(req, res) {
  res.json(swaggerSpec);
});

app.use(express.static(__dirname + '/api-docs'));

app.use(logger('dev'));
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/product', require('./server/routes/product'));
app.use('/api/release', require('./server/routes/release'));
app.use('/api/login', require('./server/routes/login'));
app.use('/api/version', require('./server/routes/version'));

app.use(errorHandler);


module.exports = app;