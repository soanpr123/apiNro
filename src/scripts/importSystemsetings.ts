import { QueryTypes, Sequelize } from 'sequelize';
const env: any = process.env.NODE_ENV || 'development';
// eslint-disable-next-line node/no-path-concat
const config = require(`${__dirname}/../configs/database`)[env];
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const queryInterface = sequelize.getQueryInterface();

const importData = async () => {
  try {
    const recordsAttribute: any = [
      { key: 'NOTIFY_BOT', value: '5631622003:AAE4bardkr2imRHSJdRMeEFGjKeU_GG2Cn8' },
      { key: 'TOPUP_CHAT', value: '-868190980' },
      { key: 'WITHDRAW_CHAT', value: '-826267964' },
      { key: 'OTHER_CHAT', value: '' },
      { key: 'TOPUP_ALERT', value: 50000 },
      { key: 'WITHDRAW_ALERT', value: 100000 },
      { key: 'TOPUP_MAX', value: 20000000 },
      { key: 'WITHDRAW_MIN', value: 5000000 },
      { key: 'WITHDRAW_ACCEPT_AUTO_MIN', value: 0 },
      { key: 'TOPUP_CASHOUT_MAX', value: 200000000 },
      { key: 'UNIQUE_USER_ACCBANK', value: 'off' },
      { key: 'ALLOW_WITHDRAW', value: 'on' },
    ];
    for await (const item of recordsAttribute) {
      const exist = (await sequelize.query(`SELECT * FROM \`system_settings\` WHERE \`key\` = '${item.key}'`, { type: QueryTypes.SELECT }))[0];
      if (!exist) {
        await queryInterface.bulkInsert('system_settings', [item]);
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
