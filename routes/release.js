'use strict';
const db = require('./../db.json');
const router = require('express').Router();
const uuid = require('uuid');
const fs = require('fs');

/**
 * @swagger
 * definition:
 *  Release:
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *        description: unique identifier
 *      releaseDate:
 *        type: string
 *        description: date of release
 *      version:
 *        type: string
 *        description: version string
 *      notes:
 *        type: array
 *        items:
 *          type: string
 */

/**
 * @swagger
 * /api/release/{productId}:
 *    get:
 *      tags:
 *      - release
 *      description: Returns all releases for a given product
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: productId
 *        description: unique identifier of given product
 *        in: path
 *        required: true
 *        type: string
 *      responses:
 *          200:
 *            description: List of releases
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/definitions/Release'
 */

router.get('/:productId', (req, res, next) => {
    let releases = [];
    for(let i=0; i < db.products.length; i++) {
        if(db.products[i].id === req.params.productId) {
            releases = db.products[i].releases;
        }
    }
    res.json(releases);
});

/**
 * @swagger
 * /api/release:
 *    post:
 *        tags:
 *        - release
 *        description: Create new release
 *        produces:
 *        - application/json
 *        parameters:
 *        - name: productId
 *          description: id of product
 *          in: formData
 *          required: true
 *          type: string
 *        - name: releaseDate
 *          description: date of release
 *          in: formData
 *          required: true
 *          type: string
 *        - name: version
 *          description: version string
 *          in: formData
 *          type: string
 *          required: true
 *        - name: type
 *          description: notification type like info or request
 *          in: formData
 *          type: array
 *          required: false
 *        responses:
 *          200:
 *            description: returns created notification
 *            schema:
 *              $ref: '#/definitions/Release'
 */
router.post('/', (req, res, next) => {
    let release = {
        id: uuid.v4(),
        releaseDate: req.body.releaseDate,
        version: req.body.version,
        notes: req.body.notes
    };
    for(let i=0; i < db.products.length; i++) {
        if(db.products[i].id === req.body.productId) {
            console.log("found");
            db.products[i].releases.push(release);
            console.log("final", db);
        }
    }
    fs.writeFile('./../db.json', JSON.stringify(db), (error) => {console.log("finish", error)});
    res.status(200).json(release);
});

module.exports = router