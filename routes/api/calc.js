const { joiSchemaCalc } = require('../../models/user');
const {
  schemaSetProduct,
  schemaDeleteProduct,
  schemaDailyInfo,
} = require('../../models/calc');
const {
  validation,
  validateParams,
  catchWrapper,
  auth,
} = require('../../middlewares');

const express = require('express');
const {
  defaultCalculator,
  userCalculator,
} = require('../../controllers/calculator');
const {
  setProduct,
  deleteProduct,
  viewDailyInfo,
} = require('../../controllers/userCalc');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Calc:
 *       type: object
 *       required:
 *         - user
 *         - date
 *       properties:
 *         user:
 *           type: string
 *           description: user id
 *         date:
 *           type: string
 *           description: date
 *         products:
 *           type: array
 *           description: User products
 *           items:
 *             type: object
 *             description: User product
 *             properties:
 *               title:
 *                 type: string
 *                 description: product title
 *               weight:
 *                 type: number
 *                 description: product weight
 *               calories:
 *                 type: number
 *                 description: product calories
 *         summary:
 *           type: object
 *           description: User summary
 *           properties:
 *             dailyRate:
 *               type: number
 *             consumed:
 *               type: number
 *             left:
 *               type: number
 *             nOfNorm:
 *               type: number
 *       example:
 *         user: 62d8409cb0b48b2ef4436a89
 *         date: 2022-07-20T00:00:00.000+00:00
 *         products: [{
 *                      title: Амарант,
 *                      weight: 100,
 *                      calories: 371
 *                   }]
 *         summary: {
 *           dailyRate: 1500,
 *           consumed: 371,
 *           left: 1129,
 *           nOfNorm: 25
 *         }
 *
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Calcs
 *   description: The calcs managing API
 */

/**
 * @swagger
 * /api/calc:
 *   post:
 *     summary: Calculates and returns user data
 *     tags: [Calcs]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              height: number
 *              age: number
 *              currentWeight: number
 *              desiredWeight: number
 *              bloodType: number
 *          example:
 *            height: 175
 *            age: 37
 *            currentWeight: 90
 *            desiredWeight: 75
 *            bloodType: 3
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyRate:
 *                   type: number
 *                 notRecFood:
 *                   type: array
 *                   items:
 *                     title:
 *                       type: object
 *                       properties:
 *                         ru:
 *                           type: string
 *                         ua:
 *                           type: string
 */

router.post('/', validation(joiSchemaCalc), catchWrapper(defaultCalculator));

/**
 * @swagger
 * /api/calc/user:
 *   put:
 *     summary: Calculates and returns user data, post it to the server
 *     tags: [Calcs]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              height: number
 *              age: number
 *              currentWeight: number
 *              desiredWeight: number
 *              bloodType: number
 *          example:
 *            height: 175
 *            age: 37
 *            currentWeight: 90
 *            desiredWeight: 75
 *            bloodType: 3
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyRate:
 *                   type: number
 *                 notRecFood:
 *                   type: array
 *                   items:
 *                     title:
 *                       type: object
 *                       properties:
 *                         ru:
 *                           type: string
 *                         ua:
 *                           type: string
 */

router.put(
  '/user',
  auth,
  validation(joiSchemaCalc),
  catchWrapper(userCalculator)
);

/**
 * @swagger
 * /api/calc/user:
 *   post:
 *     summary: Add product
 *     tags: [Calcs]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              productId: objectId
 *              date: Date
 *              productWeight: number
 *          example:
 *            productId: 5d51694802b2373622ff5593
 *            date: 2022.07.21Z
 *            productWeight: 200
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: string
 *                     date:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: object
 *                           properties:
 *                             ru:
 *                               type: string
 *                             ua:
 *                              type: string
 *                         weight:
 *                           type: number
 *                         calories:
 *                           type: number
 *                     summary:
 *                       type: object
 *                       properties:
 *                         dailyRate:
 *                           type: number
 *                         consumed:
 *                           type: number
 *                         left:
 *                           type: number
 *                         nOfNorm:
 *                           type: number
 */

router.post(
  '/user',
  auth,
  validation(schemaSetProduct),
  catchWrapper(setProduct)
);

/**
 * @swagger
 * /api/calc/user/{date}/{productId}:
 *   delete:
 *     summary: Delete product
 *     tags: [Calcs]
 *     parameters:
 *       - in: path
 *         name: date
 *         schema:
 *           type: string
 *           example: 2022.07.21Z
 *         required: true
 *         description: date.
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *           example: 5d51694802b2373622ff5593
 *         required: true
 *         description: productId.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: string
 *                     date:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: object
 *                           properties:
 *                             ru:
 *                               type: string
 *                             ua:
 *                              type: string
 *                         weight:
 *                           type: number
 *                         calories:
 *                           type: number
 *                     summary:
 *                       type: object
 *                       properties:
 *                         dailyRate:
 *                           type: number
 *                         consumed:
 *                           type: number
 *                         left:
 *                           type: number
 *                         nOfNorm:
 *                           type: number
 */

router.delete(
  '/user/:date/:productId',
  auth,
  validateParams(schemaDeleteProduct),
  catchWrapper(deleteProduct)
);

/**
 * @swagger
 * /api/calc/user/{date}:
 *   get:
 *     summary: Delete product
 *     tags: [Calcs]
 *     parameters:
 *       - in: path
 *         name: date
 *         schema:
 *           type: string
 *           example: 2022.07.21Z
 *         required: true
 *         description: date.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: string
 *                     date:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: object
 *                           properties:
 *                             ru:
 *                               type: string
 *                             ua:
 *                              type: string
 *                         weight:
 *                           type: number
 *                         calories:
 *                           type: number
 *                     summary:
 *                       type: object
 *                       properties:
 *                         dailyRate:
 *                           type: number
 *                         consumed:
 *                           type: number
 *                         left:
 *                           type: number
 *                         nOfNorm:
 *                           type: number
 *                 notRecFood:
 *                   type: array
 *                   items:
 *                     title:
 *                       type: object
 *                       properties:
 *                         ru:
 *                           type: string
 *                         ua:
 *                           type: string
 */

router.get(
  '/user/:date',
  auth,
  validateParams(schemaDailyInfo),
  catchWrapper(viewDailyInfo)
);

module.exports = router;
