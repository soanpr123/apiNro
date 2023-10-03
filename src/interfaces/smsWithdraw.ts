interface SmsWithdrawInterface {
  id: number;
  UserId: number,
  withDrawId: number,
  content: string,
  transferAmount: number,
  transferId: string,
  partnerReference: string,
  bankAccNumber: string,
  bankId: number,
  status: string,
  createdAt?: Date,
  updatedAt?: Date,
};

export default SmsWithdrawInterface;
