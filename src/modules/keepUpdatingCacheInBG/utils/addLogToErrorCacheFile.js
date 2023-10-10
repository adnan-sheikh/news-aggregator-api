import fs from "fs/promises";
import path from "path";
import { getHumanReadableDateString } from "../../../utils/getHumanReadableDateString.js";

/**
 *
 * @param {Error} e
 */
export function addLogToErrorCacheFile(e) {
  const now = new Date();
  const errorTime = getHumanReadableDateString(now);
  fs.appendFile(
    path.resolve("src", "cache", "cache.error.log"),
    `${errorTime}: Error updating cache. Reason: ${e.message}`
  );
}
