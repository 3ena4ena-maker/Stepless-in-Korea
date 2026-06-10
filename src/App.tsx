/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Train, 
  Search, 
  MapPin, 
  Compass, 
  HelpCircle, 
  Info, 
  AlertTriangle, 
  Baby, 
  Luggage, 
  Check, 
  Camera, 
  Send, 
  X, 
  CheckCircle2, 
  ExternalLink,
  SlidersHorizontal,
  ChevronRight,
  Plus,
  RefreshCw,
  Clock,
  ThumbsUp,
  Map,
  Accessibility,
  Trash2,
  Shield
} from 'lucide-react';
import Header from './components/Header';
import TimelineVisualizer from './components/TimelineVisualizer';
import SubwayStationMap from './components/SubwayStationMap';
import { STATIONS, INITIAL_REPORTS } from './data';
import { Station, ExitInfo, FacilityReport, StatusType, getExitDisplayName, translateExitNumber, getTranslatedStationName } from './types';
import { translateRecommendation } from './utils';

// Custom icons based on premium vector styles for seamless accessibility display
const EscalatorIcon = ({ className = "w-5 h-5 text-slate-700 flex-shrink-0" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Passenger Circle Head */}
    <circle cx="10" cy="7.5" r="1.8" fill="currentColor" stroke="none" />
    {/* Passenger Body */}
    <path d="M 10 10.2 L 10 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Escalator Track Slope */}
    <path d="M 3.5 19.5 L 7.5 19.5 C 9.5 19.5, 10.5 18, 12 15.5 L 15.5 10 C 17 8, 18 7, 20.5 7 L 22.5 7" />
  </svg>
);

const ElevatorIcon = ({ className = "w-5 h-5 text-slate-700 flex-shrink-0" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Elevator Cabin Frame */}
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    {/* Up Arrow Inside */}
    <path d="M 7.5 10 L 9.5 7 L 11.5 10 Z" fill="currentColor" stroke="none" />
    {/* Down Arrow Inside */}
    <path d="M 7.5 14 L 9.5 17 L 11.5 14 Z" fill="currentColor" stroke="none" />
    {/* Center door line */}
    <line x1="14.5" y1="3" x2="14.5" y2="21" strokeDasharray="2 2" strokeWidth="1.5" />
    {/* Door indicator arrows */}
    <path d="M 14.5 12 L 17.5 12" />
    <path d="M 17.5 12 L 16 10.5" />
    <path d="M 17.5 12 L 16 13.5" />
  </svg>
);

const StairsIcon = ({ className = "w-5 h-5 text-slate-500 flex-shrink-0" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M 3.5 19.5 L 7.5 19.5 L 7.5 15.5 L 11.5 15.5 L 11.5 11.5 L 15.5 11.5 L 15.5 7.5 L 20.5 7.5" />
  </svg>
);

// Exit Display name helper is imported directly from Types.ts to ensure bilingual consistency across systems.

interface LockerCount {
  small: number;
  med?: number;
  large?: number;
  xlarge?: number;
}

const STATION_LOCKER_DATA: Record<string, Record<string, LockerCount> | LockerCount> = {
  seomyeon: {
    '1': { small: 38, med: 64, large: 14, xlarge: 46 },
    '2': { small: 58, large: 22, xlarge: 30 }
  },
  suyeong: {
    '2': { small: 10, large: 4, xlarge: 2 },
    '3': { small: 10, large: 6, xlarge: 4 }
  },
  bujeon: {
    '1': { small: 10, med: 12, xlarge: 4 }
  },
  jeonpo: { small: 32, large: 26, xlarge: 14 },
  haeundae: { small: 85, large: 40, xlarge: 29 },
  gwangan: { small: 50, large: 20, xlarge: 10 },
  nampo: { small: 33, med: 46, xlarge: 42 },
  busan: { small: 18, med: 52, large: 6, xlarge: 36 },
  jagalchi: { small: 34, med: 42, large: 4, xlarge: 27 }
};

const formatLockerCount = (data: LockerCount, lang: 'KR' | 'EN'): string => {
  const parts: string[] = [];
  if (lang === 'KR') {
    if (data.small) parts.push(`소 ${data.small}`);
    if (data.med) parts.push(`중 ${data.med}`);
    if (data.large) parts.push(`대 ${data.large}`);
    if (data.xlarge) parts.push(`특대 ${data.xlarge}`);
  } else {
    if (data.small) parts.push(`S ${data.small}`);
    if (data.med) parts.push(`M ${data.med}`);
    if (data.large) parts.push(`L ${data.large}`);
    if (data.xlarge) parts.push(`XL ${data.xlarge}`);
  }
  return parts.join(' ');
};

const getLockerInfoText = (stationId: string, language: 'KR' | 'EN'): string => {
  const data = STATION_LOCKER_DATA[stationId];
  if (!data) return language === 'KR' ? '있음' : 'Available';

  const isMultiLine = '1' in data || '2' in data || '3' in data || '동해' in data;
  if (isMultiLine) {
    const multi = data as Record<string, LockerCount>;
    return Object.entries(multi)
      .map(([line, counts]) => {
        const lineStr = language === 'KR'
          ? (line === '동해' ? '동해선' : `${line}호선`)
          : (line === '동해' ? 'Donghae' : `Line ${line}`);
        return `${lineStr}: ${formatLockerCount(counts, language)}`;
      })
      .join(' / ');
  } else {
    return formatLockerCount(data as LockerCount, language);
  }
};

const renderLockerBadges = (data: LockerCount, lang: 'KR' | 'EN'): React.ReactNode => {
  const categories = [
    { 
      key: 'small', 
      labelKR: '소형', 
      labelEN: 'S', 
      badgeClass: 'bg-[#10b981]/10 text-[#047857] border-[#10b981]/30', 
      numClass: 'text-[#065f46]' 
    },
    { 
      key: 'med', 
      labelKR: '중형', 
      labelEN: 'M', 
      badgeClass: 'bg-[#6366f1]/10 text-[#4f46e5] border-[#6366f1]/30', 
      numClass: 'text-[#3730a3]' 
    },
    { 
      key: 'large', 
      labelKR: '대형', 
      labelEN: 'L', 
      badgeClass: 'bg-[#f59e0b]/10 text-[#b45309] border-[#f59e0b]/30', 
      numClass: 'text-[#854d0e]' 
    },
    { 
      key: 'xlarge', 
      labelKR: '특대', 
      labelEN: 'XL', 
      badgeClass: 'bg-[#f43f5e]/10 text-[#e11d48] border-[#f43f5e]/30', 
      numClass: 'text-[#9f1239]' 
    },
  ] as const;

  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 justify-end">
      {categories.map(({ key, labelKR, labelEN, badgeClass, numClass }) => {
        const val = data[key];
        if (!val) return null;
        const label = lang === 'KR' ? labelKR : labelEN;
        return (
          <span 
            key={key} 
            className={`inline-flex items-center px-2 py-1 rounded-lg text-[11px] sm:text-[12px] font-sans font-bold border ${badgeClass} shadow-sm transition-all duration-150 hover:scale-105`}
          >
            <span className="opacity-80 font-medium mr-1 text-[10px] sm:text-[11px]">{label}</span>
            <span className={`font-black text-xs sm:text-sm tracking-tight ${numClass}`}>{val}</span>
          </span>
        );
      })}
    </div>
  );
};

