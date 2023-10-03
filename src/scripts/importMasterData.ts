import { importMasterData } from '../database/masters/masterImporter';

const execute = async () => {
  for (const tableName of ['m_grades']) {
    await importMasterData(tableName);
  }
  process.kill(process.pid);
};

execute();
