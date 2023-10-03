import { Model, Sequelize } from 'sequelize';
import WithdrawLogEntity from '@entities/withdrawLog';
import WithdrawLogInterface from '@interfaces/withdrawLog';

class WithdrawLogModel extends Model<WithdrawLogInterface> implements WithdrawLogInterface {
  public id: number;
  public UserId: number;
  public AdminId: number;
  public note: string;
  public transferMessage: string;
  public transferAmount: number;
  public transferId: string;
  public partnerReference: string;
  public bankAccNumber: string;
  public bankAccName: string;
  public bankId: string;
  public status: string;
  public statusTransfer: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  public static initialize (sequelize: Sequelize) {
    this.init(WithdrawLogEntity, {
      tableName: 'withdraw_log',
      sequelize,
    });
  }

  public static associate () { }
}

export default WithdrawLogModel;
