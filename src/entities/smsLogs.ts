import { DataTypes } from 'sequelize';

const SmsLogEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  transferMessage: {
    type: DataTypes.TEXT,
  },
  transferAmount: {
    type: DataTypes.INTEGER,
  },
  transferId: {
    type: DataTypes.STRING,
  },
  serverReference: {
    type: DataTypes.STRING,
  },
  partnerReference: {
    type: DataTypes.STRING,
  },
  targetAccName: {
    type: DataTypes.STRING,
  },
  targetAccNo: {
    type: DataTypes.STRING,
  },
  code: {
    type: DataTypes.INTEGER,
  },
  signature: {
    type: DataTypes.TEXT,
  },
  statusCallBack: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  uniqueSms: {
    type: DataTypes.STRING,
  },
  bankId: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default SmsLogEntity;
