import { USER_ROLES } from '@libs/constants';
import { DataTypes } from 'sequelize';

const UserEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  luong: {
    type: DataTypes.INTEGER,
  },
  ninja: {
    type: DataTypes.STRING,
  },
  topsk: {
    type: DataTypes.INTEGER,
  },
  nap: {
    type: DataTypes.INTEGER,
  },
  clanTerritoryId: {
    type: DataTypes.INTEGER,
  },
  coin: {
    type: DataTypes.STRING,
  },
  coin_old: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.INTEGER,
  },
  phone: {
    type: DataTypes.STRING,
  },
  nickname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  nhomkhachhang: {
    type: DataTypes.STRING,
  },
  ngaythamgia: {
    type: DataTypes.STRING,
  },

  tongnap: {
    type: DataTypes.INTEGER,
  },
  tongthang: {
    type: DataTypes.INTEGER,
  },
  isOnline: {
    type: DataTypes.INTEGER,
  },
  DiemDanh: {
    type: DataTypes.INTEGER,
  },
  newAccount: {
    type: DataTypes.INTEGER,
  },
  VND: {
    type: DataTypes.INTEGER,
  },
  vip: {
    type: DataTypes.INTEGER,
  },
  role: {
    type: DataTypes.STRING,
  },
  lock: {
    type: DataTypes.INTEGER,
  },
};

export default UserEntity;
