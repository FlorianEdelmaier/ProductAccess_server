'use strict';
// const db = require('./db');
const router = require('express').Router();
const db = require('./../data/db.js');

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
 *      state:
 *        type: string
 *        description: current state
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
router.get('/', async (req, res, next) => {
    try {
        const test = await db.get("SELECT * FROM Products");
        res.json(test);
    } catch(ex) { next(ex); }
});

module.exports = router
