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
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("./../repositories/user.repository");
let UserRepo = new user_repository_1.UserRepository();
let GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let record;
        if ((_a = req.query) === null || _a === void 0 ? void 0 : _a.name) {
            record = yield UserRepo.getAllRegex(req.query.name);
        }
        else {
            if ((_b = req.params) === null || _b === void 0 ? void 0 : _b.id) {
                record = yield UserRepo.getById(req.params.id);
                if ((record === null || record === void 0 ? void 0 : record.status) == "closed") {
                    return res.status(200).send({
                        status: 200,
                        message: "closed profile"
                    });
                }
            }
            else {
                record = yield UserRepo.getAll();
            }
        }
        return res.status(200).send({
            status: 200,
            message: "ok",
            data: record
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        });
    }
});
let GETREGEX = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let record = yield UserRepo.getAllRegex(req.query.name);
        return res.status(200).send({
            status: 200,
            message: "ok",
            data: record
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        });
    }
});
let DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        if (!((_c = req.body) === null || _c === void 0 ? void 0 : _c.password)) {
            return res.status(400).send({
                status: 400,
                message: "password required"
            });
        }
        let record = yield UserRepo.delete({ user_id: req.user_id, password: (_d = req.body) === null || _d === void 0 ? void 0 : _d.password });
        return res.status(200).send({
            status: 200,
            message: "deleted",
            data: record
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        });
    }
});
let SIGNIN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let record = yield UserRepo.signin(req.body.email, req.body.password);
        let { user: { email, _id, user_name }, token } = record;
        return res.status(200).send({ email, _id, user_name, token });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        });
    }
});
let SIGNUP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let record = yield UserRepo.signup(req.body);
        let { email, _id, user_name, token } = record;
        return res.status(200).send({ email, _id, user_name, token });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        });
    }
});
exports.default = {
    GET,
    SIGNIN,
    SIGNUP,
    GETREGEX,
    DELETE
};
