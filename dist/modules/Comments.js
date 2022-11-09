"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "User"
    },
    post_id: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "Photo"
    },
    tittle: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "active"
    }
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Comment', CommentSchema);
