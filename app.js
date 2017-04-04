'use strict';
const express = require('express');
const logger = require('morgan');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./common/error');
const swaggerJSDoc = require('swagger-jsdoc');
const config = require('./config.js');

const app = express();

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: config.swagger,
  apis: ['./routes/*.js']
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

app.use('/api/product', require('./routes/product'));
app.use('/api/release', require('./routes/release'));
app.use('/api/version', require('./routes/version'));

app.use(errorHandler);


module.exports = app;