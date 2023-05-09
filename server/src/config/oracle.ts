import oracledb from 'oracledb';
import config from './config';

const params = {
  user: config.oracle.user,
  password: config.oracle.pass,
  connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=${config.oracle.host})(Port=${config.oracle.port}))(CONNECT_DATA=(SID=${config.oracle.database})))`,
};

const connect = async () => {
  try {
    const connection = await oracledb.getConnection({ ...params });
    return connection;
  } catch (error) {
    console.error(`[ERROR] ${error}`);
  }
};

export default { connect };
