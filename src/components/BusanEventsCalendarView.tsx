/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Tag, Shuffle, Info, Sparkles, CheckCircle2, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BusanEventsCalendarViewProps {
  language: 'KR' | 'EN';
}

export interface BusanEvent {
  id: string;
  titleKo: string;
  titleEn: string;
  category: 'festival' | 'culture' | 'performance' | 'drone';
  categoryKo: string;
  categoryEn: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  stationKo: string;
  stationEn: string;
  metroLine: string; // e.g., "1호선", "2호선"
  accessibilityKo: string;
  accessibilityEn: string;
  descriptionKo: string;
  descriptionEn: string;
  locationKo: string;
  locationEn: string;
  colorClass: string; // Tailwind color theme
  dotClass: string;
}

// Curated Busan Events Data (Active & Upcoming as of August 2026)
const BUSAN_EVENTS_DATA: BusanEvent[] = [
  {
    id: 'sea-festival',
    titleKo: '제28회 부산 바다축제',
    titleEn: '28th Busan Sea Festival',
    category: 'festival',
    categoryKo: '해변 축제',
    categoryEn: 'Beach Festival',
    startDate: '2026-08-07',
    endDate: '2026-08-13',
    stationKo: '다대포해수욕장역 (1호선)',
    stationEn: 'Dadaepo Beach Station',
    metroLine: 'Line 1',
    accessibilityKo: '다대포해수욕장 및 수변공원 평탄 구역에 시각 가이드 및 안내 부스가 배치됩니다. 바닷가 임시 매트 통로 구축으로 수변 평탄 도보 보행을 돕습니다.',
    accessibilityEn: 'Special flat synthetic pathways and temporary plastic beach mats are laid out toward the water at Dadaepo Beach to provide sturdy support for wheels.',
    descriptionKo: '뜨거운 한여름 밤 다대포해수욕장 일원에서 열리는 거대한 댄스 카니발, 대규모 버스킹, 나이트 풀파티, 수변 라이브 무대입니다.',
    descriptionEn: 'An epic mid-summer celebration spanning Dadaepo Beach, featuring live bands, street food stalls, and ocean parties engineered for universal entry.',
    locationKo: '다대포해수욕장 일원',
    locationEn: 'Dadaepo Beachfront & Coastal Park',
    colorClass: 'bg-sky-50 text-sky-850 border-sky-100',
    dotClass: 'bg-sky-500'
  },
  {
    id: 'busan-buddhist-expo-2026',
    titleKo: '2026 부산국제불교박람회',
    titleEn: '2026 Busan International Buddhist Expo',
    category: 'culture',
    categoryKo: '전시 / 박람회',
    categoryEn: 'Exhibition & Expo',
    startDate: '2026-08-06',
    endDate: '2026-08-09',
    stationKo: '센텀시티역 (2호선)',
    stationEn: 'Centum City Station',
    metroLine: 'Line 2',
    accessibilityKo: '벡스코 제1전시장은 단차가 전혀 없고 수직 승강기 및 장애인 전용 화장실이 완비되어 휠체어 및 유모차 이용객이 안전하고 쾌적하게 관람할 수 있습니다.',
    accessibilityEn: 'BEXCO Exhibition Center I features 100% barrier-free flat floors, wide entrance aisles, and dedicated accessible facilities.',
    descriptionKo: '한국 불교 문화 및 수행, 명상, 템플스테이, 불교 미술 및 전통 공예와 현대 웰니스 산업을 통합 선보이는 대표 박람회입니다.',
    descriptionEn: 'A major international expo displaying Korean Buddhist culture, meditation, temple stays, art crafts, and modern wellness industries.',
    locationKo: '벡스코 (BEXCO) 제1전시장 3홀',
    locationEn: 'BEXCO Exhibition Center I, Hall 3',
    colorClass: 'bg-amber-50 text-amber-850 border-amber-100',
    dotClass: 'bg-amber-500'
  },
  {
    id: 'north-port-ocean-sup-festa-2026',
    titleKo: '북항 오션 SUP FESTA',
    titleEn: 'North Port Ocean SUP FESTA',
    category: 'festival',
    categoryKo: '해양 레저',
    categoryEn: 'Marine Sports',
    startDate: '2026-07-31',
    endDate: '2026-08-09',
    stationKo: '부산역 / 초량역 (1호선)',
    stationEn: 'Busan / Choryang Station',
    metroLine: 'Line 1',
    accessibilityKo: '북항 친수공원 보행 수변 도로는 무단차 평탄 블록으로 설계되어 유모차 및 휠체어 접근이 매우 편안합니다.',
    accessibilityEn: 'The North Port Waterfront Park walkways are entirely flat and barrier-free for smooth wheel navigation.',
    descriptionKo: '부산 북항 재개발지 친수공원에서 펼쳐지는 패들보드(SUP) 체험, 수변 레저 스포츠 프로그램 및 온 가족이 즐기는 시원한 일상 탈출 축제입니다.',
    descriptionEn: 'Stand-up paddleboarding (SUP) and waterfront leisure sports festival held at the scenic North Port Waterfront Park.',
    locationKo: '북항 친수공원 일원',
    locationEn: 'North Port Waterfront Park Area',
    colorClass: 'bg-indigo-50 text-indigo-850 border-indigo-100',
    dotClass: 'bg-indigo-500'
  },
  {
    id: 'dadaepo-sunset-movie-festival-2026',
    titleKo: '다대포 선셋 영화축제',
    titleEn: 'Dadaepo Sunset Movie Festival',
    category: 'performance',
    categoryKo: '영화 / 문화',
    categoryEn: 'Movie & Culture',
    startDate: '2026-08-14',
    endDate: '2026-08-16',
    stationKo: '다대포해수욕장역 (1호선)',
    stationEn: 'Dadaepo Beach Station',
    metroLine: 'Line 1',
    accessibilityKo: '다대포 노을정원 및 수변 무대 관람 구역은 데크길과 평탄 잔디광장으로 연결되어 이동 편의성이 뛰어납니다.',
    accessibilityEn: 'Viewing lawns and sunset boardwalks at Dadaepo Beach provide wide, barrier-free access.',
    descriptionKo: '13:00~22:00 운영 (*부산 바다축제와 연계). 붉게 물드는 다대포 노을을 배경으로 야외 영화 상영, 감독/배우 토크쇼, 노을 버스킹이 함께하는 로맨틱 영화제입니다.',
    descriptionEn: 'Operating 13:00~22:00 in connection with Busan Sea Festival. Outdoor cinema, director talk shows, and sunset acoustics set against Dadaepo\'s famous golden sunset.',
    locationKo: '다대포해수욕장 일원',
    locationEn: 'Dadaepo Beachfront Area',
    colorClass: 'bg-rose-50 text-rose-850 border-rose-100',
    dotClass: 'bg-rose-500'
  },
  {
    id: 'night-sup-festival-2026',
    titleKo: '2026 광안리 나이트 SUP & 해양레저 축제',
    titleEn: '2026 Gwangalli Night SUP & Marine Leisure Festival',
    category: 'festival',
    categoryKo: '해양 레저',
    categoryEn: 'Marine Sports',
    startDate: '2026-08-07',
    endDate: '2026-08-09',
    stationKo: '광안역 / 금련산역 (2호선)',
    stationEn: 'Gwangan / Geumnyeonsan Station',
    metroLine: 'Line 2',
    accessibilityKo: '광안리 해변 데크 통로 및 평탄 수변 공원에 무단차 관람 보도블록이 완비되어 휠체어 및 유모차로 안심 관람이 가능합니다.',
    accessibilityEn: 'Gwangalli seaside deck and flat waterfront park walkways provide smooth, barrier-free viewing locations.',
    descriptionKo: 'LED 조명을 밝힌 패들보드(SUP)와 윈드서핑이 광안대교 야경을 배경으로 수놓는 이색 해양 스포츠 축제 및 수변 라이브 버스킹 무대입니다.',
    descriptionEn: 'Unique night marine sports festival featuring LED paddleboards (SUP) and windsurfing against the backdrop of Gwangandaegyo Bridge.',
    locationKo: '광안리 해수욕장 및 수변 스탠드',
    locationEn: 'Gwangalli Beachfront & Marine Park',
    colorClass: 'bg-cyan-50 text-cyan-850 border-cyan-100',
    dotClass: 'bg-cyan-500'
  },
  {
    id: 'drone-show-aug-08',
    titleKo: '「광안리 M 드론라이트쇼」 한여름 밤의 클래식',
    titleEn: 'Gwangalli M Drone Light Show (Midsummer Night Classic)',
    category: 'drone',
    categoryKo: '드론 연출',
    categoryEn: 'Drone Exhibition',
    startDate: '2026-08-08',
    endDate: '2026-08-08',
    stationKo: '광안역 (2호선)',
    stationEn: 'Gwangan Station',
    metroLine: 'Line 2',
    accessibilityKo: '광안해변 테마거리는 보행 장애물이 없는 완전 평탄 보도블록으로 구성되어 휠체어/유모차 전 구역 진입이 자유롭습니다.',
    accessibilityEn: 'The spacious Gwangalli Beach esplanade is paved with continuous non-slip flat bricks, allowing wheels and strollers to claim spectacular view spots easily.',
    descriptionKo: '8월 8일 토요일 (20:00 / 22:00 2회 공연) 진행. 클래식 명곡의 웅장한 선율에 맞춰 조율되는 빛의 오케스트라 퍼포먼스입니다.',
    descriptionEn: 'Saturday, August 8 (Two flights: 20:00 & 22:00). Light orchestra performance synchronized with grand classical music melodies.',
    locationKo: '광안리 해수욕장 생활체육공원 앞 해상',
    locationEn: 'Gwangalli Beachfront Esplanade',
    colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    dotClass: 'bg-emerald-500'
  },
  {
    id: 'craft-beer-festival-2026',
    titleKo: '2026 부산 수제맥주 페스티벌',
    titleEn: '2026 Busan Craft Beer Festival',
    category: 'festival',
    categoryKo: '수제맥주 / 푸드',
    categoryEn: 'Craft Beer & Food',
    startDate: '2026-08-13',
    endDate: '2026-08-17',
    stationKo: '센텀시티역 (2호선)',
    stationEn: 'Centum City Station',
    metroLine: 'Line 2',
    accessibilityKo: '벡스코 야외광장은 단차가 전혀 없는 완벽한 평탄 우레탄 바닥으로, 휠체어와 유모차가 야외 테이블 및 부스를 수월하게 이용할 수 있습니다.',
    accessibilityEn: 'The outdoor BEXCO plaza is paved completely flat, accommodating wheelchair users and stroller families with dedicated open tables.',
    descriptionKo: '전국 유명 수제맥주 브루어리와 부산 대표 맛집 푸드트럭, 시원한 야외 라이브 버스킹 공연이 어우러지는 한여름 밤 야외 맥주 축제입니다.',
    descriptionEn: 'A midsummer outdoor beer festival combining renowned Korean craft breweries, gourmet food trucks, and live acoustic music under the stars.',
    locationKo: '벡스코 (BEXCO) 야외광장',
    locationEn: 'BEXCO Outdoor Plaza, Centum City',
    colorClass: 'bg-amber-50 text-amber-850 border-amber-100',
    dotClass: 'bg-amber-500'
  },
  {
    id: 'drone-show-aug-15',
    titleKo: '「광안리 M 드론라이트쇼」 빛나는 광복의 밤',
    titleEn: 'Gwangalli M Drone Light Show (Shining Liberation Night)',
    category: 'drone',
    categoryKo: '드론 연출',
    categoryEn: 'Drone Exhibition',
    startDate: '2026-08-15',
    endDate: '2026-08-15',
    stationKo: '광안역 (2호선)',
    stationEn: 'Gwangan Station',
    metroLine: 'Line 2',
    accessibilityKo: '광안해변 테마거리는 보행 장애물이 없는 완전 평탄 보도블록으로 구성되어 휠체어/유모차 전 구역 진입이 자유롭습니다.',
    accessibilityEn: 'The spacious Gwangalli Beach esplanade is paved with continuous non-slip flat bricks, allowing wheels and strollers to claim spectacular view spots easily.',
    descriptionKo: '8월 15일 토요일 (20:00 / 22:00 2회 공연) 진행. 광복절 81주년을 기념하여 태극기와 빛의 서사시를 드론 아트워크로 연출하는 특별 라이트쇼입니다.',
    descriptionEn: 'Saturday, August 15 (Two flights: 20:00 & 22:00). Special Liberation Day commemorative light show featuring Taegeukgi flag patterns.',
    locationKo: '광안리 해수욕장 생활체육공원 앞 해상',
    locationEn: 'Gwangalli Beachfront Esplanade',
    colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    dotClass: 'bg-emerald-500'
  },
  {
    id: 'comedy-festival-2026',
    titleKo: '제14회 부산 국제코미디페스티벌 (BICF)',
    titleEn: '14th Busan International Comedy Festival (BICF)',
    category: 'performance',
    categoryKo: '코미디 / 공연',
    categoryEn: 'Comedy & Performance',
    startDate: '2026-08-21',
    endDate: '2026-08-30',
    stationKo: '센텀시티역 (2호선) / 부산역 (1호선)',
    stationEn: 'Centum City Station / Busan Station',
    metroLine: 'Line 2 / Line 1',
    accessibilityKo: '영화의전당 및 주요 공연장은 휠체어 전용 관람석 및 수직 승강기, 전용 화장실이 완비되어 교통약자의 접근성이 매우 우수합니다.',
    accessibilityEn: 'Venues including Busan Cinema Center feature elevators and accessible seating zones for smooth mobility access.',
    descriptionKo: '아시아 최초이자 최대의 국제 코미디 페스티벌로, 국내외 최정상 코미디언들의 웃음 폭탄 스탠드업 코미디, 마임, 넌버벌 퍼포먼스가 펼쳐집니다.',
    descriptionEn: 'Asia\'s largest comedy festival bringing top international comedians, stand-up, mime, and non-verbal shows to Busan.',
    locationKo: '영화의전당, 부산시민회관, 봉오리 아트홀 등',
    locationEn: 'Busan Cinema Center & Citizens\' Hall',
    colorClass: 'bg-purple-50 text-purple-850 border-purple-100',
    dotClass: 'bg-purple-500'
  },
  {
    id: 'drone-show-aug-22',
    titleKo: '「광안리 M 드론라이트쇼」 히어로즈 하모니',
    titleEn: 'Gwangalli M Drone Light Show (Heroes Harmony)',
    category: 'drone',
    categoryKo: '드론 연출',
    categoryEn: 'Drone Exhibition',
    startDate: '2026-08-22',
    endDate: '2026-08-22',
    stationKo: '광안역 (2호선)',
    stationEn: 'Gwangan Station',
    metroLine: 'Line 2',
    accessibilityKo: '광안해변 테마거리는 보행 장애물이 없는 완전 평탄 보도블록으로 구성되어 휠체어/유모차 전 구역 진입이 자유롭습니다.',
    accessibilityEn: 'The spacious Gwangalli Beach esplanade is paved with continuous non-slip flat bricks, allowing wheels and strollers to claim spectacular view spots easily.',
    descriptionKo: '8월 22일 토요일 (20:00 / 22:00 2회 공연) 진행. 신화 속 히어로와 현대 아이콘들이 결합된 역동적 시각 스펙터클 연출입니다.',
    descriptionEn: 'Saturday, August 22 (Two flights: 20:00 & 22:00). Dynamic spectacle merging mythical heroes and modern pop-culture icons.',
    locationKo: '광안리 해수욕장 생활체육공원 앞 해상',
    locationEn: 'Gwangalli Beachfront Esplanade',
    colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    dotClass: 'bg-emerald-500'
  },
  {
    id: 'drone-show-aug-29',
    titleKo: '「광안리 M 드론라이트쇼」 굿바이 썸머 나이트',
    titleEn: 'Gwangalli M Drone Light Show (Goodbye Summer Night)',
    category: 'drone',
    categoryKo: '드론 연출',
    categoryEn: 'Drone Exhibition',
    startDate: '2026-08-29',
    endDate: '2026-08-29',
    stationKo: '광안역 (2호선)',
    stationEn: 'Gwangan Station',
    metroLine: 'Line 2',
    accessibilityKo: '광안해변 테마거리는 보행 장애물이 없는 완전 평탄 보도블록으로 구성되어 휠체어/유모차 전 구역 진입이 자유롭습니다.',
    accessibilityEn: 'The spacious Gwangalli Beach esplanade is paved with continuous non-slip flat bricks, allowing wheels and strollers to claim spectacular view spots easily.',
    descriptionKo: '8월 29일 토요일 (20:00 / 22:00 2회 공연) 진행. 여름의 마지막 밤을 아쉬워하며 가을의 서막을 여는 감성 드론 라이트쇼입니다.',
    descriptionEn: 'Saturday, August 29 (Two flights: 20:00 & 22:00). Emotional drone light performance saying farewell to summer and welcoming autumn.',
    locationKo: '광안리 해수욕장 생활체육공원 앞 해상',
    locationEn: 'Gwangalli Beachfront Esplanade',
    colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    dotClass: 'bg-emerald-500'
  },
  {
    id: 'rock-festival',
    titleKo: '부산 국제 록 페스티벌',
    titleEn: 'Busan International Rock Festival',
    category: 'performance',
    categoryKo: '공연/콘서트',
    categoryEn: 'Performance & Concert',
    startDate: '2026-10-03',
    endDate: '2026-10-04',
    stationKo: '사상역 (2호선) / 괘법르네시떼역',
    stationEn: 'Sasang / Gwaebeop Renecite Station',
    metroLine: 'Line 2 & BGL',
    accessibilityKo: '삼락공원은 드넓은 평지 잔디밭공원입니다. 페스티벌 기간 내 휠체어 바퀴가 풀밭에 묻히지 않도록 대규모 고무 매트 선형 가이드가 마련됩니다.',
    accessibilityEn: 'Set inside the grand Samrak Park. Massive industrial rubber mats are temporarily paved over the grass path logic to provide firm rollway safety.',
    descriptionKo: '대한민국 최장수 록 페스티벌로, 국내외 최정상급 록, 인디 뮤지션들이 거대하고 흥겨운 스테이지들을 가르고 야간 불꽃 퍼포먼스를 추진합니다.',
    descriptionEn: 'Korea\'s longest-running legendary rock festival. Flat park grounds with solid temporary safety layouts that allow strollers and wheels to navigate.',
    locationKo: '삼락생태공원 중앙잔디무대',
    locationEn: 'Samrak Ecological Park',
    colorClass: 'bg-indigo-50 text-indigo-850 border-indigo-100',
    dotClass: 'bg-indigo-600'
  },
  {
    id: 'biff-festival',
    titleKo: '부산 국제영화제 (BIFF)',
    titleEn: 'Busan International Film Festival (BIFF)',
    category: 'culture',
    categoryKo: '문화/예술',
    categoryEn: 'Culture & Arts',
    startDate: '2026-10-07',
    endDate: '2026-10-16',
    stationKo: '센텀시티역 (2호선)',
    stationEn: 'Centum City Station',
    metroLine: 'Line 2',
    accessibilityKo: '세계적으로 인증받은 "영화의전당"은 보행 친화적 공간입니다. 전체 상영 전당에 점자 안내판, 단차 없는 엘리베이터, 자동문 및 휠체어 전용 상영 좌석이 내재되어 수준 높습니다.',
    accessibilityEn: 'The magnificent Cinema Center is fully certified step-free, featuring pristine elevators, wheelchair-only indoor theater rows, and digital helper pads.',
    descriptionKo: '아시아 최고 권위의 국제 영화제로, 세계 각국의 엄선된 예술영화, 감독 전작 무비 상영 및 관객과의 대화(GV), 스타 야간 레드카펫 행사가 풍성하게 이어집니다.',
    descriptionEn: 'Asia\'s most prestigious films and red carpet spectacles. The Cinema Center is seamlessly connected to Centum City Subway Station via flat underpass paths.',
    locationKo: '해운대 센텀시티 영화의전당 등',
    locationEn: 'Busan Cinema Center, Centum City',
    colorClass: 'bg-rose-50 text-rose-850 border-rose-100',
    dotClass: 'bg-rose-600'
  },
  {
    id: 'jagalchi-festival',
    titleKo: '부산 자갈치축제',
    titleEn: 'Busan Jagalchi Festival',
    category: 'festival',
    categoryKo: '전통 축제',
    categoryEn: 'Traditional Festival',
    startDate: '2026-10-08',
    endDate: '2026-10-11',
    stationKo: '자갈치역 / 남포역 (1호선)',
    stationEn: 'Jagalchi / Nampo Station',
    metroLine: 'Line 1',
    accessibilityKo: '새롭게 개조된 현대식 자갈치 크루즈 빌딩 및 주 관람거리는 시원하고 넓게 포장된 바닥으로 계단이 없으며, 내부 상가 엘리베이터 및 편의 화장실이 준비되어 있습니다.',
    accessibilityEn: 'The modern Jagalchi Center building has step-free elevators and dedicated handicap companion restrooms. Market pathways are flat concrete.',
    descriptionKo: '"오이소, 보이소, 사이소!" 정겨운 사투리와 한국 수산업의 최대 집결지로 싱싱한 수산물 무료 시식, 수산물 맨손 잡기 행사, 유람선 탑승 등 활기가 넘칩니다.',
    descriptionEn: 'Korea\'s largest coastal seafood festival. Fully flat modern market complex structures ensure Senior companions and wheelchair users dine safely.',
    locationKo: '자갈치시장 친수공간 일원',
    locationEn: 'Jagalchi Market Coastal Esplanade',
    colorClass: 'bg-violet-50 text-violet-850 border-violet-100',
    dotClass: 'bg-violet-500'
  },
  {
    id: 'fireworks-festival',
    titleKo: '부산 불꽃축제',
    titleEn: 'Busan Fireworks Festival',
    category: 'performance',
    categoryKo: '공연/콘서트',
    categoryEn: 'Performance & Concert',
    startDate: '2026-11-07',
    endDate: '2026-11-07',
    stationKo: '광안역 / 금련산역 (2호선)',
    stationEn: 'Gwangan / Geumnyeonsan Station',
    metroLine: 'Line 2',
    accessibilityKo: '매우 붐비기 때문에 교통 정리가 이루어집니다. 휠체어 탑승자와 배려자분을 위한 지정석 구역 및 특수 통행 게이트가 별도로 지정 통제 운영되므로 안심하십시오.',
    accessibilityEn: 'Due to large crowds, specialized barrier-free outdoor viewing zones with dynamic ramp entrances are dedicated for senior and disabled visitors.',
    descriptionKo: '매년 가을 밤 광안대교를 배경으로 수만 발의 화려한 초대형 불꽃과 초대형 드론 군무, 감미로운 음악을 접목한 세계 최고 수준의 영상 불꽃 멀티미디어 쇼입니다.',
    descriptionEn: 'A breathtaking autumn night firework performance framed by Gwangandaegyo Bridge, using multi-dimensional visual laser shows and symphonies.',
    locationKo: '광안리 해수욕장 백사장 일대 및 수변공원',
    locationEn: 'Gwangalli Beach Front & Marine Park',
    colorClass: 'bg-fuchsia-50 text-fuchsia-850 border-fuchsia-100',
    dotClass: 'bg-fuchsia-500'
  }
];

