import { Request, Response } from 'express';
import oracle from '../config/oracle';

const getAllAvailableVehicles = async (req: Request, res: Response) => {
  try {
    const query = `SELECT VEHICLE_ID, MODEL_ID, LAT_CORDS, LNG_CORDS, TO_CHAR(DURATION), ENERGY_LEVEL, COST_PER_MINUTE FROM available_vehicles`;
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
            modelId: item[1],
            latCords: item[2],
            lngCords: item[3],
            duration: item[4],
            energyLevel: item[5],
            costPerMinute: item[6],
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
