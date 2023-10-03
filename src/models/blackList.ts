import { Model, Sequelize } from 'sequelize';
import BlackListEntity from '@entities/blackList';
import BlackListInterface from '@interfaces/blackList';

class BlackListModel extends Model<BlackListInterface> implements BlackListInterface {
  public id: number;
  public UserId: string;
  public partnerReference: string;
  public bankAccNumber: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  public static initialize (sequelize: Sequelize) {
    this.init(BlackListEntity, {
      tableName: 'black_list',
      sequelize,
    });
  }

  public static associate () { }
}

export default BlackListModel;
