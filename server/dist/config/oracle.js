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
const oracledb_1 = __importDefault(require("oracledb"));
const config_1 = __importDefault(require("./config"));
const params = {
    user: config_1.default.oracle.user,
    password: config_1.default.oracle.pass,
    connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=${config_1.default.oracle.host})(Port=${config_1.default.oracle.port}))(CONNECT_DATA=(SID=${config_1.default.oracle.database})))`,
};
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield oracledb_1.default.getConnection(Object.assign({}, params));
        return connection;
    }
    catch (error) {
        console.error(`[ERROR] ${error}`);
    }
});
exports.default = { connect };
