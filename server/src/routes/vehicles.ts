import express from 'express';
import controller from '../controllers/vehicles';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/get/all/unavailable', controller.getAllUnavailableVehicles);
router.get('/get/all/available', controller.getAllAvailableVehicles);
router.get('/get/rented/user', controller.getAllCurrentlyRentedVehicles);
router.post('/update/position', controller.updateVehiclePosition);
router.get('/get/models', controller.getVehicleModels);
router.get('/get/batteries', controller.getVehicleBatteries);
router.post('/add', controller.addVehicle);
router.post('/toggle/status', controller.toggleVehicleStatus);
router.post('/update/energylvl', controller.changeEnergy);
router.post('/update/cost', controller.changeCost);

export = router;
