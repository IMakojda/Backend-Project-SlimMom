const express = require('express');
const { users: ctrl } = require('../../controllers');
const { validation, catchWrapper, auth } = require('../../middlewares');
const {
  joiSchemaSignUp,
  joiSchemaLogin,
  joiAvatarUrlSchema,
} = require('../../models/user');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: Username
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *         height:
 *           type: number
 *           description: User height
 *         age:
 *           type: number
 *           description: User age
 *         currentWeight:
 *           type: number
 *           description: User current weight
 *         desiredWeight:
 *           type: number
 *           description: User desired weight
 *         bloodType:
 *           type: number
 *           description: User blood type
 *       example:
 *         name: Alina
 *         email: alina.egorova@gmail.com
 *         password: Grdf56fd88
 *         height: 178
 *         age: 33
 *         currentWeight: 75
 *         desiredWeight: 65
 *         bloodType: 3
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Returns data new user
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     avatarURL:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     height:
 *                       type: number
 *                     age:
 *                       type: number
 *                     currentWeight:
 *                       type: number
 *                     desiredWeight:
 *                       type: number
 *                     bloodType:
 *                       type: number
 *                       example: 1
 */

router.post('/signup', validation(joiSchemaSignUp), catchWrapper(ctrl.signUp));

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Returns data user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: alina.egorova@gmail.com
 *               password:
 *                 type: string
 *                 example: Grdf56fd88
 *     responses:
 *       200:
 *         description: Login user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     avatarURL:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     height:
 *                       type: number
 *                     age:
 *                       type: number
 *                     currentWeight:
 *                       type: number
 *                     desiredWeight:
 *                       type: number
 *                     bloodType:
 *                       type: number
 *                       example: 1
 */

router.post('/login', validation(joiSchemaLogin), catchWrapper(ctrl.login));

/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     summary: Logout user
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Authorization header using the Bearer token is required. If you want try it, please AUTHORIZE at the top of the page. Or click on the lock.
 *     tags: [Users]
 *     responses:
 *       204:
 *         description: No Content
 */

router.get('/logout', auth, catchWrapper(ctrl.logout));

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Get current user
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Authorization header using the Bearer token is required. If you want try it, please AUTHORIZE at the top of the page. Or click on the lock.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Current user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 avatarURL:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 height:
 *                   type: number
 *                 age:
 *                   type: number
 *                 currentWeight:
 *                   type: number
 *                 desiredWeight:
 *                   type: number
 *                 bloodType:
 *                   type: number
 *                   example: 1
 */

router.get('/current', auth, catchWrapper(ctrl.getCurrent));

/**
 * @swagger
 * /api/users/avatars:
 *    patch:
 *     summary: Change user avatar
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Authorization header using the Bearer token is required. If you want try it, please AUTHORIZE at the top of the page. Or click on the lock.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 example: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABEgAAACjCAYAAACZtyuEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARDSURBVHgB7dgBDcAwDMCw/Tqi8ufWj0dsKSTyzMweAAAAgK59DwAAAECcQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQN532wMAAADQtT/zaAXag6h60wAAAABJRU5ErkJggg==
 *     responses:
 *       200:
 *         description: Avatar url
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatarURL:
 *                   type: string
 *                   example: "http://res.cloudinary.com/slimmom/image/upload/v1658246038/dev_setups/bjsfigmojbunx1btkqjm.png"
 */

router.patch(
  '/avatars',
  auth,
  validation(joiAvatarUrlSchema),
  catchWrapper(ctrl.updateAvatar)
);

module.exports = router;
