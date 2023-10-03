import { Response } from 'express';
import { ValidationError } from 'sequelize';
import { getConsoleLogger } from '@libs/consoleLogger';
import { FailValidation } from './errors';

const errorLogger = getConsoleLogger('errorLogging');
const socketOutboundLogger = getConsoleLogger('inboundLogging');
errorLogger.addContext('requestType', 'HttpLogging');
socketOutboundLogger.addContext('requestType', 'SocketLogging');

export const sendSuccess = (res: Response, data: { [key: string]: any }, message: string = '') => {
  res.status(200).json({ message, data });
};

export const sendError = (res: Response, code: number, error: any, errorSubject: Error = undefined) => {
  if (errorSubject) errorLogger.error(errorSubject);
  if (errorSubject instanceof ValidationError) {
    return res.status(422).json({ error: FailValidation((errorSubject.errors)) });
  };
  res.status(code).json({ error });
};
