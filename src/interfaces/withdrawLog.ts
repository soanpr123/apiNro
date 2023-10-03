interface WithdrawLogInterface {
    id: number;
    UserId: number;
    AdminId: number;
    note: string;
    transferMessage: string;
    transferAmount: number;
    transferId: string;
    partnerReference: string;
    bankAccNumber: string;
    bankAccName: string;
    bankId: string;
    status: string;
    statusTransfer: string;
    createdAt?: Date;
    updatedAt?: Date;
  };

export default WithdrawLogInterface;
