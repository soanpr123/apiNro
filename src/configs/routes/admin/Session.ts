import { Router } from 'express';
import AuthController from '@controllers/api/admin/AuthController';

const router = Router();

/**
 * @openapi
 * /a/session/current:
 *   get:
 *     tags:
 *      - "[GLOBAL] Auth"
 *     summary: Lấy session user
 *     consumes:
 *      - "application/json"
 *     produces:
 *      - "application/json"
 *     responses:
 *       200:
 *         description: "Done"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/current', AuthController.current);

/**
 * @openapi
 * /a/session/change_password:
 *   patch:
 *     tags:
 *      - "[GLOBAL] Auth"
 *     summary: Đổi password user
 *     consumes:
 *      - "application/json"
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        required: "true"
 *        schema:
 *          type: "object"
 *          properties:
 *            password:
 *              type: "string"
 *              description: "Mật khẩu đăng nhập"
 *     responses:
 *       200:
 *         description: "Done"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.patch('/change_password', AuthController.changePassword);

export default router;
