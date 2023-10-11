import express from "express";
import {
  createOrUpdatePreferences,
  getPreferences,
} from "./handler/preferences.js";
import {
  getAllFavoriteArticles,
  getAllReadArticles,
  getArticle,
  getNews,
  markArticleAsFavorite,
  markArticleAsRead,
} from "./handler/news.js";
import {
  validateNewsArticle,
  validatePreferences,
} from "./middlewares/index.js";

export const router = express.Router();

router.post("/preferences", validatePreferences, createOrUpdatePreferences);
router.get("/preferences", getPreferences);
router.put("/preferences", validatePreferences, createOrUpdatePreferences);

router.get("/news", getNews());
router.get("/news/read", getAllReadArticles);
router.get("/news/favorite", getAllFavoriteArticles);
router.get("/news/search/:keyword", getNews({ basedOnQuery: true }));
router.get("/news/:id", validateNewsArticle, getArticle);
router.post("/news/:id/read", validateNewsArticle, markArticleAsRead);
router.post("/news/:id/favorite", validateNewsArticle, markArticleAsFavorite);
