import express from "express";
import {
  createOrUpdatePreferences,
  getPreferences,
} from "./handler/preferences.js";
import { validatePreferences } from "./middlewares/validatePreferences.js";
import { db } from "./db/index.js";
import { getArticle, getNews } from "./handler/news.js";

export const router = express.Router();

router.post("/preferences", validatePreferences, createOrUpdatePreferences);
router.get("/preferences", getPreferences);
router.put("/preferences", validatePreferences, createOrUpdatePreferences);

router.get("/news", getNews);
router.get("/news/:id", getArticle);

router.get("/users", (req, res) => {
  // @ts-ignore
  return res.send(db.users[req.user.username]);
});
