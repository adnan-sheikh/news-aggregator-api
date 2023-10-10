import "dotenv/config";

import config from "./config/index.js";
import { app } from "./server.js";
import { keepUpdatingCacheInBG } from "./modules/keepUpdatingCacheInBG/index.js";

keepUpdatingCacheInBG();

app.listen(config.port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server started at port:${config.port}`);
});
