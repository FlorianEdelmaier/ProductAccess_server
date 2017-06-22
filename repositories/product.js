'use strict';
const db = require('./../data/db.js');

exports.validProductTypes = ['Finance & Controlling', 'HR & organisational development', 'Information & communication technology', 'Institutional Partnership Development', 'Global Emergency Response', 'PSA Relations', 'Programme & Strategy'];

exports.validProductStates = ['up', 'down', 'maintenance'];

exports.findAll = () => {
    return db.all('SELECT id, name, description, link, status, type FROM Product ORDER BY name');
}

exports.findByType = (type) => {
    return db.all(`SELECT * FROM Product WHERE type = ${type} ORDER BY name`);
}

exports.findById = (id) => {
    return db.get(`SELECT * FROM Product WHERE id = ${id}`);
}

exports.add = (name, description, link, status, type) => {
    return db.run(`INSERT INTO Product (name, description, link, status, type) VALUES ('${name}', '${description}', '${link}', '${status}', '${type}')`);
}

exports.update = (id, name, description, link, status, type) => {
    return db.run(`UPDATE Product SET name = '${name}', description = '${description}', link = '${link}', status = '${status}', type = '${type}' WHERE id = ${id}`);
}

exports.setState = (id, status) => {
    return db.run(`UPDATE Product SET status = '${status}' WHERE id = ${id}`)
}

exports.delete = (id) => {
    return db.run(`DELETE FROM Product WHERE id = ${id}`);
}

exports.getProductOverview = () => {
    return db.all(`SELECT p.type, ( SELECT COUNT(*) FROM Product WHERE status = 'up'  AND type = p.type) AS CountUp, ( SELECT COUNT(*) FROM Product WHERE status = 'maintenance' AND type = p.type) AS CountMaintenance, ( SELECT COUNT(*) FROM Product WHERE status = 'down' AND type = p.type) AS CountDown FROM Product AS p GROUP BY type`);
}