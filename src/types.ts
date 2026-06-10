/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type StatusType = 'OPERATIONAL' | 'MAINTENANCE' | 'BLOCKED';

export interface PathStep {
  id: string;
  name: string; // e.g., "지상", "대합실", "승강장"
  desc: string; // e.g., "롯데백화점, 서면시장 방면"
  facilityType: 'ELEVATOR' | 'ESCALATOR' | 'RAMP' | 'STAIRS' | 'GATE';
  tip: string; // Detailed tip for this step
  status: StatusType;
  subwayLine?: string[]; // If specific line applies
  extraInfo?: string[]; // Badges like "빠른 환승 1-1", "안전 발판"
  detailsIcon?: string; // Optional icon name
}

export interface ExitInfo {
  number: string;
  isAccessible: boolean; // Stroller/Wheelchair passable
  hasElevator: boolean;
  hasEscalator: boolean;
  isStrollerFriendly: boolean; // Carrier / heavy bag friendly
  tip: string; // "서면역 7번 출구는 롯데백화점과 직접 연결되어 있어..."
  status: StatusType;
  directionDesc: string; // e.g., "롯데백화점, 서면시장 방면, 쥬디스태화 방면"
  latitude: number; // for path/mapping reference
  longitude: number;
  kakaoMapUrl: string; // Navigation link
  naverMapUrl: string; // Navigation link
  pathwayTimeline: PathStep[]; // Steps from Platform to Ground or vice versa
  facilityDirection?: 'UP' | 'DOWN' | 'BOTH'; // 상행(UP), 하행(DOWN), 둘다 가능(BOTH)
  hasCrosswalk?: boolean; // Has a pedestrian crossing / crosswalk immediately nearby
}

export interface Station {
  id: string; // e.g., "seomyeon"
  name: string; // e.g., "서면역"
  englishName: string;
  lines: string[]; // ["1", "2"]
  elevatorCount: number;
  escalatorCount: number;
  toiletLocation: string; // "개찰구 내", "개찰구 외", "지하상가 통로"
  isTransferStation: boolean;
  accentColor: string; // Tailwind color class or hex
  exits: ExitInfo[];
  alertNotice?: string; // "환승 통로 일시 정지" or something
}

export interface FacilityReport {
  id: string;
  stationId: string;
  stationName: string;
  exitNumber: string;
  facilityType: 'ELEVATOR' | 'ESCALATOR' | 'RAMP' | 'TOILET' | 'OTHER';
  reportType: 'BROKEN' | 'MAINTENANCE' | 'CONSTRUCTION' | 'OTHER';
  details: string;
  image?: string; // Data URL or text representation
  status: 'PENDING' | 'VERIFIED' | 'RESOLVED';
  createdAt: string;
}

