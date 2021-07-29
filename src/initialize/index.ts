import { app } from "../../app";
import { initiateRoute } from "./route_init";

const start = () => {
  initiateRoute(app);
};

export { start };
