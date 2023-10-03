interface HistorySummaryInterface {
  id: number,
  UserId: number,
  type: string,
  date: string,

  totalTopup: number,
  countNickNameTopup: number,
  countRequestTopup: number,

  totalWithdraw: number,
  countNickNameWithdraw: number,
  countRequestWithdraw: number,

  createdAt: Date,
  updatedAt: Date,
};

export default HistorySummaryInterface;
