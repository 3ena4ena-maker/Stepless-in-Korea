import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc,
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from "firebase/firestore";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Load Firebase config dynamically from environment variables or local config json
let firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

let databaseId = process.env.FIREBASE_DATABASE_ID || "ai-studio-daece5ca-bfbc-4065-8b23-6d285905bafc";

try {
  const configPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(configPath)) {
    const localConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    firebaseConfig = {
      apiKey: localConfig.apiKey || firebaseConfig.apiKey,
      authDomain: localConfig.authDomain || firebaseConfig.authDomain,
      projectId: localConfig.projectId || firebaseConfig.projectId,
      storageBucket: localConfig.storageBucket || firebaseConfig.storageBucket,
      messagingSenderId: localConfig.messagingSenderId || firebaseConfig.messagingSenderId,
      appId: localConfig.appId || firebaseConfig.appId,
    };
    if (localConfig.firestoreDatabaseId) {
      databaseId = localConfig.firestoreDatabaseId;
    }
  }
} catch (err) {
  console.warn("Could not load local firebase-applet-config.json:", err);
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, databaseId);

// Keep local file path ONLY as a migration source
const RECS_FILE_PATH = path.join(process.cwd(), "recommendations-db.json");

interface TravelerRecommendation {
  id: string;
  author: string;
  topic: string;
  category: "FOOD" | "CAFE" | "ATTRACTION" | "TRANSIT" | "OTHER";
  stationOrExit: string;
  content: string;
  upvotes: number;
  createdAt: string;
}

const DEFAULT_RECOMMENDATIONS: TravelerRecommendation[] = [
  {
    id: 'rec-1',
    author: 'BusanLover33',
    topic: '이재모피자 서면점 & 부산역본점',
    category: 'FOOD',
    stationOrExit: '부산역 5번출구 / 전포역 7번출구 근처',
    content: '이재모피자는 부산 로컬과 여행객 모두가 열광하는 최고의 치즈 피자 전문점입니다! 치즈 크러스트의 쫄깃함이 남달라요. 웨이팅이 기니 앱(테이블링 등)을 꼭 체크하세요.',
    upvotes: 42,
    createdAt: '2026-06-01T12:00:00Z'
  },
  {
    id: 'rec-2',
    author: 'NomadChris',
    topic: '전포 사잇길 소품샵 & 빈티지 카페 골목',
    category: 'CAFE',
    stationOrExit: '전포역 4번 및 8번출구',
    content: '전포 카페거리에서 조금만 위쪽으로 가면 나오는 사잇길에는 아기자기한 공방, 감성 넘치는 독립 서점, 개성 가득한 빈티지 편집숍들이 가득해요! 평탄하고 걸어 다니기 좋아 무장애 산책하기 최고입니다.',
    upvotes: 28,
    createdAt: '2026-06-03T15:30:00Z'
  },
  {
    id: 'rec-3',
    author: 'TransitPro',
    topic: '알뜰 부산 지하철 1일 무제한 패스',
    category: 'TRANSIT',
    stationOrExit: '모든 부산 지하철역 발권기',
    content: '하루 동안 지하철을 5회 이상 탈 계획이라면 1일권(정기승차권)을 사서 이용하는게 저렴해요! 어른 6,000원, 청소년 4,000원이고 1일권은 최초 사용 당일 부산 지하철 1 ~ 4호선에서 횟수 제한 없이 이용할 수 있어요!',
    upvotes: 35,
    createdAt: '2026-06-05T09:15:00Z'
  }
];

