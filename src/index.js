import _conf from "./conf/config.js";
import { app } from "./app.js";
import { connectDb } from "./db/connectDb.js";

connectDb()
  .then(
    app.listen(_conf.port, () => {
      console.log(`Server is running on port ${_conf.port}`);
    }),
  )
  .catch((err) => {
    console.error("Connection failed !!");
    console.error(err);
    process.exit(1);
  });
