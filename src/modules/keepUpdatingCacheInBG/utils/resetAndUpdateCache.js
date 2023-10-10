import { setInCache } from "../../../cache/index.js";

/**
 *
 * @param {Map} cache
 * @param {{key, value}[]} allProperties
 */
export function resetAndUpdateCache(cache, allProperties) {
  cache.clear();
  allProperties.forEach(({ key, value }) => {
    setInCache({ key, value });
  });
}
