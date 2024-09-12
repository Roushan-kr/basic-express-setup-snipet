import express from "express";
import cros from "cors";
import cookieParser from "cookie-parser";


const app = express();
app.use(cookieParser());

app.use(
  cros({
    origin: process.env.ALLOWED_ORIGN,
    Credential: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

import {compFeed,userCRUD,feedBack} from './routes/index.js';


app.get("/", (req, res) => {
  res.send("App is working");
});

app.use("/api/v1/user", userCRUD);
app.use("/api/v1/feedback", feedBack);
app.use("/api/v1/feed", compFeed);
// basic need to express

export { app };
