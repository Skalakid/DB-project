import express from 'express';
import controller from '../controllers/auth';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/validate', extractJWT, controller.validateToken);
router.post('/refresh/token', extractJWT, controller.refreshToken);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.delete('/logout', extractJWT, controller.logout);
router.post('/change/password', extractJWT, controller.changePassword);

export = router;
