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

    console.log("Translation requested on backend:", { topic, content, stationOrExit });

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
1. If the input is in genuine Korean Hangeul (or a mixture of Korean and English), translate it to beautiful native English.
2. IMPORTANT: If the input is written in Romanized Korean (Korean words written phonetically using English letters, e.g., "geoleogagi" which means walking, "daegyo" which means bridge, "molrasseoyo" which means didn't know, "wanjeon gangchu" which means highly recommend), recognize the Korean words phonetically, understand their meaning, and translate them into native, natural, beautiful English. For example, "Yeongdo Deuleoganeun Daegyoinde Geoleogal Su" is Romanized Korean for "It is a bridge entering Yeongdo, and you can walk across" — translate this to natural English.
3. If the input is already in standard English, refine and polish any grammar or broken phrases to make it sound perfect, native, and engaging.
4. Keep transit proper nouns in standard localized format:
   - Station Name format: '[Name] Station' (e.g. '서면역' -> 'Seomyeon Station', '전포역' -> 'Jeonpo Station', '남포역' -> 'Nampo Station', '해운대역' -> 'Haeundae Station').
   - Exit format: 'Exit [Number]' or 'Exits [Number 1] & [Number 2]' (e.g. '5번 출구' -> 'Exit 5', '7번출구' -> 'Exit 7').
5. Local dishes/destinations should be explained warmly where fits, or romanized cleanly with readable names:
   - '이재모피자' -> 'Lee Jae Mo Pizza'
   - '돼지국밥' -> 'Pork Soup (Dwaeji-gukbap)'
   - '밀면' -> 'Wheat Noodles (Milmyeon)'
   - '광안대교' -> 'Gwangan Bridge (Gwangandaegyo)'
   - '영도대교' -> 'Yeongdo Bridge'
6. Make sure the output is polite, easy for tourists to read, and formatted nicely.

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
          required: ["topic", "content"] // Relax schema by only making topic and content required
        }
      }
    });

    let text = response.text;
    if (!text) {
      throw new Error("Empty translation response from Gemini");
    }

    // Safely strip markdown backtokens if returned in worst case
    text = text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    }

    console.log("Raw response from Gemini model:", text);

    const parsed = JSON.parse(text);
    
    // Ensure default return values exist to prevent null pointers
    const result = {
      topic: parsed.topic || topic,
      stationOrExit: parsed.stationOrExit !== undefined ? parsed.stationOrExit : (stationOrExit || ""),
      content: parsed.content || content
    };

    console.log("Successfully prepared translation output on backend:", result);
    return res.json(result);
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
