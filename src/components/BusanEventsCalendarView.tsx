/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Tag, Shuffle, Info, Sparkles, CheckCircle2 } from 'lucide-react';
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

// 2026 Curated Busan Events Data
const BUSAN_EVENTS_DATA: BusanEvent[] = [
  {
    id: 'lantern-festival',
    titleKo: '삼광사 연등축제 (부산연등축제)',
    titleEn: 'Samgwangsa Temple Lantern Festival',
    category: 'festival',
    categoryKo: '전통 축제',
    categoryEn: 'Traditional Festival',
    startDate: '2026-05-12',
    endDate: '2026-05-27',
    stationKo: '서면역 / 양정역',
    stationEn: 'Seomyeon / Yangjeong Station',
    metroLine: 'Line 1 & 2',
    accessibilityKo: '삼광사 경내에는 평탄 유도 데크 및 완만한 사찰 진입 보행로가 배치되어 휠체어와 유모차 통행이 원활합니다. (일부 전각 계단 제외)',
    accessibilityEn: 'The temple courtyard features smooth wooden decks and gentle approach ramps making light wheelchair and stroller access highly enjoyable.',
    descriptionKo: 'CNN이 선정한 "한국에서 가봐야 할 아름다운 곳 50선"에 해당하는 대규모 온등 축제로, 수만 개의 오색 연등이 사찰을 가득 매웁니다.',
    descriptionEn: 'Selected as one of CNN\'s "50 Beautiful Places to Visit in Korea," featuring tens of thousands of beautiful lanterns wrapping the majestic temple.',
    locationKo: '삼광사 대웅전 광장',
    locationEn: 'Samgwangsa Temple Grounds',
    colorClass: 'bg-amber-50 text-amber-800 border-amber-100',
    dotClass: 'bg-amber-500'
  },
  {
    id: 'sand-festival',
    titleKo: '해운대 모래축제',
    titleEn: 'Haeundae Sand Festival',
    category: 'festival',
    categoryKo: '해변 축제',
    categoryEn: 'Beach Festival',
    startDate: '2026-05-22',
    endDate: '2026-05-25',
    stationKo: '해운대역 (2호선)',
    stationEn: 'Haeundae Station',
    metroLine: 'Line 2',
    accessibilityKo: '해운대 해수욕장 백사장 초입에 무장벽 목재 데크로드가 설치되어 휠체어/유모차를 탄 채로 웅장한 모래 작품 바로 코앞까지 이동해 관람할 수 있습니다.',
    accessibilityEn: 'Specially engineered wooden boardwalks run all the way through the sandy beach, allowing barrier-free access directly to the front of giant sand sculptures.',
    descriptionKo: '세계적인 모래 조각가들이 모여 모래를 예술작품으로 형성화하며, 남녀노소 누구나 즐기는 모래 미끄럼틀과 다양한 서핑 행사 등이 공존합니다.',
    descriptionEn: 'World-renowned sandbox artists carve delicate masterpieces out of high-density sand along the seaside. Standard access paths are extremely flat.',
    locationKo: '해운대 해수욕장 광장 무대',
    locationEn: 'Haeundae Beach Square',
    colorClass: 'bg-orange-50 text-orange-850 border-orange-100',
    dotClass: 'bg-orange-500'
  },
  {
    id: 'port-festival',
    titleKo: '부산항축제',
    titleEn: 'Busan Port Festival',
    category: 'culture',
    categoryKo: '문화/예술',
    categoryEn: 'Culture & Arts',
    startDate: '2026-05-30',
    endDate: '2026-05-31',
    stationKo: '부산역 (1호선)',
    stationEn: 'Busan Station',
    metroLine: 'Line 1',
    accessibilityKo: '부산항 국제여객터미널 야외 친수공원은 계단이 없고 완전한 아스팔트 평면으로 구성되어 장애인 전용 엘리베이터 및 화장실을 쉽게 활용 가능합니다.',
    accessibilityEn: 'The waterfront park at Busan Port Passenger Terminal is completely step-free, paved with asphalt, with highly accessible elevators in adjacent main terminals.',
    descriptionKo: '세계 5대 항만인 부산항의 위상을 알리고, 선박 공개 행사, 대형 해상 불꽃쇼, 드론 라이트쇼 등 다채로운 해양이벤트를 선보입니다.',
    descriptionEn: 'Showcases Busan Port\'s global maritime stature with ship tours, marine fireworks, dynamic drone theater, and accessible waterfront family activities.',
    locationKo: '부산항 국제여객터미널 야외 친수공원',
    locationEn: 'Busan Port International Passenger Terminal Park',
    colorClass: 'bg-blue-50 text-blue-800 border-blue-100',
    dotClass: 'bg-blue-500'
  },
  {
    id: 'bof-festival',
    titleKo: '부산 원아시아페스티벌 (BOF)',
    titleEn: 'Busan One Asia Festival (BOF) K-POP Concert',
    category: 'performance',
    categoryKo: '공연/콘서트',
    categoryEn: 'Performance & Concert',
    startDate: '2026-06-06',
    endDate: '2026-06-07',
    stationKo: '사직역 / 종합운동장역 (3호선)',
    stationEn: 'Sajik / Sports Complex Station',
    metroLine: 'Line 3',
    accessibilityKo: '대형 스포츠 주경기장에서 무장벽 휠체어 단독 관람 제어구역과 평탄 엘리베이터 동선이 촘촘히 보장됩니다. 역사에서 체육공원까지 점자블록 및 리프트 완비.',
    accessibilityEn: 'We provide dedicated wheelchair seating rows with optimal sight lines, complete lift mechanics from Sajik station, and large handicap restrooms.',
    descriptionKo: '한류 메가코리아의 대표 콘텐츠인 K-POP 대형 패밀리 콘서트가 부산 가을 및 초여름을 뜨겁게 장식합니다. 세계적인 한류 스타들의 연속 옥외 퍼포먼스.',
    descriptionEn: 'Busan\'s premier global K-POP megashow featuring superstars in concert with wheelchair accessibility and stepless stadium approach layouts.',
    locationKo: '부산아시아드주경기장',
    locationEn: 'Busan Asiad Main Stadium',
    colorClass: 'bg-purple-50 text-purple-800 border-purple-100',
    dotClass: 'bg-purple-600'
  },
  {
    id: 'drone-show-1',
    titleKo: '광안리 M 드론 라이트쇼 (토요일)',
    titleEn: 'Gwangalli M Drone Light Show',
    category: 'drone',
    categoryKo: '드론 연출',
    categoryEn: 'Drone Exhibition',
    startDate: '2026-06-13',
    endDate: '2026-06-13',
    stationKo: '광안역 (2호선)',
    stationEn: 'Gwangan Station',
    metroLine: 'Line 2',
    accessibilityKo: '광안해변 테마거리는 완전한 보행 전용 보도블록 평면도로 구성되어 있으며, 횡단보도 턱이 낮아 해변 전체 어디서나 휠체어로 밤하늘을 볼 수 있습니다.',
    accessibilityEn: 'Gwangalli boardwalk is completely flat, offering zero-obstruction viewing of the sky. Nearby public facilities feature wheelchair accessible ramps.',
    descriptionKo: '매주 토요일 밤 해운대 대안 광안리 해변에서 500대 이상의 초정밀 멀티드론이 자아내는 빛의 예술을 해변가 평평한 자리에서 앉아 관람할 수 있습니다.',
    descriptionEn: 'Every Saturday evening, over 500 state-of-the-art drones fill the night sky above the ocean, easily viewed from step-free beach pavilions.',
    locationKo: '광안리 해수욕장 생활체육공원 앞',
    locationEn: 'Gwangalli Beachfront Esplanade',
    colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    dotClass: 'bg-emerald-500'
  },
  {
    id: 'sea-festival',
    titleKo: '부산 바다축제',
    titleEn: 'Busan Sea Festival',
    category: 'festival',
    categoryKo: '해변 축제',
    categoryEn: 'Beach Festival',
    startDate: '2026-07-31',
    endDate: '2026-08-04',
    stationKo: '해운대역 / 광안역 (2호선)',
    stationEn: 'Haeundae / Gwangan Station',
    metroLine: 'Line 2',
    accessibilityKo: '해운대를 비롯한 주요 행사장 평탄 구역에 시각 가이드 및 무장벽 부스가 배치됩니다. 바닷가 임시 매트 통로 구축으로 수변 무장벽 보행을 돕습니다.',
    accessibilityEn: 'Special flat synthetic pathways and temporary plastic beach mats are laid out toward the water to provide sturdy support for wheels.',
    descriptionKo: '뜨거운 한여름 밤 부산의 7대 해수욕장 전체에서 동시다발식으로 열리는 거대한 댄스카니발, 대규모 버스킹 축제, 워터파티가 시원하게 열립니다.',
    descriptionEn: 'An epic mid-summer celebration spanning Busan\'s beaches, featuring live bands, street food stalls, and ocean parties engineered for universal entry.',
    locationKo: '해운대 백사장, 다대포 수변공원',
    locationEn: 'Haeundae & Dadaepo Coastal Parks',
    colorClass: 'bg-sky-50 text-sky-850 border-sky-100',
    dotClass: 'bg-sky-500'
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
    accessibilityKo: '세계적으로 인증받은 "영화의전당"은 완벽한 무장벽 공간입니다. 전체 상영 전당에 점자 안내판, 단차 없는 엘리베이터, 자동문 및 휠체어 단독 상영 좌석이 내재되어 수준 높습니다.',
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
    accessibilityKo: '매우 붐비기 때문에 교통 정리가 이루어집니다. 휠체어 탑승자와 무장벽 대상자를 위한 배려 지정석 구역 및 특수 통행 게이트가 별도로 지정 통제 운영되므로 안심하십시오.',
    accessibilityEn: 'Due to large crowds, specialized barrier-free outdoor viewing zones with dynamic ramp entrances are dedicated for senior and disabled visitors.',
    descriptionKo: '매년 가을 밤 광안대교를 배경으로 수만 발의 화려한 초대형 불꽃과 초대형 드론 군무, 감미로운 음악을 접목한 세계 최고 수준의 영상 불꽃 멀티미디어 쇼입니다.',
    descriptionEn: 'A breathtaking autumn night firework performance framed by Gwangandaegyo Bridge, using multi-dimensional visual laser shows and symphonies.',
    locationKo: '광안리 해수욕장 백사장 일대 및 수변공원',
    locationEn: 'Gwangalli Beach Front & Marine Park',
    colorClass: 'bg-fuchsia-50 text-fuchsia-850 border-fuchsia-100',
    dotClass: 'bg-fuchsia-500'
  },
  {
    id: 'drone-show-gwangbok',
    titleKo: '광안리 M 드론라이트쇼 (광복80주년)',
    titleEn: 'Gwangalli M Drone Light Show (80th Liberation)',
    category: 'drone',
    categoryKo: '드론 연출',
    categoryEn: 'Drone Exhibition',
    startDate: '2025-08-09',
    endDate: '2025-08-09',
    stationKo: '광안역 (2호선)',
    stationEn: 'Gwangan Station',
    metroLine: 'Line 2',
    accessibilityKo: '광안리 해수욕장 전 구역 경사로 완비 및 완만한 유모차/휠체어 전용 보도가 갖추어져 관람이 용이합니다.',
    accessibilityEn: 'Wheelchair paths with low boundaries run throughout the beach esplanade, making the drone view very comfortable.',
    descriptionKo: '광복 80주년을 기념하여 역대 최대 규모인 1,500대 드론이 화려하게 야간 밤하늘을 수놓으며 2회 공연으로 펼쳐집니다.',
    descriptionEn: 'To commemorate the 80th anniversary of National Liberation, 1,500 drones perform spectacular night shows with two flight sequences.',
    locationKo: '광안리 해수욕장 생활체육공원 앞',
    locationEn: 'Gwangalli Beachfront Esplanade',
    colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    dotClass: 'bg-emerald-500'
  },
  {
    id: 'drone-show-volleyball',
    titleKo: '광안리 M 드론라이트쇼 (국제여자 비치발리볼)',
    titleEn: "Gwangalli M Drone Light Show (Women's Beach Volleyball)",
    category: 'drone',
    categoryKo: '드론 연출',
    categoryEn: 'Drone Exhibition',
    startDate: '2025-08-16',
    endDate: '2025-08-16',
    stationKo: '광안역 (2호선)',
    stationEn: 'Gwangan Station',
    metroLine: 'Line 2',
    accessibilityKo: '해변 산책길 전체가 무장벽 단차가 없으며, 비치발리볼 경기장 주변 장애인 화장실 및 접근성이 양호합니다.',
    accessibilityEn: 'Easy boardwalk paths connect Gwangan subway station exits safely to the beach with solid, non-slip flat pavement.',
    descriptionKo: '2025 부산 광안리 국제여자 비치발리볼 대회를 기념하여, 바닷가에서 시원하게 펼쳐지는 여름 스포츠의 역동성을 1,000대의 드론으로 표현합니다.',
    descriptionEn: "Commemorates the 2025 Gwangalli International Women's Beach Volleyball tournament with 1,000 precise drones in action.",
    locationKo: '광안리 해수욕장 생활체육공원 앞',
    locationEn: 'Gwangalli Beachfront Esplanade',
    colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    dotClass: 'bg-emerald-500'
  },
  {
    id: 'drone-show-cretaceous',
    titleKo: '광안리 M 드론라이트쇼 (백악기 시대)',
    titleEn: 'Gwangalli M Drone Light Show (Cretaceous Period)',
    category: 'drone',
    categoryKo: '드론 연출',
    categoryEn: 'Drone Exhibition',
    startDate: '2025-08-23',
    endDate: '2025-08-23',
    stationKo: '광안역 (2호선)',
    stationEn: 'Gwangan Station',
    metroLine: 'Line 2',
    accessibilityKo: '야외 공연 지구 진입로가 완전히 평탄화되어 있어 아동용 휠체어와 유모차가 충돌 없이 널찍하게 자리할 수 있습니다.',
    accessibilityEn: 'Flattest seaside pavement with designated disabled spaces ensures stroller and family companions have premium sightlines.',
    descriptionKo: '1,000대의 드론으로 거대하고 웅장한 공룡과 백악기 시대의 울창한 대자연 풍경들을 밤하늘의 조명 아트로 극대화해 나타냅니다.',
    descriptionEn: 'Depicts moving Cretaceous dinosaurs and lush nature through an incredibly expressive 1,000-drone visual narrative.',
    locationKo: '광안리 해수욕장 생활체육공원 앞',
    locationEn: 'Gwangalli Beachfront Esplanade',
    colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    dotClass: 'bg-emerald-500'
  },
  {
    id: 'drone-show-energy',
    titleKo: '광안리 M 드론라이트쇼 (Energy Super Week)',
    titleEn: 'Gwangalli M Drone Light Show (Energy Super Week)',
    category: 'drone',
    categoryKo: '드론 연출',
    categoryEn: 'Drone Exhibition',
    startDate: '2025-08-27',
    endDate: '2025-08-27',
    stationKo: '광안역 (2호선)',
    stationEn: 'Gwangan Station',
    metroLine: 'Line 2',
    accessibilityKo: '평일 저녁 시간대 대중교통 인근 보행로가 차 없는 거리처럼 넓고 평탄하여 무장벽 도보 통행이 가능합니다.',
    accessibilityEn: 'Highly accessible, broad ocean esplanade with flat wheelchair-adapted pedestrian walks to Gwangalli beach.',
    descriptionKo: 'Energy Super Week In Busan 개최를 축하하는 주중 특별 공연으로, 당일 21시에 단 1회 1,000대의 드론 무대로 열립니다.',
    descriptionEn: 'A special weekday presentation welcoming Energy Super Week In Busan, holding a single custom flight starting at 21:00.',
    locationKo: '광안리 해수욕장 생활체육공원 앞',
    locationEn: 'Gwangalli Beachfront Esplanade',
    colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    dotClass: 'bg-emerald-500'
  },
  {
    id: 'drone-show-canceled-nightrace',
    titleKo: '❌ 광안리 M 드론쇼 (미개최 - 나이트레이스)',
    titleEn: '❌ Gwangalli M Drone Show (Canceled - Night Race)',
    category: 'drone',
    categoryKo: '드론 연출',
    categoryEn: 'Drone Exhibition',
    startDate: '2025-08-02',
    endDate: '2025-08-02',
    stationKo: '광안역 (2호선)',
    stationEn: 'Gwangan Station',
    metroLine: 'Line 2',
    accessibilityKo: '당일 해변 마라톤 행사로 해수욕장 전 구역 차량 인도가 매우 붐비므로 일반 통행용 휠체어 진입 시 각별한 주의가 필요합니다.',
    accessibilityEn: 'Extremely dense marathon traffic makes general rollway coordination slow and challenging.',
    descriptionKo: '당일 광안리해변에서 개최되는 대규모 옥외 스포츠 행사인 「나이트레이스 인 부산」으로 인하여 안전사고 예방차 드론쇼가 개최되지 않습니다.',
    descriptionEn: 'No drone show is scheduled due to safety clearance regulations during the massive "Night Race in Busan" marathon festival holding the shore.',
    locationKo: '광안리 해수욕장 해변 전역',
    locationEn: 'Gwangalli Beach Shoreline',
    colorClass: 'bg-slate-100 text-slate-500 border-slate-200/80 line-through',
    dotClass: 'bg-slate-400'
  },
  {
    id: 'drone-show-canceled-infinity',
    titleKo: '❌ 광안리 M 드론쇼 (미개최 - 무한도전 런)',
    titleEn: '❌ Gwangalli M Drone Show (Canceled - Infinite Run)',
    category: 'drone',
    categoryKo: '드론 연출',
    categoryEn: 'Drone Exhibition',
    startDate: '2025-08-30',
    endDate: '2025-08-30',
    stationKo: '광안역 (2호선)',
    stationEn: 'Gwangan Station',
    metroLine: 'Line 2',
    accessibilityKo: '당일 러닝 축제로 대인파 혼잡 구역이 형성되거나 임시 부스가 설치되어 휠체어가 선회하기 어렵습니다.',
    accessibilityEn: 'Large run event structures are deployed on the sand and pavement, creating roll roadblocks for wheelchairs.',
    descriptionKo: '당일 광안리해변에서 진행되는 해변 달리기 축제인 「무한도전 런」 행사로 인하여 야간 안전 제어를 위해 드론쇼가 미개최됩니다.',
    descriptionEn: 'No drone exhibition tonight because the "Infinite Challenge Run" beach race restricts the launchpad security protocols.',
    locationKo: '광안리 해수욕장 해변 전역',
    locationEn: 'Gwangalli Beach Shoreline',
    colorClass: 'bg-slate-100 text-slate-400 border-slate-200/80 line-through',
    dotClass: 'bg-slate-450'
  }
];

