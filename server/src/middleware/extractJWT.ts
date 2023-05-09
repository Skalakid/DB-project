import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(
      token,
      config.server.tokens.accessTokenSecret,
      (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token expired' });

        res.locals.jwt = decoded;
        next();
      }
    );
  } else return res.status(401).json({ message: 'Unauthorized' });
};

export default extractJWT;
