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
  res.send("Hello World");
});

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log("Message Requested: ", message);

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
    });

    console.log(completion.choices[0].message);
    res.status(200).json({ message: completion.choices[0].message.content });
  } catch (e) {
    console.log("error is here", e);
    res.send(e).status(400);
  }
});
