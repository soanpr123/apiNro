import crypto from 'crypto';

export const signCallback = (data: string) => {
  const sign = crypto.createHash('md5').update(data).digest('hex');
  return sign;
};
