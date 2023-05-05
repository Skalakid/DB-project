import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import oracle from '../config/oracle';
import IUser from '../interfaces/user';

const validateToken = (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Token validated',
  });
};

const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `begin add_user('${firstName}','${lastName}','${email}','${hashedPassword}','${phoneNumber}'); end;`;
    const conn = await oracle.connect();
    conn?.execute(query, [], { autoCommit: true }, (error, result) => {
      if (error) {
        return res.status(500).json({
          message: error.message,
          error,
        });
      } else {
        return res.status(201).json(result);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) throw new Error('Passed invalid values');
    const query = `SELECT * FROM users WHERE E_MAIL = '${email}'`;
    const conn = await oracle.connect();
    conn?.execute<(string | number)[]>(
      query,
      [],
      { autoCommit: true },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            message: error.message,
            error,
          });
        } else {
          const users = result.rows;
          if (users && users?.length > 0) {
            if (await bcrypt.compare(password, users[0][5].toString())) {
              const user = users[0];
              return res.status(201).json({
                userId: user[0],
                firstName: user[1],
                lastName: user[2],
                email: user[3],
                phoneNumber: user[4],
                password: user[5],
              } as IUser);
            } else return res.status(400).json('Wrong e-mail or password');
          }
          return res.status(404).json('Cound not find user with passed email');
        }
      }
    );
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({
        message: error.message,
        error,
      });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const query = `SELECT USER_ID, firstname FROM users`;
    const conn = await oracle.connect();
    conn?.execute<(string | number)[]>(
      query,
      [],
      { autoCommit: true },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            message: error.message,
            error,
          });
        }
        return res.status(201).json(
          result.rows?.map(item => ({
            userId: item[0],
            firstName: item[1],
          }))
        );
      }
    );
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({
        message: error.message,
        error,
      });
  }
};

export default { validateToken, register, login, getAllUsers };
