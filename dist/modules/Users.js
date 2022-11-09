"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'Photo'
        }],
    status: {
        type: String,
        default: "active"
    }
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
