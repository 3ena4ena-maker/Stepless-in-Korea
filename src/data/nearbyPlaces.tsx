import React from 'react';

export interface NearbyPlaceExit {
  num: string;
  type: 'elevator' | 'escalator' | 'both';
}

export interface NearbyPlace {
  name: string;
  desc: string;
  exits?: NearbyPlaceExit[];
}

export const STATION_PLACES_DATA: Record<string, Record<'KR' | 'EN', NearbyPlace[]>> = {
  seomyeon: {
    KR: [
      { name: '✨ 서면 젊음의 거리', desc: '문화 행사, 맛집, 분위기 좋은 카페 등 즐길 거리가 가득한 중심가', exits: [{ num: '7', type: 'elevator' }] },
      { name: '🏢 삼정타워', desc: '다채로운 이색 맛집, 오락 시설, 영화관을 품은 복합 문화 몰', exits: [{ num: '1', type: 'escalator' }] }
    ],
    EN: [
      { name: '✨ Seomyeon Youth Street', desc: 'Vibrant center filled with various restaurants, cafes, and shopping spots', exits: [{ num: '7', type: 'elevator' }] },
      { name: '🏢 Samjung Tower', desc: 'A multi-complex lifestyle mall featuring dining, entertainment, and a cinema', exits: [{ num: '1', type: 'escalator' }] }
    ]
  },
  jeonpo: {
    KR: [
      { name: '☕ 전포 카페거리', desc: '감성 가득한 도심형 카페 밀집 거리', exits: [{ num: '7', type: 'escalator' }] },
      { name: '🎨 전포 사잇길', desc: '유니크한 골목 편집숍과 공방 가득', exits: [{ num: '4', type: 'elevator' }, { num: '8', type: 'escalator' }] }
    ],
    EN: [
      { name: '☕ Jeonpo Cafe Street', desc: 'Cozy, design-first artisanal coffee shops', exits: [{ num: '7', type: 'escalator' }] },
      { name: '🎨 Jeonpo Goods Alley (Saetgil)', desc: 'Charming boutiques & stationery shops', exits: [{ num: '4', type: 'elevator' }, { num: '8', type: 'escalator' }] }
    ]
  },
  bujeon: {
    KR: [
      { name: '🥬 부전 전통시장', desc: '전통 먹거리와 제철 농수산물이 가득한 대표 시장', exits: [{ num: '부전몰 3', type: 'escalator' }, { num: '부전몰 5', type: 'escalator' }] },
      { name: '🌳 송상현광장', desc: '산책과 휴식을 즐길 수 있는 도심 속 대표 잔디 광장', exits: [{ num: '6', type: 'elevator' }] }
    ],
    EN: [
      { name: '🥬 Bujeon Traditional Market', desc: 'Bustling local traditional market full of local food & produce', exits: [{ num: 'bujeon 3', type: 'escalator' }, { num: 'bujeon 5', type: 'escalator' }] },
      { name: '🌳 Songsanghyeon Square', desc: 'A spacious, beautiful public plaza for relaxation', exits: [{ num: '6', type: 'elevator' }] }
    ]
  },
  haeundae: {
    KR: [
      { name: '🏖️ 해운대 해수욕장', desc: '인기 해변과 화려한 도심의 조화', exits: [{ num: '5', type: 'elevator' }, { num: '7', type: 'elevator' }] },
      { name: '🍢 해운대 전통시장', desc: '각종 꼼장어, 떡볶이 등 길거리 야식골목', exits: [{ num: '5', type: 'elevator' }, { num: '7', type: 'elevator' }] }
    ],
    EN: [
      { name: '🏖️ Haeundae Beach', desc: 'Nationally famous sandy oceanfront', exits: [{ num: '5', type: 'elevator' }, { num: '7', type: 'elevator' }] },
      { name: '🍢 Haeundae Market', desc: 'Street snacks, seafood & vibrant local food', exits: [{ num: '5', type: 'elevator' }, { num: '7', type: 'elevator' }] }
    ]
  },
  gwangan: {
    KR: [
      { name: '🌉 광안리 해수욕장', desc: '밤바다 광안대교 야경 산책 코스', exits: [{ num: '3', type: 'elevator' }, { num: '5', type: 'elevator' }] },
      { name: '☕ 오션뷰 카페거리', desc: '푸른 해안 통창을 마주 보는 인기 카페들', exits: [{ num: '3', type: 'elevator' }, { num: '5', type: 'elevator' }] }
    ],
    EN: [
      { name: '🌉 Gwangalli Beach', desc: 'Beautiful waves with the iconic bridge view', exits: [{ num: '3', type: 'elevator' }, { num: '5', type: 'elevator' }] },
      { name: '☕ Ocean View Cafe Street', desc: 'High-front cafes facing Gwangalli waters', exits: [{ num: '3', type: 'elevator' }, { num: '5', type: 'elevator' }] }
    ]
  },
  nampo: {
    KR: [
      { name: '🗼 용두산공원', desc: '부산타워 전망대에서 만나는 도심과 항구', exits: [{ num: '7', type: 'elevator' }] },
      { name: '🌉 영도대교 걷기', desc: '지상 평탄 보도길 연계', exits: [{ num: '6', type: 'escalator' }, { num: '8', type: 'both' }] }
    ],
    EN: [
      { name: '🗼 Yongdusan Park', desc: 'Scenic hilltop with Busan Diamond Tower', exits: [{ num: '7', type: 'elevator' }] },
      { name: '🌉 Yeongdodaegyo Bridge Walk', desc: 'Scenic coastal path overlooking the harbor', exits: [{ num: '6', type: 'escalator' }, { num: '8', type: 'both' }] }
    ]
  },
  busan: {
    KR: [
      { name: '🍕 이재모피자 & 🇨🇳 차이나타운', desc: '부산의 명물 이재모피자와 맛있는 중식 만두를 즐길 수 있는 이색 특화 거리', exits: [{ num: '5', type: 'elevator' }] }
    ],
    EN: [
      { name: '🍕 Lee Jae Mo Pizza & 🇨🇳 Chinatown', desc: "Enjoy Busan's legendary pizza alongside delicious authentic Chinese dumplings on this unique cultural street", exits: [{ num: '5', type: 'elevator' }] }
    ]
  },
  suyeong: {
    KR: [
      { name: '🌾 수영사적공원', desc: '고즈넉한 역사 유적지와 오래된 거목 공원', exits: [{ num: '1', type: 'elevator' }] }
    ],
    EN: [
      { name: '🌾 Suyeong Sajeok Park', desc: 'Shaded historical site with giant ancient trees', exits: [{ num: '1', type: 'elevator' }] }
    ]
  },
  jagalchi: {
    KR: [
      { name: '🗼 부산자갈치시장 전망대', desc: '남포지하쇼핑센터 6번 출구 및 남포역 2번출구로 갈 수 있는 탁 트인 오션뷰 야외 전망대', exits: [{ num: '남포지하 6', type: 'escalator' }, { num: '남포역 2', type: 'escalator' }] },
      { name: '🎬 국제시장 & BIFF광장', desc: '먹거리 씨앗호떡과 생활 잡화 미로 정취', exits: [{ num: '3', type: 'elevator' }] }
    ],
    EN: [
      { name: '🗼 Busan Jagalchi Market Observatory', desc: 'An open outdoor rooftop observatory overlooking the port, accessible via Nampo Shopping Mall Exit 6 and Nampo Station Exit 2', exits: [{ num: 'nampomall 6', type: 'escalator' }, { num: 'nampostn 2', type: 'escalator' }] },
      { name: '🎬 Gukje Market & BIFF Sq.', desc: 'Sweet Hotteok stalls & classic alleys', exits: [{ num: '3', type: 'elevator' }] }
    ]
  },
  geumnyeonsan: {
    KR: [
      { name: '🏖️ 광안리 해수욕장 남측', desc: '조용한 해상 산책로 및 남천동 빵천동 디저트거리', exits: [{ num: '3', type: 'elevator' }, { num: '5', type: 'elevator' }] }
    ],
    EN: [
      { name: '🏖️ South Gwangalli Beach & Namcheon Bakery Alley', desc: 'Tranquil southern beach area & famous dessert street', exits: [{ num: '3', type: 'elevator' }, { num: '5', type: 'elevator' }] }
    ]
  },
  dongbaek: {
    KR: [
      { name: '🌺 동백섬 & 누리마루 APEC하우스', desc: '해안 산책로와 동백꽃이 어우러진 해운대 대표 명소', exits: [{ num: '1', type: 'elevator' }] }
    ],
    EN: [
      { name: '🌺 Dongbaekseom Island & Nurimaru APEC House', desc: 'Scenic coastal walking trails & APEC house', exits: [{ num: '1', type: 'elevator' }] }
    ]
  },
  bexco: {
    KR: [
      { name: '🏛️ 벡스코 (BEXCO)', desc: '전시, 박람회, 대형 공연이 열리는 종합 컨벤션 공간', exits: [{ num: '7', type: 'elevator' }, { num: '9', type: 'elevator' }] },
      { name: '🖼️ 부산시립미술관', desc: '다채로운 현대 미술 전시와 조각 공원', exits: [{ num: '5', type: 'elevator' }] }
    ],
    EN: [
      { name: '🏛️ BEXCO Exhibition & Convention Center', desc: 'Major international exhibition & event space', exits: [{ num: '7', type: 'elevator' }, { num: '9', type: 'elevator' }] },
      { name: '🖼️ Busan Museum of Art', desc: 'Contemporary art exhibitions & outdoor park', exits: [{ num: '5', type: 'elevator' }] }
    ]
  }
};

