import express from "express";
import cors from "cors";
import env from "dotenv";
import bodyParser from "body-parser";
import OpenAI from "openai";
import * as process from "process";
env.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

//Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Listening port 3080
app.listen("3080", () =>
  console.log("listening on port http://localhost:3080/")
);

app.get("/", (_, res) => {
  console.log(process.env.OPENAI_API_KEY);
  res.send("Hello World");
});

app.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.5,
      max_completion_tokens: 100,
    });
    console.log(completion);

    completion.then((result) => {
      console.log(result.choices[0].message);
      res.send(result.choices[0].message);
    });
  } catch (e) {
    console.log(e);
    res.send(e).status(400);
  }
});
