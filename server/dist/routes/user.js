"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const router = express_1.default.Router();
router.get('/validate', extractJWT_1.default, user_1.default.validateToken);
router.post('/refresh/token', user_1.default.refreshToken);
router.post('/login', user_1.default.login);
router.post('/register', user_1.default.register);
router.get('/get/all', user_1.default.getAllUsers);
router.delete('/logout', extractJWT_1.default, user_1.default.logout);
module.exports = router;
