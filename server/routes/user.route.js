import express from "express";
import { getOtherUsers, getProfile, login, logout, register } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middlware.js";
import { upload } from "../middlewares/multer.middlware.js";

const router = express.Router();

router.post("/register",upload.single("avatar"), register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/get-profile", isAuthenticated, getProfile);
router.get("/get-other-users", isAuthenticated, getOtherUsers);

export default router;
