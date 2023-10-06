import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { db } from "../db/index.js";
import { createToken } from "../modules/auth.js";

export function registerUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const user = db.users[username];
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }
  const hashedPassword = bcrypt.hashSync(password, 6);
  const newUser = {
    id: uuidv4(),
    username,
    password: hashedPassword,
  };
  db.users[username] = newUser;
  const token = createToken({ id: newUser.id, username: newUser.username });
  res.json({ ...newUser, token });
}
