import { newsAPI } from "../../newsAPI.js";

/**
 * @param {any[]} paramsArr
 */
export function getAllFetchPromisesForNewsAPI(paramsArr) {
  return paramsArr.map((key) => {
    return newsAPI
      .get(key.url ? "/extract-news" : "/search-news")
      .then((res) => ({
        key,
        value: res.data,
      }))
      .catch((e) => {
        throw e;
      });
  });
}
