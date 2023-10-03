import { Model, ModelScopeOptions, Op, Sequelize } from 'sequelize';
import SystemLogEntity from '@entities/systemLogs';
import SystemLogInterface from '@interfaces/systemLogs';
import UserModel from './users';

class SystemLogModel extends Model<SystemLogInterface> implements SystemLogInterface {
  public id: number;
  public UserId: number;
  public targetName: string;
  public message: string;
  public type: string;
  public createdAt: string;
  public updatedAt: string;

  static readonly scopes: ModelScopeOptions = {
    bySearchKey (searchKey) {
      return {
        where: {
          name: { [Op.substring]: searchKey },
        },
      };
    },
  }

  public static initialize (sequelize: Sequelize) {
    this.init(SystemLogEntity, {
      tableName: 'system_logs',
      scopes: SystemLogModel.scopes,
      sequelize,
    });
  }

  public static associate () {
    this.belongsTo(UserModel, { as: 'User', foreignKey: 'UserId' });
  }
}

export default SystemLogModel;
