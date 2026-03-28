const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());

const openai = new OpenAI({
  apiKey: "YOUR_OPENAI_API_KEY"
});

app.get("/quiz", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Generate 5 MCQ questions in JSON format:
          Topic: General Knowledge
          Difficulty: Medium

          Format:
          [
            {
              "question": "...",
              "options": ["A","B","C","D"],
              "answer": "A"
            }
          ]`
        }
      ]
    });

    const text = response.choices[0].message.content;
    res.json(JSON.parse(text));

  } catch (err) {
    res.status(500).send("Error generating questions");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
