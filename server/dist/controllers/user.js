"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const oracle_1 = __importDefault(require("../config/oracle"));
const generateAccessToken_1 = require("../functions/generateAccessToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const generateRefreshToken_1 = require("../functions/generateRefreshToken");
let refreshTokens = [];
const validateToken = (req, res) => {
    return res.status(200).json({
        message: 'Token validated',
    });
};
const refreshToken = (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken === null)
        return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken))
        return res.sendStatus(403);
    jsonwebtoken_1.default.verify(refreshToken, config_1.default.server.tokens.refreshTokenSecret, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.sendStatus(403);
        const userObj = {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,
        };
        const accessToken = yield (0, generateAccessToken_1.generateAccessToken)(userObj);
        res.json({ accessToken });
    }));
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, phoneNumber, email, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const query = `begin add_user('${firstName}','${lastName}','${email}','${hashedPassword}','${phoneNumber}'); end;`;
        const conn = yield oracle_1.default.connect();
        conn === null || conn === void 0 ? void 0 : conn.execute(query, [], { autoCommit: true }, (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: error.message,
                    error,
                });
            }
            else {
                return res.status(201).json(result);
            }
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!(email && password))
            throw new Error('Passed invalid values');
        const query = `SELECT * FROM users WHERE E_MAIL = '${email}'`;
        const conn = yield oracle_1.default.connect();
        conn === null || conn === void 0 ? void 0 : conn.execute(query, [], { autoCommit: true }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(500).json({
                    message: error.message,
                    error,
                });
            }
            else if (result) {
                const users = result.rows;
                if (users && (users === null || users === void 0 ? void 0 : users.length) > 0) {
                    if (yield bcrypt_1.default.compare(password, users[0][5].toString())) {
                        const user = users[0];
                        const userObj = {
                            userId: user[0],
                            firstName: user[1],
                            lastName: user[2],
                            email: user[3],
                            phoneNumber: user[4],
                            password: user[5],
                        };
                        const accessToken = yield (0, generateAccessToken_1.generateAccessToken)(userObj);
                        const refreshToken = yield (0, generateRefreshToken_1.generateRefreshToken)(userObj);
                        refreshTokens.push(refreshToken);
                        return res
                            .status(201)
                            .json(Object.assign({ accessToken, refreshToken }, userObj));
                    }
                    else
                        return res.status(400).json('Wrong e-mail or password');
                }
                return res.status(404).json('Cound not find user with passed email');
            }
        }));
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({
                message: error.message,
                error,
            });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT USER_ID, firstname FROM users`;
        const conn = yield oracle_1.default.connect();
        conn === null || conn === void 0 ? void 0 : conn.execute(query, [], { autoCommit: true }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (error) {
                return res.status(500).json({
                    message: error.message,
                    error,
                });
            }
            return res.status(201).json((_a = result.rows) === null || _a === void 0 ? void 0 : _a.map(item => ({
                userId: item[0],
                firstName: item[1],
            })));
        }));
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({
                message: error.message,
                error,
            });
    }
});
const logout = (req, res) => {
    const { token } = req.body;
    if (!refreshTokens.includes(token))
        return res.status(404);
    refreshTokens = refreshTokens.filter(item => item !== token);
    return res.status(204);
};
exports.logout = logout;
exports.default = {
    validateToken,
    refreshToken,
    register,
    login,
    getAllUsers,
    logout: exports.logout,
};
