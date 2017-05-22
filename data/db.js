'use strict';
const db = require('sqlite');

try {
    db.open('./data/test.sqlite', {Promise});
    db.migrate();
}
catch(err) { throw err; }

module.exports = db;