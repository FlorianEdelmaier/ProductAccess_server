'use strict';
const db = require('./db');
const router = require('express').Router();

/**
 * @swagger
 * definition:
 *  Product:
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *        description: unique identifier
 *      name:
 *        type: string
 *        description: name of product
 *      description:
 *        type: string
 *        description: description of product
 *      link:
 *        type: string
 *        description: Url to product
 */

/**
 * @swagger
 * /api/product:
 *    get:
 *      tags:
 *      - product
 *      description: Returns all products
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: array of products
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/Product'
 */
router.get('/', (req, res) => {
    const products = db.getAllProducts();
    res.json(products);
});

module.exports = router
