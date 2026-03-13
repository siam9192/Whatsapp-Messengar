import { server } from "./app";
import { initClients } from "./whats-app/client";
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("Server is running on port", port);
  initClients()
});
