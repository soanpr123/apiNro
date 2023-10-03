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
  transferId: {
    type: DataTypes.STRING(255),
  },
  requestId: {
    type: DataTypes.STRING(255),
  },
  partnerReference: {
    type: DataTypes.STRING(255),
  },
  note: {
    type: DataTypes.TEXT,
  },
  bankId: {
    type: DataTypes.INTEGER,
  },
  bankAccNumber: {
    type: DataTypes.STRING(255),
  },
  bankAccName: {
    type: DataTypes.STRING(255),
  },
  transferAmount: {
    type: DataTypes.INTEGER,
  },
  transferMessage: {
    type: DataTypes.STRING(255),
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
