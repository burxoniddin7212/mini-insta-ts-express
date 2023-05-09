import { Router } from "express";
import controller from "../controller/like.controler";
import cheekToken from "../middleweire/cheekToken";

let router = Router();

router.post("/like", [cheekToken], controller.POST);

export default router;
