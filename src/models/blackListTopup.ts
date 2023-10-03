import { Model, Sequelize } from 'sequelize';
import BlackListTopupEntity from '@entities/blackListTopup';
import BlackListTopupInterface from '@interfaces/blackListTopup';

class BlackListTopupModel extends Model<BlackListTopupInterface> implements BlackListTopupInterface {
  public id: number;
  public UserId: string;
  public partnerReference: string;
  public bankAccNumber: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  public static initialize (sequelize: Sequelize) {
    this.init(BlackListTopupEntity, {
      tableName: 'black_list_topup',
      sequelize,
    });
  }

  public static associate () { }
}

export default BlackListTopupModel;
