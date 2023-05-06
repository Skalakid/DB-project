import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/validate', extractJWT, controller.validateToken);
router.post('/refresh/token', controller.refreshToken);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/get/all', controller.getAllUsers);
router.delete('/logout', extractJWT, controller.logout);

export = router;
