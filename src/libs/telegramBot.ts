import SystemSettingsModel from '@models/systemSettings';
import axios, { AxiosRequestConfig } from 'axios';

const url = async () => {
  // 5631622003:AAE4bardkr2imRHSJdRMeEFGjKeU_GG2Cn8
  const NOTIFY_BOT = await SystemSettingsModel.findOne({ where: { key: 'NOTIFY_BOT' } });
  return `https://api.telegram.org/bot${NOTIFY_BOT.value || ''}/sendMessage`;
};

const topupChat = async () => {
  // -868190980
  const TOPUP_CHAT = await SystemSettingsModel.findOne({ where: { key: 'TOPUP_CHAT' } });
  return TOPUP_CHAT.value || '';
};

const withdrawChat = async () => {
  // -826267964
  const WITHDRAW_CHAT = await SystemSettingsModel.findOne({ where: { key: 'WITHDRAW_CHAT' } });
  return WITHDRAW_CHAT.value || '';
};

const otherChat = async () => {
  const OTHER_CHAT = await SystemSettingsModel.findOne({ where: { key: 'OTHER_CHAT' } });
  return OTHER_CHAT.value || '';
};

const topupAlert = async () => {
  const TOPUP_ALERT = await SystemSettingsModel.findOne({ where: { key: 'TOPUP_ALERT' } });
  return parseInt(TOPUP_ALERT.value || '0');
};

const withdrawAlert = async () => {
  const WITHDRAW_ALERT = await SystemSettingsModel.findOne({ where: { key: 'WITHDRAW_ALERT' } });
  return parseInt(WITHDRAW_ALERT.value || '0');
};

export const notiSms = async (content: any) => {
  try {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: await url(),
      params:
        {
          chat_id: await otherChat(),
          text: content,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        },
    };
    axios(config);
  } catch (e) {
    console.log(e.message);
  }
};

export const notiRequestWithdraw = async (content: string, ammount: number) => {
  try {
    const limit = await withdrawAlert();
    const chatId = await withdrawChat();
    if (ammount >= limit) {
      const config: AxiosRequestConfig = {
        method: 'get',
        url: await url(),
        params:
        {
          chat_id: chatId,
          text: content.replace(/^\s+/gm, ''),
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        },
      };
      axios(config);
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const notiRequestTopup = async (content: string, ammount: number) => {
  try {
    const limit = await topupAlert();
    const chatId = await topupChat();
    if (ammount >= limit) {
      const config: AxiosRequestConfig = {
        method: 'get',
        url: await url(),
        params:
        {
          chat_id: chatId,
          text: content.replace(/^\s+/gm, ''),
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        },
      };
      axios(config);
    }
  } catch (e) {
    console.log(e.message);
  }
};
