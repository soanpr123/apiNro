import { DataTypes } from 'sequelize';

const SystemSettingsEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  key: {
    type: DataTypes.STRING(255),
  },
  value: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default SystemSettingsEntity;