const renderLockerInfo = (stationId: string, language: 'KR' | 'EN'): React.ReactNode => {
  const data = STATION_LOCKER_DATA[stationId];
  if (!data) {
    return (
      <div className="flex items-center justify-center py-2 text-slate-400 font-medium text-xs">
        {language === 'KR' ? '정보 없음 / 미비' : 'No locker data available'}
      </div>
    );
  }

  const isMultiLine = '1' in data || '2' in data || '3' in data || '동해' in data;
  if (isMultiLine) {
    const multi = data as Record<string, LockerCount>;
    return (
      <div className="flex flex-col gap-2.5 w-full">
        {Object.entries(multi).map(([line, counts]) => {
          const lineStr = language === 'KR'
            ? (line === '동해' ? '동해선' : `${line}호선`)
            : (line === '동해' ? 'Donghae' : `Line ${line}`);
          return (
            <div key={line} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 w-full pb-2 last:pb-0 border-b border-dashed border-slate-200/50 last:border-0">
              <span className="text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200/60 border border-slate-300 text-slate-600 inline-self-start sm:self-center w-max">
                {lineStr}
              </span>
              {renderLockerBadges(counts, language)}
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="flex justify-end w-full">
        {renderLockerBadges(data as LockerCount, language)}
      </div>
    );
  }
};

interface NearbyPlaceExit {
  num: string;
  type: 'elevator' | 'escalator' | 'both';
}

interface NearbyPlace {
  name: string;
  desc: string;
  exits?: NearbyPlaceExit[];
}

export interface TravelerRecommendation {
  id: string;
  author: string;
  topic: string;
  category: 'FOOD' | 'CAFE' | 'ATTRACTION' | 'TRANSIT' | 'OTHER';
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
    content: '하루 동안 지하철을 4회 이상 탈 계획이라면 1일권(정기승차권)을 사서 이용하는게 저렴해요! 어른 6,000원, 청소년 4,000원이고 1일권은 최초 사용 당일 부산 지하철 1 ~ 4호선에서 횟수 제한 없이 이용할 수 있어요!',
    upvotes: 35,
    createdAt: '2026-06-05T09:15:00Z'
  }
];

const STATION_PLACES_DATA: Record<string, Record<'KR' | 'EN', NearbyPlace[]>> = {
  seomyeon: {
    KR: [
      { name: '✨ 서면 젊음의 거리', desc: '문화 행사, 맛집, 분위기 좋은 카페 등 즐길 거리가 가득한 중심가' },
      { name: '🏢 삼정타워', desc: '다채로운 이색 맛집, 오락 시설, 영화관을 품은 복합 문화 몰' }
    ],
    EN: [
      { name: '✨ Seomyeon Youth Street', desc: 'Vibrant center filled with various restaurants, cafes, and shopping spots' },
      { name: '🏢 Samjung Tower', desc: 'A multi-complex lifestyle mall featuring dining, entertainment, and a cinema' }
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
  }
};

const getNearbyPlaces = (stationId: string, lang: 'KR' | 'EN'): NearbyPlace[] => {
  return STATION_PLACES_DATA[stationId]?.[lang] || [];
};

const NearbyExitBadge = ({ num, type, line, language }: { num: string; type: 'elevator' | 'escalator' | 'both'; line: string; language: 'KR' | 'EN'; key?: any }) => {
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

  // Generate SVG icon similar to map marker contents
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
          <circle cx="10" cy="7.5" r="1.8" fill={accentColor} stroke="none" />
          <path d="M 3.5 19.5 L 7.5 19.5 C 9.5 19.5, 10.5 18, 12 15.5 L 15.5 10 C 17 8, 18 7, 20.5 7 L 22.5 7" />
        </svg>
      </div>
    );
  }

  const numericPart = num.replace(/[^0-9]/g, '');
  const hasBujeonMall = num.includes('부전몰') || num.toLowerCase().includes('bujeon');
  const hasNampoMall = num.includes('남포지하') || num.toLowerCase().includes('nampomall');
  const hasNampoStn = num.includes('남포역') || num.toLowerCase().includes('nampostn');

  let exitLabel = '';
  if (language === 'KR') {
    if (hasBujeonMall) {
      exitLabel = `부전몰 ${numericPart}번 출구`;
    } else if (hasNampoMall) {
      exitLabel = `남포지하 ${numericPart}번 출구`;
    } else if (hasNampoStn) {
      exitLabel = `남포역 ${numericPart}번 출구`;
    } else {
      exitLabel = `${numericPart}번 출구`;
    }
  } else {
    if (hasBujeonMall) {
      exitLabel = `Bujeon Mall Exit ${numericPart}`;
    } else if (hasNampoMall) {
      exitLabel = `Nampo Mall Exit ${numericPart}`;
    } else if (hasNampoStn) {
      exitLabel = `Nampo Stn Exit ${numericPart}`;
    } else {
      exitLabel = `Exit ${numericPart}`;
    }
  }

  return (
    <div className={`inline-flex items-center gap-1 bg-white border-[1.5px] ${borderColorClass} rounded-full py-0.5 px-2 hover:shadow-sm transition-shadow shadow-[0_1px_3px_rgba(0,0,0,0.06)] shrink-0`}>
      <div className="flex items-center justify-center">
        {iconSvg}
      </div>
      <span className="text-[9.5px] sm:text-[10px] text-slate-800 font-extrabold tracking-tight">
        {exitLabel}
      </span>
    </div>
  );
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<'KR' | 'EN'>('KR');
  const [selectedStationId, setSelectedStationId] = useState<string>('seomyeon');
  const [activePathFilter, setActivePathFilter] = useState<'ALL' | 'ACCESSIBLE' | 'CARRY'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Geolocation states
  const [geoLoading, setGeoLoading] = useState<boolean>(false);
  const [geoResult, setGeoResult] = useState<{
    stationName: string;
    distance: number;
    exitNumber: string;
    details: string;
    lat: number;
    lng: number;
  } | null>(null);

  // Live reports state
  const [reports, setReports] = useState<FacilityReport[]>(INITIAL_REPORTS);
  
  // Create Report states
  const [reportStation, setReportStation] = useState<string>('seomyeon');
  const [reportExit, setReportExit] = useState<string>('7번 출구');
  const [reportFacility, setReportFacility] = useState<'ELEVATOR' | 'ESCALATOR' | 'RAMP' | 'TOILET' | 'OTHER'>('ELEVATOR');
  const [reportIssue, setReportIssue] = useState<'BROKEN' | 'MAINTENANCE' | 'CONSTRUCTION' | 'OTHER'>('BROKEN');
  const [reportText, setReportText] = useState<string>('');
  const [reportImage, setReportImage] = useState<string | null>(null);
  const [submittingReport, setSubmittingReport] = useState<boolean>(false);
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);

  // Active expanded exit details
  const [expandedExitNum, setExpandedExitNum] = useState<string | null>(null);

  // Traveler Recommendations states
  const [recommendations, setRecommendations] = useState<TravelerRecommendation[]>(() => {
    const saved = localStorage.getItem('busan_traveler_recs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as TravelerRecommendation[];
        // Auto-update default items if they are present but have old values in localStorage
        const updated = parsed.map(rec => {
          const defaultMatch = DEFAULT_RECOMMENDATIONS.find(d => d.id === rec.id);
          if (defaultMatch) {
            return {
              ...rec,
              content: defaultMatch.content,
              topic: defaultMatch.topic,
              stationOrExit: defaultMatch.stationOrExit
            };
          }
          return rec;
        });

        // Ensure missing default items (like newly added ones) are always populated
        const missingDefaults = DEFAULT_RECOMMENDATIONS.filter(
          d => !updated.some(rec => rec.id === d.id)
        );

        if (missingDefaults.length > 0) {
          // Keep default recommendations sorted appropriately (e.g. at the bottom or top)
          const merged = [...updated, ...missingDefaults];
          localStorage.setItem('busan_traveler_recs', JSON.stringify(merged));
          return merged;
        }

        return updated;
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_RECOMMENDATIONS;
  });

  const [newRecAuthor, setNewRecAuthor] = useState('');
  const [newRecTopic, setNewRecTopic] = useState('');
  const [newRecCategory, setNewRecCategory] = useState<'FOOD' | 'CAFE' | 'ATTRACTION' | 'TRANSIT' | 'OTHER'>('FOOD');
  const [newRecStation, setNewRecStation] = useState('');
  const [newRecContent, setNewRecContent] = useState('');
  const [hasUpvoted, setHasUpvoted] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('busan_traveler_upvotes');
    return saved ? JSON.parse(saved) : {};
  });

  // User's own written recommendation IDs
  const [myRecIds, setMyRecIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('busan_my_rec_ids');
    return saved ? JSON.parse(saved) : [];
  });

  // Operator (Admin) Mode states
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');
  const [adminError, setAdminError] = useState<string>('');

  // Delete confirmation state to avoid window.confirm (iframe safety)
  const [deleteConfId, setDeleteConfId] = useState<string | null>(null);

  // Category filter state for traveler recommendations board
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  useEffect(() => {
    localStorage.setItem('busan_traveler_recs', JSON.stringify(recommendations));
  }, [recommendations]);

  useEffect(() => {
    localStorage.setItem('busan_traveler_upvotes', JSON.stringify(hasUpvoted));
  }, [hasUpvoted]);

  // Automatic Translation States using server-side Gemini 3.5 Flash
  const [translatedRecs, setTranslatedRecs] = useState<Record<string, { topic: string; content: string; stationOrExit: string }>>(() => {
    const saved = localStorage.getItem('busan_traveler_recs_en');
    return saved ? JSON.parse(saved) : {};
  });
  const [translatingIds, setTranslatingIds] = useState<Record<string, boolean>>({});

  const translatedRecsRef = React.useRef(translatedRecs);
  const translatingIdsRef = React.useRef(translatingIds);

  useEffect(() => {
    translatedRecsRef.current = translatedRecs;
    localStorage.setItem('busan_traveler_recs_en', JSON.stringify(translatedRecs));
  }, [translatedRecs]);

  useEffect(() => {
    translatingIdsRef.current = translatingIds;
  }, [translatingIds]);

  useEffect(() => {
    if (language !== 'EN') return;

    // Use a local copy to prevent duplicate network calls in the exact same loop tick
    const currentFetching = { ...translatingIdsRef.current };

    recommendations.forEach((rec) => {
      if (translatedRecsRef.current[rec.id] || currentFetching[rec.id]) return;

      // Mark as fetching immediately in local tracker and ref synchronously
      currentFetching[rec.id] = true;
      translatingIdsRef.current[rec.id] = true;
      setTranslatingIds(prev => ({ ...prev, [rec.id]: true }));

      fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: rec.topic,
          content: rec.content,
          stationOrExit: rec.stationOrExit
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Translation API failed");
      })
      .then(data => {
        setTranslatedRecs(prev => {
          const updated = {
            ...prev,
            [rec.id]: {
              topic: data.topic,
              content: data.content,
              stationOrExit: data.stationOrExit
            }
          };
          localStorage.setItem('busan_traveler_recs_en', JSON.stringify(updated));
          return updated;
        });
      })
      .catch(err => {
        console.error("Translation failed for ID:", rec.id, err);
      })
      .finally(() => {
        setTranslatingIds(prev => ({ ...prev, [rec.id]: false }));
        translatingIdsRef.current[rec.id] = false;
      });
    });
  }, [language, recommendations]);

  const handleManualTranslate = (rec: TravelerRecommendation) => {
    if (translatingIds[rec.id]) return;

    setTranslatingIds(prev => ({ ...prev, [rec.id]: true }));
    translatingIdsRef.current[rec.id] = true;

    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: rec.topic,
        content: rec.content,
        stationOrExit: rec.stationOrExit
      })
    })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("Translation failed");
    })
    .then(data => {
      setTranslatedRecs(prev => {
        const updated = {
          ...prev,
          [rec.id]: {
            topic: data.topic,
            content: data.content,
            stationOrExit: data.stationOrExit
          }
        };
        localStorage.setItem('busan_traveler_recs_en', JSON.stringify(updated));
        return updated;
      });
    })
    .catch(err => {
      console.error("Manual translation failed:", err);
    })
    .finally(() => {
      setTranslatingIds(prev => ({ ...prev, [rec.id]: false }));
      translatingIdsRef.current[rec.id] = false;
    });
  };

  const handleAddRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecAuthor.trim() || !newRecTopic.trim() || !newRecContent.trim()) return;

    const newId = `rec-${Date.now()}`;
    const newRec: TravelerRecommendation = {
      id: newId,
      author: newRecAuthor.trim(),
      topic: newRecTopic.trim(),
      category: newRecCategory,
      stationOrExit: newRecStation.trim() || (language === 'KR' ? '모든 구역' : 'All Area'),
      content: newRecContent.trim(),
      upvotes: 0,
      createdAt: new Date().toISOString()
    };

    setRecommendations(prev => [newRec, ...prev]);
    setMyRecIds(prev => {
      const updated = [...prev, newRec.id];
      localStorage.setItem('busan_my_rec_ids', JSON.stringify(updated));
      return updated;
    });

    // Translate immediately upon submission to guarantee it's cached and ready instantly when switching language!
    setTranslatingIds(prev => ({ ...prev, [newId]: true }));
    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: newRec.topic,
        content: newRec.content,
        stationOrExit: newRec.stationOrExit
      })
    })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("Translation failed");
    })
    .then(data => {
      setTranslatedRecs(prev => ({
        ...prev,
        [newId]: {
          topic: data.topic,
          content: data.content,
          stationOrExit: data.stationOrExit
        }
      }));
    })
    .catch(err => {
      console.error("Instant translation failed:", err);
    })
    .finally(() => {
      setTranslatingIds(prev => ({ ...prev, [newId]: false }));
    });

    setNewRecAuthor('');
    setNewRecTopic('');
    setNewRecCategory('FOOD');
    setNewRecStation('');
    setNewRecContent('');
  };

  const handleDeleteRecommendation = (id: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
    setMyRecIds(prev => {
      const updated = prev.filter(item => item !== id);
      localStorage.setItem('busan_my_rec_ids', JSON.stringify(updated));
      return updated;
    });
    setDeleteConfId(null);
  };

  const handleUpvote = (id: string) => {
    if (hasUpvoted[id]) {
      // Undo upvote
      setRecommendations(prev => prev.map(rec => rec.id === id ? { ...rec, upvotes: rec.upvotes - 1 } : rec));
      setHasUpvoted(prev => ({ ...prev, [id]: false }));
    } else {
      // Perform upvote
      setRecommendations(prev => prev.map(rec => rec.id === id ? { ...rec, upvotes: rec.upvotes + 1 } : rec));
      setHasUpvoted(prev => ({ ...prev, [id]: true }));
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'KR' ? 'EN' : 'KR');
  };

  const findNearestStepFreeExit = (lat: number, lng: number) => {
    const getDistanceInMeters = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const ky = 111132;
      const kx = Math.cos(lat1 * Math.PI / 180) * 111319;
      const dx = Math.abs(lon1 - lon2) * kx;
      const dy = Math.abs(lat1 - lat2) * ky;
      return Math.round(Math.sqrt(dx * dx + dy * dy));
    };

    const candidates: { station: Station; exit: ExitInfo; distance: number }[] = [];
    STATIONS.forEach(station => {
      station.exits.forEach(exit => {
        if (exit.hasElevator || exit.isAccessible) {
          const dist = getDistanceInMeters(lat, lng, exit.latitude, exit.longitude);
          candidates.push({ station, exit, distance: dist });
        }
      });
    });

    if (candidates.length > 0) {
      candidates.sort((a, b) => a.distance - b.distance);
      return candidates[0];
    }
    return null;
  };

  const requestNearbyGuide = () => {
    setGeoLoading(true);
    setGeoResult(null);

    const processPosition = (userLat: number, userLng: number, isSimulated: boolean) => {
      const nearest = findNearestStepFreeExit(userLat, userLng);
      if (nearest) {
        setSelectedStationId(nearest.station.id);
        
        const stationName = nearest.station.name;
        const exitNumber = nearest.exit.number;
        const distance = nearest.distance;
        
        setGeoResult({
          stationName,
          exitNumber,
          distance,
          details: '',
          lat: nearest.exit.latitude,
          lng: nearest.exit.longitude
        });

        // Smooth scroll to the Naver Map container
        setTimeout(() => {
          const mapEl = document.getElementById('station-map-container');
          if (mapEl) {
            mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 250);
      }
      setGeoLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTimeout(() => {
            processPosition(position.coords.latitude, position.coords.longitude, false);
          }, 800);
        },
        () => {
          // Simulation fallback for sandboxed iframe
          setTimeout(() => {
            // Seomyeon street fallback (near Judith Taehwa)
            const simulatedLat = 35.1584;
            const simulatedLng = 129.0595;
            processPosition(simulatedLat, simulatedLng, true);
          }, 800);
        },
        { timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      setTimeout(() => {
        const simulatedLat = 35.1584;
        const simulatedLng = 129.0595;
        processPosition(simulatedLat, simulatedLng, true);
      }, 800);
    }
  };

  const handleAddReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;

    setSubmittingReport(true);

    setTimeout(() => {
      const selectedStation = STATIONS.find(s => s.id === reportStation);
      const newReport: FacilityReport = {
        id: `report-${Date.now()}`,
        stationId: reportStation,
        stationName: selectedStation ? selectedStation.name : '부산 지하철역',
        exitNumber: reportExit,
        facilityType: reportFacility,
        reportType: reportIssue,
        details: reportText,
        image: reportImage || undefined,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };

      setReports(prev => [newReport, ...prev]);
      setReportText('');
      setReportImage(null);
      setSubmittingReport(false);
      setReportSuccess(true);

      // Dismiss success alert automatically
      setTimeout(() => {
        setReportSuccess(false);
      }, 4000);
    }, 600);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReportImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get active station details based on selection or search
  const activeStation = STATIONS.find(s => s.id === selectedStationId) || STATIONS[0];

  const focusedExitCoords = (geoResult && activeStation.name === geoResult.stationName)
    ? { latitude: geoResult.lat, longitude: geoResult.lng }
    : null;

  // Helper for rendering status markers
  const getExitStatusText = (status: StatusType) => {
    switch(status) {
      case 'OPERATIONAL': 
        return language === 'KR' ? '운행 원활' : 'Normal';
      case 'MAINTENANCE': 
        return language === 'KR' ? '보수 점검' : 'Service';
      case 'BLOCKED': 
        return language === 'KR' ? '계단 진입만' : 'Stairs Only';
    }
  };



  // Filter exits of station by Stroller vs Carrier vs All
  const getFilteredExits = (station: Station) => {
    return station.exits.filter(exit => {
      if (activePathFilter === 'ACCESSIBLE') {
        return exit.hasElevator && exit.isAccessible;
      }
      if (activePathFilter === 'CARRY') {
        return exit.hasElevator || exit.hasEscalator;
      }
      return true;
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased pb-12 flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Header 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
          language={language} 
          toggleLanguage={toggleLanguage} 
        />

        {/* Core Main Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
          
          {/* Tab 1: HOME LANDING VIEW */}
          {currentTab === 'home' && (
            <div className="space-y-8">
              {/* Feature Hero banner with beautiful illustrations */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#003466] to-[#001d3a] text-white p-8 sm:p-12 shadow-md">
                <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12">
                  <Train className="w-96 h-96" />
                </div>

                <div className="relative z-10 max-w-2xl text-left">
                  <h1 className="text-xl sm:text-2xl font-extrabold font-heading tracking-tight leading-snug whitespace-pre-line">
                    {language === 'KR' ? (
                      <>
                        엘리베이터와 에스컬레이터<br />
                        출구로 바로 이동 가능한<br />
                        계단 없는 최적의 동선!
                      </>
                    ) : (
                      <>
                        Optimal flat paths directly <br />
                        connecting you to elevators <br />
                        & escalators without stairs!
                      </>
                    )}
                  </h1>

                  {/* Master Quick finder tools */}
                  <div className="mt-6">
                    <button
                      onClick={requestNearbyGuide}
                      id="nearby-finder-btn"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#ffde43] hover:bg-[#ebd04e] active:scale-95 text-slate-900 font-extrabold tracking-tight transition-all shadow-[0_8px_30px_rgb(255,222,67,0.15)] text-sm sm:text-base border border-amber-300 cursor-pointer min-w-0"
                    >
                      <MapPin className="w-5 h-5 text-slate-900 fill-slate-900/10 shrink-0" />
                      <span>
                        {geoLoading 
                          ? (language === 'KR' ? '주변 검색 중...' : 'Searching...') 
                          : (language === 'KR' ? '내 주변 스탭프리 출구' : 'Nearby Step-Free Exits')}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Geolocation Finder Outcome Panel */}
              {geoResult && (
                <div className="bg-sky-50 border border-sky-100 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-left shadow-sm animate-fade-in" id="geo-result-container">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-sky-200/50 text-[#F06A00] rounded-2xl shrink-0 mt-1">
                      <MapPin className="w-6 h-6 fill-sky-200" />
                    </div>
                    <div>
                      <h4 className="text-xl font-extrabold font-heading text-slate-800">
                        {getExitDisplayName(geoResult.stationName, geoResult.exitNumber, language)}
                      </h4>
                      <p className="text-sm font-bold text-[#F06A00] mt-1">
                        {language === 'KR' 
                          ? `현재 위치에서 도보 약 ${geoResult.distance}m` 
                          : `Approx. ${geoResult.distance}m Away on Foot`}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center md:self-center self-end mt-2 md:mt-0">
                    <button
                      onClick={() => window.open(`https://map.naver.com/v5/search/${geoResult.stationName} ${geoResult.exitNumber}`)}
                      className="text-xs font-bold text-[#F06A00] bg-orange-50 hover:bg-orange-100/80 border border-orange-200/40 px-5 py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                    >
                      {language === 'KR' ? '네이버 지도 도보 길안내 시작' : 'Launch Naver Map Guide'}
                    </button>
                  </div>
                </div>
              )}

              {/* EXITS EXPLORER SECTION */}
              <div id="exits-explorer-section" className="scroll-mt-20 space-y-6 text-left">
                
                {/* 📍 Prominent Segmented Station Clicker (Mobile & Desktop Optimized) */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-[0_4px_22px_rgb(0,0,0,0.02)] space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-[#004481] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      {language === 'KR' ? '📍 이용중인 지하철역 선택' : '📍 Select Your Subway Station Hub'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {STATIONS.map(s => {
                      const isActive = selectedStationId === s.id;
                      return (
                        <button
                          key={s.id}
                          id={`quick-station-tab-${s.id}`}
                          onClick={() => {
                            setSelectedStationId(s.id);
                            // Keep all detailed pathways collapsed initially as requested
                            setExpandedExitNum(null);
                          }}
                          className={`py-3 px-2 sm:py-4 rounded-2xl text-xs sm:text-base font-extrabold transition-all border flex flex-col items-center justify-center gap-1 cursor-pointer ${
                            isActive
                              ? 'bg-[#004481] text-white border-[#004481] shadow-md ring-4 ring-blue-50'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-150'
                          }`}
                        >
                          <span className="leading-tight shrink-0 font-heading text-sm sm:text-lg">
                            {language === 'KR' ? s.name : s.englishName}
                          </span>
                          <span className={`text-[9px] font-sans font-medium uppercase tracking-wider block ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                            {language === 'KR' ? s.englishName.split(' ')[0] : s.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 🗺️ Naver Map-linked Station Map Component (Directly Below Selection Space) */}
                <div id="station-map-container" className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_22px_rgb(0,0,0,0.02)] overflow-hidden">
                  <SubwayStationMap station={activeStation} language={language} focusedExitCoords={focusedExitCoords} />
                </div>

                {/* Sub-Tabs selection representing companion types */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      id="filter-all-btn"
                      onClick={() => setActivePathFilter('ALL')}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 border cursor-pointer ${
                        activePathFilter === 'ALL'
                          ? 'bg-[#004481] text-white border-[#004481]'
                          : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'
                      }`}
                    >
                      <span>{language === 'KR' ? '전체 보기' : 'Show All Exits'}</span>
                    </button>
                    <button
                      id="filter-accessible-btn"
                      onClick={() => {
                        setActivePathFilter('ACCESSIBLE');
                        setExpandedExitNum(null);
                      }}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 border cursor-pointer ${
                        activePathFilter === 'ACCESSIBLE'
                          ? 'bg-emerald-700 text-white border-emerald-700'
                          : 'bg-white text-slate-500 border-slate-200 hover:text-emerald-700'
                      }`}
                    >
                      <ElevatorIcon className="w-4 h-4 shrink-0" />
                      <span>{language === 'KR' ? '엘리베이터 (유모차/휠체어/캐리어)' : 'Elevator (Stroller/Wheelchair/Luggage)'}</span>
                    </button>
                    <button
                      id="filter-carry-btn"
                      onClick={() => {
                        setActivePathFilter('CARRY');
                        setExpandedExitNum(null);
                      }}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 border cursor-pointer ${
                        activePathFilter === 'CARRY'
                          ? 'bg-[#004481] text-white border-[#004481]'
                          : 'bg-white text-slate-500 border-slate-200 hover:text-[#004481]'
                      }`}
                    >
                      <EscalatorIcon className="w-4 h-4 shrink-0" />
                      <span>{language === 'KR' ? '에스컬레이터 (캐리어/무거운 짐)' : 'Escalator (Luggage/Heavy Bag)'}</span>
                    </button>
                  </div>

                  <div className="text-xs text-slate-500">
                    {language === 'KR' 
                      ? `총 ${getFilteredExits(activeStation).length}개 출구 표시 중` 
                      : `${getFilteredExits(activeStation).length} matching exits`}
                  </div>
                </div>

                {/* Exits list layout - Unified single Column with Inline Timeline Details */}
                <div className="max-w-4xl mx-auto space-y-5">
                  {getFilteredExits(activeStation).map(exit => {
                    const isExpanded = expandedExitNum === exit.number;

                    return (
                      <div
                        key={exit.number}
                        id={`exit-item-${exit.number}`}
                        className={`bg-white rounded-3xl border p-5 sm:p-6 transition-all shadow-[0_2px_12px_rgb(0,0,0,0.01)] hover:shadow-[0_12px_32px_rgb(0,0,0,0.03)] text-left ${
                          isExpanded 
                            ? 'border-[#004481] ring-2 ring-[#004481]/5 bg-slate-50/10' 
                            : 'border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {/* Header Details row */}
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 font-heading flex items-center gap-2">
                                <span>{getExitDisplayName(activeStation.name, exit.number, language)}</span>
                              </h3>
                            </div>
                            
                            {/* Simple facilities details directly matching user request */}
                            <div className="space-y-2 mt-2">
                              {exit.hasEscalator && (
                                <div className="text-sm font-bold text-slate-700 flex items-center gap-2 bg-slate-50/80 px-2.5 py-1.5 rounded-xl border border-slate-100/50">
                                  <EscalatorIcon />
                                  <span>
                                    {language === 'KR' 
                                      ? `에스컬레이터 (${
                                          exit.facilityDirection === 'BOTH' ? '상행 ⬆️ · 하행 ⬇️' :
                                          exit.facilityDirection === 'UP' ? '상행 ⬆️' : '하행 ⬇️'
                                        })` 
                                      : `Escalator (${
                                          exit.facilityDirection === 'BOTH' ? 'Up ⬆️ · Down ⬇️' :
                                          exit.facilityDirection === 'UP' ? 'Upward ⬆️' : 'Downward ⬇️'
                                        })`
                                    }
                                  </span>
                                </div>
                              )}
                              {exit.hasElevator && (
                                <div className="text-sm font-bold text-slate-700 flex items-center gap-2 bg-slate-50/80 px-2.5 py-1.5 rounded-xl border border-slate-100/50">
                                  <ElevatorIcon />
                                  <span>
                                    {language === 'KR' ? '엘리베이터 🛗' : 'Elevator 🛗'}
                                  </span>
                                </div>
                              )}
                              {!exit.hasElevator && !exit.hasEscalator && (
                                <div className="text-sm font-bold text-slate-500 flex items-center gap-2 bg-slate-50/80 px-2.5 py-1.5 rounded-xl border border-slate-100/50">
                                  <StairsIcon />
                                  <span>
                                    {language === 'KR' ? '계단 전용 👟' : 'Stairs Only 👟'}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
                          {/* Operational indicator lights */}
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              exit.status === 'OPERATIONAL' 
                                ? 'bg-emerald-500 animate-pulse' 
                                : exit.status === 'MAINTENANCE'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`} />
                            <span className="text-xs font-bold text-slate-500">
                              {getExitStatusText(exit.status)}
                            </span>
                          </div>

                          {/* Action to expand Timeline Details Inline */}
                          <button
                            id={`expand-exit-btn-${exit.number}`}
                            onClick={() => setExpandedExitNum(isExpanded ? null : exit.number)}
                            className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                              isExpanded
                                ? 'bg-[#004481] text-white shadow-sm'
                                : 'bg-slate-100 hover:bg-slate-200 text-[#004481]'
                            }`}
                          >
                            {isExpanded 
                              ? (language === 'KR' ? '상세 동선 접기' : 'Close Details')
                              : (language === 'KR' ? '상세 동선 지도 보기' : 'Show Details & Map')}
                          </button>
                        </div>

                        {/* Inline Timeline Map Visualization - Perfectly mobile-first */}
                        {isExpanded && (
                          <div className="mt-6 pt-6 border-t border-slate-150 animate-slide-up">
                            <TimelineVisualizer
                              directionDesc={exit.directionDesc}
                              exitNumber={exit.number}
                              stationName={activeStation.name}
                              googleMapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getExitDisplayName(activeStation.name, exit.number, language))}`}
                              naverMapUrl={exit.naverMapUrl}
                              language={language}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {getFilteredExits(activeStation).length === 0 && (
                    <div className="p-16 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                      <Search className="w-12 h-12 text-slate-300 mx-auto" />
                      <h4 className="font-bold text-slate-700 mt-4">{language === 'KR' ? '알맞는 통과 출구가 없습니다.' : 'No direct exits matched criteria'}</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {language === 'KR' ? '검색 필터를 전체 보기로 변경하여 계단이나 일반 요소를 찾아보세요.' : 'Try changing status to see alternative travel paths.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: SEARCH / BENTO GRID VIEW */}
          {currentTab === 'search' && (
            <div className="space-y-8 text-left">
              {/* Search Header */}
              <div>
                <h2 className="text-2xl font-extrabold font-heading text-slate-800">
                  {language === 'KR' ? '부산 지하철역 출구 정보 둘러보기' : 'Subway Exit Information Index'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {language === 'KR' 
                    ? '부산 핵심 주요역의 총 엘리베이터 수, 에스컬레이터 대수를 한눈에 비교하고 탐색해보세요.' 
                    : 'Analyze general escalators, elevator configurations across major transit sectors.'}
                </p>

                {/* Search Bar Input */}
                <div className="mt-6 max-w-lg relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="stations-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'KR' ? '역 이름이나 출구를 검색해보세요... (예: 서면역, 7번)' : 'Search station or exit index... (e.g., Jeonpo, 7)'}
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl bg-white text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003466] text-sm"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Bento Grid layout representing stations */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {STATIONS.filter(s => 
                  s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.exits.some(e => e.number.includes(searchQuery))
                ).map(station => (
                  <div 
                    key={station.id}
                    id={`bento-station-${station.id}`}
                    onClick={() => {
                      setSelectedStationId(station.id);
                      setExpandedExitNum(null);
                      setCurrentTab('home');
                    }}
                    className="lg:col-span-6 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer group text-left flex flex-col justify-between"
                  >
                    <div>
                      {/* Station Title */}
                      <div className="flex items-center justify-between gap-3 border-b border-slate-50 pb-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-2xl bg-sky-50 text-[#004481]">
                            <Train className="w-6 h-6 shrink-0" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold font-heading text-slate-800">
                              {language === 'KR' ? station.name : station.englishName}
                            </h3>
                            <span className="text-xs text-slate-400 block font-sans">
                              {language === 'KR' ? station.englishName : station.name}
                            </span>
                          </div>
                        </div>

                        {/* Station line stickers */}
                        <div className="flex gap-1">
                          {station.lines.map(line => (
                            <span 
                              key={line} 
                              className={`px-3 py-1 text-xs font-extrabold text-white rounded-full ${
                                line === '1' ? 'bg-[#F06A00]' : 
                                line === '2' ? 'bg-[#1b6d24]' : 
                                line === '3' ? 'bg-[#906A3B]' : 
                                line === '동해' ? 'bg-[#004960]' : 
                                'bg-slate-400'
                              }`}
                            >
                              {language === 'KR' 
                                ? (line === '동해' ? '동해선' : `${line}호선`)
                                : (line === '동해' ? 'Donghae Line' : `Line ${line}`)
                              }
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Station General Highlights */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/50 text-center">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                            {language === 'KR' ? '엘리베이터수' : 'Elevators'}
                          </span>
                          <span className="text-lg font-extrabold text-[#F06A00]">
                            {station.exits.filter(e => e.hasElevator).length}대
                          </span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/50 text-center">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                            {language === 'KR' ? '에스컬레이터' : 'Escalators'}
                          </span>
                          <span className="text-lg font-extrabold text-emerald-700">
                            {station.exits.filter(e => e.hasEscalator).length}대
                          </span>
                        </div>
                      </div>

                      {/* Locker Information Row */}
                      <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 flex flex-col gap-2.5 text-xs mb-3">
                        <div className="flex items-center justify-between border-b border-slate-200/50 pb-2">
                          <span className="font-bold text-slate-700 flex items-center gap-1.5">
                            <span className="text-sm font-sans">🗄️</span>
                            <span className="font-extrabold text-[12px]">{language === 'KR' ? '물품보관함' : 'Lockers'}</span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            {language === 'KR' ? '보관함 크기별 수량' : 'Cabinets by size'}
                          </span>
                        </div>
                        <div className="w-full text-right" title={getLockerInfoText(station.id, language)}>
                          {renderLockerInfo(station.id, language)}
                        </div>
                      </div>

                      {/* Nearby Attractions Row */}
                      <div className="bg-[#f0f9ff]/70 p-3 rounded-xl border border-sky-100/50 flex flex-col gap-2.5 text-xs">
                        <div className="flex items-center justify-between border-b border-sky-100 pb-2">
                          <span className="font-bold text-sky-900 flex items-center gap-1.5">
                            <span className="text-sm">📍</span>
                            <span className="font-extrabold text-[12px]">{language === 'KR' ? '주변 가볼 만한 곳' : 'Nearby Attractions'}</span>
                          </span>
                          <span className="text-[10px] text-sky-500 font-semibold">
                            {language === 'KR' ? '추천 미니 가이드' : 'Recommended spots'}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {getNearbyPlaces(station.id, language).map((place, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-2 bg-white/70 p-2 px-3 rounded-lg border border-sky-100/20 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                              <div className="flex flex-col gap-0.5">
                                <span className="font-extrabold text-sky-950 text-[11.5px] sm:text-[12px]">
                                  {place.name}
                                </span>
                                <span className="text-slate-500 text-[10px] sm:text-[10.5px] font-semibold">
                                  {place.desc}
                                </span>
                              </div>
                              {place.exits && place.exits.length > 0 && (
                                <div className="flex flex-wrap gap-1 md:justify-end items-center mt-1.5 md:mt-0">
                                  {place.exits.map((ex, exIdx) => (
                                    <NearbyExitBadge
                                      key={exIdx}
                                      num={ex.num}
                                      type={ex.type}
                                      line={station.lines[0]}
                                      language={language}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-[#004481] font-bold group-hover:translate-x-1 transition-transform">
                      <span>{activeStation.name === station.name ? (language === 'KR' ? '현재 선택됨' : 'Active') : (language === 'KR' ? '이 역 가이드로 지정하기' : 'Switch to Station')}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: TRAVEL TIPS VIEW */}
          {currentTab === 'tips' && (
            <div className="space-y-8 text-left animate-fade-in max-w-5xl mx-auto">
              
              {/* Header Info */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-800 flex items-center gap-2">
                  <span>💡</span>
                  <span>{language === 'KR' ? '부산 여행 꿀팁 & 추천 정보' : 'Busan Travel Tips & Community Board'}</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed">
                  {language === 'KR' 
                    ? '부산 여행 최고의 커뮤니티와 현지 여행객들이 직접 추천하는 유익한 교통/관광 꿀팁을 확인하고, 나만의 꿀팁을 다른 여행객들에게 추천해 보세요.' 
                    : 'Discover premium traveling guides, local subway shortcuts, and custom recommendation spots curated by the global tourist community.'}
                </p>
              </div>

              {/* Reddit Official Card (https://www.reddit.com/r/BusanTravelTips/) */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF4500] to-[#E03A00] text-white p-6 sm:p-8 shadow-md">
                <div className="absolute right-0 bottom-0 opacity-10 translate-x-8 translate-y-8">
                  {/* Space for background decoration */}
                  <span className="text-9xl font-bold font-sans">r/</span>
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-2xl text-left">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold font-sans">
                      <span>Reddit Community Portal</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-sans tracking-tight">
                      r/BusanTravelTips
                    </h3>
                    <p className="text-sm text-amber-50/90 leading-relaxed font-semibold">
                      {language === 'KR' 
                        ? '전 세계 여행객들이 생생하게 소통하는 레딧의 대표 부산 여행 정보 서브레딧입니다. 교통수단, 휠체어/유모차 전철 관광 코스, 숨은 로컬 맛집 정보 등을 편리하게 확인해 볼 수 있습니다.' 
                        : 'The premier Reddit hub where thousands of global travelers share authentic itineraries, barrier-free transit advice, and hidden gems in Busan.'}
                    </p>
                  </div>
                  
                  <a
                    href="https://www.reddit.com/r/BusanTravelTips/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 active:scale-95 text-[#FF4500] font-extrabold tracking-tight transition-all shadow-md text-sm cursor-pointer whitespace-nowrap font-bold"
                  >
                    <span>{language === 'KR' ? '레딧 커뮤니티 방문하기' : 'Visit Subreddit'}</span>
                    <ExternalLink className="w-4 h-4 text-[#FF4500] shrink-0" />
                  </a>
                </div>
              </div>

              {/* Interactive Traveler Recommendations Board */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Submit Form (4 cols on lg) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_22px_rgba(0,0,0,0.02)] text-left">
                    <h3 className="text-lg font-extrabold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-1.5">
                      <span className="text-base text-[#004481]">✍️</span>
                      <span>{language === 'KR' ? '나만의 여행 팁 추천하기' : 'Add Your Travel Tip'}</span>
                    </h3>

                    <form onSubmit={handleAddRecommendation} className="space-y-4 text-xs font-semibold">
                      {/* Author Card input */}
                      <div>
                        <label className="block text-slate-500 mb-1.5 font-bold">
                          {language === 'KR' ? '👤 작성자 닉네임' : '👤 Your Nickname'}
                        </label>
                        <input
                          type="text"
                          required
                          value={newRecAuthor}
                          onChange={(e) => setNewRecAuthor(e.target.value)}
                          placeholder={language === 'KR' ? "예: 광안리갈매기" : "e.g., BusanTraveler"}
                          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-sans font-medium focus:outline-none focus:ring-2 focus:ring-[#003466]/20 focus:border-[#003466] text-xs sm:text-sm"
                        />
                      </div>

                      {/* Topic title */}
                      <div>
                        <label className="block text-slate-500 mb-1.5 font-bold">
                          {language === 'KR' ? '✨ 추천 주제 / 장소명' : '✨ Topic or Spot Name'}
                        </label>
                        <input
                          type="text"
                          required
                          value={newRecTopic}
                          onChange={(e) => setNewRecTopic(e.target.value)}
                          placeholder={language === 'KR' ? "예: 광안대교 최고 뷰스팟" : "e.g., Gwangan Bridge Secret View"}
                          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-sans font-medium focus:outline-none focus:ring-2 focus:ring-[#003466]/20 focus:border-[#003466] text-xs sm:text-sm"
                        />
                      </div>

                      {/* Flex row for Category & Exit details */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* Category */}
                        <div>
                          <label className="block text-slate-500 mb-1.5 font-bold">
                            {language === 'KR' ? '📂 카테고리' : '📂 Category'}
                          </label>
                          <select
                            value={newRecCategory}
                            onChange={(e) => setNewRecCategory(e.target.value as any)}
                            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#003466]/20 text-xs sm:text-sm cursor-pointer"
                          >
                            <option value="FOOD">{language === 'KR' ? '음식점 🍕' : 'Food 🍕'}</option>
                            <option value="CAFE">{language === 'KR' ? '카페 ☕' : 'Cafe ☕'}</option>
                            <option value="ATTRACTION">{language === 'KR' ? '명소 🎡' : 'Attraction 🎡'}</option>
                            <option value="TRANSIT">{language === 'KR' ? '교통 팁 🚇' : 'Transit Tip 🚇'}</option>
                            <option value="OTHER">{language === 'KR' ? '기타 💡' : 'Other 💡'}</option>
                          </select>
                        </div>

                        {/* Station/Exit Info */}
                        <div>
                          <label className="block text-slate-500 mb-1.5 font-bold">
                            {language === 'KR' ? '🚇 관련 전철역 / 출구' : '🚇 Relevant Station / Exit'}
                          </label>
                          <input
                            type="text"
                            value={newRecStation}
                            onChange={(e) => setNewRecStation(e.target.value)}
                            placeholder={language === 'KR' ? "예: 전포역 7번출구" : "e.g., Jeonpo Exit 7"}
                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-sans font-medium focus:outline-none focus:ring-2 focus:ring-[#003466]/20 focus:border-[#003466] text-xs sm:text-sm"
                          />
                        </div>
                      </div>

                      {/* Content text */}
                      <div>
                        <label className="block text-slate-500 mb-1.5 font-bold">
                          {language === 'KR' ? '📝 추천 이유 & 상세 설명' : '📝 Recommendation & Details'}
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={newRecContent}
                          onChange={(e) => setNewRecContent(e.target.value)}
                          placeholder={language === 'KR' ? "여행자들을 위해 휠체어/유모차 이동 가능 여부, 소소한 방문 비법 등을 적어주세요!" : "Share useful access info, elevator status or helpful tips for other travelers!"}
                          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-sans font-medium focus:outline-none focus:ring-2 focus:ring-[#003466]/20 focus:border-[#003466] text-xs sm:text-sm resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#004481] hover:bg-[#003466] active:scale-95 text-white font-extrabold tracking-tight transition-all text-xs sm:text-sm cursor-pointer shadow-sm mt-2 font-bold"
                      >
                        <Send className="w-4 h-4 shrink-0" />
                        <span>{language === 'KR' ? '추천 등록하기' : 'Publish Recommendation'}</span>
                      </button>
                    </form>
                  </div>
                </div>

                {/* Recommendations List (7 cols on lg) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-1.5">
                        <span>🙌</span>
                        <span>{language === 'KR' ? '다른 여행객들의 추천 게시판' : 'Travelers Recommendation Feed'}</span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold ml-1 font-sans">
                          {recommendations.length}
                        </span>
                      </h3>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap gap-1.5 pb-0.5">
                      {[
                        { id: 'ALL', labelKr: '전체', labelEn: 'All', icon: '✨' },
                        { id: 'FOOD', labelKr: '음식점', labelEn: 'Food', icon: '🍕' },
                        { id: 'CAFE', labelKr: '카페', labelEn: 'Cafe', icon: '☕' },
                        { id: 'ATTRACTION', labelKr: '명소', labelEn: 'Attraction', icon: '🎡' },
                        { id: 'TRANSIT', labelKr: '교통 꿀팁', labelEn: 'Transit', icon: '🚇' },
                        { id: 'OTHER', labelKr: '기타', labelEn: 'Other', icon: '💡' }
                      ].map((cat) => {
                        const isSelected = filterCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => setFilterCategory(cat.id)}
                            className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                              isSelected
                                ? 'bg-[#004481] text-white border-[#004481] shadow-sm'
                                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            <span>{cat.icon}</span>
                            <span>{language === 'KR' ? cat.labelKr : cat.labelEn}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[560px] overflow-y-auto pr-1">
                    {recommendations.filter(rec => filterCategory === 'ALL' || rec.category === filterCategory).length === 0 ? (
                      <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center text-slate-400 font-semibold">
                        <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-sm font-bold">
                          {language === 'KR' ? '해당 카테고리에 등록된 추천 팁이 없습니다.' : 'No recommendations in this category yet.'}
                        </p>
                      </div>
                    ) : (
                      recommendations
                        .filter(rec => filterCategory === 'ALL' || rec.category === filterCategory)
                        .map((rec) => {
                          const isUpvoted = !!hasUpvoted[rec.id];
                        let categoryText = '';
                        let categoryColor = '';
                        switch (rec.category) {
                          case 'FOOD':
                            categoryText = language === 'KR' ? '음식점 🍕' : 'Food 🍕';
                            categoryColor = 'bg-rose-50 text-rose-700 border-rose-100';
                            break;
                          case 'CAFE':
                            categoryText = language === 'KR' ? '카페 ☕' : 'Cafe ☕';
                            categoryColor = 'bg-amber-50 text-amber-800 border-amber-100';
                            break;
                          case 'ATTRACTION':
                            categoryText = language === 'KR' ? '명소 🎡' : 'Attraction 🎡';
                            categoryColor = 'bg-indigo-50 text-indigo-700 border-indigo-100';
                            break;
                          case 'TRANSIT':
                            categoryText = language === 'KR' ? '교통 꿀팁 🚇' : 'Transit 🚇';
                            categoryColor = 'bg-emerald-50 text-emerald-700 border-emerald-100';
                            break;
                          default:
                            categoryText = language === 'KR' ? '기타 💡' : 'Other 💡';
                            categoryColor = 'bg-slate-50 text-slate-600 border-slate-100';
                        }

                        return (
                          <div 
                            key={rec.id}
                            className="bg-white p-5 rounded-3xl border border-slate-100/80 shadow-[0_3px_15px_rgba(0,0,0,0.015)] space-y-3.5 text-left transition-all hover:border-slate-200/50"
                          >
                            {/* Author & Header meta */}
                            <div className="flex flex-wrap items-center justify-between gap-2.5 font-semibold text-xs">
                              <div className="flex items-center gap-2 flex-wrap text-left">
                                <span className="font-bold text-slate-700">
                                  {rec.author}
                                </span>
                                {myRecIds.includes(rec.id) && (
                                  <span className="bg-blue-50 text-blue-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-blue-100 font-sans">
                                    {language === 'KR' ? '내가 쓴 글' : 'My Post'}
                                  </span>
                                )}
                                {isAdminMode && (
                                  <span className="bg-rose-50 text-rose-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-rose-100 font-sans flex items-center gap-0.5">
                                    <Shield className="w-2.5 h-2.5 text-rose-500" />
                                    <span>OPERATOR</span>
                                  </span>
                                )}
                                <span className="text-[10px] text-slate-400 font-sans">
                                  {new Date(rec.createdAt).toLocaleDateString(language === 'KR' ? 'ko-KR' : 'en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="flex gap-1.5 items-center">
                                <span className={`text-[10px] font-extrabold border px-2.5 py-0.5 rounded-full ${categoryColor}`}>
                                  {categoryText}
                                </span>
                              </div>
                            </div>

                            {/* Topic & Content */}
                            {(() => {
                              const tRec = translateRecommendation(rec, language, translatedRecs[rec.id]);
                              const isApiTranslated = language === 'EN' && !!translatedRecs[rec.id];
                              const isLocalTranslated = language === 'EN' && !translatedRecs[rec.id] && (rec.id.startsWith('rec-') || /[가-힣]/.test(rec.topic));
                              return (
                                <div className="space-y-1">
                                  {translatingIds[rec.id] && !translatedRecs[rec.id] ? (
                                    <div className="space-y-2.5 animate-pulse py-2">
                                      <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-blue-300 rounded-full shrink-0 animate-ping" />
                                        <div className="h-4 bg-slate-200/85 rounded-md w-1/3"></div>
                                        <span className="text-[10px] text-slate-400 font-medium">Translating via Gemini AI...</span>
                                      </div>
                                      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 space-y-2">
                                        <div className="h-3 bg-slate-200/60 rounded w-5/6"></div>
                                        <div className="h-3 bg-slate-200/60 rounded w-4/5"></div>
                                        <div className="h-3 bg-slate-200/60 rounded w-2/3"></div>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <h4 className="text-sm sm:text-base font-extrabold text-slate-800 flex items-center gap-1.5 flex-wrap">
                                        <span className="w-1.5 h-1.5 bg-[#004481] rounded-full shrink-0" />
                                        <span>{tRec.topic}</span>
                                        {isApiTranslated && (
                                          <span className="inline-flex items-center gap-0.5 text-[9px] bg-sky-50 text-sky-700 font-extrabold px-1.5 py-0.5 rounded border border-sky-100 cursor-default select-none animate-fade-in font-sans">
                                            ✨ AI TRANSLATED
                                          </span>
                                        )}
                                        {isLocalTranslated && (
                                          <div className="flex gap-1 ml-1 flex-wrap items-center">
                                            <span className="inline-flex items-center gap-0.5 text-[9px] bg-slate-50 text-slate-600 font-bold px-1.5 py-0.5 rounded border border-slate-200 cursor-default select-none animate-fade-in font-sans">
                                              🌐 AUTO TRANSLATED
                                            </span>
                                            <button
                                              type="button"
                                              onClick={() => handleManualTranslate(rec)}
                                              className="inline-flex items-center gap-0.5 text-[9px] bg-sky-50 text-sky-700 font-extrabold px-1.5 py-0.5 rounded border border-sky-200 cursor-pointer animate-fade-in font-sans hover:bg-sky-100 hover:text-sky-800 transition-all active:scale-95"
                                              title="Translate properly using Gemini AI"
                                            >
                                              ✨ Translate with Gemini AI
                                            </button>
                                          </div>
                                        )}
                                      </h4>
                                      
                                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50 whitespace-pre-wrap font-sans text-left">
                                        {tRec.content}
                                      </p>
                                    </>
                                  )}
                                </div>
                              );
                            })()}

                            {/* Foot bar with Exit detail & Upvote/Delete Actions */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-100/50">
                              <span className="text-[10px] sm:text-xs text-slate-400 font-bold flex items-center gap-1 font-sans text-left">
                                <span className="text-slate-500">🚇</span>
                                <span className="text-slate-500">{language === 'KR' ? '추천 역/출구:' : 'Station/Exit:'}</span> 
                                <span className="text-[#004481] font-extrabold">
                                  {translateRecommendation(rec, language, translatedRecs[rec.id]).stationOrExit}
                                </span>
                              </span>

                              <div className="flex items-center gap-2 justify-end font-semibold">
                                {deleteConfId === rec.id ? (
                                  <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-700 px-2.5 py-1.5 rounded-xl text-[10px] sm:text-xs font-extrabold animate-fade-in">
                                    <span>{language === 'KR' ? '정말 삭제할까요?' : 'Delete?'}</span>
                                    <button
                                      onClick={() => handleDeleteRecommendation(rec.id)}
                                      className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded-lg text-[10px] transition-colors cursor-pointer font-bold"
                                    >
                                      {language === 'KR' ? '삭제' : 'Delete'}
                                    </button>
                                    <button
                                      onClick={() => setDeleteConfId(null)}
                                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] transition-colors cursor-pointer font-bold"
                                    >
                                      {language === 'KR' ? '취소' : 'Cancel'}
                                    </button>
                                  </div>
                                ) : (
                                  (myRecIds.includes(rec.id) || isAdminMode) && (
                                    <button
                                      onClick={() => setDeleteConfId(rec.id)}
                                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-50 hover:border-rose-200 text-rose-600 text-xs font-bold transition-all cursor-pointer"
                                      title={language === 'KR' ? '게시글 삭제' : 'Delete post'}
                                    >
                                      <Trash2 className="w-3 h-3 text-rose-500" />
                                      <span>{language === 'KR' ? '삭제' : 'Delete'}</span>
                                      {isAdminMode && !myRecIds.includes(rec.id) && (
                                        <span className="bg-rose-100 text-rose-800 text-[10px] px-1 py-0.5 select-none font-sans font-black scale-90 rounded">ADM</span>
                                      )}
                                    </button>
                                  )
                                )}

                                <button
                                  onClick={() => handleUpvote(rec.id)}
                                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer font-bold ${
                                    isUpvoted 
                                      ? 'bg-[#004481] text-white border-[#004481] shadow-sm scale-95' 
                                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                  }`}
                                >
                                  <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-white' : ''}`} />
                                  <span>{rec.upvotes}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

              </div>

              {/* Simple Operator Console (At the absolute bottom of the tab) */}
              <div className="border-t border-slate-100 pt-6 mt-8 max-w-sm mx-auto">
                <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/50 text-center space-y-2.5">
                  <div className="flex items-center justify-between font-semibold text-xs text-slate-600 px-0.5">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Shield className="w-3.5 h-3.5 text-[#004481]" />
                      <span>{language === 'KR' ? '운영자 전용' : 'Operator Mode'}</span>
                    </div>
                    {isAdminMode && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-sans font-bold">
                        {language === 'KR' ? '인증됨' : 'Verified'}
                      </span>
                    )}
                  </div>

                  {isAdminMode ? (
                    <div className="flex items-center justify-between gap-3 text-xs font-semibold">
                      <span className="text-slate-500 font-bold">
                        {language === 'KR' ? '🟢 운영진 권한 활성화 상태' : '🟢 Operator access enabled'}
                      </span>
                      <button
                        onClick={() => {
                          setIsAdminMode(false);
                          setAdminPasswordInput('');
                          setAdminError('');
                        }}
                        className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 active:scale-95 text-slate-700 rounded-xl transition-all text-[10px] font-extrabold cursor-pointer"
                      >
                        {language === 'KR' ? '권한 해제' : 'Logout'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 text-xs font-semibold">
                      <div className="flex gap-1.5">
                        <input
                          type="password"
                          value={adminPasswordInput}
                          onChange={(e) => {
                            setAdminPasswordInput(e.target.value);
                            setAdminError('');
                          }}
                          placeholder={language === 'KR' ? "운영자 비밀번호" : "Operator Password"}
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 font-sans font-medium focus:outline-none focus:ring-1 focus:ring-[#003466]/20 focus:border-[#003466] text-xs"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              if (adminPasswordInput === '101801') {
                                setIsAdminMode(true);
                                setAdminError('');
                              } else {
                                setAdminError(language === 'KR' ? '비밀번호가 일치하지 않습니다.' : 'Incorrect password.');
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (adminPasswordInput === '101801') {
                              setIsAdminMode(true);
                              setAdminError('');
                            } else {
                              setAdminError(language === 'KR' ? '비밀번호가 일치하지 않습니다.' : 'Incorrect password.');
                            }
                          }}
                          className="px-3.5 py-2 rounded-xl bg-[#004481]/10 hover:bg-[#004481]/20 text-[#004481] font-extrabold transition-all text-xs cursor-pointer"
                        >
                          {language === 'KR' ? '인증' : 'Verify'}
                        </button>
                      </div>
                      {adminError && (
                        <p className="text-[10px] text-rose-500 font-bold text-left px-0.5">{adminError}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}


        </main>
      </div>

      {/* Footer information section */}
      <footer className="mt-12 bg-slate-900 text-slate-400 text-left border-t border-slate-800 pt-16 pb-20 rounded-t-[2.5rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-white/10 text-white shadow-sm">
                <Train className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold font-heading text-white tracking-tight">
                Stepless (Busan)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {language === 'KR' 
                ? '부산 지하철 이용객들의 평등하고 자유로운 지상 이동을 지원하기 위해 설계된 교통약자 특화형 편의 플랫폼입니다. 본 서비스는 공공데이터 연계 및 수동 검증 데이터를 기반으로 운영됩니다.' 
                : 'A dedicated public transit helper to establish smooth, accessible pathways throughout major transit hubs.'}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'KR' ? '관련 공공 서비스' : 'Public Agencies'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.humetro.busan.kr" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline flex items-center gap-1">
                  <span>부산교통공사 (Humetro)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.data.go.kr" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline flex items-center gap-1">
                  <span>공공데이터포털 연계</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.visitbusan.net" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline flex items-center gap-1">
                  <span>비짓부산 배리어프리 투어</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading text-left">
              {language === 'KR' ? '제언 및 제휴 문의' : 'Inquiries & Feedback'}
            </h4>
            <p className="text-xs font-sans text-slate-400">
              {language === 'KR' 
                ? '부산 전철역 엘리베이터 데이터 현행화 제의, 제보 누락 문의 및 제휴문의는 지원 메일을 이용해 연락 주시기 바랍니다.' 
                : 'For comments or suggesting detailed accessibility paths, contact the support team.'}
            </p>
            <p className="text-xs font-mono font-bold text-slate-200">
              floreur88@gmail.com
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 mt-12 pt-6 text-2xs sm:text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2026 floreur. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 hover:underline">{language === 'KR' ? '이용약관' : 'Terms'}</a>
            <a href="#" className="hover:text-slate-300 hover:underline">{language === 'KR' ? '개인정보처리방침' : 'Privacy'}</a>
            <a href="#" className="hover:text-slate-300 hover:underline">{language === 'KR' ? '고객센터' : 'Customer Support'}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
