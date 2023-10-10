import fs from "fs/promises";
import path from "path";
import { getHumanReadableDateString } from "../../../utils/getHumanReadableDateString.js";

export function addLogToSuccessCacheFile() {
  const now = new Date();
  const updateTime = getHumanReadableDateString(now);
  fs.appendFile(
    path.resolve("src", "cache", "cache.success.log"),
    `Cache updated successfully on ${updateTime}\n`
  );
}
