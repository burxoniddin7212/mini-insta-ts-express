"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PhotoSchema = new mongoose_1.Schema({
    title: {
        type: String
    },
    photo: {
        type: String,
        required: true
    },
    like: {
        type: String,
        default: "0"
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "User"
    },
    comments: [{
            type: mongoose_1.Types.ObjectId,
            ref: "Comment"
        }],
    status: {
        type: String,
        default: "active"
    }
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Photo', PhotoSchema);
