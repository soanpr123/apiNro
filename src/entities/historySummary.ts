import { DataTypes } from 'sequelize';

const HistorySummary = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  type: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  totalTopup: {
    type: DataTypes.INTEGER,
  },
  countNickNameTopup: {
    type: DataTypes.INTEGER,
  },
  countRequestTopup: {
    type: DataTypes.INTEGER,
  },
  totalWithdraw: {
    type: DataTypes.INTEGER,
  },
  countNickNameWithdraw: {
    type: DataTypes.INTEGER,
  },
  countRequestWithdraw: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default HistorySummary;
