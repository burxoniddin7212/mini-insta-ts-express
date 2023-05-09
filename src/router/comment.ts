import { Router } from "express";
import controller from "../controller/comment.controller";
import cheekToken from "../middleweire/cheekToken";

const router = Router();

router.get("/comment", controller.GET);
router.post("/comment", [cheekToken], controller.POST);
router.delete("/comment/:id", [cheekToken], controller.DELETE);

export default router;
