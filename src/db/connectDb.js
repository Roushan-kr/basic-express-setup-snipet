import { DB_NAME } from "./constants.js";

const connectDb = async () => {
  if (!process.env.CONNECTION_STRING) {
    console.log("Unable to find cunnection string");
    throw new Error("Check connection string");
  }
  // your code to connect
};

export { connectDb };
