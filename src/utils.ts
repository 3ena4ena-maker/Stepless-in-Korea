import { romanizeWord } from "./types";

const INITIALS = [
  'g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'
];
const VOWELS = [
  'a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'
];
const FINALS = [
  '', 'k', 'kk', 'ks', 'n', 'nj', 'nh', 'd', 'l', 'lg', 'lm', 'lb', 'ls', 'lt', 'lp', 'lh', 'm', 'b', 'bs', 's', 'ss', 'ng', 'j', 'ch', 'k', 't', 'p', 'h'
];

export function romanizeKoreanWord(word: string): string {
  let result = '';
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    const codePoint = char.charCodeAt(0);
    if (codePoint >= 0xAC00 && codePoint <= 0xD7A3) {
      const sIndex = codePoint - 0xAC00;
      const lIndex = Math.floor(sIndex / 588);
      const vIndex = Math.floor((sIndex % 588) / 28);
      const tIndex = sIndex % 28;

      let initPart = INITIALS[lIndex] || '';
      const vowelPart = VOWELS[vIndex] || '';
      const finalPart = FINALS[tIndex] || '';

      // Capitalize first letter of words or after spacing
      if (result === '' || /\s$/.test(result)) {
        if (initPart) {
          initPart = initPart.charAt(0).toUpperCase() + initPart.slice(1);
        } else if (vowelPart) {
          result += vowelPart.charAt(0).toUpperCase() + vowelPart.slice(1) + finalPart;
          continue;
        }
      }

      result += initPart + vowelPart + finalPart;
    } else {
      result += char;
    }
  }
  return result;
}

// Full dictionary of common travel/eating words to translate traveler tips
const TRAVEL_WORDS_MAP: Record<string, string> = {
  '이재모피자': 'Lee Jae Mo Pizza',
  '서면점': 'Seomyeon Branch',
  '부산역본점': 'Busan Station Main Branch',
  '부산역': 'Busan Station',
  '전포역': 'Jeonpo Station',
  '부전역': 'Bujeon Station',
  '해운대역': 'Haeundae Station',
  '광안역': 'Gwangan Station',
  '남포역': 'Nampo Station',
  '자갈치역': 'Jagalchi Station',
  '피자': 'Pizza',
  '치즈': 'Cheese',
  '크러스트': 'Crust',
  '쫄깃': 'chewy',
  '전포 사잇길': 'Jeonpo Sait-gil',
  '소품샵': 'Prop Shop',
  '빈티지': 'Vintage',
  '카페': 'Cafe',
  '카페거리': 'Cafe Street',
  '골목': 'Alley',
  '아기자기한': 'cozy & cute',
  '공방': 'craft workshop',
  '독립 서점': 'independent bookstore',
  '편집숍': 'boutique shop',
  '무장애': 'barrier-free',
  '산책': 'stroll',
  '최고': 'best / superb',
  '알뜰': 'Budget / Saving',
  '무제한': 'Unlimited',
  '정기승차권': 'Commuter Ticket',
  '지하철': 'subway',
  '지하철역': 'subway station',
  '발권기': 'vending machine',
  '지하철 1일 무제한 패스': 'Subway 1-Day Unlimited Pass',
  '1일권': '1-Day Ticket',
  '호선': 'Line',
  '어른': 'Adults',
  '청소년': 'Youths',
  '6,000원': '6,000 KRW',
  '4,000원': '4,000 KRW',
  '웨이팅': 'waiting queue',
  '테이블링': 'Tabling app',
  '이동': 'mobility/access',
  '휠체어': 'wheelchair',
  '유모차': 'stroller',
  '가능': 'possible / accessible',
  '추천': 'Recommend',
  '방문': 'visit',
  '비법': 'tip / secret',
  '부산 로컬': 'Busan locals',
  '여행객': 'travelers',
  '모두': 'all',
  '열광하는': 'enthusiastic / crazy-about',
};

