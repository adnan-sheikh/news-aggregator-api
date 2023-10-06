import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../config/index.js";

export function createToken(user) {
  const { id, username } = user;
  const token = jwt.sign({ id, username }, config.secrets.jwt);
  return token;
}

export function verifyToken(token) {
  const user = jwt.verify(token, config.secrets.jwt);
  return user;
}

export function hashPassword(password) {
  return bcrypt.hashSync(password, 5);
}

export function isPasswordCorrect(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}
