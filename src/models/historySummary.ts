import { Model, Sequelize } from 'sequelize';
import HistorySummaryEntity from '@entities/historySummary';
import HistorySummaryInterface from '@interfaces/historySummary';

class HistorySummaryModel extends Model<HistorySummaryInterface> implements HistorySummaryInterface {
  public id: number;
  public UserId: number;
  public type: string;
  public date: string;

  public totalTopup: number;
  public countNickNameTopup: number;
  public countRequestTopup: number;

  public totalWithdraw: number;
  public countNickNameWithdraw: number;
  public countRequestWithdraw: number;

  public createdAt: Date;
  public updatedAt: Date;

  public static initialize (sequelize: Sequelize) {
    this.init(HistorySummaryEntity, {
      tableName: 'history_summary',
      paranoid: false,
      sequelize,
    });
  }

  public static associate () {
  }
}

export default HistorySummaryModel;
