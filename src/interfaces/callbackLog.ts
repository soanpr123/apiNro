interface CallbackLogInterface {
  id: number,
  UserId: number,
  url: string,
  status: string,
  payload: string,
  response: string,
  type: string,
  message: string,
  createdAt: string,
  updatedAt: string,
};

export default CallbackLogInterface;
