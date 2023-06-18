import oracledb from 'oracledb';
import config from './config';

const params = {
  user: config.oracle.user,
  password: config.oracle.pass,
  connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=${config.oracle.host})(Port=${config.oracle.port}))(CONNECT_DATA=(SID=${config.oracle.database})))`,
};

const connect = async () => {
  try {
    // try {
    //   // for macBooks :)
    //   oracledb.initOracleClient({
    //     libDir: process.env.HOME + '/Downloads/instantclient_19_8',
    //   });
    // } catch (err) {
    //   // console.error('Already initialized!');
    // }
    const connection = await oracledb.getConnection({ ...params });
    return connection;
  } catch (error) {
    console.error(`[ERROR] ${error}`);
  }
};

export default { connect };
