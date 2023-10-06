import express from "express";
import { loginUser, registerUser } from "./handler/user.js";
import { db } from "./db/index.js";
import { protectRoute } from "./modules/auth.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", registerUser);
app.post("/login", loginUser);

app.get("/users", protectRoute, (req, res) => {
  return res.json(
    Object.values(db.users).map((user) => {
      const { password, ...rest } = user;
      return rest;
    })
  );
});
