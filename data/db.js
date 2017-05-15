'use strict';
const db = require('sqlite');

try {
    db.open('./test.db', {Promise});
    db.migrate({force: 'last'});
}
catch(err) { throw err; }

module.exports = db;