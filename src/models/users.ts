import { Model, Sequelize } from 'sequelize';
import UserEntity from '@entities/users';
import UserInterface from '@interfaces/users';

class UserModel extends Model<UserInterface> implements UserInterface {
  public id: number;

  public username: string;
  public password: string;
  public luong: number;
  public ninja: string;
  public topsk: number;
  public nap: number;
  public clanTerritoryId: number;
  public coin: string;
  public coin_old: string;
  public status: number;
  public phone?: string;
  public nickname?: string;
  public email?: string;
  public nhomkhachhang: string;
  public ngaythamgia: string;

  public tongnap?: number;
  public tongthang?: number;
  public isOnline?: number;
  public DiemDanh?: number;
  public newAccount: number;
  public VND: number;
  public vip: number;
  public role: string;
  public lock: number;

  public static initialize(sequelize: Sequelize) {
    this.init(UserEntity, {
      tableName: 'player',
      sequelize,
    });
  }

  public static associate() { }
}

export default UserModel;
