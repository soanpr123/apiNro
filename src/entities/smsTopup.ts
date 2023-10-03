import { DataTypes } from 'sequelize';

const SmsTopupEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  topupId: {
    type: DataTypes.INTEGER,
  },
  content: {
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
  bankId: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING(255),
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default SmsTopupEntity;