// Multilingual Translation Reference Map for Busan Transit Landmarks & Areas
const TRANSLATION_MAP: Record<string, string> = {
  // Subway Stations
  '서면역': 'Seomyeon Station',
  '전포역': 'Jeonpo Station',
  '부전역': 'Bujeon Station',
  '해운대역': 'Haeundae Station',
  '광안역': 'Gwangan Station',
  '남포역': 'Nampo Station',
  '부산역': 'Busan Station',
  '수영역': 'Suyeong Station',
  '자갈치역': 'Jagalchi Station',

  // Common landmarks
  '롯데백화점': 'Lotte Department Store',
  '롯데마트': 'Lotte Mart',
  '부산본점': 'Busan Main Branch',
  '광복점': 'Gwangbok Branch',
  '서면시장': 'Seomyeon Market',
  '부전시장': 'Bujeon Market',
  '부전전통시장': 'Bujeon Traditional Market',
  '팔도시장': 'Paldo Market',
  '부평깡통시장': 'Bupyeong Kkangtong Market',
  '자갈치 시장': 'Jagalchi Market',
  '자갈치시장': 'Jagalchi Market',
  '초량시장': 'Choryang Market',
  '인삼시장': 'Ginseng Market',
  '건어물시장': 'Dried Fish Market',
  '영도대교': 'Yeongdodaegyo Bridge',
  '부산대교': 'Busandaegyo Bridge',
  '부산시민공원': 'Busan Citizens Park',
  '전포돌산공원': 'Jeonpo Dolsan Park',
  '용두산공원': 'Yongdusan Park',
  '광인리 해수욕장': 'Gwangalli Beach',
  '광안리 해수욕장': 'Gwangalli Beach',
  '해운대해수욕장': 'Haeundae Beach',
  '민락수변공원': 'Millak Waterfront Park',
  '텍사스거리': 'Texas Street',
  '무슬림거리': 'Muslim Street',
  '비프거리(BIFF)': 'BIFF Street',
  '비프거리': 'BIFF Street',
  '비프광장로': 'BIFF Gwangjang-ro',
  '원조족발골목': 'Jokbal (Pig Trotters) Alley',
  '전포 카페거리': 'Jeonpo Cafe Street',
  '전포테마거리': 'Jeonpo Theme Street',
  '광복로 패션거리': 'Gwangbok-ro Fashion Street',
  '놀이마루': 'Nolimaru',

  // Schools / Public
  '초등학교': 'Elementary School',
  '중학교': 'Middle School',
  '고등학교': 'High School',
  '대학교': 'University',
  '전포초등학교': 'Jeonpo Elementary School',
  '경남공업고등학교': 'Kyungnam Technical High School',
  '부산진여자중학교': 'Busanjin Girls Middle School',
  '한바다중학교': 'Hanbada Middle School',
  '초량초등학교': 'Choryang Elementary School',
  '부산진구청': 'Busanjin-gu Office',
  '서구청': 'Seo-gu Office',
  '세무서': 'Tax Office',
  
  // Public safety
  '부산진소방서': 'Busanjin Fire Station',
  '소방서': 'Fire Station',
  '부전지구대': 'Bujeon Police Station',
  '지구대': 'Police Station',
  '경찰서': 'Police Station',
  '파출소': 'Police Box',
  '치안센터': 'Police Center',
  '남포치안센터': 'Nampo Police Center',
  '광안3동 치안센터': 'Gwangan 3-dong Police Center',

  // Administrative / offices
  '행정복지센터': 'Community Center',
  '주민센터': 'Community Center',
  '복지관': 'Welfare Center',
  '우체국': 'Post Office',
  '동물병원': 'Animal Hospital',
  '약국': 'Pharmacy',
  '신한은행': 'Shinhan Bank',
  '버거킹': 'Burger King',
  '버거샵': 'Burger Shop',
  '홈플러스익스프레스': 'Homeplus Express',
  '영광도서': 'Yeonggwang Bookstore',

  // Locations / endings
  '아파트': 'Apt',
  '빌딩': 'Building',
  '지하상가': 'Underground Shopping',
  '지하도상가': 'Underground Shopping',
  '사거리': 'Intersection',
  '삼거리': 'Three-way Intersection',
  '광장': 'Square',
  '대합실': 'Concourse',
  '정문': 'Main Gate',
  '방면': 'direction',
  '방향': 'direction',
  '동': '-dong',
  '남편': 'South side',
  '동북측': 'Northeast side',
  '남측': 'South side',
  '서편': 'West side',
  '동편': 'East side',
  '북측': 'North side',
  '초입': 'Entrance',
};

// Syllable romanizer to fallback cleanly
export function romanizeWord(word: string): string {
  const hangeulToLatin: Record<string, string> = {
    '서': 'Seo', '면': 'myeon', '부': 'Bu', '전': 'jeon', '포': 'po', '해': 'Hae', '운': 'un', '대': 'dae',
    '광': 'Gwang', '안': 'an', '남': 'Nam', '천': 'cheon', '가': 'ga', '야': 'ya', '범': 'beom', '영': 'Yeong',
    '도': 'do', '시': 'si', '민': 'min', '공': 'gong', '원': 'won', '진': 'jin', '소': 'so', '방': 'bang',
    '초': 'Cho', '량': 'ryang', '구': 'gu', '청': 'cheong', '현': 'hyeon', '지': 'ji', '점': 'jeom',
    '행': 'haeng', '정': 'jeong', '복': 'bok', '동': 'dong', '주': 'ju', '산': 'san', '돌': 'dol', '파': 'pa',
    '출': 'chul', '사': 'sa', '잇': 'it', '길': 'gil', '테': 'te', '마': 'ma', '카': 'ka', '페': 'fe',
    '웹': 'web', '자': 'Ja', '갈': 'gal', '치': 'chi', '수': 'Su', '금': 'geum', '융': 'yung',
    '골': 'gol', '목': 'mok', '로': 'ro', '약': 'yak', '국': 'guk', '락': 'rak', '변': 'byeon',
    '한': 'Han', '바': 'ba', '다': 'da', '교': 'gyo', '차': 'cha', '종': 'jong', '합': 'hap', '팔': 'Pal',
    '필': 'Pil', '우': 'u', '체': 'che', '평': 'Pyeong', '깡': 'Kkang', '통': 'tong', '창': 'chang',
    '선': 'seon', '패': 'pae', '션': 'syeon', '리': 'ri', '기': 'gi', '계': 'gye', '고': 'go', '유': 'yu',
    '휠': 'hwi', '택': 'taek', '삼': 'sam', '북': 'buk'
  };

  let latin = '';
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (hangeulToLatin[char]) {
      const prefix = latin === '' ? hangeulToLatin[char] : hangeulToLatin[char].toLowerCase();
      latin += prefix;
    } else {
      latin += char;
    }
  }
  return latin;
}

