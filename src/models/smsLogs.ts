import { Model, Sequelize } from 'sequelize';
import SmsLogEntity from '@entities/smsLogs';
import SmsLogInterface from '@interfaces/smsLogs';
import BankModel from './banks';

class SmsLogModel extends Model<SmsLogInterface> implements SmsLogInterface {
  public id: number;
  public UserId: string;
  public transferMessage: string;
  public transferAmount: number;
  public transferId: string;
  public serverReference: string;
  public partnerReference: string;
  public targetAccName: string;
  public targetAccNo: string;
  public code: number;
  public signature: string;
  public statusCallBack: string;
  public status: string;
  public uniqueSms: string;
  public bankId: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  public static initialize (sequelize: Sequelize) {
    this.init(SmsLogEntity, {
      tableName: 'sms_logs',
      sequelize,
    });
  }

  public static associate () {
    this.belongsTo(BankModel, { as: 'bankAcc', foreignKey: 'bankId' });
  }
}

export default SmsLogModel;
