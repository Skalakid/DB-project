import { Request, Response } from 'express';
import oracle from '../config/oracle';

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

const getUserStats = async (req: Request, res: Response) => {
  try {
    const { userID } = req.query;
    if (!userID) throw new Error('Invalid argumnet');
    const query = `begin get_user_info('${userID}'); end;`;
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
          if (users && users?.length == 1) {
            const user = users[0];
            return res.status(201).json({
              userId: user[0],
              firstname: user[1],
              lastname: user[2],
              email: user[3],
              phone: user[4],
              noReservations: user[5],
              totalCost: user[6],
            });
          } else return res.status(401).json('Cound not get current user data');
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

const getUserReservations = async (req: Request, res: Response) => {
  try {
    const { userID } = req.query;
    if (!userID) throw new Error('Invalid argumnet');
    const query = `begin SELECT * FROM get_user_all_reservations('${userID}'); end;`;
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
          return res.status(201).json(
            result.rows?.map(item => ({
              userId: item[0],
              reservationId: item[1],
              vehicleId: item[2],
              r_begin: item[3],
              r_end: item[4],
              cost: item[5],
            }))
          );
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

const getUserCurrentReservations = async (req: Request, res: Response) => {
  try {
    const { userID } = req.query;
    if (!userID) throw new Error('Invalid argumnet');
    const query = `begin SELECT * FROM get_user_current_reservations('${userID}'); end;`;
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
          const reservations = result.rows;
          if (reservations && reservations?.length > 0) {
            return res.status(201).json(
              result.rows?.map(item => ({
                userId: item[0],
                reservationId: item[1],
                vehicleId: item[2],
                r_begin: item[3],
                r_end: item[4],
                cost: item[5],
              }))
            );
          } else {
            return res.status(202).json('No reservations found');
          }
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

const addReservation = async (req: Request, res: Response) => {
  try {
    const { userId, vehicleId, duration } = req.body;
    const query = `begin add_reservation_with_update('${userId}', '${vehicleId}', '${duration}'); end;`;
    const conn = await oracle.connect();
    conn?.execute<(string | number)[]>(
      query,
      [],
      { autoCommit: true },
      (error, result) => {
        if (error) {
          return res.status(500).json({
            message: error.message,
            error,
          });
        } else {
          return res.status(201).json(result);
        }
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default {
  getAllUsers,
  getUserStats,
  getUserReservations,
  getUserCurrentReservations,
  addReservation,
};
