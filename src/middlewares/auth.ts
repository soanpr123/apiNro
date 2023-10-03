import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ERROR_CODES } from '@libs/constants';
import UserModel from '@models/users';
import WhiteListIpModel from '@models/whiteListIp';
import { decryptStringWithRsaPrivateKey } from '@libs/crypto';

export const apiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = req.header('Authorization').replace('Bearer ', '');
    const user = await UserModel.findOne({
      where: {
        // apiKey,
        // type: 'client',
        status: 'active',
      },
    });
    if (user == null) {
      return res.status(401).send({ code: ERROR_CODES.InvalidOrExpiredToken });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      error: 'Not authorized to access this resource',
      code: ERROR_CODES.SomeErrorsOccurredPleaseTryAgain,
    });
  }
};

export const allowIP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ipEncrypt = req.headers['x-client-ip'];
    const ipDecrypt = decryptStringWithRsaPrivateKey(ipEncrypt as string);
    const allowIp = await WhiteListIpModel.findOne({ where: { ip: ipDecrypt } });
    if (!allowIp) {
      return res.status(401).send({
        error: 'Not allow client to access this resource',
        code: ERROR_CODES.SomeErrorsOccurredPleaseTryAgain,
      });
    }
    next();
  } catch (error) {
    res.status(401).send({
      error: 'Not authorized to access this resource',
      code: ERROR_CODES.SomeErrorsOccurredPleaseTryAgain,
    });
  }
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check IP
    // const ipEncrypt = req.headers['x-client-ip'];
    // const ipDecrypt = decryptStringWithRsaPrivateKey(ipEncrypt as string);
    // const allowIp = await WhiteListIpModel.findOne({ where: { ip: ipDecrypt } });
    // if (!allowIp) {
    //   return res.status(401).send({
    //     error: 'Not allow client to access this resource',
    //     code: ERROR_CODES.SomeErrorsOccurredPleaseTryAgain,
    //   });
    // }

    const token = req.header('Authorization').replace('Bearer ', '');
    const payload: any = jwt.verify(token, process.env.JWT_KEY);
    console.log("id " + payload);
    const user: any = await UserModel.findOne({
      where: {
        id: payload.id,
        status: 'active',
        role: ['admin'],
      },
    });
    if (user == null) {
      return res.status(401).send({ code: ERROR_CODES.InvalidOrExpiredToken });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      error: 'Not authorized to access this resource ' + error,
      code: ERROR_CODES.SomeErrorsOccurredPleaseTryAgain,
    });
  }
};
