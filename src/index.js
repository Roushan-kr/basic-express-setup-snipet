import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import { connectDb } from "./db/connectDb.js";

connectDb()
  .then()
  .catch((err) => {
    console.error("Connection failed !!");
  });
