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
const photo_repositories_1 = require("./../repositories/photo.repositories");
let PhotoRepo = new photo_repositories_1.PhotoRepository();
let POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const requestData = {
            photo: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
            title: req.body.title,
            user: req.body.user
        };
        let record = yield PhotoRepo.photoPost(requestData);
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
let UPDATE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        let record = yield PhotoRepo.photoUpdate(req.body, req.user_id, (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename);
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
    try {
        let record = yield PhotoRepo.photoDelete({ user_id: req.user_id, _id: req.params.id });
        return res.status(200).send({
            status: 200,
            message: "deleted"
        });
    }
    catch (error) {
        if (error.name == "CastError") {
            return res.status(400).send({
                status: 400,
                message: "Validation error"
            });
        }
        return res.status(400).send({
            status: 400,
            message: error
        });
    }
});
let GETALL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        if ((_c = req.params) === null || _c === void 0 ? void 0 : _c.id) {
            let record = yield PhotoRepo.getById(req.params.id);
            return res.status(200).send({
                status: 200,
                message: "ok",
                data: record
            });
        }
        let record = yield PhotoRepo.getAll();
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
exports.default = {
    POST,
    UPDATE,
    DELETE,
    GETALL
};
