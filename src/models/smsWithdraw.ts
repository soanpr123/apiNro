import { Model, Sequelize } from 'sequelize';
import SmsWithdrawEntity from '@entities/smsWithdraw';
import SmsWithdrawInterface from '@interfaces/smsWithdraw';
import BankOfficialModel from './banks';
import WithdrawModel from './withdrawRequest';

class SmsWithdrawModel extends Model<SmsWithdrawInterface> implements SmsWithdrawInterface {
  public id: number;
  public UserId: number;
  public withDrawId: number;
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
    this.init(SmsWithdrawEntity, {
      tableName: 'sms_withdraw',
      sequelize,
    });
  }

  public static associate () {
    this.belongsTo(BankOfficialModel, { as: 'Bank', foreignKey: 'bankId' });
    this.belongsTo(WithdrawModel, { as: 'WithdrawRequest', foreignKey: 'withDrawId' });
  }
}

export default SmsWithdrawModel;
