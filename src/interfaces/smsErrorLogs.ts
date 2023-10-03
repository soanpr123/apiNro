interface SmsErrorLogInterface {
  id: number;
  UserId: string;
  transferMessage: string;
  bankId: number;
  partnerReference: string;
  transferAmmount: number;
  bankAccNumber: string;
  bankAccBalance: number;
  type: string;
  phoneReceive: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default SmsErrorLogInterface;
