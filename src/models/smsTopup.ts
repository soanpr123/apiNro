import { Model, Sequelize } from 'sequelize';
import SmsTopupEntity from '@entities/smsTopup';
import SmsTopupInterface from '@interfaces/smsTopup';
import BankOfficialModel from './banks';
import TopupRequestModel from './topupRequest';

class SmsTopupModel extends Model<SmsTopupInterface> implements SmsTopupInterface {
  public id: number;
  public UserId: number;
  public topupId: number;
  public content: string;
  public transferAmount: number;
  public transferId: string;
  public partnerReference: string;
  public bankAccNumber: string;
  public bankId: number;
  public status: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  public static initialize (sequelize: Sequelize) {
    this.init(SmsTopupEntity, {
      tableName: 'sms_topup',
      sequelize,
      paranoid: false,
    });
  }

  public static associate () {
    this.belongsTo(BankOfficialModel, { as: 'Bank', foreignKey: 'bankId' });
    this.belongsTo(TopupRequestModel, { as: 'TopupRequest', foreignKey: 'topupId' });
  }
}

export default SmsTopupModel;
