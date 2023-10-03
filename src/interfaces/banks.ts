interface BankInterface {
  id: number;
  UserId: number;
  type: string;
  bankAccNumber: string;
  bankAccName: string;
  bankName: string;
  bankSlug: string;
  regexName: string;
  regexAmount: string;
  regexOrderId: string;
  callBackUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  bankFullName: string;
  bankCodeBIN: string;
  accBalance: number;
  bankBranchName: string;
  statusTopup: string;
  statusWithdraw: string;
  statusWithdrawAuto: string;
  indexResult: number;
};

export default BankInterface;
