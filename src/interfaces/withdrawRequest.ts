interface WithdrawInterface {
    id: number,
    UserId: number,
    AdminId: number,

    transferId: string,
    requestId: string,
    partnerReference: string,
    note: string,

    bankId: number,
    bankAccNumber: string,
    bankAccName: string,
    transferAmount: number,
    transferMessage: string,

    status: string,
    statusTransfer: string,
    statusCallback: string,
    hourUpdatedAt: number,
    createdAt?: Date,
    updatedAt?: Date,
  }

export default WithdrawInterface;
