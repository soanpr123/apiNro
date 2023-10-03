import { DataTypes } from 'sequelize';

const BankOfficialEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  bankFullName: {
    type: DataTypes.STRING(255),
  },
  bankBID: {
    type: DataTypes.STRING(255),
  },
  bankName: {
    type: DataTypes.STRING(255),
  },
  bankCode: {
    type: DataTypes.STRING(255),
  },
  regexTopupAmount: {
    type: DataTypes.STRING(255),
  },
  regexTopupPartnerRef: {
    type: DataTypes.STRING(255),
  },
  regexTopupPartnerRefIndex: {
    type: DataTypes.INTEGER,
  },
  regexIBTopupPartnerRef: {
    type: DataTypes.STRING(255),
  },
  regexIBTopupPartnerRefIndex: {
    type: DataTypes.INTEGER,
  },
  regexWithdrawAmount: {
    type: DataTypes.STRING(255),
  },
  regexWithdrawTransId: {
    type: DataTypes.STRING(255),
  },
  statusShowWithdraw: {
    type: DataTypes.STRING(255),
  },
  regexWithdrawTransIdIndex: {
    type: DataTypes.INTEGER,
  },
  order: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default BankOfficialEntity;
