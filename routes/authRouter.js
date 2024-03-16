import express from "express";
import {
  registerUsers,
  loginUsers,
  logoutUser,
  updateSubscription,
  getAvatar,
  uploadAvatar,
} from "../controllers/usersControllers.js";
import { auth } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const authRouter = express.Router();

authRouter.post("/register", registerUsers);
authRouter.post("/login", loginUsers);
authRouter.get("/logout", auth, logoutUser);
authRouter.patch("/", auth, updateSubscription);
authRouter.patch("/avatar", auth, upload.single("avatarURL"), uploadAvatar);
authRouter.get("/avatar", auth, getAvatar);

export default authRouter;