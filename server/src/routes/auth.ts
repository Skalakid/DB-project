import express from 'express';
import controller from '../controllers/auth';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/validate', extractJWT, controller.validateToken);
router.post('/refresh/token', controller.refreshToken);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.delete('/logout', extractJWT, controller.logout);

export = router;
