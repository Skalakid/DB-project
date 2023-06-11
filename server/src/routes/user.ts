import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/get/all', controller.getAllUsers);

router.get('/stats', extractJWT, controller.getUserStats);

router.get('/reservations/all', controller.getUserReservations);

router.get('/reservations/current', controller.getUserCurrentReservations);

router.post('/reservations/add', controller.addReservation);

export = router;
