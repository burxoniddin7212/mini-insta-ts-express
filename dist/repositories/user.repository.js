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
exports.UserRepository = void 0;
const sha256_1 = __importDefault(require("sha256"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../modules/Users"));
const Photos_1 = __importDefault(require("../modules/Photos"));
class UserRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield Users_1.default.find({ status: "active" });
            return record;
        });
    }
    getAllRegex(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield Users_1.default.find({ status: "active", user_name: { $regex: '.*' + value } }, { user_name: true });
            return record;
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield Users_1.default.findOne({ _id, status: "active" }, { user_name: true }).populate({ path: 'posts' });
            return record;
        });
    }
    delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield Users_1.default.findOne({
                _id: data.user_id,
                password: (0, sha256_1.default)(data.password),
                status: "active"
            });
            if (!user) {
                throw new Error("invalid value");
            }
            const record = yield Users_1.default.updateOne({ _id: data.user_id }, { user_name: 'deleteaccaunt' });
            let post = yield Photos_1.default.updateMany({ user: data.user_id }, { status: 'delete' });
            return record;
        });
    }
    signin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findOne(email);
            console.log(user);
            console.log((0, sha256_1.default)(password) == (user === null || user === void 0 ? void 0 : user.password));
            if (!user) {
                throw new Error("user not found");
            }
            else if (user.password != (0, sha256_1.default)(password)) {
                throw new Error("invalid password");
            }
            else {
                let token = jsonwebtoken_1.default.sign({ user_id: user._id }, "olma");
                return { user, token };
            }
        });
    }
    signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findOne(data.email);
            if (user) {
                throw new Error("email unieq");
            }
            else {
                data.password = (0, sha256_1.default)(data.password);
                const { user_name, _id, email, password } = yield Users_1.default.create(data);
                let token = jsonwebtoken_1.default.sign({ user_id: _id }, "olma");
                return { user_name, _id, email, password, token };
            }
        });
    }
    findOne(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield Users_1.default.findOne({ email: email });
            return record;
        });
    }
}
exports.UserRepository = UserRepository;
