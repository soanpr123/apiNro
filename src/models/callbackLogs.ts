import { Model, Sequelize } from 'sequelize';
import CallbackLogEntity from '@entities/callbackLog';
import CallbackLogInterface from '@interfaces/callbackLog';
import UserModel from './users';

class CallbackLogModel extends Model<CallbackLogInterface> implements CallbackLogInterface {
  public id: number;
  public UserId: number;
  public url: string;
  public status: string;
  public payload: string;
  public response: string;
  public type: string;
  public message: string;
  public createdAt: string;
  public updatedAt: string;

  public static initialize (sequelize: Sequelize) {
    this.init(CallbackLogEntity, {
      tableName: 'callback_logs',
      paranoid: false,
      sequelize,
    });
  }

  public static associate () {
    this.belongsTo(UserModel, { as: 'User', foreignKey: 'UserId' });
  }
}

export default CallbackLogModel;
