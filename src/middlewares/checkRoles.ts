import { Request, Response, NextFunction } from 'express';
import { ERROR_CODES, USER_ROLES } from '@libs/constants';

export const hasRole = (roleRequest: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const userRoleIndex = USER_ROLES.findIndex((x) => x === user.role);
      const roleRequestIndex = USER_ROLES.findIndex((x) => x === roleRequest);
      if (roleRequestIndex >= 0) {
        switch (user.role) {
          case 'root':
            break;
          case 'admin':
            if (userRoleIndex > roleRequestIndex) {
              return res.status(403).send({
                error: 'Not permision to access this resource 1',
                code: ERROR_CODES.SomeErrorsOccurredPleaseTryAgain,
              });
            }
            break;
          case 'mod':
            if (userRoleIndex > roleRequestIndex) {
              return res.status(403).send({
                error: 'Not permision to access this resource 2',
                code: ERROR_CODES.SomeErrorsOccurredPleaseTryAgain,
              });
            }
            break;
          case 'client':
            if (USER_ROLES.findIndex((x) => x === 'mod') > roleRequestIndex) {
              return res.status(403).send({
                error: 'Not permision to access this resource client',
                code: ERROR_CODES.SomeErrorsOccurredPleaseTryAgain,
              });
            }
            break;
          default:
            if (user.type !== roleRequest) {
              return res.status(403).send({
                error: 'Not permision to access this resource 3',
                code: ERROR_CODES.SomeErrorsOccurredPleaseTryAgain,
              });
            }
            break;
        }
        req.user = user;
        next();
      } else {
        return res.status(403).send({
          error: 'Not permision to access this resource 4',
          code: ERROR_CODES.SomeErrorsOccurredPleaseTryAgain,
        });
      }
    } catch (error) {
      res.status(403).send({
        error: 'Not authorized to access this resource 5',
        code: ERROR_CODES.SomeErrorsOccurredPleaseTryAgain,
      });
    }
  };
};
