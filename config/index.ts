import dotenv from "dotenv";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Error envFOUND .ENV file not found");
}

export default {
  port: process.env.PORT || 3000,
  mongodb: process.env.MONGODB_URI,
  secret_key: process.env.SECRET_KEY,
};
