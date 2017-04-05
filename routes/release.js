'use strict';
const db = require('./db');
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
    const releases = db.getReleasesForProduct(req.params.productId);
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
 *        - name: notes
 *          description: array of release notes
 *          in: formData
 *          schema:
 *              type: array
 *              items:
 *                  type: string
 *          required: false
 *        responses:
 *          200:
 *            description: returns created notification
 *            schema:
 *              $ref: '#/definitions/Release'
 */
router.post('/', (req, res, next) => {
    const separators = ['\n', ','];
    let release = {
        id: uuid.v4(),
        releaseDate: req.body.releaseDate,
        version: req.body.version,
        notes: !Array.isArray(req.body.notes) ? req.body.notes.split(new RegExp(separators.join('|'), 'g')) : req.body.notes
    };
    console.log(release);
    try
    {
       const returnVal = db.addReleaseToProduct(req.body.productId, release);
        res.status(200).json(returnVal);
    }
    catch(err) { next(err); }
});

module.exports = router