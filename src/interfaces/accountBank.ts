interface AccountBankInterface {
  id: number,
  UserId: number,
  bankId: number,

  bankAccName: string,
  bankAccNumber: string,
  bankAccBalance: number,
  bankBranchName: string,

  regexTopupPartnerRef: string,
  regexTopupPartnerRefIndex: number,

  regexWithdrawTransId: string,
  regexWithdrawTransIdIndex: number,

  cashOutLimit: number;
  cashOutBankId: string;
  cashOutNumber: string;
  errorMessage: string;

  partnerPrefix: string,

  status: string,
  type: string,

  username: string,
  password: string,

  workerTopupMethod: string,

  callBackUrl: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
};

export default AccountBankInterface;
