import express from "express";
import cros from "cros";
import {userCRUD, feedBack} from './routes/index.js';
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());

app.use(
  cros({
    origin: process.env.ALLOWED_ORIGN,
    Credential: true,
  })
);

app.get("/", (req, res) => {
  res.send("App is working");
});

app.use("/api/v1/user", require(userCRUD));
app.use("/api/v1/feedback", require(feedBack));
// basic need to express
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

export { app };
