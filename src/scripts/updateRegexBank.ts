import { QueryTypes, Sequelize } from 'sequelize';
const env: any = process.env.NODE_ENV || 'development';
// eslint-disable-next-line node/no-path-concat
const config = require(`${__dirname}/../configs/database`)[env];
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const importData = async () => {
  try {
    const accountBanks: any = await sequelize.query('SELECT * FROM `account_bank`', { type: QueryTypes.SELECT });

    for await (const account of accountBanks) {
      const bank = (await sequelize.query(`SELECT * FROM \`m_bank\` WHERE \`id\` = ${account.bankId}`, { type: QueryTypes.SELECT }))[0];
      if ((bank && account.regexTopupPartnerRef) || (bank && account.regexWithdrawTransId)) {
        await sequelize.query("UPDATE m_bank SET regexTopupPartnerRef = '" + account.regexTopupPartnerRef + "' WHERE id = " + account.bankId, { type: QueryTypes.UPDATE });
        await sequelize.query('UPDATE m_bank SET regexTopupPartnerRefIndex = ' + account.regexTopupPartnerRefIndex + ' WHERE id = ' + account.bankId, { type: QueryTypes.UPDATE });
        await sequelize.query("UPDATE m_bank SET regexWithdrawTransId = '" + account.regexWithdrawTransId + "' WHERE id = " + account.bankId, { type: QueryTypes.UPDATE });
        await sequelize.query('UPDATE m_bank SET regexWithdrawTransIdIndex = ' + account.regexWithdrawTransIdIndex + ' WHERE id = ' + account.bankId, { type: QueryTypes.UPDATE });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const execute = async () => {
  await importData();
  process.kill(process.pid);
};

execute();
