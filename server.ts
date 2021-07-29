import { app } from "./app";
import { appCreds } from "./src/config";
const port: number = appCreds.port;

app.listen(port, () => {
  console.log("Server started successfully on port ", port);
});
