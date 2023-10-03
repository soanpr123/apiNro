import { Router } from 'express';
import AuthController from '@controllers/api/admin/AuthController';
import { allowIP } from '@middlewares/auth';

const router = Router();

/**
 * @openapi
 * /a/auth/login:
 *   post:
 *     tags:
 *      - "[GLOBAL] Auth"
 *     summary: Login
 *     consumes:
 *      - "application/json"
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - in: header
 *        name: x-client-ip
 *        schema:
 *          type: string
 *        required: true
 *      - in: "body"
 *        name: "body"
 *        description: "Yêu cầu Login"
 *        require: true
 *        schema:
 *          type: "object"
 *          properties:
 *            username:
 *              type: "string"
 *            password:
 *              type: "string"
 *     responses:
 *       200:
 *         token: "Token"
 *       500:
 *         description: "Internal error"
 */

router.post('/login', AuthController.login);

export default router;
