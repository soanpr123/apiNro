import { signCallback } from '@libs/sign';
import AccountBankModel from '@models/accountBank';
import TopupRequestModel from '@models/topupRequest';
import SmsTopupModel from '@models/smsTopup';
import WithdrawModel from '@models/withdrawRequest';
import SmsWithdrawModel from '@models/smsWithdraw';
import { Op } from 'sequelize';
import { customAlphabet } from 'nanoid';
import moment from 'moment';
import { SMS_TOPUP_STATUS, TOPUP_CALLBACK_STATUS, TOPUP_STATUS, TOPUP_TRANSFER_STATUS, TYPE_TOPUP, WITHDRAW_CALLBACK_STATUS, WITHDRAW_STATUS, WITHDRAW_TRANSFER_STATUS } from './constants';
import { topupCallback, withdrawCallback } from './callbackToMerchant';

export const execWithdraw = async (smsRemap: any, smsContent: any, transferId: any, transferAmount: number, accBank: any, userInfo: any) => {
  // Update rút tiền thành công
  const requestWithdraw = await WithdrawModel.findOne({
    where: {
      transferId,
      status: WITHDRAW_STATUS.SUCCESS,
    },
  });

  // Save SMS
  if (smsRemap && requestWithdraw) {
    await SmsWithdrawModel.update({ withDrawId: requestWithdraw?.id }, { where: { id: smsRemap.id } });
    await requestWithdraw.update({ statusTransfer: WITHDRAW_TRANSFER_STATUS.SUCCESS });
  } else if (requestWithdraw) {
    const smsExist = await SmsWithdrawModel.findOne({ where: { withDrawId: requestWithdraw?.id } });
    if (!smsExist) {
      const newSMS: any = {
        UserId: userInfo.merchantId,
        withDrawId: requestWithdraw?.id,
        content: smsContent,
        transferAmount,
        transferId: requestWithdraw?.transferId,
        partnerReference: requestWithdraw?.partnerReference,
        bankAccNumber: accBank.bankAccNumber,
        bankId: accBank.bankId,
        status: 'success',
      };
      await SmsWithdrawModel.create(newSMS);
      await accBank.update();
    }
    await requestWithdraw.update({ statusTransfer: WITHDRAW_TRANSFER_STATUS.SUCCESS });
  } else if (!smsRemap && !requestWithdraw) {
    throw new Error('Request Withdraw Not Match SMS');
  }

  if (requestWithdraw && requestWithdraw.statusCallback !== WITHDRAW_CALLBACK_STATUS.SUCCESS) {
    // Create callback to gate
    const newCallbackData: any = {
      code: 0,
      message: 'success',
      data: {
        callbackType: 'withdraw',
        partnerReference: requestWithdraw?.partnerReference,
        requestId: requestWithdraw.requestId,
        chargeType: 'bank',
        transferAmount: requestWithdraw.transferAmount,
        status: 'success',
      },
      signature: signCallback(`${userInfo.apiKey}${requestWithdraw?.partnerReference}${requestWithdraw.requestId}`),
    };
      // Callback to gate
    withdrawCallback(accBank.callBackUrl, newCallbackData, requestWithdraw.id);
  }
};

