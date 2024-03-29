import { config } from "dotenv";
import express from "express";

if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode.");
  config({ path: ".prod.env" });
} else {
  console.log("Running in develop mode.");
  config({ path: ".dev.env" });
}

const { PORT } = process.env;
const app = express();
app.use(express.json());

import shopRouter from './shop';
app.use(shopRouter)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
