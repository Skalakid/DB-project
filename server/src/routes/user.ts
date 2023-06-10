import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/get/all', controller.getAllUsers);

router.get('/users/stats', extractJWT, controller.getUserStats);

router.get(
  '/users/reservations/all',
  extractJWT,
  controller.getUserReservations
);

router.get(
  '/users/reservations/current',
  extractJWT,
  controller.getUserCurrentReservations
);

router.post('/reservations/add', controller.addReservation);

export = router;
