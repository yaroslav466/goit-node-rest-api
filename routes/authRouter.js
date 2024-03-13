import express from "express";
import {
  registerUsers,
  loginUsers,
  logoutUser,
  updateSubscription,
} from "../controllers/usersControllers.js";
import { auth } from "../controllers/auth.js";

const usersRouter = express.Router();

usersRouter.post("/register", registerUsers);
usersRouter.post("/login", loginUsers);
usersRouter.get("/logout", auth, logoutUser);
usersRouter.patch("/", auth, updateSubscription);

export default usersRouter;