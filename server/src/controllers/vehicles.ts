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

const getAllUnavailableVehicles = async (req: Request, res: Response) => {
  try {
    const query = `SELECT VEHICLE_ID, MODEL_ID, LAT_CORDS, LNG_CORDS, TO_CHAR(DURATION), ENERGY_LEVEL, COST_PER_MINUTE FROM unavailable_vehicles`;
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

const getAllCurrentlyRentedVehicles = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const query = `SELECT VEHICLE_ID, MODEL_ID, LAT_CORDS, LNG_CORDS, TO_CHAR(DURATION), ENERGY_LEVEL, COST_PER_MINUTE FROM TABLE(get_user_currently_rented_vehicles(${userId}))`;
    const conn = await oracle.connect();
    conn?.execute<(string | number)[]>(query, [], {}, async (error, result) => {
      if (error) {
        return res.status(501).json({
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
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({
        message: error.message,
        error,
      });
  }
};

const updateVehiclePosition = async (req: Request, res: Response) => {
  try {
    const { vehicleId, lat, lng } = req.body;
    if (!(vehicleId && lat && lng)) throw new Error('Invalid argumnets');
    const query = `
    UPDATE VEHICLE
    SET LAT_CORDS = :1, LNG_CORDS = :2
    WHERE VEHICLE_ID = :3`;
    const conn = await oracle.connect();
    conn?.execute<(string | number)[]>(
      query,
      [lat, lng, vehicleId],
      {
        autoCommit: true,
      },
      async error => {
        if (error) {
          return res.status(501).json({
            message: error.message,
            error,
          });
        }
        return res.status(201).json({});
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

const getVehicleModels = async (req: Request, res: Response) => {
  try {
    const query = `SELECT MODEL_ID FROM VEHICLE GROUP BY MODEL_ID`;
    const conn = await oracle.connect();
    conn?.execute<(string | number)[]>(query, [], {}, async (error, result) => {
      if (error) {
        return res.status(501).json({
          message: error.message,
          error,
        });
      }
      return res.status(201).json(result.rows?.map(item => item[0]));
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({
        message: error.message,
        error,
      });
  }
};

const getVehicleBatteries = async (req: Request, res: Response) => {
  try {
    const query = `SELECT BATTERY_CODE, TO_CHAR(MAX_DURATION) FROM BATTERY`;
    const conn = await oracle.connect();
    conn?.execute<(string | number)[]>(query, [], {}, async (error, result) => {
      if (error) {
        return res.status(501).json({
          message: error.message,
          error,
        });
      }
      return res.status(201).json(result.rows?.map(item => item[0]));
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({
        message: error.message,
        error,
      });
  }
};

const addVehicle = async (req: Request, res: Response) => {
  try {
    const {
      modelID,
      batteryCode,
      lat,
      lng,
      vehicleStatus,
      energyLvl,
      costPerMinute,
    } = req.body;
    const query = `begin add_vehicle('${modelID}','${batteryCode}',${lat},${lng},'${vehicleStatus}',${energyLvl},${costPerMinute}); end;`;
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

const toggleVehicleStatus = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.body;
    const query = `begin TOGGLE_VEHICLE_STATUS('${vehicleId}'); end;`;
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

const changeEnergy = async (req: Request, res: Response) => {
  try {
    const { vehicleId, energyLevel } = req.body;
    const query = `UPDATE vehicle
    SET ENERGY_LEVEL = :1
    WHERE vehicle_id = :2`;
    const conn = await oracle.connect();
    conn?.execute(
      query,
      [energyLevel, vehicleId],
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
    res.status(500).json(err);
  }
};

export default {
  getAllAvailableVehicles,
  getAllUnavailableVehicles,
  getAllCurrentlyRentedVehicles,
  updateVehiclePosition,
  getVehicleModels,
  addVehicle,
  getVehicleBatteries,
  toggleVehicleStatus,
  changeEnergy,
};
