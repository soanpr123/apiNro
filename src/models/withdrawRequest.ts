import { Model, Sequelize } from 'sequelize';
import WithdrawEntity from '@entities/withdrawRequest';
import WithdrawInterface from '@interfaces/withdrawRequest';
import { ModelHooks } from 'sequelize/types/hooks';
import { LOG_TARGET, WITHDRAW_STATUS } from '@libs/constants';
import moment from 'moment-timezone';
import { notiRequestWithdraw } from '@libs/telegramBot';
import BankOfficialModel from './banks';
import UserModel from './users';
import SmsWithdrawModel from './smsWithdraw';
import SystemLogModel from './systemLogs';

class WithdrawModel extends Model<WithdrawInterface> implements WithdrawInterface {
  public id: number;
  public UserId: number;
  public AdminId: number;

  public transferId: string;
  public requestId: string;
  public partnerReference: string;
  public note: string;

  public bankId: number;
  public bankAccNumber: string;
  public bankAccName: string;
  public transferAmount: number;
  public transferMessage: string;

  public status: string;
  public statusTransfer: string;
  public statusCallback: string;
  public hourUpdatedAt: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  public static initialize (sequelize: Sequelize) {
    this.init(WithdrawEntity, {
      tableName: 'withdraw_request',
      hooks: WithdrawModel.hooks,
      sequelize,
    });
  }

  static readonly hooks: Partial<ModelHooks<WithdrawModel>> = {
    async afterCreate (record, option) {
      // Save log
      const newLog: any = {
        UserId: -1,
        targetName: LOG_TARGET.REQUEST_WITHDRAW,
        message: JSON.stringify({ id: record.id, clientIp: '', after: record }),
        type: 'created',
      };
      await SystemLogModel.create(newLog);

      if (record.status === WITHDRAW_STATUS.PENDDING) {
      // Noti
        notiRequestWithdraw(`
NickName: ${record.partnerReference}
Số tiền: <b>${record.transferAmount.toLocaleString()} đ</b>
Số tài khoản: ${record.bankAccNumber} 
Tên tài khoản: ${record.bankAccName}
=========================
Yêu cầu rút mới
`, record.transferAmount);
      }
    },
    beforeCreate: (record, options) => {
      record.hourUpdatedAt = parseInt(moment().tz('Asia/Ho_Chi_Minh').format('HH'));
    },
    beforeUpdate: (record, options) => {
      record.hourUpdatedAt = parseInt(moment().tz('Asia/Ho_Chi_Minh').format('HH'));
    },
  }

  public static associate () {
    this.belongsTo(BankOfficialModel, { as: 'Bank', foreignKey: 'bankId' });
    this.belongsTo(UserModel, { as: 'Admin', foreignKey: 'AdminId' });
    this.hasMany(SmsWithdrawModel, { as: 'SmsWithdraw', foreignKey: 'withDrawId' });
  }
}

export default WithdrawModel;
