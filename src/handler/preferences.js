import { db } from "../db/index.js";

export function getPreferences(req, res) {
  const { username } = req.user;
  const userFromDB = db.users[username];
  res.json(userFromDB.preferences);
}

export function createOrUpdatePreferences(req, res) {
  const { username } = req.user;
  const userFromDB = db.users[username];
  const preferences = req.body;
  db.users[username] = { ...userFromDB, preferences };
  res.json(preferences);
}
