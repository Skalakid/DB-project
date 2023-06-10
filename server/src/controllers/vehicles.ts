import { Request, Response } from 'express';
import oracle from '../config/oracle';

const getAllAvailableVehicles = async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM available_vehicles`;
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
            vehicleId: item[0],
            latCords: item[1],
            lngCords: item[2],
            duration: item[3],
            energyLevel: item[4],
            costPerMinute: item[5],
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

export default {
  getAllAvailableVehicles,
};
