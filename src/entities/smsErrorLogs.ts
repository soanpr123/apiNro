import { DataTypes } from 'sequelize';

const SmsErrorLogEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  transferMessage: {
    type: DataTypes.TEXT,
  },
  bankId: {
    type: DataTypes.INTEGER,
  },
  partnerReference: {
    type: DataTypes.STRING(255),
  },
  transferAmmount: {
    type: DataTypes.INTEGER,
  },
  bankAccNumber: {
    type: DataTypes.STRING(255),
  },
  bankAccBalance: {
    type: DataTypes.INTEGER,
  },
  type: {
    type: DataTypes.STRING(255),
  },
  phoneReceive: {
    type: DataTypes.STRING(255),
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default SmsErrorLogEntity;
