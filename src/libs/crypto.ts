import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

export const encryptPassword = (password: string) => {
  if (!password) return '';
  return crypto.createHash('sha256').update(password).digest('base64');
};

export const decryptStringWithRsaPrivateKey = (toDecrypt: string, relativeOrAbsolutePathtoPrivateKey: string = './private.key') => {
  const absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
  const privateKey = fs.readFileSync(absolutePath, 'utf8');
  const buffer = Buffer.from(toDecrypt, 'base64');
  const decrypted = crypto.privateDecrypt({
    key: privateKey,
    padding:
    crypto.constants.RSA_PKCS1_PADDING,
  }, buffer);
  return decrypted.toString('utf8');
};
