import express from "express";
import cros from "cros";

const app = express();

app.use(
  cros({
    origin: process.env.ALLOWED_ORIGN,
    Credential: true,
  })
);

app.get("/", (req, res) => {
  res.send("App is working");
});

// basic need to express
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`App is lishing at ${process.env.PORT} `);
});

export { app };