// Fixed translation dictionary for the default recommendations to guarantee perfect output
export const FALLBACK_RECS_EN: Record<string, { topic: string; content: string; stationOrExit: string }> = {
  'rec-1': {
    topic: 'Lee Jae Mo Pizza (Seomyeon & Busan Station Main Branches)',
    stationOrExit: 'Near Busan Station Exit 5 / Jeonpo Station Exit 7',
    content: 'Lee Jae Mo Pizza is the ultimate local cheese pizza shop that both Busan locals and travelers are crazy about! The chewy cheese crust is unmatched. Wait times can be very long, so make sure to check queue status on the Tabling app.'
  },
  'rec-2': {
    topic: 'Jeonpo Sait-gil Prop Shops & Vintage Cafe Alley',
    stationOrExit: 'Jeonpo Station Exits 4 and 8',
    content: 'Just slightly above the main Jeonpo Cafe Street, the Sait-gil (cozy alleyways) is packed with lovely craft shops, independent bookstores, and unique vintage boutiques! It is highly flat and comfortable to walk, making it perfect for custom barrier-free strolls.'
  },
  'rec-3': {
    topic: 'Budget Busan Subway 1-Day Unlimited Pass',
    stationOrExit: 'Ticket vending machines at all Busan subway stations',
    content: 'If you plan to ride the subway 4 or more times in a single day, buying a 1-day pass is much cheaper! It costs 6,000 KRW for adults and 4,000 KRW for youth. You get unlimited rides on Busan Subway lines 1 to 4 on the first day of use!'
  }
};

// Auto-translator fallback for user-submitted recommendations
export function translateTextFallback(text: string): string {
  if (!text) return "";

  let translated = text;

  // Replace terms from TRAVEL_WORDS_MAP
  Object.entries(TRAVEL_WORDS_MAP).forEach(([kr, en]) => {
    const regex = new RegExp(kr, 'g');
    translated = translated.replace(regex, en);
  });

  // Regular expression to replace station & exit name structures (e.g., "서면역 7번출구" -> "Seomyeon Station Exit 7")
  translated = translated.replace(/([가-힣a-zA-Z0-9]+역?)\s*(\d+)번\s*출구/g, (match, station, num) => {
    let englishStation = station;
    if (station.includes("서면")) englishStation = "Seomyeon Station";
    else if (station.includes("전포")) englishStation = "Jeonpo Station";
    else if (station.includes("부전")) englishStation = "Bujeon Station";
    else if (station.includes("해운대")) englishStation = "Haeundae Station";
    else if (station.includes("광안")) englishStation = "Gwangan Station";
    else if (station.includes("남포")) englishStation = "Nampo Station";
    else if (station.includes("자갈치")) englishStation = "Jagalchi Station";
    else if (station.includes("부산")) englishStation = "Busan Station";
    else englishStation = romanizeKoreanWord(station) + " Station";

    return `${englishStation} Exit ${num}`;
  });

  // Replace remaining "X번 출구" or "X번출구"
  translated = translated.replace(/(\d+)번\s*출구/g, "Exit $1");
  translated = translated.replace(/(\d+)번\s*출입/g, "Exit $1");

  // If there are still Hangeul Jamo or characters, clean up or romanize them gently
  const hasHangeul = /[가-힣]/.test(translated);
  if (hasHangeul) {
    translated = romanizeKoreanWord(translated);
  }

  return translated;
}

export function translateRecommendation(
  rec: { id: string; topic: string; content: string; stationOrExit: string },
  language: 'KR' | 'EN',
  apiTranslated?: { topic: string; content: string; stationOrExit: string }
) {
  if (language === 'KR') {
    return {
      topic: rec.topic,
      content: rec.content,
      stationOrExit: rec.stationOrExit
    };
  }

  // 1. If we have highly accurate API translation, prioritize it
  if (apiTranslated) {
    return apiTranslated;
  }

  // 2. If it is one of the built-in default items, return perfect English representation
  if (FALLBACK_RECS_EN[rec.id]) {
    return FALLBACK_RECS_EN[rec.id];
  }

  // 3. Otherwise, use our smart auto-translator fallback for user elements
  return {
    topic: translateTextFallback(rec.topic),
    content: translateTextFallback(rec.content),
    stationOrExit: translateTextFallback(rec.stationOrExit)
  };
}
