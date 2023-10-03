import { Request, Response } from 'express';
import { sendError, sendSuccess } from '@libs/response';
import { encryptPassword } from '@libs/crypto';
import UserModel from '@models/users';
import { Op } from 'sequelize';

class UserController {
  public async list(req: Request, res: Response) {
    try {
      const page: number = parseInt(req.query.page ? req.query.page.toString() : '1');
      const pageSize: number = parseInt(req.query.pageSize ? req.query.pageSize.toString() : '20');
      const cursor: number = (page - 1) * pageSize;
      const username: any = req.query.username ? req.query.username : null;

      // const where = Object.assign({},
      //   username == null ? null : { username: { [Op.like]: `%${username.trim()}%` } },
      //   req.query.status == null ? null : { status: req.query.status },
      // );
      const { rows, count } = await UserModel.findAndCountAll({
        paranoid: false,
        // where,
        attributes: ['id',

          'username',
          'luong',
          'ninja',
          'topsk',
          'nap',
          'clanTerritoryId',
          'coin',
          'coin_old',
          'status',
          'phone',
          'nickname',
          'email',
          'nhomkhachhang',
          'ngaythamgia',

          'tongnap',
          'tongthang',
          'isOnline',
          'DiemDanh',
          'newAccount',
          'VND',
          'vip',
          'role',
          'lock',],
        order: [
          ['ngaythamgia', 'DESC'],
        ],
        limit: pageSize,
        offset: cursor,
      });
      const responseData: any = {
        data: rows,
        pagination: {
          page: page,
          pageSize: pageSize,
          total: count,
        },
      };
      sendSuccess(res, responseData);
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const existUser = await UserModel.findByPk(req.params.id);
      if (existUser) {
        return sendSuccess(res, { message: 'Existed User' });
      }
      // delete existUser.password;
      sendSuccess(res, { user: existUser });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const newUser = req.body;
      const existUser = await UserModel.findOne({ where: { username: newUser.username } });
      if (existUser) {
        return sendSuccess(res, { message: 'Existed User' });
      }
      newUser.password = encryptPassword(newUser.password);
      await UserModel.create(newUser);
      sendSuccess(res, { user: newUser });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const newUser = req.body;
      const existUser = await UserModel.findByPk(req.params.id);
      if (!existUser) {
        return sendError(res, 404, 'no data');
      }
      if (newUser.password) {
        newUser.password = encryptPassword(newUser.password);
      }
      delete newUser.username;
      await existUser.update(newUser);
      delete newUser.password;
      sendSuccess(res, { user: newUser });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const newUser = req.body;
      const existUser = await UserModel.findByPk(req.params.id);
      if (!existUser) {
        return sendError(res, 404, 'no data');
      }
      await existUser.destroy();
      sendSuccess(res, { user: newUser });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new UserController();
