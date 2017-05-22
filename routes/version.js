'use strict';
const router = require('express').Router();
const config = require('./../common/config').load('./app.yml');

/**
 * @swagger
 * /api/version:
 *    get:
 *      tags:
 *      - version
 *      description: Returns current api version
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: A version string
 *          schema:
 *            type: string
 */
router.get('/', (req, res) => {
    res.json({version: config.version});
});

module.exports = router;