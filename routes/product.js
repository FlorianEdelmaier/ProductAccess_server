'use strict';
const router = require('express').Router();
const controller = require('./../controllers/product');

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
 *      linkUserManual:
 *        type: string
 *        description: Url to UserManual
 *      linkSupportSite:
 *        type: string
 *        description: Url to SupportSite
 *      linkMarketingDoc:
 *        type: string
 *        description: Url to MarketingDoc
 *      state:
 *        type: string
 *        description: current state
 *      type:
 *        type: string
 *        description: type to app belongs
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
router.get('/', controller.getAllProducts);

/**
 * @swagger
 * /api/product/{type}:
 *    get:
 *      tags:
 *      - product
 *      description: Returns all products for given type
 *      parameters:
 *      - name: type
 *        description: type of product
 *        in: path
 *        required: true
 *        type: string
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
router.get('/:type', controller.getProductsByType);

/**
 * @swagger
 * /api/product:
 *      post:
 *        tags:
 *        - product
 *        description: Create new product
 *        produces:
 *        - application/json
 *        parameters:
 *        - name: name
 *          description: name of product
 *          in: formData
 *          required: true
 *          type: string
 *        - name: description
 *          description: description of product
 *          in: formData
 *          required: false
 *          type: string
 *        - name: link
 *          description: link to product
 *          in: formData
 *          type: string
 *          required: false
 *        - name: linkUserManual
 *          description: link to UserManual
 *          in: formData
 *          type: string
 *          required: false
 *        - name: linkSupportSite
 *          description: link to SupportSite
 *          in: formData
 *          type: string
 *          required: false
 *        - name: linkMarketingDoc
 *          description: link to MarketingDoc
 *          in: formData
 *          type: string
 *          required: false
 *        - name: status
 *          description: status of product
 *          in: formData
 *          type: string
 *          required: false
 *        - name: type
 *          description: type of product
 *          in: formData
 *          type: string
 *          required: true
 *        responses:
 *          200:
 *            description: returns created product
 *            schema:
 *              $ref: '#/definitions/Product'
 */
router.post('/', controller.createProduct);

/**
 * @swagger
 * /api/product:
 *      put:
 *        tags:
 *        - product
 *        description: Update existing product
 *        produces:
 *        - application/json
 *        parameters:
 *        - name: id
 *          description: id of product
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: name
 *          description: name of product
 *          in: formData
 *          required: true
 *          type: string
 *        - name: description
 *          description: description of product
 *          in: formData
 *          required: false
 *          type: string
 *        - name: link
 *          description: link to product
 *          in: formData
 *          type: string
 *          required: false
 *        - name: linkUserManual
 *          description: link to UserManual
 *          in: formData
 *          type: string
 *          required: false
 *        - name: linkSupportSite
 *          description: link to SupportSite
 *          in: formData
 *          type: string
 *          required: false
 *        - name: linkMarketingDoc
 *          description: link to MarketingDoc
 *          in: formData
 *          type: string
 *          required: false
 *        - name: status
 *          description: status of product
 *          in: formData
 *          type: string
 *          required: false
 *        - name: type
 *          description: type of product
 *          in: formData
 *          type: string
 *          required: true
 *        responses:
 *          200:
 *            description: returns updated product
 *            schema:
 *              $ref: '#/definitions/Product'
 */
router.put('/', controller.updateProduct);

/**
 * @swagger
 * /api/product/status:
 *      patch:
 *        tags:
 *        - product
 *        description: Update status of product
 *        produces:
 *        - application/json
 *        parameters:
 *        - name: id
 *          description: id of product
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: status
 *          description: status of product
 *          in: formData
 *          type: string
 *          required: true
 *        responses:
 *          200:
 *            description: returns updated product
 *            schema:
 *              $ref: '#/definitions/Product'
 */
router.patch('/status', controller.setProductState);

/**
 * @swagger
 * /api/product/dim/status:
 *      get:
 *        tags:
 *        - product
 *        description: Returns all status of a product
 *        produces:
 *        - application/json
 *        responses:
 *          200:
 *            description: array of status
 *            schema:
 *              type: array
 *              items:
 *                type: string
 */
router.get('/dim/status', controller.getAllProductStates);

/**
 * @swagger
 * /api/product/dim/type:
 *      get:
 *        tags:
 *        - product
 *        description: Returns all types of a product
 *        produces:
 *        - application/json
 *        responses:
 *          200:
 *            description: array of types
 *            schema:
 *              type: array
 *              items:
 *                type: string
 */
router.get('/dim/type', controller.getAllProductTypes);

/**
 * @swagger
 * /api/product:
 *      delete:
 *        tags:
 *        - product
 *        description: delete product by primary key
 *        produces:
 *        - application/json
 *        parameters:
 *        - name: id
 *          description: id of product
 *          in: formData
 *          required: true
 *          type: integer
 *        responses:
 *          200:
 *            description: returns deleted product
 *            schema:
 *              $ref: '#/definitions/Product'
 */
router.delete('/', controller.deleteProduct);

/**
 * @swagger
 * /api/product/aggregate/overview:
 *      get:
 *        tags:
 *        - product
 *        description: get tile information
 *        produces:
 *        - application/json
 *        responses:
 *          200:
 *            description: returns tile information
 */
router.get('/aggregate/overview', controller.getOverview);

module.exports = router;
