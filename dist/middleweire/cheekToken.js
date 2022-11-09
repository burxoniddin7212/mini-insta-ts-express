"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let cheekToken = (req, res, next) => {
    try {
        let { token } = req.headers;
        if (!token)
            throw new Error("token requared");
        let { user_id } = jsonwebtoken_1.default.verify(token, "olma");
        if (user_id)
            req.user_id = user_id;
        next();
    }
    catch (error) {
        res.status(401).send({
            status: 401,
            message: error.message
        });
    }
};
exports.default = cheekToken;
