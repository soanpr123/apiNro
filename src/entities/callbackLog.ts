import { DataTypes } from 'sequelize';

const SystemLogEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  url: {
    type: DataTypes.STRING(500),
  },
  status: {
    type: DataTypes.STRING(255),
  },
  payload: {
    type: DataTypes.TEXT,
  },
  response: {
    type: DataTypes.TEXT,
  },
  type: {
    type: DataTypes.STRING(255),
  },
  message: {
    type: DataTypes.STRING(500),
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default SystemLogEntity;