export const execTopup = async (smsRemap: any, smsContent: any, partnerReference: any, transferAmount: number, accBank: any, userInfo: any) => {
  // Update nhận tiền thành công
  const requestTopup = await TopupRequestModel.findOne({
    where: {
      partnerReference,
      accBankId: accBank.id,
      statusTransfer: {
        [Op.ne]: TOPUP_TRANSFER_STATUS.SUCCESS,
      },
    },
  });

  // Save SMS
  let topupRequestNew = null;
  // Yêu cầu map lại tin bị sai nội dung, và có requestTopup khớp với nội dung smsRemap
  if (smsRemap && requestTopup) {
    await SmsTopupModel.update({ topupId: requestTopup?.id, transferId: requestTopup?.transferId }, { where: { id: smsRemap.id } });
    await requestTopup.update({ statusTransfer: TOPUP_TRANSFER_STATUS.SUCCESS, status: TOPUP_STATUS.SUCCESS, transferAmount: smsRemap.transferAmount });
  } else if (requestTopup) {
    // Yêu cầu map SMS mới và đã tìm thấy requestTopup khớp nội dung
    const smsExist = await SmsTopupModel.findOne({ where: { topupId: requestTopup?.id } });
    if (!smsExist) {
      const newSMS: any = {
        UserId: userInfo.merchantId,
        topupId: requestTopup?.id,
        content: smsContent,
        transferAmount,
        transferId: requestTopup?.transferId,
        partnerReference,
        bankAccNumber: accBank.bankAccNumber,
        bankId: accBank.bankId,
        status: SMS_TOPUP_STATUS.SUCCESS,
      };
      await SmsTopupModel.create(newSMS);
    }
    await requestTopup.update({ statusTransfer: TOPUP_TRANSFER_STATUS.SUCCESS, status: TOPUP_STATUS.SUCCESS, transferAmount });
  } else if (smsRemap && !requestTopup && userInfo.typeTopup === TYPE_TOPUP.SMS_FIRST) {
    // Yêu cầu map lại SMS, chưa có requestTopup và luồng SMS về trước khi có requestTopup
    const nanoId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);
    const transferId = `${moment(new Date()).format('YYYYMMDD')}${nanoId()}`;
    const newRequest: any = {
      UserId: userInfo.merchantId,

      accBankId: accBank.id,
      note: userInfo.typeTopup,
      transferId,

      requestId: transferId,
      partnerReference: partnerReference,
      transferMessage: partnerReference,
      requestAmount: transferAmount,
      transferAmount,

      status: TOPUP_STATUS.SUCCESS,
      statusTransfer: TOPUP_TRANSFER_STATUS.SUCCESS,
      statusCallback: TOPUP_CALLBACK_STATUS.PROCESSING,
    };
    topupRequestNew = await TopupRequestModel.create(newRequest);
    await SmsTopupModel.update({ topupId: topupRequestNew?.id, transferId: topupRequestNew?.transferId, status: SMS_TOPUP_STATUS.SUCCESS }, { where: { id: smsRemap.id } });
    const newCallbackData: any = {
      code: 0,
      message: 'success',
      data: {
        callbackType: 'topup',
        partnerReference,
        requestId: topupRequestNew?.requestId,
        chargeType: 'bank',
        requestAmount: topupRequestNew?.requestAmount,
        transferAmount,
        status: 'success',
      },
      signature: signCallback(`${userInfo.apiKey}${partnerReference}${topupRequestNew.requestId}`),
    };
    topupCallback(accBank.callBackUrl, newCallbackData, topupRequestNew.id);
  } else if (!smsRemap && !requestTopup) {
    // Yêu cầu map SMS mới và chưa tồn tại requestTopup, lưu SMS để xử lý sau
    const smsExist = await SmsTopupModel.findOne({ where: { content: { [Op.substring]: smsContent.slice(0, 80) } } });
    if (!smsExist) {
      if (userInfo.typeTopup === TYPE_TOPUP.SMS_FIRST) {
        const nanoId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);
        const transferId = `${moment(new Date()).format('YYYYMMDD')}${nanoId()}`;
        const newRequest: any = {
          UserId: userInfo.merchantId,

          accBankId: accBank.id,
          note: userInfo.typeTopup,
          transferId,

          requestId: transferId,
          partnerReference: partnerReference,
          transferMessage: partnerReference,
          requestAmount: transferAmount,
          transferAmount,

          status: TOPUP_STATUS.SUCCESS,
          statusTransfer: TOPUP_TRANSFER_STATUS.SUCCESS,
          statusCallback: TOPUP_CALLBACK_STATUS.PROCESSING,
        };
        topupRequestNew = await TopupRequestModel.create(newRequest);
      }
      const newSMS: any = {
        UserId: userInfo.merchantId,
        topupId: topupRequestNew?.id || null,
        content: smsContent,
        transferAmount,
        transferId: topupRequestNew?.transferId || null,
        partnerReference,
        bankAccNumber: accBank.bankAccNumber,
        bankId: accBank.bankId,
        status: partnerReference === '' ? SMS_TOPUP_STATUS.ERROR : SMS_TOPUP_STATUS.SUCCESS,
      };
      await SmsTopupModel.create(newSMS);
      const newCallbackData: any = {
        code: 0,
        message: 'success',
        data: {
          callbackType: 'topup',
          partnerReference,
          requestId: topupRequestNew?.requestId,
          chargeType: 'bank',
          requestAmount: topupRequestNew?.requestAmount,
          transferAmount,
          status: 'success',
        },
        signature: signCallback(`${userInfo.apiKey}${partnerReference}${topupRequestNew.requestId}`),
      };
      topupCallback(accBank.callBackUrl, newCallbackData, topupRequestNew.id);
    }
    throw new Error('Request Topup Not Match SMS');
  } else {
    throw new Error('Request Topup Not Match SMS');
  }
};

export const retryCallbackTopup = async (requestTopup: any, userInfo: any) => {
  // Acc Bank
  const accBank = await AccountBankModel.findOne({
    where: {
      id: requestTopup.accBankId,
    },
  });

  if (requestTopup) {
    // Create callback to gate
    const newCallbackData: any = {
      code: 0,
      message: 'success',
      data: {
        callbackType: 'topup',
        partnerReference: requestTopup.partnerReference,
        requestId: requestTopup.requestId,
        chargeType: 'bank',
        requestAmount: requestTopup.requestAmount,
        transferAmount: requestTopup.transferAmount,
        status: TOPUP_STATUS.SUCCESS,
      },
      signature: signCallback(`${userInfo.apiKey}${requestTopup?.partnerReference}${requestTopup.requestId}`),
    };
      // Callback
    topupCallback(accBank.callBackUrl, newCallbackData, requestTopup.id);
  }
};
