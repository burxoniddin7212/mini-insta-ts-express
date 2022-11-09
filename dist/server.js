"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./lib/db"));
const user_1 = __importDefault(require("./router/user"));
const photo_1 = __importDefault(require("./router/photo"));
const comment_1 = __importDefault(require("./router/comment"));
let app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(process.cwd(), 'src', 'uploades')));
(0, db_1.default)();
app.use(user_1.default);
app.use(photo_1.default);
app.use(comment_1.default);
app.listen(5000, () => console.log("server readey 5000"));
