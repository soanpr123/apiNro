import { Model, Sequelize } from 'sequelize';
import BankOfficialEntity from '@entities/bankOfficial';
import BankOfficialInterface from '@interfaces/bankOfficial';
import AccountBankModel from './accountBank';

class BankOfficialModel extends Model<BankOfficialInterface> implements BankOfficialInterface {
  public id: number;
  public bankFullName: string;
  public bankBID: string;
  public bankName: string;
  public bankCode: string;

  public regexTopupAmount: string;
  public regexTopupPartnerRef: string;
  public regexTopupPartnerRefIndex: number;

  public regexIBTopupPartnerRef: string;
  public regexIBTopupPartnerRefIndex: number;

  public regexWithdrawAmount: string;
  public regexWithdrawTransId: string;
  public regexWithdrawTransIdIndex: number;

  public statusShowWithdraw: string;

  public order: number;

  public static initialize (sequelize: Sequelize) {
    this.init(BankOfficialEntity, {
      tableName: 'm_bank',
      paranoid: false,
      sequelize,
    });
  }

  public static associate () {
    this.hasMany(AccountBankModel, { as: 'Accounts', foreignKey: 'bankId' });
  }
}

export default BankOfficialModel;
