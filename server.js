'use strict';
const express = require('express');
const app = require('./app');
const config = require('./config');
const args = require('args');

args
  .option('port', 'The port on which the app will be running', config.server.PORT);

const flags = args.parse(process.argv)

app.listen(flags.port, () => {
	console.log(`ProductAccess server is listening on port ${flags.port} ...`);
});