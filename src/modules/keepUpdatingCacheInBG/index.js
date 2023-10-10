import { cache } from "../../cache/index.js";
import { MAX_TIME_FOR_CACHE_UPDATE } from "../../const/index.js";
import {
  addLogToErrorCacheFile,
  addLogToSuccessCacheFile,
  getAllCacheKeys,
  getAllFetchPromisesForNewsAPI,
  resetAndUpdateCache,
} from "./utils/index.js";

export function keepUpdatingCacheInBG() {
  setInterval(() => {
    const keysToUpdate = getAllCacheKeys(cache);
    if (keysToUpdate.length === 0) {
      return;
    }
    Promise.all(getAllFetchPromisesForNewsAPI(keysToUpdate))
      .then((allNews) => {
        resetAndUpdateCache(cache, allNews);
        addLogToSuccessCacheFile();
      })
      .catch(addLogToErrorCacheFile);
  }, MAX_TIME_FOR_CACHE_UPDATE);
}
