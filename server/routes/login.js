'use strict';
const loginController = require('./../controllers/login');
const router = require('express').Router();

/**
 * @swagger
 * definition:
 *  User:
 *    type: object
 *    properties:
 *      email:
 *        type: string
 *        description: name of product
 *      groups:
 *        type: array
 *        items:
 *          type: string
 */

/**
 * @swagger
 * /api/login:
 *    post:
 *      tags:
 *      - login
 *      description: login with email and pwd
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: email
 *        description: email of user
 *        in: formData
 *        required: true
 *        type: string
 *      - name: pwd
 *        description: pwd of user
 *        in: formData
 *        required: true
 *        type: string
 *      responses:
 *        200:
 *          description: A user string
 *          schema:
 *            $ref: '#/definitions/User'
 */
router.post('/', loginController.login);

module.exports = router;