"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const extractJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.server.tokens.accessTokenSecret, (err, decoded) => {
            if (err)
                return res.status(403).json({ message: 'Token expired' });
            res.locals.jwt = decoded;
            next();
        });
    }
    else
        return res.status(401).json({ message: 'Unauthorized' });
};
exports.default = extractJWT;
