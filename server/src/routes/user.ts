import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/get/all', extractJWT, controller.getAllUsers);

router.get('/stats', extractJWT, controller.getUserStats);

router.get('/reservations/all', extractJWT, controller.getUserReservations);

router.get(
  '/reservations/current',
  extractJWT,
  controller.getUserCurrentReservations
);

router.post('/reservations/add', extractJWT, controller.addReservation);

export = router;