export default function BusanEventsCalendarView({ language }: BusanEventsCalendarViewProps) {
  // Present Year and Month (initialize to June 2026 as current context is June 2026)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(6); // June
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  
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

  // Filter events based on currently selected category filter
  const filteredEvents = useMemo(() => {
    return BUSAN_EVENTS_DATA;
  }, []);

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
                  setCurrentYear(2026);
                  setCurrentMonth(6);
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
              
              // Determine if the day is "today" (June 22, 2026 based on mock context)
              const isToday = cell.dateString === '2026-06-22';

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (dayEvents.length > 0) {
                      handleSelectEvent(dayEvents[0].id);
                    }
                  }}
                  className={`min-h-[50px] sm:min-h-[72px] p-1 border rounded-xl sm:rounded-2xl flex flex-col justify-between transition-all text-left relative ${
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
                          e.stopPropagation(); // Avoid triggering parent cell
                          handleSelectEvent(evt.id);
                        }}
                        className={`text-[9.5px] truncate px-1.5 py-0.5 rounded-lg font-black tracking-tight leading-tight transition-transform hover:scale-103 ${evt.colorClass} border`}
                        title={language === 'KR' ? evt.titleKo : evt.titleEn}
                      >
                        <span className="mr-0.5 select-none text-[9px]">📍</span>
                        {language === 'KR' ? evt.titleKo.replace(/삼광사|모래|포트|어스|M|바다|록/g, '').substring(0, 6) : evt.titleEn.substring(0, 6)}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[7.5px] font-black text-slate-450 pl-1">
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
                      <span>{language === 'KR' ? '가장 인접한 무장벽 지하철역' : 'Nearest Accessible Transit Station'}</span>
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

    </div>
  );
}
