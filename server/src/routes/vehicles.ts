import express from 'express';
import controller from '../controllers/vehicles';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get(
  '/get/all/unavailable',
  extractJWT,
  controller.getAllUnavailableVehicles
);
router.get(
  '/get/all/available',
  extractJWT,
  controller.getAllAvailableVehicles
);
router.get(
  '/get/rented/user',
  extractJWT,
  controller.getAllCurrentlyRentedVehicles
);
router.post('/update/position', extractJWT, controller.updateVehiclePosition);
router.get('/get/models', extractJWT, controller.getVehicleModels);
router.get('/get/batteries', extractJWT, controller.getVehicleBatteries);
router.post('/add', extractJWT, controller.addVehicle);
router.post('/toggle/status', extractJWT, controller.toggleVehicleStatus);
router.post('/update/energylvl', extractJWT, controller.changeEnergy);

export = router;