export const getNearbyPlaces = (stationId: string, lang: 'KR' | 'EN'): NearbyPlace[] => {
  return STATION_PLACES_DATA[stationId]?.[lang] || [];
};

export const NearbyExitBadge = ({ num, type, line, language }: { num: string; type: 'elevator' | 'escalator' | 'both'; line: string; language: 'KR' | 'EN'; key?: any }) => {
  let accentColor = '#F06A00'; // default 1 line (orange)
  let borderColorClass = 'border-[#F06A00]/70 text-[#F06A00]';

  if (line === '2') {
    accentColor = '#1b6d24';
    borderColorClass = 'border-[#1b6d24]/70 text-[#1b6d24]';
  } else if (line === '3') {
    accentColor = '#906A3B';
    borderColorClass = 'border-[#906A3B]/70 text-[#906A3B]';
  } else if (line === '동해') {
    accentColor = '#004960';
    borderColorClass = 'border-[#004960]/70 text-[#004960]';
  }

  let iconSvg = null;
  if (type === 'elevator') {
    iconSvg = (
      <svg viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[11px] h-[11px] flex-shrink-0">
        <rect x="3" y="3" width="18" height="18" rx="2.5" />
        <path d="M 7.5 10 L 9.5 7 L 11.5 10 Z" fill={accentColor} stroke="none" />
        <path d="M 7.5 14 L 9.5 17 L 11.5 14 Z" fill={accentColor} stroke="none" />
        <line x1="14.5" y1="3" x2="14.5" y2="21" strokeDasharray="2 2" strokeWidth="1.5" />
        <path d="M 14.5 12 L 17.5 12" />
        <path d="M 17.5 12 L 16 10.5" />
        <path d="M 17.5 12 L 16 13.5" />
      </svg>
    );
  } else if (type === 'escalator') {
    iconSvg = (
      <svg viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="w-[11px] h-[11px] flex-shrink-0">
        <circle cx="10" cy="7.5" r="1.8" fill={accentColor} stroke="none" />
        <path d="M 10 10.2 L 10 14" stroke={accentColor} strokeWidth="2.5" />
        <path d="M 3.5 19.5 L 7.5 19.5 C 9.5 19.5, 10.5 18, 12 15.5 L 15.5 10 C 17 8, 18 7, 20.5 7 L 22.5 7" />
      </svg>
    );
  } else if (type === 'both') {
    iconSvg = (
      <div className="flex items-center gap-[1px] flex-shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[11px] h-[11px]">
          <rect x="3" y="3" width="18" height="18" rx="2.5" />
          <path d="M 7.5 10 L 9.5 7 L 11.5 10 Z" fill={accentColor} stroke="none" />
          <line x1="14.5" y1="3" x2="14.5" y2="21" strokeDasharray="2 2" strokeWidth="1.5" />
          <path d="M 14.5 12 L 17.5 12" />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="w-[11px] h-[11px]">
          <path d="M 3.5 19.5 L 7.5 19.5 L 7.5 15.5 L 11.5 15.5 L 11.5 11.5 L 15.5 11.5 L 15.5 7.5 L 20.5 7.5" />
        </svg>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10.5px] font-bold bg-white/90 shadow-2xs ${borderColorClass}`}>
      {iconSvg}
      <span>{num}{language === 'KR' ? '번 출구' : ' Exit'}</span>
    </span>
  );
};
