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
const comment_repositories_1 = require("./../repositories/comment.repositories");
let CommentRepo = new comment_repositories_1.CommentRepository();
let GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let rezult = yield CommentRepo.getAll();
        return res.status(200).send({
            status: 200,
            message: "ok",
            data: rezult
        });
    }
    catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        });
    }
});
let POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let rezult = yield CommentRepo.post(Object.assign(Object.assign({}, req.body), { user_id: req.user_id }));
        return res.status(200).send({
            status: 200,
            message: "ok",
            data: rezult
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
        let rezult = yield CommentRepo.delete(req.params.id, req.user_id);
        return res.status(200).send({
            status: 200,
            message: "deleted",
            data: rezult
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
    DELETE,
    GET
};
