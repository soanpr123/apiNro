export const USER_ROLES = [
  'admin',
  'use',
];
export const LOG_TARGET = {
  SMS_TOPUP: 'smsTopup',
  SMS_WITHDRAW: 'smsWithdraw',
  REQUEST_TOPUP: 'requestTopup',
  REQUEST_WITHDRAW: 'requestWithdraw',
  SYSTEM: 'system',
  CALLBACK_TOPUP: 'callbackTopup',
  CALLBACK_WITHDRAW: 'callbackWithdraw',
  USER: 'user',
};
export const USER_STATUS = [
  'MALE', 'FEMALE', 'NONE',
];

export const TYPE_TOPUP = {
  REQUEST_FIRST: 'request-first',
  SMS_FIRST: 'sms-first',
};

export const TOPUP_STATUS = {
  PENDDING: 'pendding',
  SUCCESS: 'success',
  ERROR: 'error',
  CANCELED: 'canceled',
};

export const SMS_TOPUP_STATUS = {
  PENDDING: 'pendding',
  SUCCESS: 'success',
  ERROR: 'error',
  CANCELED: 'canceled',
};

export const TOPUP_TRANSFER_STATUS = {
  SUCCESS: 'success',
  PENDDING: 'pendding',
  PROCESSING: 'processing',
  ERROR: 'error',
};

export const TOPUP_CALLBACK_STATUS = {
  SUCCESS: 'success',
  PROCESSING: 'processing',
  ERROR: 'error',
};

export const WITHDRAW_ERROR_MESS = new Map([
  ['0', 'không có lỗi'],
  ['1', 'hủy yêu cầu rút'],
  ['2', 'chuyển tiền thất bại'],
  ['3', 'tài khoản nhận sai thông tin'],
  ['4', 'tài khoản không đủ tiền'],
  ['5', 'đang kiểm tra giao dịch'],
]);

export const WITHDRAW_STATUS = {
  PENDDING: 'pendding',
  SUCCESS: 'success',
  ERROR: 'error',
  CANCELED: 'canceled',
};

export const WITHDRAW_TRANSFER_STATUS = {
  SUCCESS: 'success',
  PENDDING: 'pendding',
  PROCESSING: 'processing',
  ERROR: 'error',
  CANCELED: 'canceled',
  CHECKING: 'checking',
};

export const WITHDRAW_CALLBACK_STATUS = {
  ERROR: 'error',
  SUCCESS: 'success',
  PROCESSING: 'processing',
  PENDDING: 'pendding',
};

export const ORDER_STATUS = {
  CREATED: 'created',
  PROCESSING: 'processing',
  SHIPPING: 'shipping',
  SUCCESS: 'success',
  CANCELED: 'canceled',
};

export const ORDER_STATUS_ENUM = [
  'created',
  'processing',
  'shipping',
  'success',
  'canceled',
];

export const ORDER_STATUS_MAP_LABEL = new Map([
  ['created', 'Đã tạo'],
  ['processing', 'Đang xử lý'],
  ['shipping', 'Đang vận chuyển'],
  ['success', 'Thành công'],
  ['canceled', 'Đã hủy'],
]);

// export const User

export const SUCCESS_PROCEDURE_RESPONSE_CODE = 1;
export const UPDATE_SUCCESS_RESPONSE_TEXT = 'Cập nhật thành công';
export const INSERT_SUCCESS_RESPONSE_TEXT = 'Thêm mới thành công';
export const UPDATE_FAIL_RESPONSE_TEXT = 'Cập nhật thất bại. Vui lòng thử lại sau!';

export const ERROR_CODES = {
  InvalidLoginCredentials: 'INVALID_LOGIN_CREDENTIALS',
  InvalidOrExpiredToken: 'INVALID_OR_EXPIRED_TOKEN',
  SomeErrorsOccurredPleaseTryAgain: 'SOME_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
  NoPermissionToAccessThisResource: 'NO_PERMISSION_TO_ACCESS_THIS_RESOURCE',
};

export const ERROR_MESSAGES = {
  OperatorNameExist: 'Tên nhà mạng đã được sử dụng',
  OperatorCodeExist: 'Mã nhà mạng đã được sử dụng',
  CardCodeExist: 'Mã thẻ cào đã tồn tại',
  PeriodTimeOverlap: 'Khoảng thời gian cấu hình không hợp lệ',
  SystemProccessing: 'Hệ thống của chúng tôi đang bận .Xin quý khách vui lòng thử lại sau',
  GiftCodeExpireDateMin: 'Ngày giờ hết hiệu lực phải lớn hơn ngày giờ hiện tại',
  AdminNotEnoughMoneyToCreateGiftCode: 'Tài khoản không đủ Bit để tạo gift code',
  CampaignExist: 'Chiến dịch tạo gift code đã tồn tại',
  CampaignInvalid: 'Chiến dịch không hợp lệ',
  CSKHExist: 'Tài khoản chăm sóc khách hàng đã tồn tại',
  ProductInvalid: 'Thông tin sản phẩm không hợp lệ',
  InfoInvalid: 'Thông tin không hợp lệ',
};

export const MESSAGE_GIFT_CODE_ADD_MAP: any = {
  '-17': ERROR_MESSAGES.CampaignExist,
  '-303': ERROR_MESSAGES.CampaignInvalid,
  'default': ERROR_MESSAGES.SystemProccessing,
};
