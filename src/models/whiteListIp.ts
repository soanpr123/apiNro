import { Model, Sequelize } from 'sequelize';
import WhiteListIpEntity from '@entities/whiteListIp';
import WhiteListIpInterface from '@interfaces/whiteListIp';

class WhiteListIpModel extends Model<WhiteListIpInterface> implements WhiteListIpInterface {
  public id: number;
  public name: string;
  public ip: string;
  public note: string;
  public createdAt: string;
  public updatedAt: string;

  public static initialize (sequelize: Sequelize) {
    this.init(WhiteListIpEntity, {
      tableName: 'white_list_ip',
      timestamps: false,
      sequelize,
    });
  }

  public static associate () {
  }
}

export default WhiteListIpModel;
