import { DataTypes } from 'sequelize';

const BankAccountEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  bankId: {
    type: DataTypes.INTEGER,
  },

  bankAccName: {
    type: DataTypes.STRING(255),
  },
  bankAccNumber: {
    type: DataTypes.STRING(255),
  },
  bankAccBalance: {
    type: DataTypes.INTEGER,
  },
  bankBranchName: {
    type: DataTypes.STRING(255),
  },

  regexTopupPartnerRef: {
    type: DataTypes.STRING(255),
  },
  regexTopupPartnerRefIndex: {
    type: DataTypes.INTEGER,
  },

  regexWithdrawTransId: {
    type: DataTypes.STRING(255),
  },
  regexWithdrawTransIdIndex: {
    type: DataTypes.INTEGER,
  },

  cashOutLimit: {
    type: DataTypes.INTEGER,
  },
  cashOutBankId: {
    type: DataTypes.STRING(255),
  },
  cashOutNumber: {
    type: DataTypes.STRING(255),
  },
  errorMessage: {
    type: DataTypes.STRING(255),
  },

  partnerPrefix: {
    type: DataTypes.STRING(255),
  },

  status: {
    type: DataTypes.STRING(255),
  },
  type: {
    type: DataTypes.STRING(255),
  },

  username: {
    type: DataTypes.STRING(255),
  },
  password: {
    type: DataTypes.STRING(255),
  },

  workerTopupMethod: {
    type: DataTypes.STRING(255),
    default: 'sms',
  },

  callBackUrl: {
    type: DataTypes.STRING(255),
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
};

export default BankAccountEntity;
