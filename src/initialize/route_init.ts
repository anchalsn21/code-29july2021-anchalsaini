import { Application } from "express";
import { router as mainRoute } from "../routes/index";

const initiateRoute = (app: Application): void => {
  app.use("/", mainRoute);
};

export { initiateRoute };
