import { LOG_TARGET } from '@libs/constants';
import { notiRequestTopup } from '@libs/telegramBot';
import AccountBankModel from '@models/accountBank';
import BankOfficialModel from '@models/banks';
import SystemLogModel from '@models/systemLogs';
import axios, { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import { customAlphabet } from 'nanoid';
// import WithDrawService from '@services/WithDrawService';
// import moment from 'moment';
// import { customAlphabet } from 'nanoid';

class TopupJobs {
  public async cashOutAlleviate () {
    const accTopups: any = await AccountBankModel.findAll({
      where: { type: 'topup', status: 'active' },
      include: [
        {
          model: BankOfficialModel,
          as: 'BankInfo',
          required: false,
        },
      ],
    });
    for await (const accTopup of accTopups) {
      if (accTopup.cashOutLimit > 0 && accTopup.bankAccBalance > accTopup.cashOutLimit) {
        const targetAcc: any = await AccountBankModel.findOne({
          where: { type: 'cashout_topup', status: 'active' },
          include: [
            {
              model: BankOfficialModel,
              as: 'BankInfo',
              required: false,
            },
          ],
        });
        if (!targetAcc) {
          continue;
        }
        const transferAmount = accTopup.cashOutLimit - 100000;

        // Save log
        const newLog: any = {
          UserId: -1,
          targetName: LOG_TARGET.SYSTEM,
          message: JSON.stringify({ accTopup }),
          type: 'TOPUP_CASHOUT_MAX',
        };
        await SystemLogModel.create(newLog);

        // Noti
        notiRequestTopup(`
          <b>Vượt ngưỡng nạp</b>: Tài khoản tự động chuyển
          =========================
          Số tiền: <b>-${transferAmount.toLocaleString()} đ</b>
          Số tài khoản: ${accTopup.bankAccNumber} 
          Tên tài khoản: ${accTopup.bankAccName}
        `, transferAmount);

        const nanoId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);
        const transferId = `${moment(new Date()).format('YYYYMMDD')}${nanoId()}`;
        const body = {
          username: accTopup.username,
          password: accTopup.password,
          acc: accTopup.bankAccNumber,
          bankId: accTopup.BankInfo?.bankBID,

          targetBID: targetAcc.BankInfo?.bankBID,
          targetNumber: targetAcc.bankAccNumber,
          withdrawAmount: transferAmount,
          withdrawId: transferId,
        };
        const config: AxiosRequestConfig = {
          method: 'post',
          url: `${process.env.WITHDRAW_WORKER_HOST}/transaction/create`,
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.WITHDRAW_WORKER_KEY,
            'merchant': process.env.MERCHANT,
          },
          data: JSON.stringify(body),
        };
        await axios(config);
      }
    }
  }
}
export default new TopupJobs();
