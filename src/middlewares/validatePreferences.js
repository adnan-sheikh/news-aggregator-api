import { COUNTRIES, LANGUAGE } from "../const/index.js";
import { isEmpty } from "../utils/index.js";

export function validatePreferences(req, res, next) {
  const preferences = req.body;
  const countries = preferences?.["source-countries"];
  const language = preferences?.language;
  const authors = preferences?.authors;

  const errors = [];

  if (isEmpty(countries)) {
    errors.push({
      location: "source-countries",
      message:
        "Atleast 1 country is required! Provide comma-separated countries following ISO 3166",
    });
  } else {
    const countriesArr = countries.split(",").map((country) => country.trim());
    countriesArr.forEach((country) => {
      if (!COUNTRIES.includes(country)) {
        errors.push({
          location: "source-countries",
          message: `<i>${country}</i> country code is not identified as per ISO 3166`,
        });
      }
    });
  }

  if (isEmpty(language)) {
    errors.push({
      location: "language",
      message: "Language is required, following ISO 6391!",
    });
  } else {
    if (!LANGUAGE.includes(language)) {
      errors.push({
        location: "language",
        message: `<i>${language}</i> is not identified as per ISO 6391`,
      });
    }
  }

  if (errors.length !== 0) {
    return res.status(400).json(errors);
  }

  req.body = {
    "source-countries": countries,
    language,
    authors,
  };
  next();
}
