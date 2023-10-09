import { cache } from "../cache/index.js";
import { MAX_TTL_FOR_ARTICLES } from "../const/index.js";
import { db } from "../db/index.js";
import { newsAPI } from "../externalAPI/newsAPI.js";

function isArticleInCacheExpired(preferences) {
  const { data, setTime } = cache.get(preferences);
  const elapsedTime = Date.now() - setTime;
  return { isArticleExpired: elapsedTime <= MAX_TTL_FOR_ARTICLES, data };
}

async function fetchNewsAndUpdateCache(preferences) {
  try {
    const news = await newsAPI.get("/top-headlines", {
      params: preferences,
    });
    cache.set(preferences, { data: news.data, setTime: Date.now() });
    return news.data;
  } catch (error) {
    console.error(error);
    throw new Error("There was an error fetching news on our server.");
  }
}

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
    if (!cache.has(preferences)) {
      const news = await fetchNewsAndUpdateCache(preferences);
      return res.json(news);
    }

    const { data, isArticleExpired } = isArticleInCacheExpired(preferences);
    if (isArticleExpired) {
      return res.json(data);
    }

    const news = await fetchNewsAndUpdateCache(preferences);
    return res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
