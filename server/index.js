import express from "express";
import cors from "cors";
import env from "dotenv";
import bodyParser from "body-parser";
// import { Configuration, OpenAIApi } from "openai";

const app = express();

env.config();

app.use(cors());

app.use(bodyParser.json());

app.listen("3080", () => console.log("listening on port 3080"));

app.get("/", (req, res) => {
  res.send("Hello World");
});
