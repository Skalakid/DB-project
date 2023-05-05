import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.get('/validate', controller.validateToken);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/get/all', controller.getAllUsers);

export = router;
