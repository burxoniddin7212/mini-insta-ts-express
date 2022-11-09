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
exports.CommentRepository = void 0;
const Comments_1 = __importDefault(require("../modules/Comments"));
const Photos_1 = __importDefault(require("../modules/Photos"));
class CommentRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let comments = yield Comments_1.default.find({ status: "active" });
            return comments;
        });
    }
    post(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let comment = yield Comments_1.default.create(data);
            let photo = yield Photos_1.default.findByIdAndUpdate({ _id: data.post_id }, { $push: { comments: comment._id } });
            return comment;
        });
    }
    delete(_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let comment = yield this.findById(_id);
            if (!comment) {
                throw new Error("data not found");
            }
            let photo = yield Photos_1.default.find({ user_id });
            let value;
            photo.forEach(data => {
                data.comments.forEach(info => {
                    if (info == _id) {
                        value = "salom";
                    }
                });
            });
            if (user_id != (comment === null || comment === void 0 ? void 0 : comment.user_id) || !value) {
                throw new Error("can only delete what he wrote or posted himself");
            }
            let removeComment = yield Comments_1.default.updateOne({ _id: _id }, { status: "delete" });
            let removedcomment = yield Comments_1.default.findById({ _id: _id });
            return removedcomment;
        });
    }
    findById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield Comments_1.default.findById({ _id: _id, status: "active" });
            return data;
        });
    }
}
exports.CommentRepository = CommentRepository;
