import { Router } from "express";
import controller from "../controller/photo.controller"
const router = Router();
import multer from "../lib/multer"
import cheekToken from "../middleweire/cheekToken"


router.post('/photo', [cheekToken, multer.single('photo')], controller.POST)
router.put('/photo', [cheekToken, multer.single('photo')], controller.UPDATE)
router.delete('/photo/:id', [cheekToken], controller.DELETE)
router.get('/photo', controller.GETALL)
router.get('/photo/:id', controller.GETALL)



export default router;