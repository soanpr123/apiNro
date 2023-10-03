import { DataTypes } from 'sequelize';

const WhiteListIpEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
  },
  ip: {
    type: DataTypes.STRING(255),
  },
  note: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default WhiteListIpEntity;
