import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../config/index.js";
import { db } from "../db/index.js";

export function createToken(user) {
  const { id, username } = user;
  const token = jwt.sign({ id, username }, config.secrets.jwt, {
    expiresIn: "0.75d",
  });
  return token;
}

export function verifyToken(token) {
  const user = jwt.verify(token, config.secrets.jwt);
  return user;
}

export function protectRoute(req, res, next) {
  const bearer = req.headers.authorization;
  const [prefix, token] = bearer?.split(" ") ?? [];
  if (prefix !== "Bearer" || !token) {
    return res.status(401).json({ error: "Unauthorized access!" });
  }

  try {
    const user = verifyToken(token);
    if (typeof user !== "string" && !db.users[user.username]) {
      throw new Error("No such user found!");
    }
    req.user = user;
    next();
  } catch (e) {
    return res
      .status(401)
      .json({ error: e?.message ? e.message : "Invalid token!" });
  }
}

export function hashPassword(password) {
  return bcrypt.hashSync(password, 5);
}

export function isPasswordCorrect(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}
