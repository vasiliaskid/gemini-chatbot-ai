import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

// Initialize Express app
const app = express();

// Initialize Gemini AI with API key
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// Set default model
const MODEL_NAME = "gemini-2.5-flash";

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});


// Chat endpoint for multi-turn conversations
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    // Validate input
    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "Messages must be an array of conversation turns",
      });
    }

    const contents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const resp = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: contents
    });
    res.json(resp);
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({
      error: "Failed to process chat request",
      details: error.message,
    });
  }
});
