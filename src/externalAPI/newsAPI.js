import config from "../config/index.js";
import axios from "axios";

export const newsAPI = axios.create({
  baseURL: config.newsAPI.url,
  params: {
    apiKey: config.newsAPI.key,
  },
});
