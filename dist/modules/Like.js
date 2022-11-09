"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LikeSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "User"
    },
    post: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "Photo"
    },
    status: {
        type: String,
        default: "active"
    }
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Like', LikeSchema);
