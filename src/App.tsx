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
  Heart,
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
  ChevronDown,
  ChevronUp,
  Plus,
  RefreshCw,
  Clock,
  ThumbsUp,
  Map,
  Accessibility,
  Trash2,
  Shield,
  Sparkles
} from 'lucide-react';
import Header from './components/Header';
import TimelineVisualizer from './components/TimelineVisualizer';
import SubwayStationMap from './components/SubwayStationMap';
import BusanItinerariesView from './components/BusanItinerariesView';
import BusanEventsCalendarView from './components/BusanEventsCalendarView';
import { STATIONS, INITIAL_REPORTS } from './data';
import { Station, ExitInfo, FacilityReport, StatusType, getExitDisplayName, translateExitNumber, getTranslatedStationName } from './types';
import { translateRecommendation } from './utils';
import { BUSAN_ITINERARIES } from './data/itineraries';

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
  jagalchi: { small: 34, med: 42, large: 4, xlarge: 27 },
  geumnyeonsan: { small: 18, large: 8, xlarge: 4 },
  dongbaek: { small: 12, large: 6, xlarge: 2 },
  bexco: {
    '2': { small: 32, large: 16, xlarge: 12 },
    '동해': { small: 10, large: 4, xlarge: 4 }
  }
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
    content: '전포 카페거리에서 조금만 위쪽으로 가면 나오는 사잇길에는 아기자기한 공방, 감성 넘치는 독립 서점, 개성 가득한 빈티지 편집숍들이 가득해요! 평탄하고 걸어 다니기 좋아 기분 좋게 느긋이 산책하기 최고입니다.',
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
  const [isHomeLanding, setIsHomeLanding] = useState<boolean>(true);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [activePathFilter, setActivePathFilter] = useState<'ALL' | 'ACCESSIBLE' | 'CARRY'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItineraryCategory, setSelectedItineraryCategory] = useState<string | null>(null);
  const [tipsSubPage, setTipsSubPage] = useState<'index' | 'courses' | 'transit' | 'child-free' | 'transfer'>('index');
  
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

  // Track which stations have their attractions expanded in search/bento grid view (default collapsed)
  const [expandedAttractions, setExpandedAttractions] = useState<Record<string, boolean>>({});

  // Traveler Recommendations states
  const [recommendations, setRecommendations] = useState<TravelerRecommendation[]>(() => {
    const saved = localStorage.getItem('busan_traveler_recs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse saved recommendations:", e);
      }
    }
    return DEFAULT_RECOMMENDATIONS;
  });

  // Synchronize traveler recommendations from backend on system start to ensure everyone shares the custom tips
  useEffect(() => {
    fetch("/api/recommendations")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Failed to load recommendations from server");
      })
      .then(data => {
        if (Array.isArray(data)) {
          setRecommendations(data);
          localStorage.setItem('busan_traveler_recs', JSON.stringify(data));
        }
      })
      .catch(err => {
        console.error("Backend recommendations fetch failed:", err);
      });
  }, []);

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

  // Busan Travel Itinerary Curation States
  const [activeItineraryCategory, setActiveItineraryCategory] = useState<'ALL' | 'TRANSIT' | 'EAST' | 'WEST' | 'SOUTH' | 'NORTH'>('ALL');
  const [expandedItineraries, setExpandedItineraries] = useState<Record<string, boolean>>({
    'transit-subway': true, // Auto-expand first item for instant engagement
  });

  const toggleItinerary = (id: string) => {
    setExpandedItineraries(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handling Path-based Client-side routing on mount and popstate
  useEffect(() => {
    const handleUrlRouting = () => {
      const pathname = window.location.pathname;
      const parts = pathname.split('/');
      
      // Look for /itinerary-[category]
      if (parts[1] && parts[1].startsWith('itinerary-')) {
        const categorySuffix = parts[1].replace('itinerary-', '').toUpperCase();
        const validCategories = ['DAY', '1NIGHT', '2NIGHTS', '3NIGHTS', '4NIGHTS', 'GOURMET', 'HISTORY'];
        if (validCategories.includes(categorySuffix)) {
          setSelectedItineraryCategory(categorySuffix);
          setCurrentTab('tips');
          setTipsSubPage('courses');
          setIsHomeLanding(false);
        } else {
          setCurrentTab('tips');
          setSelectedItineraryCategory(null);
          setTipsSubPage('index');
        }
      } else if (parts[1] && parts[1].startsWith('tips-')) {
        setCurrentTab('tips');
        setSelectedItineraryCategory(null);
        const sub = parts[1].replace('tips-', '');
        if (sub === 'courses' || sub === 'itinerary') {
          setTipsSubPage('courses');
        } else if (sub === 'transit') {
          setTipsSubPage('transit');
        } else if (sub === 'child-free') {
          setTipsSubPage('child-free');
        } else if (sub === 'transfer') {
          setTipsSubPage('transfer');
        } else {
          setTipsSubPage('index');
        }
        setIsHomeLanding(false);
      } else if (parts[1] === 'station' && parts[2]) {
        const stationId = parts[2].toLowerCase();
        const exists = STATIONS.some(s => s.id === stationId);
        if (exists) {
          setSelectedStationId(stationId);
          setIsHomeLanding(false);
          setCurrentTab('home');
        }
      } else if (parts[1] && parts[1] !== 'home' && parts[1] !== 'search' && parts[1] !== 'schedule' && parts[1] !== 'tips') {
        const stationId = parts[1].toLowerCase();
        const exists = STATIONS.some(s => s.id === stationId);
        if (exists) {
          setSelectedStationId(stationId);
          setIsHomeLanding(false);
          setCurrentTab('home');
        }
      } else if (['home', 'search', 'schedule', 'tips'].includes(parts[1])) {
        setCurrentTab(parts[1]);
        if (parts[1] === 'home') {
          setIsHomeLanding(true);
          setSelectedStationId('seomyeon');
        } else if (parts[1] === 'tips') {
          setSelectedItineraryCategory(null);
          if (parts[2] === 'courses' || parts[2] === 'itinerary') {
            setTipsSubPage('courses');
          } else if (parts[2] === 'transit') {
            setTipsSubPage('transit');
          } else if (parts[2] === 'child-free') {
            setTipsSubPage('child-free');
          } else if (parts[2] === 'transfer') {
            setTipsSubPage('transfer');
          } else {
            setTipsSubPage('index');
          }
        }
      } else {
        // Root path /
        setIsHomeLanding(true);
        setSelectedStationId('seomyeon');
        setCurrentTab('home');
      }
    };

    handleUrlRouting();
    window.addEventListener('popstate', handleUrlRouting);
    return () => {
      window.removeEventListener('popstate', handleUrlRouting);
    };
  }, []);

  // Synchronize dynamic URL path and document headers metadata (SEO-friendly) whenever active station or tab changes
  useEffect(() => {
    // 1. Change URL path
    if (currentTab === 'home') {
      if (isHomeLanding) {
        const expectedPath = '/';
        if (window.location.pathname !== expectedPath && window.location.pathname !== '/home') {
          window.history.pushState({ tab: 'home', isHomeLanding: true }, '', expectedPath);
        }
      } else if (selectedStationId) {
        const expectedPath = `/station/${selectedStationId}`;
        if (window.location.pathname !== expectedPath) {
          window.history.pushState({ stationId: selectedStationId, tab: 'home', isHomeLanding: false }, '', expectedPath);
        }
      }
    } else if (currentTab !== 'home') {
      let expectedPath = `/${currentTab}`;
      if (currentTab === 'tips') {
        if (selectedItineraryCategory) {
          expectedPath = `/itinerary-${selectedItineraryCategory.toLowerCase()}`;
        } else if (tipsSubPage === 'courses') {
          expectedPath = '/tips/courses';
        } else if (tipsSubPage === 'transit') {
          expectedPath = '/tips/transit';
        } else if (tipsSubPage === 'child-free') {
          expectedPath = '/tips/child-free';
        } else if (tipsSubPage === 'transfer') {
          expectedPath = '/tips/transfer';
        } else {
          expectedPath = '/tips';
        }
      }
      if (window.location.pathname !== expectedPath) {
        window.history.pushState({ tab: currentTab, category: selectedItineraryCategory, subPage: tipsSubPage }, '', expectedPath);
      }
    }

    // 2. Change metadata (Dynamic Title, Description, and OpenGraph tags)
    if (currentTab === 'home' && !isHomeLanding && selectedStationId) {
      const activeST = STATIONS.find(s => s.id === selectedStationId);
      if (activeST) {
        const titleText = `${activeST.name} 엘리베이터 위치 & 유모차 동선 안내 | 스테프리스`;
        document.title = titleText;

        const cleanEngName = activeST.englishName.replace(/\s*Station$/i, '').trim();
        const descText = `${activeST.name} (${cleanEngName}) 지하철역의 엘리베이터 최단 위치와 유모차, 캐리어 소지자를 위한 계단 회피 추천 동선 정보를 정밀히 안내해 드립니다.`;
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', descText);

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', titleText);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', descText);

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', `https://steplessinkorea.pages.dev/station/${selectedStationId}`);
      }
    } else {
      document.title = "부산 지하철역 엘리베이터 위치 & 유모차 동선 안내 | 스테프리스";
      const defaultDesc = "부산 지하철역 엘리베이터 위치, 유모차와 캐리어 소지자를 위한 계단 없는 지하철 최적 동선 안내.";
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', defaultDesc);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', "부산 지하철역 엘리베이터 위치 & 유모차 동선 안내 | 스테프리스");

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', defaultDesc);

      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', "https://steplessinkorea.pages.dev/");
    }
  }, [selectedStationId, currentTab, isHomeLanding, selectedItineraryCategory, tipsSubPage]);

  useEffect(() => {
    localStorage.setItem('busan_traveler_upvotes', JSON.stringify(hasUpvoted));
  }, [hasUpvoted]);

  useEffect(() => {
    localStorage.setItem('busan_traveler_recs', JSON.stringify(recommendations));
  }, [recommendations]);

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
        console.warn("Translation API failed, using local offline fallback for ID:", rec.id, err);
        const fallback = translateRecommendation(rec, 'EN');
        setTranslatedRecs(prev => {
          const updated = {
            ...prev,
            [rec.id]: fallback
          };
          localStorage.setItem('busan_traveler_recs_en', JSON.stringify(updated));
          return updated;
        });
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
      console.warn("Manual translation API failed, using local offline fallback for ID:", rec.id, err);
      const fallback = translateRecommendation(rec, 'EN');
      setTranslatedRecs(prev => {
        const updated = {
          ...prev,
          [rec.id]: fallback
        };
        localStorage.setItem('busan_traveler_recs_en', JSON.stringify(updated));
        return updated;
      });
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

    // 1. Optimistic UI Updates - renders on screen instantly
    setRecommendations(prev => {
      const updated = [newRec, ...prev];
      localStorage.setItem('busan_traveler_recs', JSON.stringify(updated));
      return updated;
    });
    setMyRecIds(prev => {
      const updated = [...prev, newId];
      localStorage.setItem('busan_my_rec_ids', JSON.stringify(updated));
      return updated;
    });

    // Reset inputs immediately
    setNewRecAuthor('');
    setNewRecTopic('');
    setNewRecCategory('FOOD');
    setNewRecStation('');
    setNewRecContent('');

    // 2. Synchronize with server-side JSON database in the background
    fetch("/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRec)
    })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("Failed to save recommendation on server");
    })
    .then((syncedRec: TravelerRecommendation) => {
      console.log("Successfully synchronized with server database:", syncedRec);
    })
    .catch(err => {
      console.error("Server sync failed, recommendation remains in local storage:", err);
    });

    // 3. Translate immediately in background so it's cached and ready instantly when switching language!
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
      setTranslatedRecs(prev => {
        const updated = {
          ...prev,
          [newId]: {
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
      console.error("Instant translation failed:", err);
    })
    .finally(() => {
      setTranslatingIds(prev => ({ ...prev, [newId]: false }));
    });
  };

  const handleDeleteRecommendation = (id: string) => {
    // Delete from state immediately (Optimistic UI)
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
    setMyRecIds(prev => {
      const updated = prev.filter(item => item !== id);
      localStorage.setItem('busan_my_rec_ids', JSON.stringify(updated));
      return updated;
    });
    setDeleteConfId(null);

    // Call server to persist deletion
    fetch(`/api/recommendations/${id}`, {
      method: "DELETE"
    })
    .catch(err => {
      console.error("Failed to delete recommendation on server:", err);
    });
  };

  const handleUpvote = (id: string) => {
    const isUpvoting = !hasUpvoted[id];

    // Optimistic UI updates
    setHasUpvoted(prev => ({ ...prev, [id]: isUpvoting }));
    setRecommendations(prev => prev.map(rec => rec.id === id ? { ...rec, upvotes: Math.max(0, rec.upvotes + (isUpvoting ? 1 : -1)) } : rec));

    // Persist upvote count on server
    fetch(`/api/recommendations/${id}/upvote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ upvote: isUpvoting })
    })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("Upvote failed");
    })
    .then((updatedRec: TravelerRecommendation) => {
      // Re-synchronize with exact server count
      setRecommendations(prev => prev.map(rec => rec.id === id ? updatedRec : rec));
    })
    .catch(err => {
      console.error("Failed to update upvote on server:", err);
      // Rollback optimistic state transition
      setHasUpvoted(prev => ({ ...prev, [id]: !isUpvoting }));
      setRecommendations(prev => prev.map(rec => rec.id === id ? { ...rec, upvotes: Math.max(0, rec.upvotes + (isUpvoting ? -1 : 1)) } : rec));
    });
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
          setCurrentTab={(tab) => {
            setCurrentTab(tab);
            if (tab === 'home') {
              setIsHomeLanding(true);
              setSelectedStationId('seomyeon');
              setExpandedExitNum(null);
            }
            if (tab === 'tips') {
              setSelectedItineraryCategory(null);
            }
          }} 
          language={language} 
          toggleLanguage={toggleLanguage} 
        />

        {/* Core Main Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
          
          {/* Tab 1: HOME LANDING VIEW */}
          {currentTab === 'home' && (
            <div className="space-y-8">
              {/* Feature Hero banner with beautiful illustrations - visible only on home landing page */}
              {isHomeLanding && (
                <>
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
                </>
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
                  
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 sm:gap-2.5">
                    {STATIONS.map(s => {
                      const isActive = selectedStationId === s.id;
                      return (
                        <button
                          key={s.id}
                          id={`quick-station-tab-${s.id}`}
                          onClick={() => {
                            setSelectedStationId(s.id);
                            setIsHomeLanding(false);
                            // Keep all detailed pathways collapsed initially as requested
                            setExpandedExitNum(null);
                          }}
                          className={`min-h-[56px] sm:min-h-[64px] p-1 rounded-xl transition-all border flex flex-col items-center justify-center gap-0.5 cursor-pointer w-full overflow-hidden ${
                            isActive
                              ? 'bg-[#004481] text-white border-[#004481] shadow-md ring-4 ring-blue-50'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-150'
                          }`}
                        >
                          {(() => {
                            const cleanEng = s.englishName.replace(/\s*Station$/i, '').trim();
                            const isChorKorean = language === 'KR';
                            const isLongStation = ['geumnyeonsan', 'haeundae', 'seomyeon', 'dongbaek', 'gwangan', 'jagalchi'].includes(s.id);
                            
                            // Top text sizes (Korean or English)
                            let topTextClass = "";
                            if (isChorKorean) {
                              topTextClass = "text-[12px] xs:text-[13px] sm:text-sm md:text-base";
                            } else {
                              if (s.id === 'geumnyeonsan') {
                                topTextClass = "text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm tracking-[-0.05em] font-extrabold";
                              } else if (isLongStation) {
                                topTextClass = "text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base tracking-tight font-extrabold";
                              } else {
                                topTextClass = "text-[12px] xs:text-[13px] sm:text-[15px] md:text-base lg:text-lg tracking-normal font-bold";
                              }
                            }

                            // Bottom text sizes (Korean or English)
                            let bottomTextClass = "";
                            if (isChorKorean) {
                              if (s.id === 'geumnyeonsan') {
                                bottomTextClass = "text-[6.8px] xs:text-[7.5px] sm:text-[9px] md:text-[9.5px] tracking-[-0.05em] uppercase font-semibold";
                              } else if (isLongStation) {
                                bottomTextClass = "text-[8px] xs:text-[9px] sm:text-[10px] tracking-tight uppercase font-semibold";
                              } else {
                                bottomTextClass = "text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] tracking-normal uppercase font-semibold";
                              }
                            } else {
                              bottomTextClass = "text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] tracking-normal font-semibold";
                            }

                            return (
                              <>
                                <span 
                                  className={`leading-tight font-heading text-center block w-full whitespace-nowrap overflow-hidden text-ellipsis px-0.5 ${topTextClass}`}
                                >
                                  {isChorKorean ? s.name : cleanEng}
                                </span>
                                <span 
                                  className={`font-sans block text-center w-full whitespace-nowrap overflow-hidden text-ellipsis px-0.5 ${bottomTextClass} ${
                                    isActive ? 'text-blue-200' : 'text-slate-400'
                                  }`}
                                >
                                  {isChorKorean ? cleanEng : s.name}
                                </span>
                              </>
                            );
                          })()}
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
                        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 flex-wrap sm:flex-nowrap">
                          <h3 className="text-lg sm:text-lg font-extrabold text-slate-800 font-heading flex items-center gap-2">
                            <span>{getExitDisplayName(activeStation.name, exit.number, language)}</span>
                          </h3>

                          {/* Action to expand Timeline Details Inline */}
                          <button
                            id={`expand-exit-btn-${exit.number}`}
                            onClick={() => setExpandedExitNum(isExpanded ? null : exit.number)}
                            className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
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

                        {/* Simple facilities details directly matching user request */}
                        <div className="space-y-2 mt-3">
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

                        {/* Status banner - only if not OPERATIONAL */}
                        {exit.status !== 'OPERATIONAL' && (
                          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2.5 h-2.5 rounded-full ${
                                exit.status === 'MAINTENANCE'
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`} />
                              <span className="text-xs font-bold text-slate-500">
                                {getExitStatusText(exit.status)}
                              </span>
                            </div>
                          </div>
                        )}

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

              {/* BRAND NEW: Google AdSense optimization content area — Highly informative, helpful articles & guides — visible only on home landing page */}
              {isHomeLanding && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_4px_22px_rgba(0,0,0,0.01)] text-left mt-10 space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <span className="p-2.5 rounded-xl bg-blue-50 text-[#004481]">
                      <Shield className="w-5 h-5 animate-pulse" />
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#004481]">
                        {language === 'KR' ? '📖 부산 지하철 교통약자 이동 백과사전 & 편의 가이드' : '📖 Busan Subway Accessibility Encyclopedia & Safety Guide'}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {language === 'KR' ? '안전하고 편리한 대중교통 이용을 위한 맞춤형 백과사전 가이드입니다.' : 'Expert transit assistance and safety rules for easy navigation in Busan.'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {/* Card 1 */}
                    <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                        <span>👶</span>
                        <span>{language === 'KR' ? '유모차·휠체어 동반 전철 안전 탑승 수칙' : 'Wheelchair & Stroller Safe Boarding'}</span>
                      </h4>
                      <p className="text-slate-500 font-medium">
                        {language === 'KR' 
                          ? '1. 열차 탑승 시 열차와 승강장 사이의 간격을 유의해야 합니다. 부산 지하철 1호선과 2호선 일부 역은 곡선 승강장 구조로 인해 발빠짐 방지용 고무발판이 설치되어 있으나, 이동 시 바퀴가 끼이지 않도록 상향 각도를 유지하며 진입하십시오.'
                          : '1. Maintain awareness of the gaps between train doorways and the platforms. In curvilinear stations on Line 1/2, align your wheels perpendicular when crossing.'}
                      </p>
                      <p className="text-slate-500 font-medium">
                        {language === 'KR'
                          ? '2. 전동휠체어의 경우 급출발 및 급제동에 대비해 차량 내부의 전용 휠체어 구역에 안착한 후 반드시 브레이크 잠금 장치를 채워 고정 장치를 결속해 주시기 바랍니다.'
                          : '2. Position power-wheelchairs in the designated Barrier-Free bays inside cars and always engage manual parking brakes.'}
                      </p>
                    </div>

                    {/* Card 2 */}
                    <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                        <span>🚇</span>
                        <span>{language === 'KR' ? '엘리베이터 및 수직 수동 리프트 고장 대처 기법' : 'Dealing with Elevator Maintenance'}</span>
                      </h4>
                      <p className="text-slate-500 font-medium">
                        {language === 'KR'
                          ? '역내 엘리베이터가 돌발적인 보수 점검으로 인해 중단되었을 경우, 당황하지 마시고 각층 개찰구 주변에 부착된 빨간 비상호출 장치 또는 역무실 번호를 이용해 직원과 직접 무선 소통하십시오. 필요 시 경사로 간이 휠체어 리프트를 통한 수동 구동 지원이 가능합니다.'
                          : 'If an elevator breaks down or goes under weekly inspection, use the emergency call-button located near ticket barriers to communicate with transit operators for manual ramp assistance.'}
                      </p>
                      <p className="text-slate-500 font-medium">
                        {language === 'KR'
                          ? '본 스테프리스 서비스는 데이터 불일치를 제보를 통해 지속적으로 모니터링하여 공공데이터와 실제 현장 가동 여부를 대조해 현행화하고 있습니다.'
                          : 'Stepless active trackers continuously verify open agency datasets with custom visitor reports to ensure high precision.'}
                      </p>
                    </div>

                    {/* Card 3 */}
                    <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                        <span>🔍</span>
                        <span>{language === 'KR' ? '스테프리스(Stepless)의 수동 정합성 검증 원칙' : 'Stepless Manual Geometry Audits'}</span>
                      </h4>
                      <p className="text-slate-500 font-medium">
                        {language === 'KR'
                          ? '저희 팀은 단순 지도 API에 등록된 출구 번호만을 나열하지 않습니다. 부산 내 노선 연계 출구 중 벡스코역 7번 출구 에스컬레이터, 수영역 부근 횡단보도의 단차 고저, 서면역 9번과 11번 출구 사이의 엘리베이터 등 엘리베이터 입구와 보도 블록 단차의 각도를 면밀히 분석하고 계측하여 최적의 오르내림 루트를 직접 기재하였습니다.'
                          : 'We analyze micro-geometries rather than simple points. Elements like Bexco Exit 7 escalator, Suyeong cross walks, and Seomyeon 9/11 lifts are manually checked for height barriers.'}
                      </p>
                    </div>

                    {/* Card 4 */}
                    <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                        <span>📢</span>
                        <span>{language === 'KR' ? '구글 애드센스 광고와 개인데이터 보장 안내' : 'Google AdSense Ads & Transparency Policy'}</span>
                      </h4>
                      <p className="text-slate-500 font-medium">
                        {language === 'KR'
                          ? '본 배리어프리 플랫폼은 지속가능한 공익적 정보 제공을 위해 구글 애드센스 맞춤형 광고를 활용하고 있습니다. 구글은 사용자의 탐색 세션을 추적하기 위해 브라우저 쿠키를 활용할 수 있습니다. 자세한 쿠키 설정 조정 및 거부는 하단 개인정보처리방침의 광고 제어 설정 안내를 적극 확인해 주십시오.'
                          : 'Stepless leverages Google AdSense context ads. Google utilizes secure cookies to supply personalized advertisements. For details on browser settings, check our Privacy Link at the footer.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

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
                      setIsHomeLanding(false);
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
                      <div className="bg-[#f0f9ff]/70 p-3 rounded-xl border border-sky-100/50 flex flex-col gap-2 text-xs">
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedAttractions(prev => ({
                              ...prev,
                              [station.id]: !prev[station.id]
                            }));
                          }}
                          className="flex items-center justify-between cursor-pointer select-none group/btn"
                        >
                          <span className="font-bold text-sky-900 flex items-center gap-1.5">
                            <span className="text-sm">📍</span>
                            <span className="font-extrabold text-[12px]">{language === 'KR' ? '주변 가볼 만한 곳' : 'Nearby Attractions'}</span>
                            {expandedAttractions[station.id] ? (
                              <ChevronUp className="w-3.5 h-3.5 text-sky-600 transition-transform duration-200" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-sky-600 transition-transform duration-200" />
                            )}
                          </span>
                          <span className="text-[10px] text-sky-600 font-extrabold flex items-center gap-1 bg-sky-100/50 hover:bg-sky-100 px-2 py-0.5 rounded-lg transition-colors">
                            {expandedAttractions[station.id] 
                              ? (language === 'KR' ? '접기' : 'Hide') 
                              : (language === 'KR' ? '보기' : 'View')}
                          </span>
                        </div>
                        
                        {expandedAttractions[station.id] && (
                          <div className="flex flex-col gap-1.5 border-t border-sky-100/50 pt-2 animate-fade-in text-left">
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
                        )}
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
            <BusanItinerariesView 
              language={language}
              initialCategory={selectedItineraryCategory}
              onBack={() => {
                setSelectedItineraryCategory(null);
              }}
              onSelectCategory={(category) => {
                setSelectedItineraryCategory(category);
              }}
              tipsSubPage={tipsSubPage}
              setTipsSubPage={setTipsSubPage}
            />
          )}

          {/* New Tab 4: BUSAN MAJOR EVENTS CALENDAR VIEW */}
          {currentTab === 'schedule' && (
            <BusanEventsCalendarView language={language} />
          )}

          {/* New Tab 5: ABOUT THE SITE */}
          {currentTab === 'about' && (
            <div className="animate-fade-in text-left max-w-5xl mx-auto space-y-24 py-8" id="about-site-container">
              
              {/* SECTION 1: Introduction (About Us) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="md:col-span-7 space-y-6">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                    {language === 'KR' ? 'About Us' : 'About Us'}
                  </h1>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-medium whitespace-pre-line">
                    {language === 'KR' ? (
                      <>
                        이 사이트는 <strong className="text-slate-900 font-extrabold">플로레르 마음연구소 대표</strong>가 매일 출퇴근길에 무거운 큰 캐리어와 유모차를 들고 계단으로 오르락내리락 하며 힘들어하는 관광객들을 우연히 마주하면서 시작되었습니다.
                        {"\n\n"}
                        사실 바로 옆 출구에 엘리베이터가 편리하게 마련되어 있는데도, 정보가 없어서 이용하지 못하는 모습을 보고 안타까운 마음에 널리 알리고자 이 사이트를 직접 기획하고 제작하게 되었습니다.
                      </>
                    ) : (
                      <>
                        This site was created by the <strong className="text-slate-900 font-extrabold">CEO of Florer Mind Institute</strong>, who frequently witnessed travelers hauling giant luggage and baby strollers up and down steep metro stairs during their daily commute.
                        {"\n\n"}
                        Realizing that spacious elevators were readily available at the adjacent exits but left unused due to a lack of clear guidance, we built this site to light up accessible routes for every visitor.
                      </>
                    )}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-100">
                    <img 
                      src="/images/busan_travelers_about_1782566089566.jpg" 
                      alt="Travelers in Busan" 
                      className="w-full h-full object-cover aspect-[4/3] hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Our Mission */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center md:flex-row-reverse">
                {/* On desktop, show image on the left, so we reverse col-span ordering or render carefully */}
                <div className="md:col-span-5 md:order-1">
                  <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-100">
                    <img 
                      src="/images/accessible_path_about_1782566106628.jpg" 
                      alt="Accessible Path in Busan" 
                      className="w-full h-full object-cover aspect-[4/3] hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="md:col-span-7 md:order-2 space-y-6">
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {language === 'KR' ? 'Our Mission' : 'Our Mission'}
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-medium whitespace-pre-line">
                    {language === 'KR' ? (
                      <>
                        부산 현지인이 직접 전해주는 부산 여행에 대한 모든 꿀팁과 유용한 정보들을 아낌없이 모아두었습니다.
                        {"\n\n"}
                        누구나 아무런 제한 없이 모든 유용한 정보를 100% 무료로 안심하고 이용하실 수 있으며, 더 편안하고 더 재미있고, 가성비 훌륭한 성공적인 부산 여행을 완성하실 수 있도록 정성껏 설계했습니다.
                      </>
                    ) : (
                      <>
                        We gather authentic travel insights and practical tips curated directly by a native Busan local.
                        {"\n\n"}
                        Offered completely free of charge to everyone, we want you to experience an easier, more enjoyable, and highly cost-effective journey across the beautiful spots of Busan.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* SECTION 3: Warm Feedback / Share Tips Block */}
              <div className="bg-[#FAF8F5] rounded-[2.5rem] p-8 sm:p-14 border border-slate-100 text-center max-w-3xl mx-auto space-y-6 shadow-sm">
                <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2.5 flex-wrap">
                  <span className="text-2xl sm:text-4xl animate-pulse">🌊</span>
                  <span>{language === 'KR' ? '부산에서 좋은 추억만 가져가시길 바랍니다' : 'Take Only Beautiful Memories from Busan'}</span>
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-sans font-medium">
                  {language === 'KR' ? (
                    <>
                      부산을 방문하는 다른 여행객분들과 널리 나누고 싶은 나만의 꿀팁이나 개선이 필요한 정보, 아이디어가 있다면 언제든지 알려주세요! 따뜻하게 환영합니다.
                    </>
                  ) : (
                    <>
                      If you have any local accessibility hacks, stroller-friendly boardwalks, or subway exit corrections to share with fellow travelers, please feel free to drop us an email anytime!
                    </>
                  )}
                </p>
                <div className="pt-4 flex justify-center">
                  <a
                    href="mailto:3ena4ena@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-black text-sm tracking-tight transition-all shadow-md hover:-translate-y-0.5 cursor-pointer select-none"
                  >
                    <span>✉️</span>
                    <span>3ena4ena@gmail.com</span>
                  </a>
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
                ? '부산 지하철 이용객들의 평등하고 자유로운 지상 이동을 지원하기 위해 설계된 교통약자 특화형 편의 플랫폼입니다. 공공데이터 연계 및 수동 검증 데이터를 기반으로 운영되며, 부산 현지인이 직접 엄선하고 작성한 생생한 부산 여행 코스와 대중교통 이용 팁을 함께 제공하여 누구나 편리하게 부산을 여행할 수 있도록 돕습니다.' 
                : 'A dedicated public transit helper to establish smooth, accessible pathways throughout major transit hubs. It features verified public data alongside authentic Busan itineraries and practical transit tips curated by a Busan local to ensure a convenient and enjoyable travel experience for everyone.'}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'KR' ? '관련 서비스 & 커뮤니티' : 'Agencies & Community'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.humetro.busan.kr" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline flex items-center gap-1">
                  <span>부산교통공사 (Humetro)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.reddit.com/r/BusanTravelTips/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff4500] hover:underline flex items-center gap-1 font-semibold text-orange-500">
                  <span>{language === 'KR' ? '레딧 커뮤니티 (Reddit)' : 'Reddit Community'}</span>
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
          <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
            <a 
              href="/about.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 hover:underline cursor-pointer text-slate-500 text-2xs sm:text-xs"
            >
              {language === 'KR' ? '서비스 소개' : 'About'}
            </a>
            <a 
              href="/terms.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 hover:underline cursor-pointer text-slate-500 text-2xs sm:text-xs"
            >
              {language === 'KR' ? '이용약관' : 'Terms'}
            </a>
            <a 
              href="/privacy.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 hover:underline cursor-pointer text-slate-500 text-2xs sm:text-xs"
            >
              {language === 'KR' ? '개인정보처리방침' : 'Privacy'}
            </a>
            <a 
              href="https://www.reddit.com/r/BusanTravelTips/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-slate-300 hover:underline cursor-pointer text-slate-500 text-2xs sm:text-xs flex items-center gap-0.5"
            >
              <span>{language === 'KR' ? '레딧 바로가기' : 'Reddit'}</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
            </a>
            <a 
              href="mailto:floreur88@gmail.com" 
              className="hover:text-slate-300 hover:underline cursor-pointer text-slate-500 text-2xs sm:text-xs"
            >
              {language === 'KR' ? '고객센터' : 'Customer Support'}
            </a>
          </div>
        </div>
      </footer>

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] animate-slide-up">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 font-heading">
                {language === 'KR' ? '📄 Stepless 서비스 이용약관' : '📄 Stepless Terms of Service'}
              </h3>
              <button 
                onClick={() => setShowTermsModal(false)}
                className="p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto text-left text-xs sm:text-sm text-slate-600 space-y-4">
              <p className="font-semibold text-slate-700">
                {language === 'KR' 
                  ? '본 약관은 Stepless(이하 "서비스")가 제공하는 부산 지하철 편리한 교통 경로 안내 서비스의 이용에 관한 조건 및 규정을 양 당사자 계약의 일환으로 정의합니다.' 
                  : 'This agreement governs your use of the Stepless easy-access transit pathways search engine and traveler guidelines.'}
              </p>

              <div>
                <h4 className="font-bold text-slate-850 text-sm mb-1">{language === 'KR' ? '제 1 조 (목적)' : 'Article 1 (Purpose)'}</h4>
                <p>
                  {language === 'KR' 
                    ? '본 서비스는 휠체어 이용자, 유모차 소지 보행자, 무거운 수하물(캐리어) 동반 관광객 등 이동약자 편의 경로를 제공하고 실증적 통로를 보존하는 공익적 안내 솔루션 제공을 목적으로 합니다.' 
                    : 'The service assists travelers of reduced mobility (including wheelchair, stroller, or bulky luggage holders) finding flat elevators/escalators.'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-850 text-sm mb-1">{language === 'KR' ? '제 2 조 (정보 정합성의 면책성)' : 'Article 2 (Limitation of Liability)'}</h4>
                <p>
                  {language === 'KR'
                    ? '1. 본 플랫폼 내 노출되는 출구 정보, 엘리베이터 위치 정보, 및 편의시설 가동 상태는 공공데이터 자원 및 사용자 제보 항목을 상시 수동 정제한 결과물입니다. 실시간 기계 고장, 기상 악화, 또는 역사 보수 계획에 의한 일시중단 등 사정에 따라 현지와 일부 불일치 및 오차가 존재할 수 있으며 당사는 이에 대하여 법적 완전성을 보증하지 아니합니다.'
                    : '1. All accessibility statuses, lifts layout and geolocation marks are maintained based on general transit open-data and crowd-sourced validation. Physical or temporal differences can occur due to unannounced machine malfunctions or repair cycles.'}
                </p>
                <p className="mt-1">
                  {language === 'KR'
                    ? '2. 보행 및 횡단보도 이용 시 반드시 실제 거리 신호등의 안내 및 육안 확인 결과에 따르시길 바라며, 현장 사고와 관련된 물적·인적 귀책 사유를 전면 배제합니다.'
                    : '2. Pedestrians must prioritize local street signals and real-world conditions over navigation suggestions. Stepless disclaims all damages associated with physical incidents.'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-850 text-sm mb-1">{language === 'KR' ? '제 3 조 (이용자의 권리와 의무)' : 'Article 3 (Visitor Reports)'}</h4>
                <p>
                  {language === 'KR'
                    ? '이용자는 맵 상 시설에 관한 의견을 자유롭게 제보할 수 있습니다. 다만, 악의적인 가짜 고장 신고, 특정 단체를 비방하는 내용을 리포트 란에 상습 도배 시에는 계정 차단 및 관련 정보가 사법 당국에 백업될 수 있음에 유의하십시오.'
                    : 'Users agree to file authentic information only. Fraudulent reports or spam will lead to instant termination of access.'}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setShowTermsModal(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-sm transition-colors"
              >
                {language === 'KR' ? '동의 및 닫기' : 'Acknowledge & Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] animate-slide-up">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 font-heading">
                {language === 'KR' ? '🔒 개인정보처리방침 (Privacy Policy)' : '🔒 Privacy Policy'}
              </h3>
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto text-left text-xs sm:text-sm text-slate-600 space-y-4">
              <div className="bg-blue-50/80 p-4 border border-blue-100 rounded-2xl text-blue-800 font-semibold text-xs sm:text-sm">
                {language === 'KR' 
                  ? '📢 구글 애드센스(Google AdSense) 광고 파트너십 구축에 따른 필수 투명성 준수 사항을 온전히 고지하는 개인정보 보호 규정입니다.'
                  : '📢 Important: Under GDPR & Google AdSense transparency mandates, this document contains detailed cookie disclosures about advertising targeting.'}
              </div>

              <div>
                <h4 className="font-bold text-slate-850 text-sm mb-1">{language === 'KR' ? '1. 개인인식 정보 및 위치 프라이버시 보호' : '1. Personal and Geolocation Data'}</h4>
                <p>
                  {language === 'KR'
                    ? 'Stepless 서비스는 주민등록번호, 휴대전화 등 식별 가능한 어떠한 형태의 직접적인 회원 개인정보도 수집, 가공, 또는 해외 전송하지 않는 프라이버시-퍼스트 환경입니다. 내 주변 출구 탐색 기능은 모바일 기기 내 "로컬 샌드박스 Geolocation API" 상에서만 일회적 거리 연산으로 작동하며 외부 서버로 결코 발송되지 않습니다.'
                    : 'Stepless strictly avoids gathering direct identifiable demographics (names or SSNs) or transmitting real-time coordinates. Your location is processed solely within your dynamic local browser session.'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-850 text-sm mb-1 text-emerald-800">{language === 'KR' ? '2. 구글 제3자 타겟 광고 쿠키(Cookie) 명세 고지' : '2. Google Third-Party Cookie Policy'}</h4>
                <p className="font-medium">
                  {language === 'KR'
                    ? '1) 당사는 지속 가능한 이동 편의시설 정보 갱신 및 서비스 운영을 위하여 구글 애드센스(Google AdSense) 광고 시스템 기법을 웹사이트 내에 수용합니다.'
                    : '1) We allow Google AdSense on our web site to finance persistent field-testing and continuous updates to our map catalog.'}
                </p>
                <p className="font-medium mt-1">
                  {language === 'KR'
                    ? '2) 구글을 포함한 제3자 서비스 공급업체는 이용자가 본 서비스나 타사 인터넷 사이트에 과거에 가동 및 방문한 기록을 바탕으로 광고를 제공하기 위해 쿠키(Cookie) 기술을 적용합니다.'
                    : '2) Third-party vendors, including Google, utilize system cookies to construct contextual or personalized ads based on raw historic browser visit parameters.'}
                </p>
                <p className="font-medium mt-1">
                  {language === 'KR'
                    ? '3) 구글의 광고 쿠키 사용으로 인해 구글 및 제휴 네트워크는 이용자의 서비스 이용 양태에 맞는 전문적인 맞춤형 광고를 제공할 수 있게 됩니다.'
                    : '3) Googles usage of interest-advertising cookies allows safe presentation of appropriate target banners matching the users current preferences.'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-850 text-sm mb-1">{language === 'KR' ? '3. 맞춤형 타겟 광고의 제한 및 거부 수칙 (Opt-out)' : '3. Targeted Ads Opt-out Instructions'}</h4>
                <p>
                  {language === 'KR'
                    ? '이용자는 자율적으로 타겟 광고 제공을 사전에 영구 거부하거나 해제할 수 있습니다. 브라우저 설정에서 쿠키를 전면 지우거나 거부할 수 있으며, 구글 공식 광고사 설정을 통해 제어 가능합니다.'
                    : 'Users can freely block tailored tracking by altering browser settings or custom vendors rules.'}
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2 font-semibold text-slate-800 text-xs sm:text-sm">
                  <li>
                    <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                      <span>{language === 'KR' ? '🔗 구글 개인 마케팅 광고 설정 관리' : '🔗 Google Personal Ads Setting Controller'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                      <span>{language === 'KR' ? '🔗 미국 디지털광고협회(DAA) 쿠키 수집 정지 리스트' : '🔗 Digital Advertising Alliance (DAA) Cookie Opt-Out Central'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-850 text-sm mb-1">{language === 'KR' ? '4. 문의 및 보안 의견 접수' : '4. Inquiries'}</h4>
                <p>
                  {language === 'KR'
                    ? '구글 광고 정책 위반 의심 사례, 리포트 불충분 문의, 기타 개인정보 보호 정책에 관한 고견은floreur88@gmail.com 으로 연락 주시면 신속하게 조처하겠습니다.'
                    : 'For visual layout policies or GDPR inquiries, mail us at floreur88@gmail.com.'}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="px-5 py-2.5 bg-[#004481] hover:bg-[#003566] text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-sm transition-colors"
              >
                {language === 'KR' ? '약관 동의 및 확인' : 'Accept & Complete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
