/**
 *
 * @param {Map} cache
 */
export function getAllCacheKeys(cache) {
  return Array.from(cache.keys()).map((key) => JSON.parse(key));
}
