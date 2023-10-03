interface BlackListInterface {
  id: number;
  UserId: string;
  partnerReference: string;
  bankAccNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default BlackListInterface;
