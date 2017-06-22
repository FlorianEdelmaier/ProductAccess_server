'use strict';
const db = require('sqlite');
const config = require('./../common/config').load('./app.yml');

try {
    if(config.db === 'test')
        db.open('./data/test.sqlite', {Promise});
    else
        db.open('./data/app.sqlite', {Promise});
    db.migrate();
}
catch(err) { throw err; }

module.exports = db;