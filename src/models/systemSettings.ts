import { Model, Sequelize } from 'sequelize';
import SystemLogEntity from '@entities/systemSettings';
import SystemLogInterface from '@interfaces/systemSettings';

class SystemSettingsModel extends Model<SystemLogInterface> implements SystemLogInterface {
  public id: number;
  public key: string;
  public value: string;
  public createdAt: string;
  public updatedAt: string;

  public static initialize (sequelize: Sequelize) {
    this.init(SystemLogEntity, {
      tableName: 'system_settings',
      timestamps: false,
      sequelize,
    });
  }

  public static associate () {
  }
}

export default SystemSettingsModel;
