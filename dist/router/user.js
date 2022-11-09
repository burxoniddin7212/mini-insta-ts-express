"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const cheekToken_1 = __importDefault(require("../middleweire/cheekToken"));
const router = (0, express_1.Router)();
router.get('/users', auth_controller_1.default.GET);
router.get('/users/:id', auth_controller_1.default.GET);
router.post('/signin', auth_controller_1.default.SIGNIN);
router.post('/signup', auth_controller_1.default.SIGNUP);
router.delete('/users', [cheekToken_1.default], auth_controller_1.default.DELETE);
exports.default = router;
