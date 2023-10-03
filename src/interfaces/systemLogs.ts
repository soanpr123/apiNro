interface SystemLogInterface {
    id: number,
    UserId: number,
    targetName: string,
    message: string,
    type: string,
    createdAt: string,
    updatedAt: string,
  };

export default SystemLogInterface;
