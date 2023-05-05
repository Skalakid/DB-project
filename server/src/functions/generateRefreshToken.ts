import jwt from 'jsonwebtoken';
import IUser from '../interfaces/user';
import config from '../config/config';

export const generateRefreshToken = async (user: IUser) => {
  try {
    const token = await jwt.sign(user, config.server.tokens.refreshTokenSecret);
    if (token) {
      return token;
    } else throw new Error();
  } catch (error) {
    throw new Error('Failed to sign token ' + error);
  }
};
