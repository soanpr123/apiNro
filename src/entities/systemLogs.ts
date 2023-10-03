import { LOG_TARGET } from '@libs/constants';
import { DataTypes } from 'sequelize';

const SystemLogEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  targetName: {
    type: DataTypes.ENUM({ values: Object.values(LOG_TARGET) }),
  },
  message: {
    type: DataTypes.TEXT,
  },
  type: {
    type: DataTypes.STRING(255),
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default SystemLogEntity;
