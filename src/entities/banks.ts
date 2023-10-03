import { DataTypes } from 'sequelize';

const BankEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  type: {
    type: DataTypes.STRING,
  },
  bankAccNumber: {
    type: DataTypes.STRING,
  },
  bankAccName: {
    type: DataTypes.STRING,
  },
  bankName: {
    type: DataTypes.STRING,
  },
  bankSlug: {
    type: DataTypes.STRING,
  },
  regexName: {
    type: DataTypes.STRING,
  },
  regexAmount: {
    type: DataTypes.STRING,
  },
  regexOrderId: {
    type: DataTypes.STRING,
  },
  callBackUrl: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  indexResult: {
    type: DataTypes.INTEGER,
  },
  bankFullName: {
    type: DataTypes.STRING,
  },
  bankCodeBIN: {
    type: DataTypes.STRING,
  },
  accBalance: {
    type: DataTypes.INTEGER,
  },
  bankBranchName: {
    type: DataTypes.STRING,
  },
  statusTopup: {
    type: DataTypes.STRING,
  },
  statusWithdraw: {
    type: DataTypes.STRING,
  },
  statusWithdrawAuto: {
    type: DataTypes.STRING,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
};

export default BankEntity;
