'use strict';
const db = require('./db');
const router = require('express').Router();
const uuid = require('uuid');
const Validator = require('combine-validators');
const validations = Validator.validations;

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
    const v = new Validator();
    v.check(validations.isMandatory, validations.isUUID)(req.params, 'productId', 'ProductID not valid');
    if(v.hasErrors()) { 
        res.status(400).json({ errors: v.errors });
    }
    else {
        const releases = db.getReleasesForProduct(req.params.productId);
        res.json(releases);
    }
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
    const v = new Validator();
    v.check(validations.isMandatory, validations.isUUID)(req.body, 'productId', 'ProductID not valid');
    v.check(validations.isMandatory)(req.body, 'releaseDate', 'ReleaseData was not provided');
    v.check(validations.isMandatory)(req.body, 'version', 'Version was not provided');
    if(v.hasErrors()) { 
        res.status(400).json({ errors: v.errors });
    }
    else {
        const separators = ['\n', ','];
        let release = {
            id: uuid.v4(),
            releaseDate: req.body.releaseDate,
            version: req.body.version,
            notes: !Array.isArray(req.body.notes) ? req.body.notes.split(new RegExp(separators.join('|'), 'g')) : req.body.notes
        };
        try
        {
            const returnVal = db.addReleaseToProduct(req.body.productId, release);
            res.status(200).json(returnVal);
        }
        catch(err) { next(err); }
    }
    });

module.exports = router