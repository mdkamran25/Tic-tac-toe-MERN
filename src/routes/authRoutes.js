import { Router } from "express";
import { userLogin } from "../controller/auth.js";
const router = Router();

router.post("/auth/login", userLogin);

export default router;
