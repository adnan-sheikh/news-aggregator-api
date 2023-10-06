import bcrypt from "bcrypt";
import { db } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";

export function registerUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const user = db.users[username];
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }
  const hashedPassword = bcrypt.hashSync(password, 6);
  db.users[username] = {
    id: uuidv4(),
    username,
    password: hashedPassword,
  };
  res.json(db.users[username]);
}
