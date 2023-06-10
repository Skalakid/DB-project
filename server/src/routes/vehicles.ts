import express from 'express';
import controller from '../controllers/vehicles';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/get/all', extractJWT, controller.getAllAvailableVehicles);

export = router;
