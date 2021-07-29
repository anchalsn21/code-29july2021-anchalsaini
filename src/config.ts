import dotenv from "dotenv";
dotenv.config();

const appCreds = {
  port: Number(process.env.PORT) || 3010,
  baseUrl: process.env.BASE_URL || "http://localhost:3010",
};

export { appCreds };
