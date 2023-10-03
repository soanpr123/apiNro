import { Router } from 'express';
import UserController from '@controllers/api/admin/UserController';

const router = Router();

/**
 * @openapi
 * /a/user/get_all:
 *   get:
 *     tags:
 *      - "[ADMIN] Quản lý User"
 *     summary: Danh sách User
 *     consumes:
 *      - "application/json"
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - in: "query"
 *        name: "page"
 *        schema:
 *          type: "string"
 *      - in: "query"
 *        name: "pageSize"
 *        schema:
 *          type: "string"
 *      - in: "query"
 *        name: "username"
 *        schema:
 *          type: "string"
 *      - in: "query"
 *        name: "status"
 *        enum:
 *          - active
 *          - deactive
 *        schema:
 *          type: "string"
 *     responses:
 *       200:
 *         description: "Done"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/get_all', UserController.list);

/**
 * @openapi
 * /a/user/{id}:
 *   get:
 *     tags:
 *      - "[ADMIN] Quản lý User"
 *     summary: Xem User
 *     consumes:
 *      - "application/json"
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - in: "path"
 *        name: "id"
 *        required: "true"
 *        schema:
 *          type: "string"
 *     responses:
 *       200:
 *         description: "Done"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/{id}', UserController.show);

/**
 * @openapi
 * /a/user/:
 *   post:
 *     tags:
 *      - "[ADMIN] Quản lý User"
 *     summary: Tạo mới User
 *     consumes:
 *      - "application/json"
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - in: "path"
 *        name: "id"
 *        required: "true"
 *        schema:
 *          type: "string"
 *      - in: "body"
 *        name: "body"
 *        required: "true"
 *        schema:
 *          type: "object"
 *          properties:
 *            username:
 *              type: "string"
 *              description: "Username đăng nhập duy nhất"
 *            password:
 *              type: "string"
 *              description: "Mật khẩu đăng nhập"
 *            type:
 *              type: "string"
 *              description: "Quyền"
 *              enum:
 *                -root
 *                -admin
 *                -mod
 *                -report
 *                -client
 *     responses:
 *       200:
 *         description: "Done"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/', UserController.create);

/**
 * @openapi
 * /a/user/{id}:
 *   patch:
 *     tags:
 *      - "[ADMIN] Quản lý User"
 *     summary: Cập nhật User
 *     consumes:
 *      - "application/json"
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - in: "path"
 *        name: "id"
 *        required: "true"
 *        schema:
 *          type: "string"
 *      - in: "body"
 *        name: "body"
 *        required: "true"
 *        schema:
 *          type: "object"
 *          properties:
 *            username:
 *              type: "string"
 *              description: "Username đăng nhập duy nhất"
 *            password:
 *              type: "string"
 *              description: "Mật khẩu đăng nhập"
 *            type:
 *              type: "string"
 *              description: "Quyền"
 *              enum:
 *                -root
 *                -admin
 *                -mod
 *                -report
 *                -client
 *     responses:
 *       200:
 *         description: "Done"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.patch('/:id', UserController.update);

/**
 * @openapi
 * /a/user/{id}:
 *   delete:
 *     tags:
 *      - "[ADMIN] Quản lý User"
 *     summary: Khóa user
 *     consumes:
 *      - "application/json"
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - in: "path"
 *        name: "id"
 *        required: "true"
 *        schema:
 *          type: "string"
 *     responses:
 *       200:
 *         description: "Done"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.delete('/:id', UserController.delete);

export default router;
