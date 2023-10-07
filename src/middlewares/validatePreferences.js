import { COUNTRIES, NEWS_CATEGORIES } from "../const/index.js";
import { isEmpty } from "../utils/isEmpty.js";

export function validatePreferences(req, res, next) {
  const preferences = req.body;
  const query = preferences?.query;
  const category = preferences?.category;
  const country = preferences?.country;
  const errors = [];
  // if (isEmpty(query)) {
  //   errors.push({ error: "query cannot be empty" });
  // }
  if (category && !NEWS_CATEGORIES.includes(category)) {
    errors.push({
      error: "This category is not supported. Please choose a valid category",
    });
  }
  if (isEmpty(country)) {
    errors.push({ error: "country cannot be empty" });
  } else if (!COUNTRIES.includes(country)) {
    errors.push({
      error: "Please choose a valid country!",
    });
  }
  if (errors.length !== 0) {
    return res.status(400).json(errors);
  }
  req.body = { q: query, category, country };
  next();
}
