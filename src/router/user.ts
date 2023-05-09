import { Router } from "express";
import controller from "../controller/auth.controller";
import cheekToken from "../middleweire/cheekToken";
const router = Router();

router.get("/users", controller.GET);
router.get("/users/:id", controller.GET);
router.post("/signin", controller.SIGNIN);
router.post("/signup", controller.SIGNUP);
router.delete("/users", [cheekToken], controller.DELETE);

export default router;
