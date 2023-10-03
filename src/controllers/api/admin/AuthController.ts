import { Request, Response } from 'express';
import { sendError, sendSuccess } from '@libs/response';
import { encryptPassword } from '@libs/crypto';
import UserInterface from '@interfaces/users';
import UserModel from '@models/users';
import jwt from 'jsonwebtoken';

class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const user: UserInterface = req.body;
      if (user.username == null || user.password == null) throw new Error('invalid info');
      const userLogin = await UserModel.findOne({
        where: {
          username: user.username,
          password: user.password,
        },

      });
      if (userLogin) {
        delete userLogin.password;
        const token = jwt.sign(userLogin.toJSON(), process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
        return sendSuccess(res, { auth: true, token: token, user: userLogin });
      }
      return res.status(401).send();
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async current(req: Request, res: Response) {
    try {
      const user = JSON.parse(JSON.stringify(req.user));
      delete user.password;
      sendSuccess(res, { user });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async changePassword(req: Request, res: Response) {
    try {
      const userLogin = await UserModel.findByPk(req.user.id);
      // await userLogin.update({ password: encryptPassword(req.body.password) });
      // delete userLogin.password;
      sendSuccess(res, { user: userLogin });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new AuthController();
