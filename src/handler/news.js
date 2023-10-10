import { getFromCache, setInCache } from "../cache/index.js";
import { MAX_TTL_FOR_ARTICLES } from "../const/index.js";
import { db } from "../db/index.js";
import { newsAPI } from "../modules/newsAPI.js";

export async function getNews(req, res) {
  const { username } = req.user;
  const userFromDB = db.users[username];
  const preferences = userFromDB.preferences;
  if (!preferences) {
    return res.status(400).json({
      error:
        "There are no preferences set for fetching news. Please set preferences first!",
    });
  }

  try {
    const news = await getFromCache({
      key: preferences,
      maxTTL: MAX_TTL_FOR_ARTICLES,
    });
    return res.json(news);
  } catch (e) {
    if (e.message.includes("expired") || e.message.includes("not available")) {
      newsAPI
        .get("/search-news", { params: preferences })
        .then((news) => {
          setInCache({ key: preferences, value: news.data });
          news.data.news.forEach((article) => {
            db.users[username] = {
              ...userFromDB,
              news: {
                ...db.users[username].news,
                [article.id]: {
                  id: article.id,
                  url: article.url,
                  read: false,
                  favorite: false,
                },
              },
            };
          });
          res.json(news.data);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({
            error: "There's an error on our server while fetching news!",
          });
        });
    }
  }
}

export async function getArticle(req, res) {
  const news = req.news;

  try {
    const newsFromCache = await getFromCache({
      key: news.url,
    });
    return res.json(newsFromCache);
  } catch (e) {
    if (e.message.includes("expired") || e.message.includes("not available")) {
      newsAPI
        .get("/extract-news", { params: { url: news.url } })
        .then((article) => {
          setInCache({ key: news.url, value: article.data });
          res.json(article.data);
        })
        .catch((error) => {
          console.error(error);
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
