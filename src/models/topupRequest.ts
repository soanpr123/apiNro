import { Model, Sequelize } from 'sequelize';
import TopupRequestEntity from '@entities/topupRequest';
import TopupRequestInterface from '@interfaces/topupRequest';
import { ModelHooks } from 'sequelize/types/hooks';
import { LOG_TARGET } from '@libs/constants';
import moment from 'moment-timezone';
import AccountBankModel from './accountBank';
import SmsTopupModel from './smsTopup';
import SystemLogModel from './systemLogs';

class TopupRequestModel extends Model<TopupRequestInterface> implements TopupRequestInterface {
  public id: number;
  public UserId: number;
  public AdminId: number;

  public bankId: number;
  public accBankId: number;
  public note: string;
  public transferId: string;

  public requestId: string;
  public partnerReference: string;
  public transferMessage: string;
  public transferAmount: number;
  public requestAmount: number;

  public status: string;
  public statusTransfer: string;
  public statusCallback: string;

  public bankTransactionId: string;

  public hourUpdatedAt: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  public static initialize (sequelize: Sequelize) {
    this.init(TopupRequestEntity, {
      tableName: 'topup_request',
      hooks: TopupRequestModel.hooks,
      sequelize,
    });
  }

  static readonly hooks: Partial<ModelHooks<TopupRequestModel>> = {
    async afterCreate (record, option) {
      // Save log
      if (record.AdminId < 0) {
        const newLog: any = {
          UserId: -1,
          targetName: LOG_TARGET.REQUEST_TOPUP,
          message: JSON.stringify({ id: record.id, clientIp: '', after: record }),
          type: 'created',
        };
        await SystemLogModel.create(newLog);
      }
    },
    beforeCreate (record, options) {
      record.hourUpdatedAt = parseInt(moment().tz('Asia/Ho_Chi_Minh').format('HH'));
    },
    beforeUpdate: (record, options) => {
      record.hourUpdatedAt = parseInt(moment().tz('Asia/Ho_Chi_Minh').format('HH'));
    },
  }

  public static associate () {
    this.belongsTo(AccountBankModel, { as: 'AccBank', foreignKey: 'accBankId' });
    this.hasOne(SmsTopupModel, { as: 'SmsTopup', foreignKey: 'topupId' });
  }
}

export default TopupRequestModel;
