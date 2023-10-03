interface SmsLogInterface {
  id: number;
  UserId: string;
  transferMessage: string;
  transferAmount: number;
  transferId: string;
  serverReference: string;
  partnerReference: string;
  targetAccName: string;
  targetAccNo: string;
  code: number;
  signature: string;
  statusCallBack: string;
  status: string;
  uniqueSms: string;
  bankId: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export default SmsLogInterface;
