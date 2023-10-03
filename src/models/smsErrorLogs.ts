import { Model, Sequelize } from 'sequelize';
import SmsErrorLogEntity from '@entities/smsErrorLogs';
import SmsErrorLogInterface from '@interfaces/smsErrorLogs';
import BankOfficialModel from './banks';

class SmsErrorLogModel extends Model<SmsErrorLogInterface> implements SmsErrorLogInterface {
  public id: number;
  public UserId: string;
  public transferMessage: string;
  public bankId: number;
  public partnerReference: string;
  public transferAmmount: number;
  public bankAccNumber: string;
  public bankAccBalance: number;
  public type: string;
  public phoneReceive: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  public static initialize (sequelize: Sequelize) {
    this.init(SmsErrorLogEntity, {
      tableName: 'sms_error_logs',
      sequelize,
    });
  }

  public static associate () {
    this.belongsTo(BankOfficialModel, { as: 'Bank', foreignKey: 'bankId' });
  }
}

export default SmsErrorLogModel;
