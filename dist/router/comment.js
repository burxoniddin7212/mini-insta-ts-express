"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = __importDefault(require("../controller/comment.controller"));
const router = (0, express_1.Router)();
const cheekToken_1 = __importDefault(require("../middleweire/cheekToken"));
router.get('/comment', comment_controller_1.default.GET);
router.post('/comment', [cheekToken_1.default], comment_controller_1.default.POST);
router.delete('/comment/:id', [cheekToken_1.default], comment_controller_1.default.DELETE);
exports.default = router;
