'use strict';
const Product = require('./../models/product');

exports.findAll = () => {
    return Product.findAll({
        order: '"name" ASC'
    });
}