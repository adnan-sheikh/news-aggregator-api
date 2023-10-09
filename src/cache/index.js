export const cache = new Map();

function checkIfKeyExpired({ key, maxTTL }) {
  const { setTime } = cache.get(key);
  const elapsedTime = Date.now() - setTime;
  return elapsedTime > maxTTL;
}

/**
 *
 * Max TTL is not necessary. When provided, only then expiry is checked
 */
export function getFromCache({ key, maxTTL = null }) {
  return new Promise((res, rej) => {
    if (cache.has(key)) {
      const isKeyExpired = maxTTL ? checkIfKeyExpired({ key, maxTTL }) : false;
      if (isKeyExpired) {
        return rej(new Error("Key has expired!"));
      }
      return res(cache.get(key).data);
    } else {
      return rej(new Error("Key is not available in cache!"));
    }
  });
}

export function setInCache({ key, value }) {
  cache.set(key, { data: value, setTime: Date.now() });
}
