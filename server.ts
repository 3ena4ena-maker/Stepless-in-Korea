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
    const prompt = `Translate and polish the following travel recommendation details into natural, tourist-friendly English:
Topic: ${topic}
Station/Exit: ${stationOrExit || ''}
Content: ${content}`;

    const response = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are an expert friendly editor and translator for Busan transit and travel guides. 
Your task is to translate any Korean or mixed-language input text into natural, native, engaging, and professional tourist-friendly English.

Follow these strict rules:
1. If the input is in Korean or a mixture of Korean and English, translate it to native English while preserving a warm and inviting tone.
2. If the input is already in English, refine and polish any grammar or broken phrases to make it sound perfect and native.
3. Keep transit proper nouns in standard localized format:
   - Station Name format: '[Name] Station' (e.g. '서면역' -> 'Seomyeon Station', '전포역' -> 'Jeonpo Station', '남포역' -> 'Nampo Station', '해운대역' -> 'Haeundae Station').
   - Exit format: 'Exit [Number]' or 'Exits [Number 1] & [Number 2]' (e.g. '5번 출구' -> 'Exit 5', '7번출구' -> 'Exit 7').
4. Local dishes/destinations should be explained warmly where fits, or romanized cleanly with readable names:
   - '이재모피자' -> 'Lee Jae Mo Pizza'
   - '돼지국밥' -> 'Pork Soup (Dwaeji-gukbap)'
   - '밀면' -> 'Wheat Noodles (Milmyeon)'
   - '광안대교' -> 'Gwangan Bridge (Gwangandaegyo)'
   - '영도대교' -> 'Yeongdo Bridge'
5. Make sure the output is polite, easy for tourists to read, and formatted nicely.

Respond STRICTLY with a valid JSON object matching the requested schema. No conversational preamble.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: {
              type: Type.STRING,
              description: "The translated English title/topic, polished beautifully"
            },
            stationOrExit: {
              type: Type.STRING,
              description: "The translated English station name or exit details"
            },
            content: {
              type: Type.STRING,
              description: "The fully translated, warm, natural English body content"
            }
          },
          required: ["topic", "stationOrExit", "content"]
        }
      }
    });

    let text = response.text;
    if (!text) {
      throw new Error("Empty translation response from Gemini");
    }

    // Safely strip markdown backticks if returned in worst case
    text = text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
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
