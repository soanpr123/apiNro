import { DataTypes } from 'sequelize';

const WithdrawLogEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  AdminId: {
    type: DataTypes.INTEGER,
  },
  note: {
    type: DataTypes.TEXT,
  },
  transferMessage: {
    type: DataTypes.STRING(255),
  },
  transferAmount: {
    type: DataTypes.INTEGER,
  },
  transferId: {
    type: DataTypes.STRING(255),
  },
  partnerReference: {
    type: DataTypes.STRING(255),
  },
  bankAccNumber: {
    type: DataTypes.STRING(255),
  },
  bankAccName: {
    type: DataTypes.STRING(255),
  },
  bankId: {
    type: DataTypes.STRING(255),
  },
  status: {
    type: DataTypes.STRING(255),
  },
  statusTransfer: {
    type: DataTypes.STRING(255),
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default WithdrawLogEntity;
