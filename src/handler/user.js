import { v4 as uuidv4 } from "uuid";

import { db } from "../db/index.js";
import {
  createToken,
  hashPassword,
  isPasswordCorrect,
} from "../modules/auth.js";

export function registerUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const user = db.users[username];
  if (user) {
    return res
      .status(400)
      .json({ error: "User already exists. Try logging in!" });
  }
  const hash = hashPassword(password);
  const newUser = {
    id: uuidv4(),
    username,
    password: hash,
  };
  db.users[username] = newUser;
  const token = createToken(newUser);
  res.json({ id: newUser.id, username: newUser.username, token });
}

export function loginUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const userInDB = db.users[username];
  if (!(userInDB && isPasswordCorrect(password, userInDB.password))) {
    return res.status(401).json({ error: "Invalid username or password!" });
  }

  const token = createToken(userInDB);
  res.json({ id: userInDB.id, username: userInDB.username, token });
}
