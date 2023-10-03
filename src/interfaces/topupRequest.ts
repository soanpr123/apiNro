interface TopupInterface {
  id: number,
  UserId: number,
  AdminId: number,

  bankId: number,
  accBankId: number,
  note: string,
  transferId: string,

  requestId: string,
  partnerReference: string,
  transferMessage: string,
  transferAmount: number,
  requestAmount: number,

  status: string,
  statusTransfer: string,
  statusCallback: string,
  bankTransactionId: string,
  hourUpdatedAt: number,
  createdAt?: Date,
  updatedAt?: Date,
  };

export default TopupInterface;
