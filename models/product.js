'use strict';
const config = require('./../config');
const Sequelize = require('sequelize');
const db = new Sequelize(config.db.name, null, null, { dialect: 'sqlite' });

const Product = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    link: {
        type: Sequelize.TEXT
    },
    status: {
        type: Sequelize.ENUM,
        values: ['up', 'maintenance', 'off'],
        defaultValue: 'up'
    }
});

Product.sync().then(() => {
    // Product.create({ name: 'test1', description: 'description test1', link: 'http://google.com' })
    //.then(data => console.log(data.get()));
})

module.exports = Product;