import app from "./app";
import config from "./config/index";
import reelsRouter from "./modules/reels";
import { initConnection } from "./shared/utils";

initConnection().then(async () => {
  app.use("/", [reelsRouter]);
  app.listen(config.port, () => console.log(`${process.env.NODE_ENV} Server has started at port ${config.port}....`));
});
