import fs from "node:fs";

const transientWindowsErrors = new Set(["EBUSY", "EPERM", "EACCES", "UNKNOWN"]);
const retryPause = new Int32Array(new SharedArrayBuffer(4));

export function writeFileSyncWithRetry(filePath, content, encoding = "utf8") {
  for (let attempt = 0; ; attempt += 1) {
    try {
      fs.writeFileSync(filePath, content, encoding);
      return;
    } catch (error) {
      if (attempt >= 9 || !transientWindowsErrors.has(error?.code)) throw error;
      Atomics.wait(retryPause, 0, 0, 50 * (attempt + 1));
    }
  }
}
