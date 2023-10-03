interface BankOfficialInterface {
  id: number,
  bankFullName: string,
  bankBID: string,
  bankName: string,
  bankCode: string,
  regexTopupAmount: string,
  regexTopupPartnerRef: string,
  regexTopupPartnerRefIndex: number,
  regexIBTopupPartnerRef: string;
  regexIBTopupPartnerRefIndex: number;
  regexWithdrawAmount: string,
  regexWithdrawTransId: string,
  statusShowWithdraw: string,
  regexWithdrawTransIdIndex: number,
  order: number,
};

export default BankOfficialInterface;
