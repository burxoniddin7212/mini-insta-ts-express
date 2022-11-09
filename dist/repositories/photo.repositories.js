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
exports.PhotoRepository = void 0;
const Photos_1 = __importDefault(require("../modules/Photos"));
const Users_1 = __importDefault(require("../modules/Users"));
class PhotoRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield Photos_1.default.find({ status: "active" });
            return record;
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield Photos_1.default.find({ status: "active", _id });
            return record;
        });
    }
    photoPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield Photos_1.default.create(data);
            const user = yield Users_1.default.findByIdAndUpdate({ _id: record.user }, { $push: { posts: record._id } });
            return record;
        });
    }
    photoUpdate(data, _id, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.findOne(data._id);
            if (!record) {
                throw new Error("not found");
            }
            if (_id != record.user) {
                throw new Error("can only update itself");
            }
            const post = yield Photos_1.default.findByIdAndUpdate({ _id: data._id }, {
                title: data.title ? data.title : record.title,
                photo: filename ? filename : record.photo
            });
            const updatedPost = yield this.findOne(data._id);
            return updatedPost;
        });
    }
    photoDelete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.findOne(data._id);
            if (!record) {
                throw new Error("not found");
            }
            if (data.user_id != record.user) {
                throw new Error("can only delete itself");
            }
            const post = yield Photos_1.default.updateOne({ _id: data._id }, { status: 'delete' });
            return post;
        });
    }
    findOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield Photos_1.default.findOne({ _id: _id, status: "active" });
            return record;
        });
    }
}
exports.PhotoRepository = PhotoRepository;
