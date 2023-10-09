export const cache = new Map();

function checkIfKeyExpired({ key, maxTTL }) {
  const { setTime } = cache.get(key);
  const elapsedTime = Date.now() - setTime;
  return elapsedTime > maxTTL;
}

export function getFromCache({ key, maxTTL }) {
  return new Promise((res, rej) => {
    if (cache.has(key)) {
      const isKeyExpired = checkIfKeyExpired({ key, maxTTL });
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
