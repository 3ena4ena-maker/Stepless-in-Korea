import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing");
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

// Translate endpoint
app.post("/api/translate", async (req, res) => {
  try {
    const { topic, content, stationOrExit } = req.body;

    if (!topic || !content) {
      return res.status(400).json({ error: "Missing fields to translate" });
    }

    const gemini = getGemini();
    const prompt = `Translate the following travel recommendation details into natural English:
Topic: ${topic}
Station/Exit: ${stationOrExit || ''}
Content: ${content}`;

    const response = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert translator translating travel tips and recommendations and transit guidance for tourists in Busan. Translate the input Korean texts to clear, friendly, and natural English keeping original vibe. Keep station names and exits in standard format (e.g. '서면역' -> 'Seomyeon Station', '전포역' -> 'Jeonpo Station', '5번 출구' -> 'Exit 5'). Respond STRICTLY under the requested JSON schema.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: {
              type: Type.STRING,
              description: "The translated English title or topic"
            },
            stationOrExit: {
              type: Type.STRING,
              description: "The translated English station or exit info"
            },
            content: {
              type: Type.STRING,
              description: "The translated English body content"
            }
          },
          required: ["topic", "stationOrExit", "content"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty translation response from Gemini");
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error("Translation API error:", error);
    return res.status(500).json({ error: error.message || "Failed to translate content" });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
