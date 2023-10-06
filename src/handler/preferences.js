import { db } from "../db/index.js";

export function getPreferences() {}

export function createPreferences(req, res) {
  const { username } = req.user;
  const userFromDB = db.users[username];
  const preferences = req.body;
  db.users[username] = { ...userFromDB, preferences };
  res.json(preferences);
}

export function updatePreferences() {}