export function translateDirectionItem(item: string, lang: 'KR' | 'EN'): string {
  if (lang === 'KR') return item;
  
  const cleanItem = item.trim();
  if (TRANSLATION_MAP[cleanItem]) {
    return TRANSLATION_MAP[cleanItem];
  }

  // Split into components and translate known terms
  const terms = cleanItem.split(/\s+/);
  const translatedTerms = terms.map(term => {
    // Check if the term has a direct map
    if (TRANSLATION_MAP[term]) {
      return TRANSLATION_MAP[term];
    }
    
    // Check key endings first or partial phrases
    for (const [key, value] of Object.entries(TRANSLATION_MAP)) {
      if (term.endsWith(key) && key !== '동' && term !== key) {
        const prefix = term.slice(0, -key.length);
        return `${romanizeWord(prefix)}${value.startsWith('-') || value.startsWith(' ') ? '' : ' '}${value}`;
      }
    }

    return romanizeWord(term);
  });

  let joined = translatedTerms.join(' ');
  // Clean up direction redundancy
  joined = joined.replace(/direction/gi, '').trim();
  return joined;
}

export function translateExitNumber(exitNumber: string, language: 'KR' | 'EN'): string {
  if (language === 'KR') return exitNumber;

  // 1. Elevator (between Exits X and Y)
  const elevatorMatch = exitNumber.match(/엘리베이터\s*\((\d+)[·, ](\d+)번\s*출구\s*사이\)/);
  if (elevatorMatch) {
    return `Elevator (between Exits ${elevatorMatch[1]} and ${elevatorMatch[2]})`;
  }

  // 2. Underground Shopping Mall exits
  if (exitNumber.includes('서면지하도상가 부전몰')) {
    const num = exitNumber.match(/(\d+)번/);
    return `Bujeon Mall Exit ${num ? num[1] : ''} (Seomyeon Underground)`;
  }
  if (exitNumber.includes('부산역지하쇼핑센터')) {
    const num = exitNumber.match(/(\d+)번/);
    return `Busan Station Underground Shopping Exit ${num ? num[1] : ''}`;
  }
  if (exitNumber.includes('남포지하쇼핑센터')) {
    const num = exitNumber.match(/(\d+)번/);
    return `Nampo Underground Shopping Exit ${num ? num[1] : ''}`;
  }

  // 3. Busan KTX Station Exit
  if (exitNumber.includes('부산KTX역')) {
    const num = exitNumber.match(/(\d+)번/);
    return `Busan KTX Station Exit ${num ? num[1] : ''}`;
  }

  // 4. Double Exit linked to department store
  if (exitNumber.includes('8번 10번 출구')) {
    return `Exits 8 & 10 (Connected to Lotte Department Store Gwangbok)`;
  }

  // 5. Normal Exit: "X번 출구" or "X번 출입"
  const normalMatch = exitNumber.match(/(\d+)번\s*출구/);
  if (normalMatch) {
    return `Exit ${normalMatch[1]}`;
  }

  // Fallback
  return exitNumber;
}

export function getTranslatedStationName(stationName: string, lang: 'KR' | 'EN'): string {
  if (lang === 'KR') return stationName;
  const matchKey = stationName.includes('역') ? stationName : stationName + '역';
  if (TRANSLATION_MAP[matchKey]) {
    return TRANSLATION_MAP[matchKey];
  }
  return stationName;
}

export const getExitDisplayName = (stationName: string, exitNumber: string, lang: 'KR' | 'EN' = 'KR'): string => {
  const isEn = lang === 'EN';
  const translatedExit = translateExitNumber(exitNumber, lang);
  const finalStationName = getTranslatedStationName(stationName, lang);
  
  if (exitNumber.includes(stationName) || exitNumber.startsWith('부산KTX역') || (isEn && translatedExit.includes('Busan KTX'))) {
    return translatedExit;
  }
  
  return isEn ? `${finalStationName} ${translatedExit}` : `${finalStationName} ${translatedExit}`;
};
