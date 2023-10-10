import { generateStringifiedKey } from "../utils/index.js";

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
    const preparedKey = generateStringifiedKey(key);
    if (cache.has(preparedKey)) {
      const isKeyExpired = maxTTL
        ? checkIfKeyExpired({ key: preparedKey, maxTTL })
        : false;
      if (isKeyExpired) {
        return rej(new Error("Key has expired!"));
      }
      return res(cache.get(preparedKey).data);
    } else {
      return rej(new Error("Key is not available in cache!"));
    }
  });
}

export function setInCache({ key, value }) {
  const preparedKey = generateStringifiedKey(key);
  cache.set(preparedKey, { data: value, setTime: Date.now() });
}