// Helper to seed Firestore from local JSON database upon first run so that we don't lose any existing test tips
async function seedRecommendationsIfEmpty() {
  try {
    const q = query(collection(db, "recommendations"));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("Firestore collection 'recommendations' is empty! Migrating/Seeding data...");
      let initialData = DEFAULT_RECOMMENDATIONS;
      if (fs.existsSync(RECS_FILE_PATH)) {
        try {
          const raw = fs.readFileSync(RECS_FILE_PATH, "utf-8");
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            initialData = parsed;
          }
        } catch (e) {
          console.error("Failed to parse local recs JSON for seeding:", e);
        }
      }
      
      for (const rec of initialData) {
        const docRef = doc(db, "recommendations", rec.id);
        await setDoc(docRef, rec);
      }
      console.log(`Firestore seeded successfully with ${initialData.length} entries.`);
    }
  } catch (err) {
    console.error("Error during Firestore seeding:", err);
  }
}

// 1. Get all recommendations
app.get("/api/recommendations", async (req, res) => {
  try {
    await seedRecommendationsIfEmpty();
    const q = query(collection(db, "recommendations"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const recs: TravelerRecommendation[] = [];
    querySnapshot.forEach((docSnap) => {
      recs.push(docSnap.data() as TravelerRecommendation);
    });
    res.json(recs);
  } catch (error: any) {
    console.error("Firebase get recommendations error:", error);
    res.status(500).json({ error: error.message || "Failed to load recommendations from Firestore" });
  }
});

// 2. Submit a new recommendation
app.post("/api/recommendations", async (req, res) => {
  const { id, author, topic, category, stationOrExit, content, createdAt, upvotes } = req.body;
  if (!author || !topic || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const recId = id || `rec-${Date.now()}`;
    const docRef = doc(db, "recommendations", recId);
    
    // De-duplication check
    const existingSnap = await getDoc(docRef);
    if (existingSnap.exists()) {
      return res.json(existingSnap.data());
    }

    const newRec: TravelerRecommendation = {
      id: recId,
      author: String(author).trim(),
      topic: String(topic).trim(),
      category: category || "OTHER",
      stationOrExit: String(stationOrExit || "").trim(),
      content: String(content).trim(),
      upvotes: Number(upvotes) || 0,
      createdAt: createdAt || new Date().toISOString()
    };

    await setDoc(docRef, newRec);
    res.status(201).json(newRec);
  } catch (error: any) {
    console.error("Firebase submit recommendation error:", error);
    res.status(500).json({ error: error.message || "Failed to save recommendation to Firestore" });
  }
});

// 3. Upvote/Downvote recommendation
app.post("/api/recommendations/:id/upvote", async (req, res) => {
  const id = req.params.id;
  const { upvote } = req.body;

  try {
    const docRef = doc(db, "recommendations", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "Recommendation not found" });
    }

    const currentData = docSnap.data() as TravelerRecommendation;
    let newUpvotes = currentData.upvotes || 0;
    if (upvote === true) {
      newUpvotes += 1;
    } else if (upvote === false) {
      newUpvotes = Math.max(0, newUpvotes - 1);
    }

    const updatedRec = { ...currentData, upvotes: newUpvotes };
    await updateDoc(docRef, { upvotes: newUpvotes });
    res.json(updatedRec);
  } catch (error: any) {
    console.error("Firebase upvote error:", error);
    res.status(500).json({ error: error.message || "Failed to upvote recommendation in Firestore" });
  }
});

// 4. Delete recommendation
app.delete("/api/recommendations/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const docRef = doc(db, "recommendations", id);
    await deleteDoc(docRef);
    res.json({ success: true });
  } catch (error: any) {
    console.error("Firebase delete error:", error);
    res.status(500).json({ error: error.message || "Failed to delete recommendation in Firestore" });
  }
});

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

// Serve AdSense ads.txt directly
app.get("/ads.txt", (req, res) => {
  res.type("text/plain");
  res.send("google.com, pub-1023768343506419, DIRECT, f08c47fec0942fa0");
});

// Serve Naver & Google crawls search engine rules (robots.txt & sitemap.xml)
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nAllow: /\n\nUser-agent: Yeti\nAllow: /\n\nSitemap: https://steplessinkorea.pages.dev/sitemap.xml\n");
});

app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://steplessinkorea.pages.dev/</loc>
    <lastmod>2026-06-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
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
