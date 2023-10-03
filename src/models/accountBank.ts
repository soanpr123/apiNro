import { Model, Sequelize } from 'sequelize';
import AccountBankEntity from '@entities/accountBank';
import AccountBankInterface from '@interfaces/accountBank';
import BankOfficialModel from './banks';

class AccountBankModel extends Model<AccountBankInterface> implements AccountBankInterface {
  public id: number;
  public UserId: number;
  public bankId: number;

  public bankAccName: string;
  public bankAccNumber: string;
  public bankAccBalance: number;
  public bankBranchName: string;

  public regexTopupPartnerRef: string;
  public regexTopupPartnerRefIndex: number;

  public regexWithdrawTransId: string;
  public regexWithdrawTransIdIndex: number;

  public cashOutLimit: number;
  public cashOutBankId: string;
  public cashOutNumber: string;
  public errorMessage: string;

  public partnerPrefix: string;

  public type: string;
  public status: string;

  public username: string;
  public password: string;

  public workerTopupMethod: string;

  public callBackUrl: string;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string;

  public static initialize (sequelize: Sequelize) {
    this.init(AccountBankEntity, {
      tableName: 'account_bank',
      paranoid: true,
      sequelize,
    });
  }

  public static associate () {
    this.belongsTo(BankOfficialModel, { as: 'BankInfo', foreignKey: 'bankId' });
  }
}

export default AccountBankModel;
