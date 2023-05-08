import jwt from 'jsonwebtoken';
import IUser from '../interfaces/user';
import config from '../config/config';

export const generateAccessToken = async (user: IUser) => {
  try {
    const token = await jwt.sign(user, config.server.tokens.accessTokenSecret, {
      expiresIn: '15s',
    });
    if (token) {
      return token;
    } else throw new Error();
  } catch (error) {
    throw new Error('Failed to sign token ' + error);
  }
};