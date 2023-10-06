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
