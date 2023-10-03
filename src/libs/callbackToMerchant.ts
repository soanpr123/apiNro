import AccountBankModel from '@models/accountBank';
import BankOfficialModel from '@models/banks';
import CallbackLogModel from '@models/callbackLogs';
import SystemLogModel from '@models/systemLogs';
import TopupRequestModel from '@models/topupRequest';
import WithdrawModel from '@models/withdrawRequest';
import axios, { AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { LOG_TARGET, TOPUP_CALLBACK_STATUS, WITHDRAW_CALLBACK_STATUS } from './constants';
import { notiRequestTopup } from './telegramBot';

const defaultRetry = 3;
const defaultTimeout = 1000 * 30;
const retryDelay = 2000;

axiosRetry(axios, {
  retries: defaultRetry,
  retryDelay: () => retryDelay,
  retryCondition: (_error: any) => true,
});

export const topupCallback = async (url: string, payload: object, topupId: number) => {
  const topupRequest: any = await TopupRequestModel.findByPk(topupId,
    {
      include: [
        {
          model: AccountBankModel,
          as: 'AccBank',
          include: [
            {
              model: BankOfficialModel,
              as: 'BankInfo',
            },
          ],
        },
      ],
    },
  );
  if (topupRequest.partnerReference === '') {
    await topupRequest.update({ statusCallback: TOPUP_CALLBACK_STATUS.ERROR });
    notiRequestTopup(`
      <a href="/"><b>CHECK - NẠP LỖI</b></a>
      =========================
      Số tiền: <b>+${topupRequest.transferAmount.toLocaleString()} đ</b>
      Mã GD: ${topupRequest.transferId}
      Lý do: Chưa lấy được nickname
    `, topupRequest.transferAmount);
    return false;
  }
  const config: AxiosRequestConfig = {
    method: 'post',
    url,
    timeout: defaultTimeout,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(payload),
  };
  await topupRequest.update({ statusCallback: TOPUP_CALLBACK_STATUS.PROCESSING });

  // Save log
  const newLog: any = {
    UserId: -1,
    targetName: LOG_TARGET.CALLBACK_TOPUP,
    message: JSON.stringify({ id: topupId, payload }),
    type: 'callback',
  };
  await SystemLogModel.create(newLog);

  axios(config)
    .then(async (res) => {
      await topupRequest.update({ statusCallback: TOPUP_CALLBACK_STATUS.SUCCESS });

      if (res.data?.error_code >= 0) {
        const newLog: any = {
          UserId: topupRequest.AdminId,
          url,
          status: TOPUP_CALLBACK_STATUS.SUCCESS,
          payload: JSON.stringify(payload),
          response: JSON.stringify(res.data || {}),
          type: 'topup',
        };
        notiRequestTopup(`
          Nickname: <b>${topupRequest.partnerReference}</b>
          Số tiền: <b>${topupRequest.transferAmount.toLocaleString()} đ</b>
          Số tài khoản: ${topupRequest.AccBank.bankAccNumber}
          Ngân hàng: ${topupRequest.AccBank.BankInfo.bankName}
          Tên tài khoản: ${topupRequest.AccBank.bankAccName}
          Số dư hiện tại: <b>${topupRequest.AccBank.bankAccBalance.toLocaleString()} đ</b>
          =========================
          NẠP TIỀN THÀNH CÔNG
        `, topupRequest.transferAmount);
        await CallbackLogModel.create(newLog);
      }
      if (res.data?.error_code <= -1) {
        await topupRequest.update({ statusCallback: TOPUP_CALLBACK_STATUS.ERROR });
      }
      if (res.data?.error_code === -2) {
        const newLog: any = {
          UserId: topupRequest.AdminId,
          url,
          status: TOPUP_CALLBACK_STATUS.ERROR,
          payload: JSON.stringify(payload),
          response: JSON.stringify(res.data || {}),
          message: 'Không tìm thấy nick(Check ký tự hoa thường)',
          type: 'topup',
        };
        await CallbackLogModel.create(newLog);

        // Noti
        notiRequestTopup(`
          <a href="/">CHECK - NẠP LỖI</a>
          =========================
          Số tiền: <b>+${topupRequest.transferAmount.toLocaleString()} VNĐ</b>
          Mã GD: ${topupRequest.transferId}
          Lý do: Callback lỗi - ${JSON.stringify(res.data || {})}}
        `, topupRequest.transferAmount);
        throw Error;
      } else if (res.data?.error_code <= -1) {
        const newLog: any = {
          UserId: topupRequest.AdminId,
          url,
          status: TOPUP_CALLBACK_STATUS.ERROR,
          payload: JSON.stringify(payload),
          response: JSON.stringify(res.data || {}),
          type: 'topup',
        };
        await CallbackLogModel.create(newLog);

        // Noti
        notiRequestTopup(`
          <a href="/">CHECK - NẠP LỖI</a>
          =========================
          Số tiền: <b>+${topupRequest.transferAmount.toLocaleString()} VNĐ</b>
          Mã GD: ${topupRequest.transferId}
          Lý do: Callback lỗi - ${JSON.stringify(res.data || {})}}
        `, topupRequest.transferAmount);
        throw Error;
      }
    })
    .catch(async (err) => {
      await topupRequest.update({ statusCallback: TOPUP_CALLBACK_STATUS.ERROR });
      const newLog: any = {
        UserId: topupRequest.AdminId,
        url,
        status: TOPUP_CALLBACK_STATUS.ERROR,
        payload: JSON.stringify(payload),
        response: JSON.stringify(err.response.data || {}),
        type: 'topup',
      };
      await CallbackLogModel.create(newLog);
    });
};

export const withdrawCallback = async (url: string = 'https://wspay.skylinecoffee.info/sunpay/callback', payload: object, withdrawId: number) => {
  const withdrawRequest: any = await WithdrawModel.findByPk(withdrawId);
  const config: AxiosRequestConfig = {
    method: 'post',
    url,
    timeout: defaultTimeout,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(payload),
  };

  await withdrawRequest.update({ statusCallback: WITHDRAW_CALLBACK_STATUS.PROCESSING });

  // Save log
  const newLog: any = {
    UserId: -1,
    targetName: LOG_TARGET.CALLBACK_WITHDRAW,
    message: JSON.stringify({ id: withdrawId, payload }),
    type: 'callback',
  };
  await SystemLogModel.create(newLog);

  axios(config)
    .then(async (res) => {
      if (res.data?.error_code === -1) {
        const newLog: any = {
          UserId: withdrawRequest.AdminId,
          url,
          status: WITHDRAW_CALLBACK_STATUS.ERROR,
          payload: JSON.stringify(payload),
          response: JSON.stringify(res.data || {}),
          type: 'withdraw',
        };
        await CallbackLogModel.create(newLog);
        throw Error;
      } else {
        await withdrawRequest.update({ statusCallback: WITHDRAW_CALLBACK_STATUS.SUCCESS });
        const newLog: any = {
          UserId: withdrawRequest.AdminId,
          url,
          status: WITHDRAW_CALLBACK_STATUS.SUCCESS,
          payload: JSON.stringify(payload),
          response: JSON.stringify(res.data || {}),
          type: 'withdraw',
        };
        await CallbackLogModel.create(newLog);
      }
    })
    .catch(async (err) => {
      console.log('Error occurred' + err);
      await withdrawRequest.update({ statusCallback: WITHDRAW_CALLBACK_STATUS.ERROR });
      const newLog: any = {
        UserId: withdrawRequest.AdminId,
        url,
        status: WITHDRAW_CALLBACK_STATUS.ERROR,
        payload: JSON.stringify(payload),
        response: JSON.stringify(err.response.data || {}),
        type: 'withdraw',
      };
      await CallbackLogModel.create(newLog);
    });
};
