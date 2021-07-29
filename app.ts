import express, { Application } from "express";
import { start } from "./src/initialize";

const app: Application = express();

/**
 * @description - Inititiate all required components and Bootstrap the application
 */

(function () {
  // Initiate all the required components of the app
  start();
})();

/**
 * @description - Below handles the uncaught rejections
 */

process.on("uncaughtException", (err: Error) => {
  console.log("Unhandled rejections are caught Here ");
});
export { app };
