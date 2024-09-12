import _conf from "../conf/config.js";
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!_conf.db_Url || !_conf.db_Name) {
      console.error(`${_conf.db_Url}  & ${_conf.db_Name} `);
      throw new Error("Database configuration is missing");
    }

    await mongoose.connect(`${_conf.db_Url}/${_conf.db_Name}`);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      console.log("Connected to the database");
    });
    db.on("disconnected", function () {
      console.log("Disconnected from the database");
    });
    console.log("Connection state:", mongoose.connection.readyState);
  } catch (error) {
    console.log("Error connecting to the database");
    console.log(error);
  }
};

export { connectDb };
