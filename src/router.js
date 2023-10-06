import express from "express";
import {
  createPreferences,
  getPreferences,
  updatePreferences,
} from "./handler/preferences.js";
import { validatePreferences } from "./middlewares/validatePreferences.js";
import { db } from "./db/index.js";

export const router = express.Router();

router.post("/preferences", validatePreferences, createPreferences);
router.get("/preferences", getPreferences);
router.put("/preferences", validatePreferences, updatePreferences);

router.get("/users", (req, res) => {
  // @ts-ignore
  return res.send(db.users[req.user.username]);
});
