'use strict';
const pjson = require('./package.json');
const PORT = 3000;

module.exports = {
    "VERSION": pjson.version,
    "server": {
        "PORT": PORT,
    },
    "db": {
        "name": "appdock"
    },
    "swagger": {
        "info": {
            "title": 'Product Access Server',
            "version": `${pjson.version}`,
            "description": 'Product Access Server API description',
        },
        "host": `localhost:${PORT}`,
        "basePath": '/',
    }
}