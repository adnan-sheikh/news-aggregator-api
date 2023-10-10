/**
 *
 * Expects only Objects, Strings or Numbers as arguments
 * @returns If input is a string or number, returns same key. If input is an Object, returns stringified object for consistency
 */
export function generateStringifiedKey(key) {
  if (key == null) {
    throw new Error("Key is required!");
  }
  if (typeof key === "string" || typeof key === "number") {
    return key;
  }
  return JSON.stringify(key);
}
