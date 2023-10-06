import express from "express";

import { loginUser, registerUser } from "./handler/user.js";
import { protectRoute } from "./modules/auth.js";
import { router } from "./router.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", registerUser);
app.post("/login", loginUser);

app.use("/api/v1", protectRoute, router);
