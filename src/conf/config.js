import dotenv from "dotenv";
dotenv.config();

const _conf = {
  // Server for dev environment
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  corsOptions: process.env.HOST || "localhost",

  // base configuration
  db_Name: process.env.DB_NAME || "feedback",
  db_Url: process.env.MONGODB_URI,
  jwt_secret: process.env.JWT_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,

  // production configuration
  jwt_expiration: process.env.JWT_EXPIRATION,
  jwt_refresh_expiration: process.env.JWT_REFRESH_EXPIRATION,
};

Object.freeze(_conf);

export default _conf;

// # future improvements
// 1. Add more configuration options via config npm pgk for robust environment configuration
