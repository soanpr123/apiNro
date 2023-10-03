import { DataTypes } from 'sequelize';

const TopupEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  AdminId: {
    type: DataTypes.INTEGER,
  },
  bankId: {
    type: DataTypes.INTEGER,
  },
  accBankId: {
    type: DataTypes.INTEGER,
  },
  note: {
    type: DataTypes.TEXT,
  },
  transferId: {
    type: DataTypes.STRING(255),
  },
  requestId: {
    type: DataTypes.STRING(255),
  },
  partnerReference: {
    type: DataTypes.STRING(255),
  },
  transferMessage: {
    type: DataTypes.STRING(255),
  },
  transferAmount: {
    type: DataTypes.INTEGER,
  },
  requestAmount: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING(255),
  },
  statusTransfer: {
    type: DataTypes.STRING(255),
  },
  statusCallback: {
    type: DataTypes.STRING(255),
  },
  bankTransactionId: {
    type: DataTypes.STRING(255),
  },
  hourUpdatedAt: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default TopupEntity;
