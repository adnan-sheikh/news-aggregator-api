import { cache } from "../cache/index.js";
import { MAX_TTL_FOR_ARTICLES } from "../const/index.js";
import { db } from "../db/index.js";
import { newsAPI } from "../externalAPI/newsAPI.js";

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
      const news = await newsAPI.get("/top-headlines", {
        params: preferences,
      });
      cache.set(preferences, { data: news.data, setTime: Date.now() });
      return res.json(news.data);
    }

    const { data, setTime } = cache.get(preferences);
    const elapsedTime = Date.now() - setTime;
    if (elapsedTime <= MAX_TTL_FOR_ARTICLES) {
      return res.json(data);
    }

    const news = await newsAPI.get("/top-headlines", {
      params: preferences,
    });
    cache.set(preferences, { data: news.data, setTime: Date.now() });
    return res.json(news.data);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "There was an error fetching news on our server." });
  }
}
