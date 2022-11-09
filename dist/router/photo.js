"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const photo_controller_1 = __importDefault(require("../controller/photo.controller"));
const router = (0, express_1.Router)();
const multer_1 = __importDefault(require("../lib/multer"));
const cheekToken_1 = __importDefault(require("../middleweire/cheekToken"));
router.post('/photo', [cheekToken_1.default, multer_1.default.single('photo')], photo_controller_1.default.POST);
router.put('/photo', [cheekToken_1.default, multer_1.default.single('photo')], photo_controller_1.default.UPDATE);
router.delete('/photo/:id', [cheekToken_1.default], photo_controller_1.default.DELETE);
router.get('/photo', photo_controller_1.default.GETALL);
router.get('/photo/:id', photo_controller_1.default.GETALL);
exports.default = router;
