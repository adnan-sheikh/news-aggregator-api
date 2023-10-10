import { db } from "../db/index.js";

export function validateNewsArticle(req, res, next) {
  const newsID = req.params.id;
  const { username } = req.user;
  const userFromDB = db.users[username];

  const news = userFromDB.news?.[newsID];

  if (!news) {
    return res.status(404).json({
      error: "No such article found. Please provide a valid article ID!",
    });
  }

  req.news = news;
  req.userFromDB = userFromDB;
  next();
}
