import express from "express";
import routes from "./routes";
import { port } from "./config/config";
const app = express();
app.use("/", routes)
app.listen(port, ()=> {
  console.log(`Server running on port ${port}`)
});