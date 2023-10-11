import { getFromCache, setInCache } from "../cache/index.js";
import { MAX_TTL_FOR_ARTICLES } from "../const/index.js";
import { db } from "../db/index.js";
import { newsAPI } from "../modules/newsAPI.js";
import { logErrors } from "../utils/logErrors.js";

export function getNews({ basedOnQuery = false } = {}) {
  return async function (req, res) {
    const text = req.params.keyword;
    const { username } = req.user;
    const userFromDB = db.users[username];
    const preferences = userFromDB.preferences;
    if (!preferences) {
      return res.status(400).json({
        error:
          "There are no preferences set for fetching news. Please set preferences first!",
      });
    }

    const fetchParams = {
      ...preferences,
      text: basedOnQuery ? text : undefined,
    };

    try {
      const news = await getFromCache({
        key: fetchParams,
        maxTTL: MAX_TTL_FOR_ARTICLES,
      });
      return res.json(news);
    } catch (e) {
      if (
        e.message.includes("expired") ||
        e.message.includes("not available")
      ) {
        newsAPI
          .get("/search-news", { params: fetchParams })
          .then((news) => {
            setInCache({ key: fetchParams, value: news.data });
            news.data.news.forEach((article) => {
              const articleDetails = {
                id: article.id,
                url: article.url,
                read: false,
                favorite: false,
              };
              db.users[username].news = {
                ...db.users[username].news,
                [article.id]: articleDetails,
              };
            });
            res.json(news.data);
          })
          .catch((error) => {
            logErrors(error, {
              url: "/search-news",
              params: fetchParams,
              method: "get",
            });
            res.status(500).json({
              error: "There's an error on our server while fetching news!",
            });
          });
      }
    }
  };
}

export async function getArticle(req, res) {
  const news = req.news;

  const fetchParams = { url: news.url };
  try {
    const newsFromCache = await getFromCache({
      key: fetchParams,
    });
    return res.json(newsFromCache);
  } catch (e) {
    if (e.message.includes("expired") || e.message.includes("not available")) {
      newsAPI
        .get("/extract-news", { params: fetchParams })
        .then((article) => {
          const articleWithID = { id: news.id, ...article.data };
          setInCache({
            key: fetchParams,
            value: articleWithID,
          });
          res.json(articleWithID);
        })
        .catch((error) => {
          logErrors(error, {
            method: "get",
            params: fetchParams,
            url: "/extract-news",
          });
          res.status(500).json({
            error: "There's an error on our server while fetching news!",
          });
        });
    }
  }
}

export async function markArticleAsRead(req, res) {
  const articleID = req.params.id;
  const news = req.news;
  const username = req.user.username;

  const readNews = { ...news, read: true };
  db.users[username].news[articleID] = readNews;
  res.json(readNews);
}

export async function markArticleAsFavorite(req, res) {
  const articleID = req.params.id;
  const news = req.news;
  const username = req.user.username;

  const favoriteNews = { ...news, favorite: true };
  db.users[username].news[articleID] = favoriteNews;
  res.json(favoriteNews);
}

export async function getAllReadArticles(req, res) {
  const username = req.user.username;
  const news = Object.values(db.users[username].news);

  try {
    const allReadArticles = await Promise.all(
      news
        .filter((article) => article.read)
        .map((article) => {
          const fetchParams = { url: article.url };
          const newsFromCache = getFromCache({
            key: fetchParams,
          });
          return newsFromCache;
        })
    );
    return res.json(allReadArticles);
  } catch (error) {
    logErrors(error);
    res.status(500).json({ error: "Failed to fetch all read articles!" });
  }
}

export async function getAllFavoriteArticles(req, res) {
  const username = req.user.username;
  const news = Object.values(db.users[username].news);

  try {
    const allFavoriteArticles = await Promise.all(
      news
        .filter((article) => article.favorite)
        .map((article) => {
          const fetchParams = { url: article.url };
          const newsFromCache = getFromCache({
            key: fetchParams,
          });
          return newsFromCache;
        })
    );
    return res.json(allFavoriteArticles);
  } catch (error) {
    logErrors(error);
    res.status(500).json({ error: "Failed to fetch all favorite articles!" });
  }
}
