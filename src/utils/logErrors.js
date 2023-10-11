import fs from "fs/promises";
import path from "path";
import { getHumanReadableDateString } from "./getHumanReadableDateString.js";

/**
 *
 * @param {Error} e
 * @param {{url, params, method}} meta
 */
export function logErrors(
  e,
  meta = {
    url: undefined,
    params: undefined,
    method: undefined,
  }
) {
  const now = new Date();
  const errorTime = getHumanReadableDateString(now);
  fs.appendFile(
    path.resolve("src", "logs", "main.error.log"),
    `${errorTime}:: ${
      meta
        ? meta?.method?.toUpperCase() + meta?.url + JSON.stringify(meta?.params)
        : ""
    }\nReason: ${e.message}\n\n`
  );
}
