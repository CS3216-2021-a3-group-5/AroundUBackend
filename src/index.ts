import express from "express";
import routes from "./routes";
import { port } from "./config/config";
const morgan = require('morgan');

const app = express();
app.use("/", routes);
app.use(express.json());
app.use(morgan('dev'));

app.listen(port, ()=> {
  console.log(`Server running on port ${port}`)
});
