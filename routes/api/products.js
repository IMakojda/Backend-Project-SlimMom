const express = require('express');
const { products: ctrl } = require('../../controllers');
const { auth, catchWrapper } = require('../../middlewares');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - categories
 *         - weight
 *         - categories
 *         - title
 *         - calories
 *         - groupBloodNotAllowed
 *       properties:
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *         weight:
 *           type: number
 *         title:
 *           type: object
 *           properties:
 *             ru:
 *               type: string
 *             ua:
 *               type: string
 *         calories:
 *           type: number
 *         groupBloodNotAllowed:
 *           type: array
 *           items:
 *             type: boolean
 *       example:
 *         categories: [яйца]
 *         weight: 100
 *         title: {ru: Яйцо страусиное,
 *                 ua: Яйце страусине
 *                 }
 *         calories: 118,
 *         groupBloodNotAllowed: [null,true,false,false,false]
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get product
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: product
 *         schema:
 *           type: string
 *           example: Горох
 *         required: true
 *         description: user query.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 5d51694802b2373622ff554f
 *                   label:
 *                     type: string
 *                     example: Горох Містраль Орегон
 */

router.get('/', auth, catchWrapper(ctrl.getProduct));

module.exports = router;