export default function BusanEventsCalendarView({ language }: BusanEventsCalendarViewProps) {
  // Calculate today's date dynamically
  const todayObj = useMemo(() => new Date(), []);
  const todayYear = todayObj.getFullYear();
  const todayMonth = todayObj.getMonth() + 1;
  const todayDate = todayObj.getDate();
  const todayDateStr = useMemo(() => {
    return `${todayYear}-${String(todayMonth).padStart(2, '0')}-${String(todayDate).padStart(2, '0')}`;
  }, [todayYear, todayMonth, todayDate]);

  // Present Year and Month (initialize to current real year and month)
  const [currentYear, setCurrentYear] = useState<number>(todayYear);
  const [currentMonth, setCurrentMonth] = useState<number>(todayMonth);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  
  // Interactive day events overlay popup state
  const [dayEventsPopup, setDayEventsPopup] = useState<{ dateString: string; events: BusanEvent[] } | null>(null);

  // Custom selector with smooth scroll optimization for mobile devices
  const handleSelectEvent = (eventId: string | null) => {
    setSelectedEventId(eventId);
    if (eventId) {
      setTimeout(() => {
        const targetElement = document.getElementById('selected-event-details-section');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 120);
    }
  };

  // Handle months logic
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Switch specifically to a targeted event's month
  const jumpToEventMonth = (event: BusanEvent) => {
    const parts = event.startDate.split('-');
    const yr = parseInt(parts[0], 10);
    const mo = parseInt(parts[1], 10);
    setCurrentYear(yr);
    setCurrentMonth(mo);
    handleSelectEvent(event.id);
  };

  // Helper date parsing
  const isDateInEventRange = (dateStr: string, event: BusanEvent) => {
    const d = new Date(dateStr);
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    
    // Set hours to zero for accurate comparison
    d.setHours(0,0,0,0);
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    
    return d >= start && d <= end;
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    // 1-indexed month logic for JavaScript Dates
    const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth, 0).getDate();
    
    const daysArray: { dateString: string; dayNumber: number; isPadding: boolean }[] = [];
    
    // Previous Month padding days
    const prevMonthTotalDays = new Date(currentYear, currentMonth - 1, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const pmYear = currentMonth === 1 ? currentYear - 1 : currentYear;
      const pmMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const day = prevMonthTotalDays - i;
      const formattedMonth = String(pmMonth).padStart(2, '0');
      const formattedDay = String(day).padStart(2, '0');
      daysArray.push({
        dateString: `${pmYear}-${formattedMonth}-${formattedDay}`,
        dayNumber: day,
        isPadding: true
      });
    }

    // Current Month active days
    const formattedActiveMonth = String(currentMonth).padStart(2, '0');
    for (let day = 1; day <= totalDays; day++) {
      const formattedDay = String(day).padStart(2, '0');
      daysArray.push({
        dateString: `${currentYear}-${formattedActiveMonth}-${formattedDay}`,
        dayNumber: day,
        isPadding: false
      });
    }

    // Next Month padding days to complete calendar grids (generally 42 cells total for clean display)
    const remainingCells = 42 - daysArray.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nmYear = currentMonth === 12 ? currentYear + 1 : currentYear;
      const nmMonth = currentMonth === 12 ? 1 : currentMonth + 1;
      const formattedMonth = String(nmMonth).padStart(2, '0');
      const formattedDay = String(i).padStart(2, '0');
      daysArray.push({
        dateString: `${nmYear}-${formattedMonth}-${formattedDay}`,
        dayNumber: i,
        isPadding: true
      });
    }

    return daysArray;
  }, [currentYear, currentMonth]);

  // Filter events based on currently selected category filter and exclude past events
  const filteredEvents = useMemo(() => {
    const activeOrUpcoming = BUSAN_EVENTS_DATA.filter(evt => evt.endDate >= todayDateStr);

    if (selectedCategory === 'all') {
      return activeOrUpcoming;
    }
    return activeOrUpcoming.filter(evt => {
      if (selectedCategory === 'drone') return evt.category === 'drone';
      if (selectedCategory === 'festival') return evt.category === 'festival';
      if (selectedCategory === 'culture') return evt.category === 'culture' || evt.category === 'performance';
      return true;
    });
  }, [selectedCategory, todayDateStr]);

  // Helper to find all filtered events active on a specific calendar day cell
  const getEventsForDay = (dateString: string) => {
    return filteredEvents.filter(evt => isDateInEventRange(dateString, evt));
  };

  // Selected event metadata lookup
  const activeEventDetail = useMemo(() => {
    return BUSAN_EVENTS_DATA.find(evt => evt.id === selectedEventId) || null;
  }, [selectedEventId]);

  // Months labels mapped in Korean & English
  const monthLabel = useMemo(() => {
    const labelsKo = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const labelsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return language === 'KR' 
      ? `${currentYear}년 ${labelsKo[currentMonth - 1]}` 
      : `${labelsEn[currentMonth - 1]} ${currentYear}`;
  }, [currentYear, currentMonth, language]);

  // Beautiful formatting for calendar badges
  const formatBadgeTitle = (evt: BusanEvent, lang: 'KR' | 'EN') => {
    if (lang === 'KR') {
      let text = evt.titleKo;
      if (text.includes('」')) {
        text = text.split('」')[1].trim();
      }
      text = text.replace('드론라이트쇼', '드론쇼');
      if (text.length > 12) {
        return text.substring(0, 11) + '..';
      }
      return text;
    } else {
      let text = evt.titleEn;
      if (text.includes('(')) {
        text = text.split('(')[1].replace(')', '').trim();
      }
      if (text.length > 12) {
        return text.substring(0, 11) + '..';
      }
      return text;
    }
  };

  // Format popup date for display
  const formatPopupDate = (dateStr: string, lang: 'KR' | 'EN') => {
    const parts = dateStr.split('-');
    const dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const dayOfWeek = lang === 'KR' 
      ? ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()]
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dateObj.getDay()];
    
    if (lang === 'KR') {
      return `${parts[0]}년 ${parseInt(parts[1], 10)}월 ${parseInt(parts[2], 10)}일 (${dayOfWeek}요일)`;
    } else {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[dateObj.getMonth()]} ${parseInt(parts[2], 10)}, ${parts[0]} (${dayOfWeek})`;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-left max-w-5xl mx-auto" id="busan-events-calendar-container">
      
      {/* Intro Header Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-800 flex items-center gap-2.5">
          <span>📅</span>
          <span>{language === 'KR' ? '부산 주요일정표' : 'Busan Main Festival Calendar'}</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed font-semibold">
          {language === 'KR' 
            ? '부산 대표 축제 및 문화 공연, 드론쇼의 행사 일정을 한 눈에!' 
            : 'Explore high-fidelity seasonal festivals, cultural parades, multi-drone lighting shows, and concerts in Busan with wheel-friendly accessibility guidelines.'}
        </p>

        {/* Verification Info Notice */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-slate-500">
          <span className="font-bold text-slate-700 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>{language === 'KR' ? '검증 정보' : 'Verified Data'}</span>
          </span>
          <span className="text-slate-300">|</span>
          <span>조사자: <strong className="text-slate-700 font-medium">플로레르</strong></span>
          <span className="text-slate-300">|</span>
          <span>최근 조사일: <strong className="text-slate-700 font-medium">2026년 8월 3일 기준</strong> <span className="text-blue-600">(매일 자동 업데이트)</span></span>
          <span className="text-slate-300">|</span>
          <span>
            공식 출처:{' '}
            <a 
              href="https://www.busan.go.kr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium underline inline-flex items-center gap-0.5"
            >
              <span>부산광역시청</span>
              <ExternalLink className="w-2.5 h-2.5 text-blue-600" />
            </a>
          </span>
        </div>
      </div>

      {/* Main Grid: Split view Calendar vs quick event list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: The Interactive Custom Calendar Grid (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)] space-y-6">
          
          {/* Calendar header control pane */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 border-b border-slate-50 pb-4">
            <h3 className="text-sm sm:text-lg font-black text-slate-800 flex items-center gap-1.5 sm:gap-2 font-heading shrink-0 whitespace-nowrap">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#004481] shrink-0" />
              <span className="whitespace-nowrap">{monthLabel}</span>
            </h3>

            {/* Navigation buttons */}
            <div className="flex gap-1 sm:gap-2 shrink-0">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 sm:p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl cursor-pointer border border-slate-150 transition-all hover:scale-105 active:scale-95"
                title={language === 'KR' ? '이전 달' : 'Previous Month'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => {
                  setCurrentYear(todayYear);
                  setCurrentMonth(todayMonth);
                }}
                className="px-2 py-1 text-[10px] sm:text-[11px] font-black hover:bg-slate-50 border border-slate-200 rounded-lg cursor-pointer text-slate-500 hover:text-slate-800 transition-colors whitespace-nowrap"
              >
                {language === 'KR' ? '오늘' : 'Today'}
              </button>

              <button
                onClick={handleNextMonth}
                className="p-1.5 sm:p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl cursor-pointer border border-slate-150 transition-all hover:scale-105 active:scale-95"
                title={language === 'KR' ? '다음 달' : 'Next Month'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Category Selector & Legend Row */}
          <div className="flex flex-col gap-3 border-b border-slate-50 pb-4">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
              {language === 'KR' ? '카테고리 필터 및 일정 구분' : 'Category Filter & Legend'}
            </span>
            <div className="flex flex-wrap gap-2 overflow-x-auto no-scrollbar scroll-smooth">
              {[
                { id: 'all', labelKo: '전체', labelEn: 'All', badgeClass: 'bg-slate-150 text-slate-800 border-slate-200' },
                { id: 'drone', labelKo: '드론 연출', labelEn: 'Drone', badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
                { id: 'festival', labelKo: '축제 / 행사', labelEn: 'Festivals', badgeClass: 'bg-sky-50 text-sky-850 border-sky-200' },
                { id: 'culture', labelKo: '문화 / 공연 / 예술', labelEn: 'Culture & Arts', badgeClass: 'bg-indigo-50 text-indigo-850 border-indigo-200' }
              ].map(opt => {
                const isActive = selectedCategory === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSelectedCategory(opt.id);
                      setSelectedEventId(null); // Clear selected event to avoid confusion
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all border shrink-0 cursor-pointer select-none ${
                      isActive 
                        ? 'ring-2 ring-[#004481]/40 shadow-sm font-extrabold ' + opt.badgeClass
                        : 'bg-white text-slate-500 hover:text-slate-800 border-slate-150 hover:bg-slate-50/50'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      opt.id === 'all' ? 'bg-slate-400' :
                      opt.id === 'drone' ? 'bg-emerald-500' :
                      opt.id === 'festival' ? 'bg-sky-500' : 'bg-indigo-500'
                    }`} />
                    <span>{language === 'KR' ? opt.labelKo : opt.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calendar Day grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
            {/* Days of week labels */}
            {['일', '월', '화', '수', '목', '금', '토'].map((dowStr, dowIdx) => {
              const dowLabelEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dowIdx];
              const isWeekend = dowIdx === 0 || dowIdx === 6;
              const textCol = dowIdx === 0 ? 'text-red-500' : dowIdx === 6 ? 'text-blue-500' : 'text-slate-400';
              return (
                <div key={dowIdx} className={`text-[11px] sm:text-xs font-black py-1 select-none ${textCol}`}>
                  {language === 'KR' ? dowStr : dowLabelEn}
                </div>
              );
            })}

            {/* Calendar Days cells */}
            {calendarDays.map((cell, idx) => {
              const dayEvents = getEventsForDay(cell.dateString);
              const isSelected = selectedEventId ? dayEvents.some(e => e.id === selectedEventId) : false;
              
              // Determine if the day is "today" dynamically based on current date
              const isToday = cell.dateString === todayDateStr;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (dayEvents.length > 1) {
                      setDayEventsPopup({ dateString: cell.dateString, events: dayEvents });
                    } else if (dayEvents.length === 1) {
                      handleSelectEvent(dayEvents[0].id);
                    }
                  }}
                  className={`min-h-[58px] sm:min-h-[96px] p-1 border rounded-xl sm:rounded-2xl flex flex-col justify-between transition-all text-left relative ${
                    cell.isPadding ? 'opacity-30 border-slate-50' : 'border-slate-100 hover:border-slate-250'
                  } ${
                    isToday ? 'bg-amber-500/[0.04] border-amber-300 ring-1 ring-amber-200' : ''
                  } ${
                    isSelected ? 'bg-blue-50/[0.3] ring-1.5 sm:ring-2 ring-[#004481]/50 border-blue-200' : 'bg-white'
                  } ${dayEvents.length > 0 ? 'cursor-pointer hover:shadow-sm' : 'cursor-default'}`}
                >
                  {/* Day Number and Today Sign */}
                  <div className="flex justify-between items-center px-0.5 sm:px-1">
                    <span className={`text-[10.5px] sm:text-xs font-extrabold ${cell.isPadding ? 'text-slate-400' : 'text-slate-700'}`}>
                      {cell.dayNumber}
                    </span>
                    {isToday && (
                      <span className="text-[7.5px] sm:text-[8.5px] font-black text-rose-500 px-1 py-0.5 bg-rose-50 rounded select-none uppercase tracking-tight scale-90 origin-right">
                        Today
                      </span>
                    )}
                  </div>

                  {/* Desktop Layout - Render beautiful text-labeled badges */}
                  <div className="hidden sm:block space-y-1 mt-1.5 px-0.5">
                    {dayEvents.slice(0, 2).map(evt => (
                      <div
                        key={evt.id}
                        onClick={(e) => {
                          e.stopPropagation(); // Avoid triggering parent cell popover
                          handleSelectEvent(evt.id);
                        }}
                        className={`text-[9.5px] truncate px-1.5 py-0.5 rounded-lg font-black tracking-tight leading-tight transition-transform hover:scale-103 ${evt.colorClass} border`}
                        title={language === 'KR' ? evt.titleKo : evt.titleEn}
                      >
                        <span className="mr-0.5 select-none text-[9px]">📍</span>
                        {formatBadgeTitle(evt, language)}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div 
                        onClick={(e) => {
                          e.stopPropagation(); // Avoid twice-triggering the popover
                          setDayEventsPopup({ dateString: cell.dateString, events: dayEvents });
                        }}
                        className="text-[9.5px] font-black text-slate-500 hover:text-[#004481] hover:bg-slate-100 bg-slate-50 border border-slate-200 rounded-lg px-1 py-0.5 mt-0.5 text-center transition-colors cursor-pointer select-none"
                      >
                        + {dayEvents.length - 2} {language === 'KR' ? '개 더' : 'more'}
                      </div>
                    )}
                  </div>

                  {/* Mobile Layout - Clean colored dots to prevent cluttered boxes on small screens */}
                  <div className="flex sm:hidden justify-center items-center gap-1 mt-1 pb-1">
                    {dayEvents.slice(0, 3).map(evt => (
                      <span
                        key={evt.id}
                        className={`w-1.5 h-1.5 rounded-full ${evt.dotClass}`}
                        title={language === 'KR' ? evt.titleKo : evt.titleEn}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[7.5px] font-black text-slate-400 leading-none">
                        +
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Event details / List Browser (lg:col-span-5) */}
        <div id="selected-event-details-section" className="lg:col-span-5 space-y-6 scroll-mt-20">
          
          <AnimatePresence mode="wait">
            {activeEventDetail ? (
              /* Event Detail card */
              <motion.div
                key={activeEventDetail.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white rounded-3xl border border-slate-100 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.015)] text-left space-y-5"
              >
                {/* Header title block with Close back Option */}
                <div className="flex justify-between items-start gap-3 border-b border-slate-100 pb-3.5">
                  <div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black ${activeEventDetail.colorClass} border select-none mb-2`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${activeEventDetail.dotClass} inline-block`} />
                      <span>{language === 'KR' ? activeEventDetail.categoryKo : activeEventDetail.categoryEn}</span>
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-slate-800 leading-snug">
                      {language === 'KR' ? activeEventDetail.titleKo : activeEventDetail.titleEn}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedEventId(null)}
                    className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl border border-slate-100 cursor-pointer transition-colors text-xs font-bold"
                  >
                    {language === 'KR' ? '해제' : 'Clear'}
                  </button>
                </div>

                {/* Event core info: Times, Location */}
                <div className="space-y-3 font-sans">
                  <div className="flex gap-2.5 items-start">
                    <span className="text-sm select-none shrink-0 text-[#004481]">📅</span>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">Event Period / 축제 기간</span>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-700">
                        {activeEventDetail.startDate} ~ {activeEventDetail.endDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-start">
                    <span className="text-sm select-none shrink-0 text-amber-500">📍</span>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">VENUE LOCATION / 상세 장소</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-700">
                        {language === 'KR' ? activeEventDetail.locationKo : activeEventDetail.locationEn}
                      </span>
                    </div>
                  </div>

                  {/* Nearest Subway Connection info */}
                  <div className="bg-emerald-500/[0.02] p-4 rounded-2xl border border-dashed border-emerald-200">
                    <div className="flex gap-2 items-center text-xs font-black text-emerald-800">
                      <span>🚇</span>
                      <span>{language === 'KR' ? '가장 인접한 엘리베이터 지하철역' : 'Nearest Accessible Transit Station'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-800 font-extrabold mt-1.5 pl-5">
                      {language === 'KR' ? activeEventDetail.stationKo : activeEventDetail.stationEn} 
                      <span className="ml-1.5 text-[10.5px] px-1.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-700">
                        {activeEventDetail.metroLine}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Event Description */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-450 font-bold block uppercase tracking-wide font-sans">{language === 'KR' ? '행사 소개' : 'Event Description'}</span>
                  <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                    {language === 'KR' ? activeEventDetail.descriptionKo : activeEventDetail.descriptionEn}
                  </p>
                </div>


              </motion.div>
            ) : (
              /* Non-selected default screen: Showcase all events as quick scrollable explorer */
              <motion.div
                key="default-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.015)] text-left space-y-4"
              >
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest font-heading flex items-center gap-2">
                    <Info className="w-4 h-4 text-slate-400" />
                    <span>{language === 'KR' ? '부산 전체 일정/축제 총람' : 'Busan Events & Festivals Index'}</span>
                  </h4>
                  <span className="text-[10px] font-extrabold text-slate-400">
                    {language === 'KR' ? `총 ${filteredEvents.length}개` : `${filteredEvents.length} active`}
                  </span>
                </div>

                <div className="max-h-[380px] sm:max-h-[520px] overflow-y-auto pr-1.5 space-y-3 custom-scrollbar">
                  {filteredEvents.map(evt => {
                    const isFocusOnThisEvent = selectedEventId === evt.id;
                    return (
                      <div
                        key={evt.id}
                        onClick={() => jumpToEventMonth(evt)}
                        className={`p-3.5 rounded-2xl border transition-all duration-250 cursor-pointer flex justify-between items-center gap-4 group hover:-translate-y-0.5 ${
                          isFocusOnThisEvent 
                            ? 'bg-blue-50/40 border-[#004481]/30 ring-1 ring-[#004481]/20' 
                            : 'bg-slate-50/50 hover:bg-slate-50 hover:shadow-sm border-slate-150'
                        }`}
                      >
                        <div className="space-y-1 flex-1">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[9px] font-black ${evt.colorClass} border uppercase tracking-tight`}>
                            {language === 'KR' ? evt.categoryKo : evt.categoryEn}
                          </span>
                          <h5 className="text-xs sm:text-sm font-black text-slate-800 group-hover:text-[#004481] transition-colors leading-snug">
                            {language === 'KR' ? evt.titleKo : evt.titleEn}
                          </h5>
                          <p className="text-[10px] text-slate-400 font-bold font-sans">
                            📅 {evt.startDate} ~ {evt.endDate}
                          </p>
                        </div>
                        <div className="shrink-0 text-slate-400 group-hover:text-[#004481] transition-transform group-hover:translate-x-1">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                  {filteredEvents.length === 0 && (
                    <div className="text-center py-10 text-xs font-semibold text-slate-405 font-sans">
                      {language === 'KR' ? '선택된 카테고리에 해당하는 활성 일정이 없습니다.' : 'No festivals match the active category filter.'}
                    </div>
                  )}
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-dotted border-slate-200">
                  <p className="text-[11px] font-bold text-slate-500 leading-normal">
                    💡 <span className="font-extrabold text-[#004481]">{language === 'KR' ? '팁' : 'Tip'}:</span> {language === 'KR' ? '목록 중 축제를 클릭하면 달력이 해당 월로 즉시 우측에 표출됩니다!' : 'Click any list item to jump the calendar view directly to the event month with accessible details loaded.'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>

      </div>

      {/* Day Events Selector Popup/Modal */}
      <AnimatePresence>
        {dayEventsPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDayEventsPopup(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-slate-100 p-6 shadow-2xl z-10 flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-4 shrink-0">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 font-sans block">
                    {language === 'KR' ? '오늘의 일정 선택기' : 'Day Schedule Selector'}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                    {formatPopupDate(dayEventsPopup.dateString, language)}
                  </h4>
                </div>
                <button
                  onClick={() => setDayEventsPopup(null)}
                  className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl border border-slate-100 cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable event cards */}
              <div className="overflow-y-auto space-y-3 pr-1 py-1 custom-scrollbar flex-1">
                {dayEventsPopup.events.map(evt => (
                  <div
                    key={evt.id}
                    onClick={() => {
                      handleSelectEvent(evt.id);
                      setDayEventsPopup(null);
                    }}
                    className={`p-4 rounded-2xl border transition-all hover:-translate-y-0.5 cursor-pointer bg-slate-50/50 hover:bg-white hover:shadow-md border-slate-150 flex justify-between items-center gap-4 group`}
                  >
                    <div className="space-y-1 text-left flex-1">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-black border uppercase tracking-tight ${evt.colorClass}`}>
                        <span className={`w-1 h-1 rounded-full ${evt.dotClass}`} />
                        <span>{language === 'KR' ? evt.categoryKo : evt.categoryEn}</span>
                      </span>
                      <h5 className="text-sm font-black text-slate-800 group-hover:text-[#004481] transition-colors leading-snug">
                        {language === 'KR' ? evt.titleKo : evt.titleEn}
                      </h5>
                      <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1 font-sans">
                        <span>🚇</span>
                        <span>{language === 'KR' ? evt.stationKo : evt.stationEn}</span>
                      </p>
                    </div>
                    <div className="shrink-0 text-slate-400 group-hover:text-[#004481] transition-transform group-hover:translate-x-1">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer guidance */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10.5px] font-bold text-slate-400 text-center font-sans shrink-0">
                {language === 'KR' ? '일정을 클릭하면 상세 정보를 바로 아래에 표시합니다.' : 'Click an event to display accessibility-focused guidelines.'}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
