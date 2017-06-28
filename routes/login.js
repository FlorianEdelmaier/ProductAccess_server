'use strict';
const loginController = require('./../controllers/login');
const router = require('express').Router();

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
 *          description: A status string
 *          schema:
 *            type: string
 */
router.post('/', loginController.login);

module.exports = router;