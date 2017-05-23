'use strict';
const router = require('express').Router();
const controller = require('./../controllers/release');


/**
 * @swagger
 * definition:
 *  Release:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *        description: primary key
 *      productId:
 *        type: integer
 *        description: foreign key to Product
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
 *        description: id of given product
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

router.get('/:productId', controller.getAllReleasesForProduct);

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
 *          type: integer
 *        - name: releaseDate
 *          description: date of release
 *          in: formData
 *          required: false
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
router.post('/', controller.createRelease);

module.exports = router