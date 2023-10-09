import config from "../config/index.js";
import axios from "axios";

export const newsAPI = axios.create({
  baseURL: config.newsAPI.url,
  params: {
    "api-key": config.newsAPI.key,
  },
});
