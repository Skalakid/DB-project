import express from 'express';
import controller from '../controllers/vehicles';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/get/all', controller.getAllAvailableVehicles);
router.get('/get/rented/user', controller.getAllCurrentlyRentedVehicles);
router.post('/update/position', controller.updateVehiclePosition);

export = router;
