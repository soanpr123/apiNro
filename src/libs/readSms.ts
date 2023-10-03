import { getAccBalance, getAccNumber, getBankName, getBankNameOTP, getPartnerReference, getTransferAmount, getTransferAmountWithDraw } from '@libs/banks';
import SmsErrorLogModel from '@models/smsErrorLogs';
import AccountBankModel from '@models/accountBank';
import BankOfficialModel from '@models/banks';
import { Op } from 'sequelize';
import SmsTopupModel from '@models/smsTopup';
import SmsWithdrawModel from '@models/smsWithdraw';
import BlackListTopupModel from '@models/blackListTopup';
import { execTopup, execWithdraw } from './actionRequest';

export const cleanSmsContent = (content: string) => {
  const smsContent = content.replace(/([0-9]{11,15})|([0-9]{10,15}( den| DEN))/g, '');
  return smsContent;
};

const saveErrorSMS = async (merchantId: any, smsContent: any, phoneReceive: string = '', type: string = 'trash', transferAmmount: number = 0) => {
  const newSms: any = {
    UserId: merchantId,
    transferMessage: smsContent,
    phoneReceive,
    type,
  };
  const existSmsError = await SmsErrorLogModel.findOne({
    where: {
      transferMessage: {
        [Op.substring]: smsContent.slice(0, 80),
      },
    },
  });

  if (/(OTP)|(otp)/.test(smsContent)) {
    newSms.type = 'OTP';
    const bankName = getBankNameOTP(smsContent);
    const bank: any = await BankOfficialModel.findOne({
      where: {
        bankName,
      },
      raw: true,
    });
    newSms.bankId = bank?.id;
  } else {
    const bankName = getBankName(smsContent);
    const bank: any = await BankOfficialModel.findOne({
      where: {
        bankName,
      },
      raw: true,
    });
    newSms.bankAccNumber = getAccNumber(bank.bankName, smsContent);
    newSms.bankAccBalance = getAccBalance(bankName, smsContent);
    newSms.transferAmmount = transferAmmount;
    newSms.bankId = bank?.id;
  }
  if (!existSmsError) {
    await SmsErrorLogModel.create(newSms);
  }
};

export const readSms = async (userInfo: any, smsRemap: any, smsContentRaw: any, fromBank: string = '', phoneReceive: string = '') => {
  try {
    const smsContent = smsContentRaw || (smsRemap.content);

    console.log({ smsContent, phoneReceive });
    // Auto check bank from
    const bankName = getBankName(smsContent);
    const bank: any = await BankOfficialModel.findOne({
      where: {
        bankName,
      },
      raw: true,
    });

    if (bank == null) {
      await saveErrorSMS(userInfo.merchantId, smsContent, phoneReceive);
      throw new Error('SMS Bank Not Found');
    }

    // Update acc balance
    const accNumber: any = getAccNumber(bank.bankName, smsContent);
    const accBalance: any = getAccBalance(bankName, smsContent);

    const accBank: any = await AccountBankModel.findOne({
      where: {
        bankAccNumber: accNumber,
        workerTopupMethod: 'sms',
        bankId: bank.id,
      },
      include: [
        {
          model: BankOfficialModel,
          as: 'BankInfo',
        },
      ],
    });
    if (!accBank) {
      await saveErrorSMS(userInfo.merchantId, smsContent, phoneReceive);
      throw new Error('Acc Bank Not Found');
    }

    // Read SMS and create callback
    if (accBank.type === 'topup') {
      // Có thể không lấy được partnerReference do sai cú pháp
      let partnerReference = getPartnerReference(bankName, smsContent, accBank.BankInfo?.regexTopupPartnerRef, accBank.BankInfo?.regexTopupPartnerRefIndex);
      const transferAmountTopup = getTransferAmount(bankName, smsContent);

      // Xử lý SMS Topup mới
      if (partnerReference && transferAmountTopup) {
        // Bỏ qua các SMS Topup đã xử lý rồi và không xử lý sms rác
        const smsExist = await SmsTopupModel.findOne({ where: { content: { [Op.substring]: smsContent.slice(0, 80) } } });
        if (!smsExist) {
          await accBank.update({ bankAccBalance: accBalance });
        }

        const existBlock = await BlackListTopupModel.findOne({ where: { UserId: userInfo.merchantId, partnerReference } });
        partnerReference = existBlock ? '' : partnerReference;
        if (partnerReference.includes('NGUYEN') || partnerReference.includes('Nguyen') || partnerReference.includes('nguyen')) {
          partnerReference = null;
        }
        await execTopup(smsRemap, smsContent, partnerReference, transferAmountTopup, accBank, userInfo);
      } else {
        const transferAmountWithDraw = getTransferAmountWithDraw(bankName, smsContent);
        const smsExist = await SmsErrorLogModel.findOne({ where: { transferMessage: { [Op.substring]: smsContent.slice(0, 80) } } });
        if (!smsExist) {
          await accBank.update({ bankAccBalance: accBalance });
        }
        saveErrorSMS(userInfo.merchantId, smsContent, 'topup', transferAmountWithDraw);
      }
    } else if (accBank.type === 'withdraw') {
      const regexWithdraw = new RegExp(`${accBank.BankInfo?.regexWithdrawTransId}`, 'g');
      const transferId = regexWithdraw.exec(smsContent)?.[accBank.BankInfo?.regexWithdrawTransIdIndex] || '';
      const transferAmountWithDraw = getTransferAmountWithDraw(bankName, smsContent);
      const smsExist = await SmsWithdrawModel.findOne({ where: { content: { [Op.substring]: smsContent.slice(0, 80) } } });
      if (!smsExist) {
        await accBank.update({ bankAccBalance: accBalance });
        if (transferAmountWithDraw && transferId) {
          await execWithdraw(smsRemap, smsContent, transferId, transferAmountWithDraw, accBank, userInfo);
        } else {
          const transferAmountTopup = getTransferAmount(bankName, smsContent);
          saveErrorSMS(userInfo.merchantId, smsContent, 'withdraw', transferAmountTopup);
        }
      }
    } else {
      throw new Error('partnerReference Not Found');
    }
  } catch (error) {
    return error.message;
  }
};
