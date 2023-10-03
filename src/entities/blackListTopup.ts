import { DataTypes } from 'sequelize';

const BlackListTopupEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  partnerReference: {
    type: DataTypes.STRING(255),
  },
  bankAccNumber: {
    type: DataTypes.STRING(255),
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default BlackListTopupEntity;
