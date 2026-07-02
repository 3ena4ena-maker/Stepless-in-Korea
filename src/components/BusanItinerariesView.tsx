/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  Info, 
  HelpCircle, 
  Compass, 
  ExternalLink,
  MapPin,
  Map,
  Train,
  Sunset,
  Coffee,
  ArrowLeft,
  Sparkles,
  Sun,
  Moon,
  Home,
  Utensils,
  BookOpen,
  MessageSquare,
  Music,
  Theater,
  Copy,
  Check,
  Users,
  Footprints,
  Building2,
  X
} from 'lucide-react';
import ElegantIllustration from './ElegantIllustration';
import { BUSAN_ITINERARIES, ItineraryCourse, ItineraryStep } from '../data/itineraries';
import { CHILD_TRANSPORT_INFOGRAPHIC_BASE64 } from '../childtransport_base64';




type CategoryType = 'DAY' | '1NIGHT' | '2NIGHTS' | '3NIGHTS' | '4NIGHTS' | 'GOURMET' | 'HISTORY';

interface BusanItinerariesViewProps {
  language: 'KR' | 'EN';
  initialCategory?: CategoryType | null;
  onBack?: () => void;
  onSelectCategory?: (category: CategoryType) => void;
  tipsSubPage?: 'index' | 'courses' | 'transit' | 'child-free' | 'transfer';
  setTipsSubPage?: (page: 'index' | 'courses' | 'transit' | 'child-free' | 'transfer') => void;
  activeRegionPage?: 'EAST' | 'WEST' | 'SOUTH' | 'NORTH' | null;
  setActiveRegionPage?: (region: 'EAST' | 'WEST' | 'SOUTH' | 'NORTH' | null) => void;
}

interface CategoryConfig {
  id: CategoryType;
  icon: string;
  tagKo: string;
  tagEn: string;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

interface QuizQuestion {
  questionKo: string;
  questionEn: string;
  options: {
    type: 'A' | 'B';
    textKo: string;
    textEn: string;
    icon: string;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    questionKo: "Q1. 부산에 도착하자마자 가장 먼저 보고 싶은 풍경은? 🌊",
    questionEn: "Q1. What is the first scenery you want to see when you arrive in Busan? 🌊",
    options: [
      {
        type: 'A',
        textKo: "탁 트인 끝없는 바다와 세련된 해안선, 모래사장",
        textEn: "Vast, endless blue sea, sophisticated coastlines, and sandy beaches",
        icon: "🌊"
      },
      {
        type: 'B',
        textKo: "아기자기하고 알록달록한 골목길이나 활기 넘치는 전통시장",
        textEn: "Charming, colorful alleys or lively traditional markets",
        icon: "🏡"
      }
    ]
  },
  {
    questionKo: "Q2. 여행 중 '음식'을 선택할 때 나의 기준은? 🍲",
    questionEn: "Q2. What is your standard for choosing food during the trip? 🍲",
    options: [
      {
        type: 'A',
        textKo: "멋진 바다 뷰가 펼쳐지는 통창 레스토랑이나 인스타 감성 브런치 카페",
        textEn: "Open ocean view glass restaurants or Instagram-worthy brunch cafes",
        icon: "🍽️"
      },
      {
        type: 'B',
        textKo: "줄을 서서 기다리더라도 현지인들이 적극 추천하는 노포나 시장 맛집",
        textEn: "Traditional local diners or busy street market eateries even with short wait times",
        icon: "🍲"
      }
    ]
  },
  {
    questionKo: "Q3. 내가 선호하는 여행의 '속도'는? ☕",
    questionEn: "Q3. What is your preferred speed of travel? ☕",
    options: [
      {
        type: 'A',
        textKo: "오션뷰 카페에 오래 앉아 바다를 멍하니 바라보거나 해변을 거니는 여유로운 휴식",
        textEn: "Relaxing in an ocean-view cafe staring blankly at waves or leisurely strolling the sands",
        icon: "☕"
      },
      {
        type: 'B',
        textKo: "“여기까지 왔는데 다 가봐야지!” 유명 명소들을 알차게 도는 부지런한 관광",
        textEn: "Active sightseeing packing all popular hotspots since we are already here!",
        icon: "🏃"
      }
    ]
  },
  {
    questionKo: "Q4. 하루를 마무리할 숙소를 정한다면 어디가 좋을까? 🏨",
    questionEn: "Q4. Where is your perfect lodging to wrap up the day? 🏨",
    options: [
      {
        type: 'A',
        textKo: "화려한 도시 야경과 세련된 스파 시설을 갖춘 고층 호텔/레지던스",
        textEn: "A high-rise luxury hotel or residence with stellar city night views and fancy spa facilities",
        icon: "🏨"
      },
      {
        type: 'B',
        textKo: "부산 특유의 감성이 묻어나는 아기자기한 골목이나 바다 바로 앞 에어비앤비",
        textEn: "A cozy Airbnb in traditional alleys or right in front of the local sea reflecting Busan vibes",
        icon: "🏠"
      }
    ]
  },
  {
    questionKo: "Q5. 이번 여행에서 꼭 남기고 싶은 '인생샷'의 느낌은? 📸",
    questionEn: "Q5. What vibe do you want for your best photo memories? 📸",
    options: [
      {
        type: 'A',
        textKo: "세련된 마천루를 배경으로 한 도회적이고 고급스러운 분위기",
        textEn: "A sophisticated, high-class urban look backed by dazzling high-rise skyscrapers",
        icon: "✨"
      },
      {
        type: 'B',
        textKo: "부산만의 따뜻한 아날로그 감성과 자연스러움이 가득한 정겨운 분위기",
        textEn: "A warm, heartwarming retro look filled with Busan's unique analog feelings",
        icon: "📷"
      }
    ]
  },
  {
    questionKo: "Q6. 여행지에서 가장 선호하는 이동 수단은? 🚗",
    questionEn: "Q6. What is your preferred method of transportation? 🚗",
    options: [
      {
        type: 'A',
        textKo: "무더위나 피로 없이 시원하고 편리하게 이동할 수 있는 택시나 렌터카",
        textEn: "A comfortable taxi or rental car to move around easily without heat or leg fatigue",
        icon: "🚗"
      },
      {
        type: 'B',
        textKo: "버스나 지하철을 타고 현지 분위기를 느끼며 걷는 도보 여행",
        textEn: "A walking tour utilizing local buses and subways to immerse in local atmosphere",
        icon: "👟"
      }
    ]
  },
  {
    questionKo: "Q7. 부산에서 꼭 해보고 싶은 대표 체험은? ⛵",
    questionEn: "Q7. What signature experience is a must-do in Busan? ⛵",
    options: [
      {
        type: 'A',
        textKo: "화려한 요트 투어나 백화점 쇼핑, 프라이빗 스파/호캉스",
        textEn: "Glamorous sunset yacht cruises, department store shopping, or a private hotel staycation",
        icon: "⛵"
      },
      {
        type: 'B',
        textKo: "해변 열차(캡슐 열차) 탑승, 가파른 해안 산책로 트레킹, 야시장 투어",
        textEn: "Riding coastal beach trains/capsules, coast trail walks, or traditional night market foodie tours",
        icon: "🚂"
      }
    ]
  }
];

interface RegionDetail {
  id: 'EAST' | 'WEST' | 'SOUTH' | 'NORTH';
  nameKo: string;
  nameEn: string;
  color: string;
  badgeColor: string;
  descKo: string;
  descEn: string;
  landmarks: {
    nameKo: string;
    nameEn: string;
    descKo: string;
    descEn: string;
    category: 'LANDMARK' | 'FOOD' | 'CAFE' | 'CULTURE';
    tagKo: string;
    tagEn: string;
    addressKo?: string;
    addressEn?: string;
    tipKo?: string;
    tipEn?: string;
  }[];
}

const REGION_RECOMMENDATIONS: RegionDetail[] = [
  {
    id: 'EAST',
    nameKo: '동부 부산 (해운대·기장·광안리)',
    nameEn: 'East Busan (Haeundae / Gijang / Gwangalli)',
    color: 'bg-blue-600',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    descKo: '화려한 마천루, 광안대교 오션뷰, 그리고 트렌디한 문화가 어우러진 부산의 핵심 힐링 구역입니다.',
    descEn: 'A major healing zone of Busan where modern skyscrapers, scenic beaches, and trendy culture blend seamlessly.',
    landmarks: [
      {
        nameKo: '해운대 블루라인파크 & 그린레일웨이',
        nameEn: 'Haeundae Blue Line Park & Green Railway',
        descKo: '폐선된 동해남부선 철로를 리모델링하여 해안 절경을 감상하며 걷거나 열차를 탈 수 있는 바다 도보길입니다.',
        descEn: 'A scenic coastline walk and sightseeing train utilizing the recycled historic seaside railway.',
        category: 'LANDMARK',
        tagKo: '바다 도보·기차',
        tagEn: 'Ocean Railway',
        addressKo: '부산 해운대구 청사포로 116',
        addressEn: '116, Cheongsapo-ro, Haeundae-gu, Busan',
        tipKo: '휠체어/유모차 전 구간 진입 가능한 나무 데크 산책로가 조성되어 있습니다.',
        tipEn: 'All sections are equipped with barrier-free flat boardwalks.'
      },
      {
        nameKo: '해동용궁사',
        nameEn: 'Haedong Yonggungsa Temple',
        descKo: '바다 절벽 바로 위에 세워진 사찰로, 파도가 불상 발밑에 부서지는 이색적이고 웅장한 사찰입니다.',
        descEn: 'A beautiful temple built right on the coastal cliffs, offering serene ocean waves crashing under your feet.',
        category: 'LANDMARK',
        tagKo: '해안 사찰',
        tagEn: 'Cliffside Temple',
        addressKo: '부산 기장군 기장읍 용궁사로 86',
        addressEn: '86, Yonggungsa-ro, Gijang-eup, Gijang-gun, Busan',
        tipKo: '메인 계단 대신 완만 우회로(교통약자 진입로)를 이용하시면 편하게 참배할 수 있습니다.',
        tipEn: 'Use the gentle bypass ramp to access the temple grounds easily.'
      },
      {
        nameKo: '수변최고돼지국밥 민락본점',
        nameEn: 'Subyeon Choego Pork Soup (Millak)',
        descKo: '현지인들이 늘 줄을 서는 대표 국밥집으로 부드럽고 가득 찬 고기와 잡내 없이 진한 국물이 특징입니다.',
        descEn: 'Local-favorite pork soup restaurant offering rich savory broth with tender pork.',
        category: 'FOOD',
        tagKo: '인생 국밥',
        tagEn: 'Pork Soup',
        addressKo: '부산 수영구 광안해변로370번길 9-32',
        addressEn: '9-32, Gwanganhaebyeon-ro 370beon-gil, Suyeong-gu, Busan',
        tipKo: '테이블링 앱으로 출발 전 온라인 대기 신청을 미리 해두시는 것을 추천합니다.',
        tipEn: 'Highly recommend checking queue status and booking online in advance via Tabling app.'
      },
      {
        nameKo: '해운대 소문난 암소갈비집',
        nameEn: 'Haeundae Famous Beef Ribs',
        descKo: '전통 있는 소갈비 명소로, 구수한 한우 고기와 갈비 양념 베이스에 끓여 먹는 쫄깃한 감자사리가 예술입니다.',
        descEn: 'A highly historic beef ribs restaurant, legendary for its unique tender cut and sweet potato starch noodles.',
        category: 'FOOD',
        tagKo: '한우 양념갈비',
        tagEn: 'K-BBQ Ribs',
        addressKo: '부산 해운대구 중동2로10번길 32-10',
        addressEn: '32-10, Jungdong 2-ro 10beon-gil, Haeundae-gu, Busan',
        tipKo: '감자사리는 고기를 구운 불판 가장자리에 꼭 추가해서 함께 끓여 드세요!',
        tipEn: 'Must order the potato noodles to simmer in the beef glaze along the grill edges!'
      },
      {
        nameKo: '웨이브온 커피',
        nameEn: 'Waveon Coffee',
        descKo: '세계적인 건축가가 설계한 기장의 오션뷰 초대형 카페로, 계단식 야외 빈백에 누워 기장 푸른 바다를 만끽할 수 있습니다.',
        descEn: 'World-renowned architecturally designed massive cafe in Gijang with beautiful terrace view beanbags.',
        category: 'CAFE',
        tagKo: '건축미·오션뷰',
        tagEn: 'Architectural Café',
        addressKo: '부산 기장군 장안읍 해맞이로 286',
        addressEn: '286, Haemaji-ro, Jangan-eup, Gijang-gun, Busan',
        tipKo: '야외 방갈로 스타일의 독채 별채 공간은 카운터에 요청하면 선착순 무료 이용 가능합니다.',
        tipEn: 'Ask the counter for a free private sea-shack pod (available on first-come-first-serve basis).'
      },
      {
        nameKo: '랑데자뷰 광안리점',
        nameEn: 'Rendezja-vous Gwangalli',
        descKo: '제주도 돌담 감성을 살린 세련된 내부 공간과 통유리창 너머로 광안리 백사장과 광안대교가 완벽한 비율로 담깁니다.',
        descEn: 'A Jeju-themed forest cafe featuring spectacular wide views of Gwangan Beach and Bridge.',
        category: 'CAFE',
        tagKo: '광안대교 뷰',
        tagEn: 'Gwangan Bridge View',
        addressKo: '부산 수영구 광안해변로 165 2층',
        addressEn: '2F, 165, Gwanganhaebyeon-ro, Suyeong-gu, Busan',
        tipKo: '포토존 거울 앞에서 사진을 찍으면 통유리로 광안대교가 등 뒤로 멋지게 연출됩니다.',
        tipEn: 'Stand at the mirror photo zone to capture yourself with the perfect bridge reflection.'
      },
      {
        nameKo: '밀락더마켓',
        nameEn: 'Millac the Market',
        descKo: '민락동에 세워진 거대한 복합문화공간으로, 중앙 계단 광장에서 버스킹 공연과 푸드홀을 동시에 즐길 수 있습니다.',
        descEn: 'An incredibly popular cultural complex in Millak-dong, hosting trendy pop-ups and live busking.',
        category: 'CULTURE',
        tagKo: '문화 복합공간',
        tagEn: 'Art Complex',
        addressKo: '부산 수영구 민락수변로 17번길 56',
        addressEn: '56, Millaksubyeon-ro 17beon-gil, Suyeong-gu, Busan',
        tipKo: '주말 저녁에는 바다 전망 계단 광장에서 로컬 뮤지션들의 생생한 인디 밴드 공연이 자주 열립니다.',
        tipEn: 'Catch weekend evening live acoustic bands sitting on the grand sea-view stairs.'
      },
      {
        nameKo: '뮤지엄 원',
        nameEn: 'Museum 1',
        descKo: '해운대 센텀시티에 펼쳐진 초대형 LED 미디어 아트 현대미술관으로 바닥과 벽면 전체가 살아 움직이는 빛의 세계입니다.',
        descEn: 'A vast immersive LED media art playground in Haeundae Centum City where floor and wall panels shift dynamically.',
        category: 'CULTURE',
        tagKo: '미디어 아트',
        tagEn: 'Media Art',
        addressKo: '부산 해운대구 센텀서로 20',
        addressEn: '20, Centumseo-ro, Haeundae-gu, Busan',
        tipKo: '내부가 평탄하여 유모차나 휠체어도 수월하게 관람 가능합니다. 편안하게 앉아 빛의 흐름을 즐기세요.',
        tipEn: 'The entire layout is flat and barrier-free, allowing comfortable strollers or wheelchair visits.'
      }
    ]
  },
  {
    id: 'WEST',
    nameKo: '서부 부산 (사상·강서·다대포)',
    nameEn: 'West Busan (Sasang / Gangseo / Dadaepo)',
    color: 'bg-emerald-500',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    descKo: '광활하게 펼쳐진 낙동강 하구의 생태경관과 아름다운 석양 노을을 만끽하는 자연 치유 구역입니다.',
    descEn: 'An eco-tourism haven filled with golden sunset viewpoints and the majestic Nakdong River estuary.',
    landmarks: [
      {
        nameKo: '다대포 해수욕장 & 고우니 생태길',
        nameEn: 'Dadaepo Beach & Gouny Eco Trail',
        descKo: '끝없는 모래사장과 완벽한 평지 데크 보도가 어우러진 해질녘 최고의 노을 명소입니다.',
        descEn: 'One of Koreas absolute best sunset spots featuring barrier-free wooden wetland boardwalks.',
        category: 'LANDMARK',
        tagKo: '일몰·낙조',
        tagEn: 'Sunset',
        addressKo: '부산 사하구 다대동',
        addressEn: 'Dadae-dong, Saha-gu, Busan',
        tipKo: '해 질 무렵 생태길 중간 전망대에 서면 바다와 억새가 노을에 붉게 물드는 장관을 찍을 수 있습니다.',
        tipEn: 'Arrive 30 minutes before sunset to capture the reeds turning crimson red.'
      },
      {
        nameKo: '감천문화마을',
        nameEn: 'Gamcheon Culture Village',
        descKo: '부산의 산토리니로 불리는 알록달록한 계단식 마을로, 입구 전망대 평지 구역에서 경관을 한눈에 담을 수 있습니다.',
        descEn: 'The Santorini of Busan, showcasing whimsical pastel-colored houses with magnificent viewpoint terraces.',
        category: 'LANDMARK',
        tagKo: '예술 마을',
        tagEn: 'Art Village',
        addressKo: '부산 사하구 감내2로 203',
        addressEn: '203, Gamnae 2-ro, Saha-gu, Busan',
        tipKo: '마을 안쪽은 가파른 경사가 많으므로, 입구 안내소 부근 평지 전망대에서 경관을 즐기는 편이 좋습니다.',
        tipEn: 'The village core has steep hills; enjoy the sweeping views from the flat entrance observatory.'
      },
      {
        nameKo: '합천일류돼지국밥',
        nameEn: 'Hapcheon Pork Soup (Sasang)',
        descKo: '알싸한 마늘 다대기가 아낌없이 들어가 감칠맛이 폭발하는 사상구 최고의 로컬 대기 맛집입니다.',
        descEn: 'Local favorite pork soup characterized by a generous spoonful of rich garlic paste and robust broth.',
        category: 'FOOD',
        tagKo: '돼지국밥 맛집',
        tagEn: 'Garlic Pork Soup',
        addressKo: '부산 사상구 광장로 97',
        addressEn: '97, Gwangjang-ro, Sasang-gu, Busan',
        tipKo: '국밥 안에 밥이 토렴되어 나오며, 셀프 코너에서 무한으로 신선한 부추와 밥을 덜어갈 수 있습니다.',
        tipEn: 'Rice is served pre-soaked in the hot broth; fresh chives and extra rice are free at the self-bar.'
      },
      {
        nameKo: '명지 갈삼구이',
        nameEn: 'Myeongji Galsamgui',
        descKo: '낙동강 하구 특산물 갈미조개와 삼겹살을 불판에 구워 쌈 무에 싸 먹는 서부산 독점 별미입니다.',
        descEn: 'A unique local specialty pairing sweet river clams with savory thin pork belly on a hot grill.',
        category: 'FOOD',
        tagKo: '갈미조개 별미',
        tagEn: 'Clam & Pork',
        addressKo: '부산 강서구 명지오션시티1로 173',
        addressEn: '173, Myeongjiocean city 1-ro, Gangseo-gu, Busan',
        tipKo: '김 한 장 위에 쌈무, 삼겹살, 갈미조개와 구운 콩나물을 올려서 한입에 싸 드시면 최고의 풍미를 느낍니다.',
        tipEn: 'Wrap a slice of pork belly, clam, and grilled bean sprouts in dry seaweed and pickled radish.'
      },
      {
        nameKo: 'VSANT 비상',
        nameEn: 'Vsant Coffee',
        descKo: '엄궁동 낙동강변에 위치한 대형 빈티지 공장형 카페로, 앤틱카 전시와 낙동강 노을 뷰 테라스가 완비되어 있습니다.',
        descEn: 'Industrial chic riverside cafe in Saha-gu, showcasing classic cars and stunning sunset viewpoints.',
        category: 'CAFE',
        tagKo: '낙동강 노을 뷰',
        tagEn: 'Riverside View',
        addressKo: '부산 사하구 강변대로 420',
        addressEn: '420, Gangbyun-daero, Saha-gu, Busan',
        tipKo: '1층에는 클래식 올드카와 멋진 가구들이 전시되어 있으며, 엘리베이터를 통해 편하게 층간 이동이 가능합니다.',
        tipEn: 'Classic vintage cars are displayed on the 1st floor; an elevator serves all floors.'
      },
      {
        nameKo: '숲속의 요정',
        nameEn: 'Fairy in the Forest',
        descKo: '사상구 숲속 골짜기에 한적하게 자리한 가든 카페로, 피톤치드 가득한 야외 정원과 나무 그늘 아래서 휴식을 취합니다.',
        descEn: 'A cozy forest garden cafe in Sasang, offering healing pine-wood breezes and shady outdoor decks.',
        category: 'CAFE',
        tagKo: '숲 속 힐링 정원',
        tagEn: 'Forest Garden',
        addressKo: '부산 사상구 백양대로 320-10',
        addressEn: '320-10, Baegyang-daero, Sasang-gu, Busan',
        tipKo: '반려동물 동반이 가능한 야외 넓은 데크 테라스가 잘 되어 있어 강아지와 산책 겸 머무르기 완벽합니다.',
        tipEn: 'Pet-friendly outdoor decks make it ideal for relaxing with your dogs.'
      },
      {
        nameKo: '부산현대미술관',
        nameEn: 'Museum of Contemporary Art Busan',
        descKo: '을숙도 철새 도래지 한가운데 세워진 공공 미술관으로 외벽이 온통 초록 식물로 뒤덮인 아름다운 에코 미술관입니다.',
        descEn: 'A state-of-the-art public museum on Eulsukdo Island featuring an eye-catching living plant facade.',
        category: 'CULTURE',
        tagKo: '에코 미디어 아트',
        tagEn: 'Contemporary Art',
        addressKo: '부산 강서구 낙동남로 1191',
        addressEn: '1191, Nakdongnam-ro, Gangseo-gu, Busan',
        tipKo: '장애인 및 노약자를 위해 입구와 전시실 전체에 계단 없는 이동용 슬로프와 휠체어 대여가 완비되어 있습니다.',
        tipEn: 'Equipped with barrier-free slopes, automatic doors, and free wheelchair rentals.'
      },
      {
        nameKo: '다대포 꿈의 낙조분수',
        nameEn: 'Dadaepo Sunset Fountain of Dreams',
        descKo: '지름 60m에 달하는 초대형 원형 바닥 음악 분수로, 밤마다 화려한 레이저 조명과 고압 물줄기가 음악에 맞춰 춤을 춥니다.',
        descEn: 'The world-famous massive musical fountain dancing to dynamic lasers and water pressure under night skies.',
        category: 'CULTURE',
        tagKo: '화려한 분수 쇼',
        tagEn: 'Music Fountain',
        addressKo: '부산 사하구 다대강변대로 14',
        addressEn: '14, Dadaegangbyun-daero, Saha-gu, Busan',
        tipKo: '봄부터 가을까지 매일 저녁 상설 무료 분수 공연이 펼쳐지니 홈페이지에서 정확한 회차 시간을 확인하세요.',
        tipEn: 'Shows run nightly from spring to autumn for free. Check weekly show schedules online.'
      }
    ]
  },
  {
    id: 'SOUTH',
    nameKo: '남부 (영도·남포·부산역·서면·전포)',
    nameEn: 'South (Yeongdo / Nampo / Busan Station / Seomyeon / Jeonpo)',
    color: 'bg-amber-500',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    descKo: '자갈치시장, 태종대 등 옛 부산의 깊은 바다 향취와 부산의 중심인 서면이 있는 구역입니다.',
    descEn: 'A central and historical district containing traditional seaside markets, Yeongdo cliffs, and Seomyeon, the bustling downtown heart of Busan.',
    landmarks: [
      {
        nameKo: '흰여울문화마을',
        nameEn: 'Huinnyeoul Culture Village (Yeongdo)',
        descKo: '영도 해안 절벽을 마주한 파스텔톤 가옥과 예쁜 카페들이 늘어서 산책하며 푸른 바다를 내려다볼 수 있습니다.',
        descEn: 'A gorgeous cliffside alleyway on Yeongdo Island overlooking beautiful blue oceanic channels.',
        category: 'LANDMARK',
        tagKo: '해안 절벽 골목',
        tagEn: 'Cliff Alleyway',
        addressKo: '부산 영도구 영선동4가',
        addressEn: 'Yeongseon-dong 4-ga, Yeongdo-gu, Busan',
        tipKo: '휠체어/유모차는 위쪽 큰 도로변 흰여울전망대 데크 산책로를 걸으면 계단 없이 훌륭한 해안 뷰를 즐길 수 있습니다.',
        tipEn: 'Stick to the top-level road and observatory boardwalk to avoid steep coastal stone steps.'
      },
      {
        nameKo: '자갈치시장',
        nameEn: 'Jagalchi Traditional Market',
        descKo: '대한민국 최대 규모의 수산시장으로 활기찬 부산 어민들의 삶과 갓 잡은 싱싱한 수산물을 만날 수 있는 곳입니다.',
        descEn: 'Korea’s largest seafood market, showcasing bustling traditional stalls and delicious fresh fish.',
        category: 'LANDMARK',
        tagKo: '수산물 전통시장',
        tagEn: 'Fish Market',
        addressKo: '부산 중구 자갈치해안로 52',
        addressEn: '52, Jagalchihaean-ro, Jung-gu, Busan',
        tipKo: '현대식 본관 7층 테라스에 올라가면 남항대교와 영도 대교 일대를 무료로 시원하게 한눈에 담을 수 있습니다.',
        tipEn: 'Take the main building elevator to the 7F observatory deck for free scenic harbor views.'
      },
      {
        nameKo: '이재모피자 남포본점',
        nameEn: 'Lee Jae-mo Pizza (Nampo)',
        descKo: '부산 여행 필수 코스로 고소하고 부드러운 순수 임실 치즈를 크러스트와 토핑에 폭탄처럼 가득 얹어 굽는 명품 피자입니다.',
        descEn: 'The undisputed pizza capital of Busan, heavily stacked with premium domestic elastic cheese.',
        category: 'FOOD',
        tagKo: '임실치즈 폭탄',
        tagEn: 'Iconic Pizza',
        addressKo: '부산 중구 광복중앙로 31',
        addressEn: '31, Gwangbokjungang-ro, Jung-gu, Busan',
        tipKo: '매장 내 키오스크와 서빙 로봇 시스템이 잘 갖춰져 있으며 통로가 넓어 편리하게 식사할 수 있습니다.',
        tipEn: 'Equipped with spacious paths, smart kiosk ordering, and helpful robotic food runners.'
      },
      {
        nameKo: '백화양곱창',
        nameEn: 'Baekhwa Tripe Center',
        descKo: '자갈치시장 뒤편에 위치한 노포 연탄구이 곱창 성지로, 뿌연 연기 속에서 숙련된 마스터들이 직접 양념 구이를 구워냅니다.',
        descEn: 'An ultra-authentic, nostalgic warehouse filled with legendary coal-grilled tripe counters.',
        category: 'FOOD',
        tagKo: '자갈치 노포 구이',
        tagEn: 'Coal Grilled Tripe',
        addressKo: '부산 중구 자갈치로23번길 6',
        addressEn: '6, Jagalchi-ro 23beon-gil, Jung-gu, Busan',
        tipKo: '양곱창을 거의 다 구워 먹은 뒤 철판 볶음밥과 바삭한 구운 김을 추가해 함께 싸 드시는 것은 국룰입니다.',
        tipEn: 'Save room for the iron-plate fried rice wrapped in freshly toasted seaweed sheets.'
      },
      {
        nameKo: '신기산업',
        nameEn: 'Singi Industry',
        descKo: '영도 산복도로 높은 곳에 위치한 카페로, 통창 너머로 부산항대교의 일곱빛깔 무지개 조명 야경을 완벽히 감상합니다.',
        descEn: 'A high-perched scenic cafe on Yeongdo hills with a brilliant panoramic view of Busan Port Bridge.',
        category: 'CAFE',
        tagKo: '부산항대교 야경',
        tagEn: 'Port Bridge View',
        addressKo: '부산 영도구 와치로 51',
        addressEn: '51, Wachi-ro, Yeongdo-gu, Busan',
        tipKo: '오르막 경사가 심해 대중교통 이용 시 부산역이나 남포역에서 영도 영선동 방향 9번 버스를 타시면 바로 정류장 앞 하차합니다.',
        tipEn: 'The hill is steep; take local bus #9 from Busan Station to drop off directly outside the entrance.'
      },
      {
        nameKo: '젬스톤 영도점',
        nameEn: 'Gemstone Yeongdo',
        descKo: '수십 년 동안 방치되었던 대형 수영장을 감각적인 이색 온수 카페 구조로 개조하여 넓은 휴식과 톡톡 튀는 인테리어를 선사합니다.',
        descEn: 'An incredibly unique and spacious cafe converted from an old large indoor swimming pool.',
        category: 'CAFE',
        tagKo: '이색 수영장 카페',
        tagEn: 'Converted Pool Cafe',
        addressKo: '부산 영도구 대교로6번길 33',
        addressEn: '33, Daegyo-ro 6beon-gil, Yeongdo-gu, Busan',
        tipKo: '실제 수영장 바닥 구역에 다채로운 쇼파와 베드가 마련되어 있어 이색적이고 편안하게 음료를 즐길 수 있습니다.',
        tipEn: 'Grab cozy sofa seats directly inside the deep-end dry pool floor.'
      },
      {
        nameKo: '국립해양박물관',
        nameEn: 'National Maritime Museum',
        descKo: '영도 해안가에 세워진 거대한 물방울 모양의 국립 박물관으로, 해양 역사 전시와 원통형 대형 아쿠아리움을 무료 관람합니다.',
        descEn: 'A free-entry iconic maritime museum shaped like a water droplet, complete with a beautiful cylindrical fish tank.',
        category: 'CULTURE',
        tagKo: '해양 박물관',
        tagEn: 'Ocean Museum',
        addressKo: '부산 영도구 해양로301번길 45',
        addressEn: '45, Haeyang-ro 301beon-gil, Yeongdo-gu, Busan',
        tipKo: '휠체어 리프트와 무장애 경사로가 완벽히 설계되어 있으며, 매주 월요일은 정기 휴관일입니다.',
        tipEn: 'Offers perfect wheelchair access and flat design. Closed on Mondays.'
      },
      {
        nameKo: '영도 피아크 P.ARK',
        nameEn: 'Piark Cultural Complex',
        descKo: '부산 최대 규모의 크루즈선을 형상화한 초대형 문화복합공간으로 기획 현대미술전, 도서전, 디자인 마켓이 상시 개최됩니다.',
        descEn: 'A mega cultural complex designed like a cruise ship, hosting high-profile art and design pop-ups.',
        category: 'CULTURE',
        tagKo: '기획 아트 전시',
        tagEn: 'Creative Hub',
        addressKo: '부산 영도구 해양로195번길 180',
        addressEn: '180, Haeyang-ro 195beon-gil, Yeongdo-gu, Busan',
        tipKo: '넓은 야외 인조잔디 광장에서 바다를 드나드는 대형 화물선들을 구경하며 자유롭게 휴식을 취하기 좋습니다.',
        tipEn: 'Enjoy the ocean harbor breeze on the massive outdoor synthetic grass plaza.'
      }
    ]
  },
  {
    id: 'NORTH',
    nameKo: '북부 (금정·온천장·만덕·구포·화명)',
    nameEn: 'North (Geumjeong / Oncheonjang / Mandeok / Gupo / Hwamyung)',
    color: 'bg-purple-500',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    descKo: '웅장한 금정산과 유서 깊은 온천장, 유교 유적 등 전통시장과 산뜻한 휴식이 깃든 한적한 구역입니다. BTS 정국의 고향이기도 합니다.',
    descEn: 'A tranquil northern zone featuring warm hot springs, traditional markets, and scenic forest escapes. It is also the hometown of BTS Jungkook.',
    landmarks: [
      {
        nameKo: '금정산 범어사',
        nameEn: 'Beomeosa Temple',
        descKo: '금정산 자락 울창한 소나무 숲에 안긴 천년의 고찰로, 은은한 기와 처마 아래로 사시사철 맑은 기운이 흐릅니다.',
        descEn: 'A tranquil Buddhist sanctuary cradled in a dense pine forest on Geumjeong Mountain.',
        category: 'LANDMARK',
        tagKo: '천년 고찰',
        tagEn: 'Pine Forest Temple',
        addressKo: '부산 금정구 범어사로 250',
        addressEn: '250, Beomeosa-ro, Geumjeong-gu, Busan',
        tipKo: '등산로 대신 주차장 위 대웅전 방면 무장애 지상 진입 통로를 걸으면 계단 한 칸 없이 대웅전 앞마당에 다다릅니다.',
        tipEn: 'Skip the steep walking paths and follow the rear wheelchair-friendly temple approach road.'
      },
      {
        nameKo: '온천천 시민공원',
        nameEn: 'Oncheoncheon Stream Park',
        descKo: '도심 속을 길게 관통하는 온천천 변에 양옆으로 조성된 생태 산책로로, 하천과 아기자기한 동네 카페 거리가 이어집니다.',
        descEn: 'A beautiful riverside path winding through Dongnae, lined with charming local cafes and flowers.',
        category: 'LANDMARK',
        tagKo: '벚꽃 수변 산책',
        tagEn: 'River Park',
        addressKo: '부산 동래구 온천천로',
        addressEn: 'Oncheoncheon-ro, Dongnae-gu, Busan',
        tipKo: '봄철 벚꽃과 가을 억새 산책로는 완전 평지로 포장되어 노약자가 유모차나 휠체어로 산책하기에 최상의 환경입니다.',
        tipEn: 'The entire cherry-blossom paved boardwalk is flat and easily walkable for elderly.'
      },
      {
        nameKo: '동래할매파전',
        nameEn: 'Dongnae Halmae Pajeon',
        descKo: '조선시대 동래 부사령관이 왕에게 진상하던 파전법을 이어온 식당으로 부드러운 쪽파와 조개, 신선한 굴이 듬뿍 얹어져 나옵니다.',
        descEn: 'A historic royal delicacy. Incredibly soft green onion savory pancake with clams and fresh oysters.',
        category: 'FOOD',
        tagKo: '조선 진상품 파전',
        tagEn: 'Dongnae Pajeon',
        addressKo: '부산 동래구 명륜로94번길 43-10',
        addressEn: '43-10, Myeongnyun-ro 94beon-gil, Dongnae-gu, Busan',
        tipKo: '바삭한 일반 부침개와 달리 계란과 해물 즙으로 촉촉하고 부드럽게 쪄낸 고유 식감으로 겨자 초간장에 찍어 드세요.',
        tipEn: 'Served traditionally soft, moist, and steamed rather than crispy. Dip in local mustard soy sauce.'
      },
      {
        nameKo: '금정산성 흑염소 불고기',
        nameEn: 'Geumjeongsanseong Goat BBQ',
        descKo: '금정산성 누룩마을 고갯길에 모여 있는 먹거리 골목으로 숯불에 직접 구워내 숯 향이 진동하는 원조 흑염소 석쇠 불고기집입니다.',
        descEn: 'The mountaintop foodie village famous for its aromatic and smoky char-grilled goat bulgogi.',
        category: 'FOOD',
        tagKo: '산성 흑염소 직화',
        tagEn: 'Mountain K-BBQ',
        addressKo: '부산 금정구 산성로 443',
        addressEn: '443, Sanseong-ro, Geumjeong-gu, Busan',
        tipKo: '금정산성 누룩으로 전통 발효해 신맛과 단맛이 깊게 어우러지는 8도 명주 금정산성 막걸리와 함께 곁들이면 완벽합니다.',
        tipEn: 'Pair it with Geumjeongsanseong Makgeolli, a legendary regional hand-brewed sour rice wine.'
      },
      {
        nameKo: '모모스커피 온천장본점',
        nameEn: 'Momos Coffee (Oncheonjang)',
        descKo: '한국 최초의 세계 바리스타 챔피언을 배출한 전설적인 커피 성지로, 대나무 숲을 연상케 하는 도심 속 기와 한옥 정원이 평화롭습니다.',
        descEn: 'A world-famous specialty coffee sanctuary with a beautiful bamboo garden and Hanok courtyard.',
        category: 'CAFE',
        tagKo: '바리스타 챔피언',
        tagEn: 'Specialty Coffee',
        addressKo: '부산 금정구 오시게로 20',
        addressEn: '20, Osige-ro, Geumjeong-gu, Busan',
        tipKo: '온천장역 바로 앞에 있어 지하철로 가기 가장 좋습니다. 핸드 드립 시그니처 블렌드 원두를 테이스팅해 보세요.',
        tipEn: 'Located right outside Oncheonjang Subway Station. Try the award-winning hand-dripped signature blends.'
      },
      {
        nameKo: '헤이든 신씨어',
        nameEn: 'Hayden Sincere',
        descKo: '금정산 산자락 호수 옆에 위치한 미니멀하고 기하학적인 현대식 카페로 푸른 산 배경의 호수 징검다리 뷰가 시그니처입니다.',
        descEn: 'A high-concept, geometric architectural lakeside cafe surrounded by lush green mountain views.',
        category: 'CAFE',
        tagKo: '마운틴·레이크뷰',
        tagEn: 'Geometric Lake Cafe',
        addressKo: '부산 금정구 금성동 산9-1',
        addressEn: 'San 9-1, Geumseong-dong, Geumjeong-gu, Busan',
        tipKo: '카페 중앙 야외 중정 물 위에 떠 있는 시그니처 주황색 삼각 로고 앞에서 사진을 남기면 멋진 인생샷이 완성됩니다.',
        tipEn: 'The floating orange triangle logo in the center pond is the absolute best backdrop for photos.'
      },
      {
        nameKo: '동래문화회관',
        nameEn: 'Dongnae Cultural Center',
        descKo: '금정산 밑자락에 위치한 다채로운 야외 마당극 공연과 전통 동래야류 탈춤 보존, 클래식 독주회가 주기적으로 열리는 공공 극장입니다.',
        descEn: 'Dongnae’s regional public arts center preserving historic folk folk arts, hosting plays and concerts.',
        category: 'CULTURE',
        tagKo: '전통 탈춤·공연',
        tagEn: 'Performing Arts',
        addressKo: '부산 동래구 문화로 80',
        addressEn: '80, Munhwa-ro, Dongnae-gu, Busan',
        tipKo: '회관 뒤편의 편안하게 이어진 숲속 산책 데크길이 있으며 인조 연못과 야외 공연장이 있어 휴식을 취하기 편리합니다.',
        tipEn: 'Has a peaceful pine boardwalk trail and outdoor amphitheater behind the main building.'
      },
      {
        nameKo: '금정문화회관',
        nameEn: 'Geumjeong Cultural Center',
        descKo: '금정구 지역 예술 문화의 거점으로 국내외 우수 연주단체의 클래식 오케스트라와 지역 작가들의 시각 미술 전시가 다채롭게 펼쳐집니다.',
        descEn: 'The cultural heartbeat of Geumjeong, staging world-class classic concerts and monthly local art exhibitions.',
        category: 'CULTURE',
        tagKo: '오케스트라·미술전',
        tagEn: 'Fine Art Gallery',
        addressKo: '부산 금정구 체육공원로 7',
        addressEn: '7, Cheyukgongwon-ro, Geumjeong-gu, Busan',
        tipKo: '차량 이용 시 주차 정산 시스템이 잘 되어 있고, 금정구청 바로 옆이라 대중교통 노선 연계성도 아주 양호합니다.',
        tipEn: 'Conveniently located near Geumjeong-gu Office with superb accessibility by city buses.'
      },
      {
        nameKo: '화명 생태공원',
        nameEn: 'Hwamyung Eco Park',
        descKo: '낙동강 변을 따라 광활하게 펼쳐진 생태공원으로, 계절마다 피어나는 야생화 단지와 울창한 대나무 숲길, 연꽃 단지가 평화롭게 어우러집니다.',
        descEn: 'A sprawling riverside ecological park along the Nakdong River, featuring seasonal wildflower gardens, dense bamboo paths, and serene lotus ponds.',
        category: 'LANDMARK',
        tagKo: '낙동강 수변 휴식',
        tagEn: 'Eco River Park',
        addressKo: '부산 북구 낙동대로 1739',
        addressEn: '1739, Nakdong-daero, Buk-gu, Busan',
        tipKo: '공원 전 구역이 완만한 무단차 평지로 이루어져 있어, 휠체어나 유모차가 낙동강 바람을 맞으며 산책하기 최상의 입지입니다.',
        tipEn: 'The entire park is perfectly flat and paved, offering a superb wind-swept stroll without steps.'
      },
      {
        nameKo: '만덕 레고마을',
        nameEn: 'Mandeok Lego Village',
        descKo: '산자락 아래 옹기종기 모여 있는 주택들의 지붕이 알록달록한 원색으로 칠해져 있어, 마치 위에서 내려다보면 레고 블록을 쌓아 올린 듯 이국적이고 귀여운 풍경을 자아냅니다.',
        descEn: 'A charming hillside community where matching house roofs are painted in bright primary colors, resembling a cluster of toy Lego blocks from above.',
        category: 'LANDMARK',
        tagKo: '레고 블록 마을',
        tagEn: 'Colorful Roof Village',
        addressKo: '부산 북구 상리로 18',
        addressEn: '18, Sangri-ro, Buk-gu, Busan',
        tipKo: '마을 골목길은 경사가 다소 있으나, 레고마을 전경이 한눈에 들어오는 인근 전망 데크나 도로는 턱 없이 접근하기 쉽습니다.',
        tipEn: 'While village alleys have some slopes, the designated scenic viewing deck offers accessible flat views.'
      },
      {
        nameKo: '석불사 (병풍사)',
        nameEn: 'Seokbulsa Temple (Byeongpungsa)',
        descKo: '금정산 기암절벽 거대한 암벽 위에 웅장하게 조각된 마애불상군과 섬세한 석공예품들이 병풍처럼 둘러싸고 있는, 압도적인 기운의 신비로운 암석 사찰입니다.',
        descEn: 'An awe-inspiring mountain temple carved directly into vertical stone cliffs, featuring colossal Buddhist rock reliefs that surround you like a screen.',
        category: 'LANDMARK',
        tagKo: '절벽 암각 불상',
        tagEn: 'Cliffside Rock Temple',
        addressKo: '부산 북구 만덕고개길 143-79',
        addressEn: '143-79, Mandeokgogae-gil, Buk-gu, Busan',
        tipKo: '산중에 있어 사찰 진입 직전 경사가 무척 가파르므로 차량을 이용해 절 바로 앞 주차장까지 이동하여 보행을 최소화하는 것을 권장합니다.',
        tipEn: 'Located deep in the mountain with steep immediate slopes. We highly recommend traveling directly to the temple gate parking lot via taxi or vehicle.'
      }
    ]
  }
];


const BoogiSeagullSVG = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20" aria-label="Boogi Mascot">
    {/* Body */}
    <ellipse cx="50" cy="55" rx="25" ry="20" fill="white" stroke="#cbd5e1" strokeWidth="2" />
    {/* Wings */}
    <path d="M 25 55 Q 10 40 20 35 Q 25 45 30 50" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
    <path d="M 75 55 Q 90 40 80 35 Q 75 45 70 50" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
    {/* Head */}
    <circle cx="50" cy="35" r="16" fill="white" stroke="#cbd5e1" strokeWidth="2" />
    {/* Red glasses */}
    {/* Left ring */}
    <circle cx="42" cy="32" r="7" fill="none" stroke="#e11d48" strokeWidth="2.5" />
    {/* Right ring */}
    <circle cx="58" cy="32" r="7" fill="none" stroke="#e11d48" strokeWidth="2.5" />
    {/* Glasses bridge */}
    <path d="M 49 32 L 51 32" stroke="#e11d48" strokeWidth="2.5" />
    {/* Glasses temple left & right */}
    <path d="M 35 32 Q 32 30 30 35" stroke="#e11d48" strokeWidth="1.5" fill="none" />
    <path d="M 65 32 Q 68 30 70 35" stroke="#e11d48" strokeWidth="1.5" fill="none" />
    {/* Eyes - Left is winking, Right is open */}
    <path d="M 39 32 Q 42 29 45 32" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
    <circle cx="58" cy="32" r="2.5" fill="#0f172a" />
    {/* Cheeks */}
    <circle cx="38" cy="38" r="2.5" fill="#fda4af" opacity="0.6" />
    <circle cx="62" cy="38" r="2.5" fill="#fda4af" opacity="0.6" />
    {/* Beak */}
    <path d="M 50 36 L 47 43 L 53 43 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export default function BusanItinerariesView({ 
  language, 
  initialCategory = null, 
  onBack, 
  onSelectCategory,
  tipsSubPage,
  setTipsSubPage,
  activeRegionPage: propActiveRegionPage,
  setActiveRegionPage: propSetActiveRegionPage
}: BusanItinerariesViewProps) {
  // Navigation Section: 'SELECTION' (cute entry) | 'RECOMMENDATIONS' (itineraries list) | 'TRANSIT_TIPS' (transit guide)
  const [activeSection, setActiveSection] = useState<'SELECTION' | 'RECOMMENDATIONS' | 'TRANSIT_TIPS'>(
    initialCategory ? 'RECOMMENDATIONS' : 'SELECTION'
  );

  // Initially show the categories overview dashboard (null), which is "카테고리만 보여지게 만들어줘"
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(initialCategory || null);

  const navigateToSubPage = (page: 'index' | 'courses' | 'transit' | 'child-free' | 'transfer') => {
    if (setTipsSubPage) {
      if (page === 'transfer') {
        setTipsSubPage('transit');
      } else {
        setTipsSubPage(page);
      }
    } else {
      if (page === 'index') {
        setActiveSection('SELECTION');
      } else if (page === 'courses') {
        setActiveSection('RECOMMENDATIONS');
      } else if (page === 'transit' || page === 'transfer') {
        setActiveSection('TRANSIT_TIPS');
        setTransitSection('SUBMENU');
      } else if (page === 'child-free') {
        setActiveSection('TRANSIT_TIPS');
        setTransitSection('CHILD_FREE');
      }
    }
  };

  // Sync state when props change
  React.useEffect(() => {
    if (!tipsSubPage) return;
    if (tipsSubPage === 'index') {
      setActiveSection('SELECTION');
    } else if (tipsSubPage === 'courses') {
      setActiveSection('RECOMMENDATIONS');
    } else if (tipsSubPage === 'transit') {
      setActiveSection('TRANSIT_TIPS');
      setTransitSection('SUBMENU');
    } else if (tipsSubPage === 'child-free') {
      setActiveSection('TRANSIT_TIPS');
      setTransitSection('CHILD_FREE');
    } else if (tipsSubPage === 'transfer') {
      setActiveSection('TRANSIT_TIPS');
      setTransitSection('SUBMENU');
    }
  }, [tipsSubPage]);

  const overviewGridRef = useRef<HTMLDivElement>(null);
  const quickPillsRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Synchronize internal activeCategory and section state with changes in initialCategory prop
  React.useEffect(() => {
    setActiveCategory(initialCategory || null);
    if (initialCategory) {
      setActiveSection('RECOMMENDATIONS');
    }
  }, [initialCategory]);

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'itinerary-day': true, // Keep day itinerary open by default for immediate preview when selected
  });
  const [activeTab2Nights, setActiveTab2Nights] = useState<number>(0);
  const [activeTab4Nights, setActiveTab4Nights] = useState<number>(0);
  const [activeDayCourseIndex, setActiveDayCourseIndex] = useState<number>(0);

  // Transit page states
  const [activeTransitCategory, setActiveTransitCategory] = useState<'LINES' | 'BOARDING' | 'EMERGENCY' | 'TRANSITS'>('LINES');
  const [checkedRules, setCheckedRules] = useState<Record<number, boolean>>({});
  const [transitSection, setTransitSection] = useState<'SUBMENU' | 'CHILD_FREE' | 'TRANSFERS'>('SUBMENU');

  // Quiz States
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0); // 0: Landing inside card, 1~7: Questions 1~7, 8: Result
  const [answers, setAnswers] = useState<('A' | 'B')[]>([]);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<'EAST' | 'WEST' | 'SOUTH' | 'NORTH'>('EAST');
  
  const [localActiveRegionPage, setLocalActiveRegionPage] = useState<'EAST' | 'WEST' | 'SOUTH' | 'NORTH' | null>(null);
  const activeRegionPage = propActiveRegionPage !== undefined ? propActiveRegionPage : localActiveRegionPage;
  const setActiveRegionPage = propSetActiveRegionPage !== undefined ? propSetActiveRegionPage : setLocalActiveRegionPage;

  // Scroll to simulated top of the view/page when the category changes to make it feel like navigating to a new page.
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeCategory, activeSection, transitSection, activeRegionPage, propActiveRegionPage]);

  React.useEffect(() => {
    if (activeRegionPage) {
      setSelectedRegion(activeRegionPage);
    }
  }, [activeRegionPage]);

  const [activeRegionCategory, setActiveRegionCategory] = useState<'LANDMARK' | 'FOOD' | 'CAFE' | 'CULTURE'>('LANDMARK');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [showRealPoster, setShowRealPoster] = useState(false);

  const handleAnswerSelect = (optionType: 'A' | 'B') => {
    const nextAnswers = [...answers, optionType];
    setAnswers(nextAnswers);
    if (quizStep < quizQuestions.length) {
      setQuizStep(prev => prev + 1);
    } else {
      setQuizStep(8);
    }
  };

  const resetQuiz = () => {
    setAnswers([]);
    setQuizStep(0);
    setQuizActive(false);
  };

  const getQuizResultType = () => {
    const countA = answers.filter(a => a === 'A').length;
    const countB = answers.filter(a => a === 'B').length;
    if (countA >= 5) return 'type1';
    if (countB >= 5) return 'type2';
    return 'type3';
  };

  const getResultDetails = (type: 'type1' | 'type2' | 'type3') => {
    switch (type) {
      case 'type1':
        return {
          titleKo: '💎 화려한 시티 & 럭셔리 힐링형',
          titleEn: '💎 Glamorous City & Luxury Healing',
          subTitleKo: '“해운대의 세련미와 광안리의 눈부신 야경을 온전히 누리는 호캉스 코스”',
          subTitleEn: '"A staycation course fully enjoying Haeundae\'s sophistication and Gwangalli\'s dazzling night views"',
          courseKo: [
            '1일차: 해운대 해수욕장 가벼운 산책 ➔ 마린시티 오션뷰 브런치 ➔ 스파랜드 센텀시티에서 피로 회복 ➔ 수영만 요트경기장에서 노을&야경 요트 투어',
            '2일차: 광안리 해변 뷰 카페 ➔ 더베이 101에서 마천루 인생샷 남기기 ➔ 민락수변공원 복합문화공간 \'밀락더마켓\' 구경'
          ],
          courseEn: [
            'Day 1: Haeundae beach light stroll ➔ Marine City ocean-view brunch ➔ Recover at Spaland Centum City ➔ Sunset & night yacht tour from Suyeongman Yachting Center',
            'Day 2: Gwangalli beachfront cafe ➔ Skyscraper landscape photos at The Bay 101 ➔ Browse Millac the Market cultural hub'
          ],
          hotspotsKo: '해운대 해수욕장, 신세계 센텀시티, 엘시티 엑스더스카이 전망대, 마린시티 영화의 거리',
          hotspotsEn: 'Haeundae Beach, Shinsegae Centum City, LCT X the SKY observatory, Marine City Cinema Street',
          foodKo: '해운대 미포 오션뷰 다이닝(일식/양식), 고급 디저트 카페, 광안리 와인바',
          foodEn: 'Haeundae Mipo ocean-view dining (Japanese/Western), luxury dessert cafes, Gwangalli wine bars',
          tipKo: '요트 투어는 해가 지기 직전인 \'일몰 30분 전(골든타임)\'으로 예약해 보세요! 바다 너머로 지는 노을과 화려하게 불이 켜지는 광안대교를 동시에 감상할 수 있습니다.',
          tipEn: 'Reserve the Yacht Tour for exactly 30 minutes before sunset (Golden hour)! You can enjoy both the glowing red sun and the beautifully lit Gwangan Bridge.',
          bgClass: 'from-orange-50/60 to-orange-100/30 border-orange-200 text-orange-950',
          badgeColor: 'bg-orange-100 text-orange-850'
        };
      case 'type2':
        return {
          titleKo: '📸 레트로 감성 & 로컬 탐험가형',
          titleEn: '📸 Retro Vibe & Local Explorer',
          subTitleKo: '“부산 고유의 정취와 골목길 뒤에 숨겨진 보물을 찾아 나서는 진짜 부산 여행”',
          subTitleEn: '"A true Busan adventure uncovering unique heritage and hidden alleyway treasures"',
          courseKo: [
            '1일차: 감천문화마을 알록달록한 골목 스탬프 투어 ➔ 남포동 BIFF광장 주전부리(씨앗호떡) ➔ 자갈치시장 구경 ➔ 영도 흰여울문화마을 해안 골목길 산책 및 노을 감상',
            '2일차: 영도 깡깡이예술마을 투어 ➔ 영도 빨간등대 ➔ 밤에는 영도대교 밑 포장마차 거리에서 뜨끈한 우동과 꼼장어 구이에 소주 한잔!'
          ],
          courseEn: [
            'Day 1: Gamcheon Culture Village colorful alley stamp tour ➔ Nampodong BIFF Square street food (Seed Hotteok) ➔ Jagalchi Fish Market ➔ Yeongdo Huinnyeoul Culture Village seaside alley stroll & sunset',
            'Day 2: Yeongdo Kangkangee Arts Village tour ➔ Yeongdo Red Lighthouse ➔ Warm udon, grilled eel & local clear spirits under Yeongdo Bridge food carts!'
          ],
          hotspotsKo: '감천문화마을, 흰여울문화마을, 남포동 국제시장&부평깡통시장, 영도 포장마차 거리',
          hotspotsEn: 'Gamcheon Culture Village, Huinnyeoul Culture Village, Nampodong Gukje & Bupyeong Kkangtong Markets, Yeongdo Food Cart Street',
          foodKo: '부산 원조 돼지국밥, 밀면, 비빔당면, 씨앗호떡, 꼼장어 석쇠구이',
          foodEn: 'Original Busan Pork Soup, Milmyeon wheat noodles, spicy glass noodles, Seed Hotteok, fire-grilled sea eel',
          tipKo: '산복도로와 가파른 계단, 골목길 언덕이 많은 코스이므로 구두보다는 꼭 발이 편한 운동화를 신으세요. 골목 구석구석 숨겨진 예쁜 빈티지 소품숍이나 독립서점을 찾는 재미가 쏠쏠합니다.',
          tipEn: 'This route has steep hillside roads, stairs, and slopes, so comfortable sneakers are essential over dress shoes! Enjoy searching for beautiful vintage prop shops or indie bookstores.',
          bgClass: 'from-violet-50/60 to-violet-100/30 border-violet-200 text-violet-950',
          badgeColor: 'bg-violet-100 text-violet-800'
        };
      case 'type3':
        return {
          titleKo: '🌊 트렌디 & 알짜배기 하이브리드형',
          titleEn: '🌊 Trendy & Smart Hybrid',
          subTitleKo: '“현지의 레트로한 감성도, 바다의 트렌디함도 모두 포기할 수 없는 알찬 코스”',
          subTitleEn: '"A packed dynamic itinerary that misses neither retro local warmth nor fashionable sea trends"',
          courseKo: [
            '1일차: 해운대 블루라인파크 (미포 ➔ 청사포 해변열차 또는 캡슐열차) ➔ 청사포 바닷가 조개구이 점심 ➔ 송정 해변에서 서핑 구경 ➔ 저녁에는 힙한 전포 카페거리 골목 탐방',
            '2일차: 영도 피아크(초대형 복합문화공간) ➔ 광안대교가 한눈에 들어오는 루프탑 카페 ➔ 토요일 저녁 광안리 해변 드론쇼 감상'
          ],
          courseEn: [
            'Day 1: Haeundae Blue Line Park (Mipo to Cheongsapo beach trains/capsules) ➔ Seafront grilled clams lunch at Cheongsapo ➔ Watch surfers at Songjeong beach ➔ Explore hip Jeonpo Cafe Street in the evening',
            'Day 2: Yeongdo P.ARK mega cultural hub ➔ Rooftop cafe with open views of Gwangan Bridge ➔ Gwangan Beach Drone Light Show on Saturday night'
          ],
          hotspotsKo: '해운대 블루라인파크, 전포 사잇길(카페거리), 민락더마켓, 청사포 다릿돌전망대',
          hotspotsEn: 'Haeundae Blue Line Park, Jeonpo Cafe Street, Millac the Market, Cheongsapo Daritdol Skywalk',
          foodKo: '청사포 조개구이, 전포동 아기자기한 퓨전 양식, 송정 물회, 비주얼이 뛰어난 디저트류',
          foodEn: 'Cheongsapo grilled clams, cozy Jeonpo-dong fusion cuisines, Songjeong raw fish cold soup, visually stunning desserts',
          tipKo: '매주 토요일 저녁 광안리 해수욕장에서 열리는 \'광안리 M 드론 라이트쇼\' 시간을 미리 확인하여 동선을 짜보세요. 해변가 카페 창가 자리를 미리 예약하는 것도 좋은 방법입니다!',
          tipEn: 'Check the schedule of the weekly "Gwanganri M Drone Light Show" (every Saturday evening) in advance to coordinate your routes. Booking a window seat at a seafront cafe is a great hack!',
          bgClass: 'from-amber-50/60 to-amber-100/30 border-amber-200 text-amber-950',
          badgeColor: 'bg-amber-100 text-amber-850'
        };
    }
  };

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getStepIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Platform':
        return <Train className="w-3.5 h-3.5 text-[#004481]" />;
      case 'Gate':
        return <Compass className="w-3.5 h-3.5 text-[#004481]" />;
      case 'Help':
        return <HelpCircle className="w-3.5 h-3.5 text-[#004481]" />;
      case 'Bus':
        return <Compass className="w-3.5 h-3.5 text-[#004481]" />;
      case 'Taxi':
        return <MapPin className="w-3.5 h-3.5 text-[#004481]" />;
      case 'Walk':
        return <Compass className="w-3.5 h-3.5 text-[#004481]" />;
      case 'Camera':
        return <Compass className="w-3.5 h-3.5 text-[#004481]" />;
      case 'Sunset':
        return <Sunset className="w-3.5 h-3.5 text-[#004481]" />;
      case 'Coffee':
        return <Coffee className="w-3.5 h-3.5 text-[#004481]" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-[#004481]" />;
    }
  };

  const getCategoryLucideIcon = (id: CategoryType, className: string = "w-5 h-5") => {
    switch (id) {
      case 'DAY':
        return <Sun className={className} />;
      case '1NIGHT':
        return <Moon className={className} />;
      case '2NIGHTS':
        return <Compass className={className} />;
      case '3NIGHTS':
        return <Sunset className={className} />;
      case '4NIGHTS':
        return <Home className={className} />;
      case 'GOURMET':
        return <Utensils className={className} />;
      case 'HISTORY':
        return <BookOpen className={className} />;
      default:
        return <MapPin className={className} />;
    }
  };

  const categoriesConfig: CategoryConfig[] = [
    {
      id: 'DAY',
      icon: '🌿',
      tagKo: '싱그러운 디톡스',
      tagEn: 'Eco Detox',
      titleKo: '당일치기',
      titleEn: 'Day Trip',
      descKo: '낙동강 물줄기를 따스하게 감싸 안는 삼락, 맥도, 대저생태공원의 싱그러운 초록 물결 속에서 피로 가득한 몸과 마음에 온전한 쉼을 채우는 하루 힐링 여행 코스예요.',
      descEn: 'A tranquil, barrier-free eco detour through Samnak, Maekdo, and Daejeo Eco Parks along the scenic Nakdong River.',
      bgClass: 'bg-emerald-50/70 hover:bg-emerald-50',
      borderClass: 'border-emerald-100 hover:border-emerald-200',
      textClass: 'text-emerald-900'
    },
    {
      id: '1NIGHT',
      icon: '🌙',
      tagKo: '로맨틱 야경',
      tagEn: 'Night Out',
      titleKo: '1박',
      titleEn: '1 Night',
      descKo: '눈부신 광안대교 야경과 화려한 미디어파사드를 감상하고, 트렌디한 민락더마켓에서 여유로운 밤바다 정취를 나누는 완만한 1박 코스예요.',
      descEn: 'Gaze at the sparkling bridge LED shows and dine at accessible waterfront markets.',
      bgClass: 'bg-violet-50/70 hover:bg-violet-50',
      borderClass: 'border-violet-100 hover:border-violet-200',
      textClass: 'text-violet-900'
    },
    {
      id: '2NIGHTS',
      icon: '🌅',
      tagKo: '감성 골목 & 바다',
      tagEn: 'Art & Marine',
      titleKo: '2박',
      titleEn: '2 Nights',
      descKo: '전포·서면 감성 골목과 바위 절벽의 해동용궁사, 그리고 고즈넉한 수영의 명소들을 완만하게 엮어 이동 편의를 만끽하는 매력적인 2박 코스예요.',
      descEn: 'Enjoy trendy Jeonpo lanes, stunning seaside Haedong Yonggungsa Shrine, and historical Suyeong alleys.',
      bgClass: 'bg-amber-50/70 hover:bg-amber-50',
      borderClass: 'border-amber-100 hover:border-amber-200',
      textClass: 'text-amber-900'
    },
    {
      id: '3NIGHTS',
      icon: '🌿',
      tagKo: '에코 에코',
      tagEn: 'Eco Rest',
      titleKo: '3박',
      titleEn: '3 Nights',
      descKo: '영도 푸른 바다의 영롱한 수평선 뷰와, 졸졸 시냇물 소리가 매력적인 예쁜 꽃밭 산책로인 온천천 수변공원을 함께 여행하는 힐링 코스예요.',
      descEn: 'Traverse scenic clifftops of Yeongdo and scenic bamboo waterway paths with modern ramps.',
      bgClass: 'bg-emerald-50/70 hover:bg-emerald-50',
      borderClass: 'border-emerald-100 hover:border-emerald-200',
      textClass: 'text-emerald-950'
    },
    {
      id: '4NIGHTS',
      icon: '🏠',
      tagKo: '내 집처럼',
      tagEn: 'Deep Stay',
      titleKo: '4박',
      titleEn: '4 Nights',
      descKo: '지하철 역의 편안한 동선 안내와 쾌적한 실내 복합 쇼핑몰 센텀시티를 중심으로 아늑하고 다정한 시간을 누리는 부산 장기 체류 마스터 코스예요.',
      descEn: 'The absolute travel guide exploring deep scenic corners and spacious air-conditioned mega malls.',
      bgClass: 'bg-sky-50/70 hover:bg-sky-50',
      borderClass: 'border-sky-100 hover:border-sky-200',
      textClass: 'text-sky-950'
    },
    {
      id: 'GOURMET',
      icon: '🍕',
      tagKo: '침샘 가득',
      tagEn: 'Delicious',
      titleKo: '식도락',
      titleEn: 'Gourmet',
      descKo: '마음이 보들보들해지는 원조 돼지국밥 노포 맛집부터 예쁜 카페, 씨앗호떡까지 입구가 평평하고 여유로운 부산 로컬 미식 지도예요.',
      descEn: 'Savor traditional pork soup and hot sweet pancakes on fully flat pedestrian walkways.',
      bgClass: 'bg-rose-50/70 hover:bg-rose-50',
      borderClass: 'border-rose-100 hover:border-rose-200',
      textClass: 'text-rose-950'
    },
    {
      id: 'HISTORY',
      icon: '📜',
      tagKo: '어제와 오늘',
      tagEn: 'History',
      titleKo: '역사',
      titleEn: 'History',
      descKo: '초량 산복도로 골목의 무료 전망 모노레일을 타고 올라가, 6.25의 흔적을 품은 임시수도기념관 정원을 거닐며 역사를 만나는 다정하고 푸근한 산책 코스예요.',
      descEn: 'Ascend steep hills on glass monorail lifts and touch historic provisional capital museums.',
      bgClass: 'bg-stone-50/70 hover:bg-stone-50',
      borderClass: 'border-stone-100 hover:border-stone-200',
      textClass: 'text-stone-950'
    }
  ];

  const filteredCourses = activeCategory 
    ? BUSAN_ITINERARIES.filter((course) => course.category === activeCategory)
    : [];

  const activeCategoryConfig = categoriesConfig.find(c => c.id === activeCategory);

  return (
    <div className={`${activeSection === 'SELECTION' ? 'space-y-3 sm:space-y-5' : 'space-y-6 sm:space-y-8'} text-left animate-fade-in max-w-5xl mx-auto`} id="busan-itineraries-container">
      {/* Dynamic Seagull & Sea Styles Injector */}
      <style>{`
        @keyframes subtle-boat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-wing {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        @keyframes custom-ripple {
          0% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.08); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.15; }
        }
        .animate-boat {
          animation: subtle-boat 4.5s ease-in-out infinite;
        }
        .animate-seagull {
          animation: float-wing 3.2s ease-in-out infinite;
        }
        .animate-pulse-ring {
          animation: custom-ripple 3s ease-in-out infinite;
        }
      `}</style>

      {/* SUB-TABS PILLED TOGGLE CONTROLLER (Only visible when NOT in SELECTION view) */}
      {activeSection !== 'SELECTION' && (
        <div className="bg-white p-2 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-row items-center justify-between gap-2 sm:gap-4 animate-fade-in">
          {/* Back btn */}
          <button
            onClick={() => {
              if (activeSection === 'TRANSIT_TIPS' && transitSection !== 'SUBMENU') {
                navigateToSubPage('transit');
              } else {
                navigateToSubPage('index');
                if (onSelectCategory) {
                  onSelectCategory(null);
                } else {
                  setActiveCategory(null);
                }
              }
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black text-slate-500 hover:text-[#004481] hover:bg-slate-50 active:scale-95 transition-all shrink-0 cursor-pointer border border-slate-100"
          >
            <span>◀</span>
            <span className="hidden sm:inline">
              {activeSection === 'TRANSIT_TIPS' && transitSection !== 'SUBMENU'
                ? (language === 'KR' ? '이용 팁 목록' : 'Back to Transit Tips')
                : (language === 'KR' ? '추천/이용팁 메인' : 'Back to Main')}
            </span>
            <span className="sm:hidden">
              {activeSection === 'TRANSIT_TIPS' && transitSection !== 'SUBMENU'
                ? (language === 'KR' ? '목록' : 'List')
                : (language === 'KR' ? '메인' : 'Main')}
            </span>
          </button>

          {/* Double Pill */}
          <div className="bg-slate-50/80 p-0.5 sm:p-1 rounded-xl sm:rounded-2xl border border-slate-100 flex gap-0.5 sm:gap-1 flex-1 max-w-[280px] sm:max-w-md">
            <button
              onClick={() => {
                navigateToSubPage('courses');
                if (onSelectCategory) {
                  onSelectCategory(null);
                } else {
                  setActiveCategory(null);
                }
              }}
              className={`flex-1 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black transition-all duration-305 flex items-center justify-center gap-1 sm:gap-2 cursor-pointer ${
                activeSection === 'RECOMMENDATIONS'
                  ? 'bg-[#004481] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-850 hover:bg-slate-100/50'
              }`}
            >
              <span>🏖️</span>
              <span className="text-[10px] sm:text-xs font-black">{language === 'KR' ? '여행 추천' : 'Trip'}</span>
            </button>
            <button
              onClick={() => {
                navigateToSubPage('transit');
                if (onSelectCategory) {
                  onSelectCategory(null);
                } else {
                  setActiveCategory(null);
                }
              }}
              className={`flex-1 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black transition-all duration-305 flex items-center justify-center gap-1 sm:gap-2 cursor-pointer ${
                activeSection === 'TRANSIT_TIPS'
                  ? 'bg-[#004481] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-850 hover:bg-slate-100/50'
              }`}
            >
              <span>🚇</span>
              <span className="text-[10px] sm:text-xs font-black">{language === 'KR' ? '교통 팁' : 'Transit'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 1: SELECTION DASHBOARD (Highly customized, adorable, dynamic entry)  */}
      {/* ========================================================================= */}
      {activeSection === 'SELECTION' && (
        <div className="space-y-2.5 sm:space-y-4 animate-fade-in text-center py-0.5">
          {/* Extremely Clean, Professional & Playful Compact Header (No surrounding box container) */}
          <div className="text-center max-w-2xl mx-auto space-y-0.5 sm:space-y-1.5 relative py-0.5">
            <span className="bg-[#004481] text-white border border-slate-900 text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest inline-block shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
              BUSAN TRAVEL PORTAL
            </span>
            <h2 className="text-base sm:text-lg font-black font-heading text-slate-900 tracking-tight leading-tight">
               {language === 'KR' ? '부산 여행에 대한 모든 것' : 'All About Busan Travel'}
            </h2>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 max-w-lg mx-auto">
               {language === 'KR' 
                ? '네이버 지도를 기준으로 장소 정보를 제공합니다' 
                : 'We provide place details based on Naver Map.'}
            </p>
            
            <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-slate-600 mx-auto pt-0.5">
              <span className="relative flex h-1 w-1 sm:h-1.5 sm:w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1 w-1 sm:h-1.5 sm:w-1.5 bg-emerald-500"></span>
              </span>
              <span>{language === 'KR' ? '⚙️ 더 정확한 정보를 위해 업데이트 중' : '⚙️ Updating constantly for accurate tips'}</span>
            </div>
          </div>

          {/* TWO MAIN MENU BUTTON CARDS in beautiful flat illustration style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-0.5 max-w-2xl mx-auto" id="tips-main-menu-selection">
            {/* Card 1: BUSAN TRAVEL RECOMMENDATIONS */}
            <div
              onClick={() => navigateToSubPage('courses')}
              className="group bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-900 hover:bg-slate-50 cursor-pointer shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 flex flex-col justify-between text-left relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#004481] border-2 border-slate-900 flex items-center justify-center text-white shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] shrink-0 group-hover:scale-105 transition-transform">
                      <Compass className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-black px-1.5 py-0.2 rounded-md uppercase tracking-wider block w-max mb-0.5">
                        COURSE
                      </span>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                        {language === 'KR' ? '여행 코스 추천' : 'Travel Course Recommendations'}
                      </h3>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center font-black text-slate-900 text-xs shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] shrink-0">
                    ➔
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 font-bold leading-normal pr-1">
                  {language === 'KR' 
                    ? '현지인이 발로 뛰며 검증하고 설계한 무장애 힐링 및 테마 코스 추천'
                    : 'Discover fine handcrafted day trips, scenic coastal walks, delicious gastronomy guides and historic viewpoints.'}
                </p>
              </div>
            </div>

            {/* Card 2: SUBWAY PUBLIC TRANSIT TIPS */}
            <div
              onClick={() => navigateToSubPage('transit')}
              className="group bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-900 hover:bg-slate-50 cursor-pointer shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 flex flex-col justify-between text-left relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#004481] border-2 border-slate-900 flex items-center justify-center text-white shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] shrink-0 group-hover:scale-105 transition-transform">
                      <Train className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-black px-1.5 py-0.2 rounded-md uppercase tracking-wider block w-max mb-0.5">
                        TRANSIT
                      </span>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                        {language === 'KR' ? '대중교통 이용 팁' : 'Public Transport Tips'}
                      </h3>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center font-black text-slate-900 text-xs shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] shrink-0">
                    ➔
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 font-bold leading-normal pr-1">
                  {language === 'KR'
                    ? '부산 지하철 노선 요약부터 어린이 무료 대중교통 이용 방법, 30분 무료 환승 요령까지 완벽 정리'
                    : 'Interactive charts, maps, and professional strategies for senior companions, strollers or wheelchair navigations.'}
                </p>
              </div>
            </div>
          </div>

          {/* Adorable Reddit Community Shortcut Banner - Styled matching flat design */}
          <div className="max-w-2xl mx-auto pt-1">
            <a
              href="https://www.reddit.com/r/BusanTravelTips/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:px-6 sm:py-4 bg-white border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 cursor-pointer text-left"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#004481] border-2 border-slate-900 flex items-center justify-center text-white shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5.5 h-5.5 stroke-[2.5]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2 leading-none">
                    <span>{language === 'KR' ? '실시간 부산 여행 팁 커뮤니티' : 'Live Busan Travel Tips & Q&A'}</span>
                    <span className="text-[9px] bg-slate-100 text-slate-700 border border-slate-200 font-black px-1.5 py-0.2 rounded-md uppercase tracking-wider select-none shrink-0">Reddit</span>
                  </h4>
                  <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                    {language === 'KR'
                      ? 'r/BusanTravelTips 레딧 커뮤니티에서 유용한 현지 여행 이야기를 나누어보세요!'
                      : 'Join our friendly r/BusanTravelTips community on Reddit to ask questions and read local tips.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-[#004481] hover:bg-[#003566] text-white border-2 border-slate-900 text-xs font-black px-3.5 py-2 rounded-xl transition-all self-stretch sm:self-center justify-center shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] whitespace-nowrap">
                <span>{language === 'KR' ? '레딧 바로가기' : 'Explore Reddit'}</span>
                <span className="text-xs font-black">➔</span>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: ORIGINAL ITINERARY RECOMMENDATIONS VIEW                            */}
      {/* ========================================================================= */}
      {activeSection === 'RECOMMENDATIONS' && (
        <div className="space-y-4 sm:space-y-8">

          {/* Main Container Switching: Categories Grid VS Category Detailed Itinerary */}
      {activeCategory === null ? (
        // Mode 2: SHOW CATEGORY ONLY (GRID VIEW) - "카테고리만 보여지게 만들어줘"
        <div className="space-y-4 sm:space-y-8">
          
          <div className="border-b border-slate-100 pb-3 animate-fade-in">
            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
              <span>{language === 'KR' ? '추천 카테고리를 선택하세요' : 'Select a Category of Itinerary'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">
              {language === 'KR' 
                ? '원하시는 여행 일정과 미식, 역사 테마를 클릭하면 전용 가이드로 이동합니다.' 
                : 'Click any travel plan, food guide, or history route below to unlock deep step-free details.'}
            </p>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            #categories-overview-grid::-webkit-scrollbar,
            #quick-categories-pills::-webkit-scrollbar {
              height: 4px;
              display: block !important;
            }
            #categories-overview-grid::-webkit-scrollbar-track,
            #quick-categories-pills::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 9999px;
            }
            #categories-overview-grid::-webkit-scrollbar-thumb,
            #quick-categories-pills::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 9999px;
            }
            #categories-overview-grid::-webkit-scrollbar-thumb:hover,
            #quick-categories-pills::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
            }
          `}} />

          <div 
            className="flex flex-wrap gap-2 justify-center sm:justify-start pb-2 w-full" 
            id="categories-overview-grid"
          >
            {categoriesConfig.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(cat.id);
                  } else {
                    setActiveCategory(cat.id);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-1.5 group transform hover:-translate-y-0.5 hover:shadow-sm shrink-0 ${cat.bgClass} ${cat.borderClass}`}
              >
                <div className="w-6 h-6 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 duration-300">
                  {getCategoryLucideIcon(cat.id, "w-3.5 h-3.5 stroke-[2.2] text-slate-700")}
                </div>
                <div className="text-left">
                  <h4 className="text-[11px] sm:text-xs font-black font-heading tracking-tight text-slate-800">
                    {language === 'KR' ? cat.titleKo : cat.titleEn}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* BUSAN TOURIST ILLUSTRATION MAP SECTION OR REGIONAL SUBPAGE */}
          {activeRegionPage !== null ? (
            <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_4px_22px_rgba(0,0,0,0.015)] text-left space-y-6 animate-fade-in">
              {/* Back button and navigation title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => {
                      setActiveRegionPage(null);
                      setCopiedIndex(null);
                    }}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 active:scale-95 border border-slate-150 text-slate-700 transition-all cursor-pointer flex items-center justify-center"
                    title={language === 'KR' ? '뒤로 가기' : 'Go Back'}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🗺️</span>
                      <h3 className="text-lg sm:text-2xl font-black text-slate-800">
                        {language === 'KR' 
                          ? REGION_RECOMMENDATIONS.find(r => r.id === activeRegionPage)?.nameKo 
                          : REGION_RECOMMENDATIONS.find(r => r.id === activeRegionPage)?.nameEn}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mt-1">
                      {language === 'KR' 
                        ? REGION_RECOMMENDATIONS.find(r => r.id === activeRegionPage)?.descKo 
                        : REGION_RECOMMENDATIONS.find(r => r.id === activeRegionPage)?.descEn}
                    </p>
                  </div>
                </div>
                
                {/* Quick Switch Button (Go back to map) */}
                <button
                  onClick={() => {
                    setActiveRegionPage(null);
                    setCopiedIndex(null);
                  }}
                  className="self-start sm:self-center text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200/60 px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>🗺️</span>
                  <span>{language === 'KR' ? '전체 지도 보기' : 'Show Map'}</span>
                </button>
              </div>

              {/* Sub-categories selector tabs */}
              <div className="flex flex-wrap gap-2 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-200/50">
                {([
                  { id: 'LANDMARK', labelKo: '명소 🏖️', labelEn: 'Attractions 🏖️' },
                  { id: 'FOOD', labelKo: '맛집 🍱', labelEn: 'Restaurants 🍱' },
                  { id: 'CAFE', labelKo: '카페 ☕', labelEn: 'Cafes ☕' },
                  { id: 'CULTURE', labelKo: '공연 및 전시 🎭', labelEn: 'Performances & Exhibitions 🎭' }
                ] as const).map((tab) => {
                  const isActive = activeRegionCategory === tab.id;
                  const activeColorClass = activeRegionPage === 'EAST' ? 'bg-blue-600 text-white shadow-sm' :
                                           activeRegionPage === 'WEST' ? 'bg-emerald-600 text-white shadow-sm' :
                                           activeRegionPage === 'SOUTH' ? 'bg-amber-600 text-white shadow-sm' :
                                           'bg-purple-600 text-white shadow-sm';
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveRegionCategory(tab.id);
                        setCopiedIndex(null);
                      }}
                      className={`flex-1 min-w-[120px] py-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer text-center active:scale-95 ${
                        isActive 
                          ? activeColorClass 
                          : 'text-slate-600 hover:text-slate-950 bg-transparent hover:bg-white'
                      }`}
                    >
                      {language === 'KR' ? tab.labelKo : tab.labelEn}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Category content display */}
              <div className="space-y-6 mt-4">
                {REGION_RECOMMENDATIONS.filter(r => r.id === activeRegionPage).map((r) => {
                  const filteredItems = r.landmarks.filter(item => item.category === activeRegionCategory);
                  const regionBgColor = r.id === 'EAST' ? 'bg-blue-50/45 text-blue-800 border-blue-100/50' :
                                        r.id === 'WEST' ? 'bg-emerald-50/45 text-emerald-800 border-emerald-100/50' :
                                        r.id === 'SOUTH' ? 'bg-amber-50/45 text-amber-800 border-amber-100/50' :
                                        'bg-purple-50/45 text-purple-800 border-purple-100/50';

                  if (filteredItems.length === 0) {
                    return (
                      <div key={r.id} className="text-center py-12 text-slate-400 font-semibold text-sm">
                        {language === 'KR' ? '해당 카테고리의 추천 정보가 아직 준비 중입니다.' : 'No recommendations available for this category.'}
                      </div>
                    );
                  }

                  return (
                    <div key={r.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                      {filteredItems.map((item, idx) => {
                        const isCopied = copiedIndex === item.nameKo;
                        return (
                          <div 
                            key={idx}
                            className="p-5 sm:p-6 rounded-2xl border border-slate-200/50 bg-white hover:shadow-md transition-all flex flex-col justify-between gap-4 group animate-fade-in"
                          >
                            <div className="space-y-3 text-left">
                              {/* Place Title and Category Tag */}
                              <div className="flex items-start justify-between gap-2 border-b border-slate-50 pb-2.5">
                                <div className="space-y-1">
                                  <h4 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-1.5 leading-snug">
                                    {activeRegionCategory === 'FOOD' ? '🍱' : 
                                     activeRegionCategory === 'CAFE' ? '☕' : 
                                     activeRegionCategory === 'LANDMARK' ? '🏖️' : '🎭'}
                                    <span>{language === 'KR' ? item.nameKo : item.nameEn}</span>
                                  </h4>
                                  <span className="inline-block text-[10px] font-black px-2 py-0.5 rounded-md border bg-slate-50 text-slate-600 border-slate-200/50">
                                    {language === 'KR' ? item.tagKo : item.tagEn}
                                  </span>
                                </div>
                              </div>

                              {/* Place Description */}
                              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                                {language === 'KR' ? item.descKo : item.descEn}
                              </p>

                              {/* Address Section with Copy Button */}
                              {(item.addressKo || item.addressEn) && (
                                <div className="flex items-center justify-between gap-3 bg-slate-50/70 p-2.5 rounded-xl border border-slate-150/50 text-[11px] sm:text-xs">
                                  <div className="flex items-center gap-1.5 text-slate-500 overflow-hidden">
                                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                                    <span className="truncate font-semibold text-slate-700">
                                      {language === 'KR' ? item.addressKo : item.addressEn}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => {
                                      const addressText = language === 'KR' ? item.addressKo : item.addressEn;
                                      if (addressText) {
                                        navigator.clipboard.writeText(addressText);
                                        setCopiedIndex(item.nameKo);
                                        setTimeout(() => setCopiedIndex(null), 1500);
                                      }
                                    }}
                                    className="flex items-center gap-1 text-[10px] sm:text-xs px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50 active:scale-95 transition-all text-slate-600 font-black cursor-pointer shrink-0"
                                    title={language === 'KR' ? '주소 복사' : 'Copy Address'}
                                  >
                                    {isCopied ? (
                                      <>
                                        <Check className="w-3 h-3 text-emerald-600" />
                                        <span className="text-emerald-700">{language === 'KR' ? '복사됨!' : 'Copied!'}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3 text-slate-400" />
                                        <span>{language === 'KR' ? '복사' : 'Copy'}</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Local Pro-Tip Callout Box */}
                              {(item.tipKo || item.tipEn) && (
                                <div className={`p-3 rounded-xl border ${regionBgColor} text-[11px] sm:text-xs flex items-start gap-2 mt-2 shadow-[0_1px_3px_rgba(0,0,0,0.01)]`}>
                                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                                  <div className="space-y-0.5 leading-relaxed text-left">
                                    <span className="font-extrabold block text-slate-700">
                                      💡 {language === 'KR' ? '현지인 이용 꿀팁 & 편의 정보' : 'Local Pro-Tip & Access info'}
                                    </span>
                                    <span className="font-semibold text-slate-600">
                                      {language === 'KR' ? item.tipKo : item.tipEn}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white p-3.5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_4px_22px_rgba(0,0,0,0.015)] text-left space-y-4 sm:space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="space-y-0.5">
                    <h3 className="text-sm sm:text-lg font-extrabold text-slate-800 flex items-center gap-1.5">
                      <span className="text-lg sm:text-xl">🗺️</span>
                      <span>{language === 'KR' ? '부산 권역별 가이드 지도 (동·서·남·북)' : 'Busan Regional Guide Map (East·West·South·North)'}</span>
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-semibold leading-normal">
                      {language === 'KR'
                        ? '지도 주위의 동부/서부/남부/북부 버튼을 누르면, 해당 권역의 대표 명소와 맛집을 바로 확인하실 수 있습니다.'
                        : 'Click on East/West/South/North buttons to explore top local spots and restaurants curated by locals.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setMapModalOpen(true)}
                    className="self-start sm:self-center flex items-center gap-1 text-[10px] sm:text-xs font-black text-[#004481] bg-blue-50/80 hover:bg-blue-100 active:scale-95 px-3 py-2 rounded-xl transition-all cursor-pointer border border-blue-100/50 shrink-0"
                  >
                    🔍 {language === 'KR' ? '지도 크게 보기' : 'Enlarge Map'}
                  </button>
                </div>

                {/* Large Centered Interactive Map */}
                <div className="space-y-6">
                  {/* Map Container */}
                  <div 
                    className="relative aspect-[3/2] w-full max-w-3xl mx-auto rounded-3xl overflow-hidden border border-slate-150/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)] bg-slate-50 group"
                  >
                    <img 
                      src="/images/busan_wide_map_1782270122755.jpg"
                      alt="Busan Travel Map Illustration"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                    />

                    {/* Interactive badges overlaying the map representing East, West, South, North */}
                  <div className="absolute inset-0 p-4 hidden sm:flex flex-col justify-between z-10 pointer-events-none">
                    {/* Top: North */}
                    <div className="flex justify-center pt-2">
                      <button 
                        onClick={() => {
                          setSelectedRegion('NORTH');
                          setActiveRegionPage('NORTH');
                          setActiveRegionCategory('LANDMARK');
                        }}
                        className={`shadow-lg text-xs sm:text-sm font-black px-4 py-2.5 rounded-2xl border transition-all active:scale-95 cursor-pointer pointer-events-auto flex items-center gap-1.5 ${
                          selectedRegion === 'NORTH' 
                            ? 'bg-purple-600 text-white border-purple-500 scale-108 ring-4 ring-purple-100 shadow-purple-200' 
                            : 'bg-white/95 text-slate-800 border-slate-200/80 hover:bg-white hover:scale-105'
                        }`}
                      >
                        <span>⛰️</span>
                        <span>{language === 'KR' ? '북부 (금정/범어사)' : 'North (Geumjeong)'}</span>
                      </button>
                    </div>

                    {/* Middle Row: West & East */}
                    <div className="flex justify-between items-center px-2 sm:px-6 my-auto">
                      {/* West Badge */}
                      <button 
                        onClick={() => {
                          setSelectedRegion('WEST');
                          setActiveRegionPage('WEST');
                          setActiveRegionCategory('LANDMARK');
                        }}
                        className={`shadow-lg text-xs sm:text-sm font-black px-4 py-2.5 rounded-2xl border transition-all active:scale-95 cursor-pointer pointer-events-auto flex items-center gap-1.5 ${
                          selectedRegion === 'WEST' 
                            ? 'bg-emerald-600 text-white border-emerald-500 scale-108 ring-4 ring-emerald-100 shadow-emerald-200' 
                            : 'bg-white/95 text-slate-800 border-slate-200/80 hover:bg-white hover:scale-105'
                        }`}
                      >
                        <span>🌲</span>
                        <span>{language === 'KR' ? '서부 (다대포/감천)' : 'West (Dadaepo)'}</span>
                      </button>

                      {/* East Badge */}
                      <button 
                        onClick={() => {
                          setSelectedRegion('EAST');
                          setActiveRegionPage('EAST');
                          setActiveRegionCategory('LANDMARK');
                        }}
                        className={`shadow-lg text-xs sm:text-sm font-black px-4 py-2.5 rounded-2xl border transition-all active:scale-95 cursor-pointer pointer-events-auto flex items-center gap-1.5 ${
                          selectedRegion === 'EAST' 
                            ? 'bg-blue-600 text-white border-blue-500 scale-108 ring-4 ring-blue-100 shadow-blue-200' 
                            : 'bg-white/95 text-slate-800 border-slate-200/80 hover:bg-white hover:scale-105'
                        }`}
                      >
                        <span>🌊</span>
                        <span>{language === 'KR' ? '동부 (해운대/광안리)' : 'East (Haeundae)'}</span>
                      </button>
                    </div>

                    {/* Bottom Row: South */}
                    <div className="flex justify-center pb-2">
                      <button 
                        onClick={() => {
                          setSelectedRegion('SOUTH');
                          setActiveRegionPage('SOUTH');
                          setActiveRegionCategory('LANDMARK');
                        }}
                        className={`shadow-lg text-xs sm:text-sm font-black px-4 py-2.5 rounded-2xl border transition-all active:scale-95 cursor-pointer pointer-events-auto flex items-center gap-1.5 ${
                          selectedRegion === 'SOUTH' 
                            ? 'bg-amber-600 text-white border-amber-500 scale-108 ring-4 ring-amber-100 shadow-amber-200' 
                            : 'bg-white/95 text-slate-800 border-slate-200/80 hover:bg-white hover:scale-105'
                        }`}
                      >
                        <span>⚓</span>
                        <span>{language === 'KR' ? '남부 (영도/남포동)' : 'South (Yeongdo)'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Region Switcher Tabs (Buttons below the map) */}
                <div className="grid grid-cols-4 gap-1.5 sm:gap-3 max-w-2xl mx-auto bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/40">
                  {(['EAST', 'WEST', 'SOUTH', 'NORTH'] as const).map((rId) => {
                    const isActive = selectedRegion === rId;
                    const label = rId === 'EAST' ? (language === 'KR' ? '동부 🌊' : 'East 🌊') :
                                  rId === 'WEST' ? (language === 'KR' ? '서부 🌲' : 'West 🌲') :
                                  rId === 'SOUTH' ? (language === 'KR' ? '남부 ⚓' : 'South ⚓') :
                                  (language === 'KR' ? '북부 ⛰️' : 'North ⛰️');
                    const activeBg = rId === 'EAST' ? 'bg-blue-600 text-white shadow-md' :
                                     rId === 'WEST' ? 'bg-emerald-600 text-white shadow-md' :
                                     rId === 'SOUTH' ? 'bg-amber-600 text-white shadow-md' :
                                     'bg-purple-600 text-white shadow-md';
                    return (
                      <button
                        key={rId}
                        onClick={() => {
                          setSelectedRegion(rId);
                          setActiveRegionPage(rId);
                          setActiveRegionCategory('LANDMARK');
                        }}
                        className={`py-2.5 sm:py-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer text-center active:scale-95 ${
                          isActive ? activeBg : 'text-slate-600 hover:text-slate-950 bg-transparent hover:bg-white/60'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Region Recommendations section placed elegantly below the map */}
                <div className="w-full bg-slate-50/70 p-5 sm:p-7 rounded-3xl border border-slate-150/50 mt-4">
                  {REGION_RECOMMENDATIONS.filter(r => r.id === selectedRegion).map((r) => (
                    <div key={r.id} className="space-y-5 animate-fade-in">
                      
                      {/* Region Header */}
                      <div className="border-b border-slate-200/50 pb-3">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full uppercase tracking-tight border ${r.badgeColor}`}>
                            {language === 'KR' ? r.nameKo : r.nameEn}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                          {language === 'KR' ? r.descKo : r.descEn}
                        </p>
                      </div>

                      {/* Recommendations Cards Grid (Full display, no scrollbar needed) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {r.landmarks.map((item, idx) => {
                          const isFood = item.category === 'FOOD';
                          return (
                            <div 
                              key={idx}
                              className="p-4 rounded-2xl border border-slate-200/40 hover:border-slate-300 bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all flex flex-col justify-between gap-3"
                            >
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-xl shrink-0 ${
                                  isFood ? 'bg-rose-50 text-rose-600' : 'bg-sky-50 text-sky-600'
                                }`}>
                                  {isFood ? (
                                    <Utensils className="w-4 h-4" />
                                  ) : (
                                    <MapPin className="w-4 h-4" />
                                  )}
                                </div>
                                <div className="space-y-1">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="font-extrabold text-slate-800 text-sm sm:text-base">
                                      {language === 'KR' ? item.nameKo : item.nameEn}
                                    </span>
                                  </div>
                                  <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-lg border ${
                                    isFood 
                                      ? 'bg-rose-50 text-rose-700 border-rose-100' 
                                      : 'bg-sky-50 text-sky-700 border-sky-100'
                                  }`}>
                                    {language === 'KR' ? item.tagKo : item.tagEn}
                                  </span>
                                </div>
                              </div>
                              
                              <p className="text-xs text-slate-400 font-semibold leading-relaxed border-t border-slate-100 pt-2">
                                {language === 'KR' ? item.descKo : item.descEn}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

            {/* QUIZ SECTION (TEST) */}
            {!quizActive ? (
              <div className="bg-gradient-to-br from-[#004481]/5 via-sky-50/20 to-white p-6 sm:p-8 rounded-3xl border border-blue-100/70 shadow-[0_4px_18px_rgba(0,68,129,0.02)] flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all hover:shadow-[0_8px_30px_rgba(0,68,129,0.05)] duration-300">
                <div className="space-y-1.5 text-left flex-1">
                  <div className="inline-flex items-center gap-1.5 bg-[#004481]/5 text-[#004481] px-3 py-1 rounded-full text-[10.5px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    <span>{language === 'KR' ? '여행 성향 코스 테스트' : 'Travel Style Quiz'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#004481] leading-tight">
                    {language === 'KR' ? '나에게 딱 맞는 부산 여행 코스 찾기 🧭' : 'Find Your Perfect Busan Match 🧭'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    {language === 'KR'
                      ? '간단한 7가지 질문을 통해 나의 여행 스타일을 확인하고, 나에게 가장 완벽한 1박 2일 부산 여행 코스를 찾아보세요!'
                      : 'Take a quick 7-question checklist to diagnostic your genuine travel style and retrieve the perfect 1N2D itinerary!'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setQuizActive(true);
                    setQuizStep(1);
                    setAnswers([]);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#004481] hover:bg-[#003366] active:scale-95 text-white font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_12px_rgba(0,68,129,0.15)] hover:shadow-[0_6px_20px_rgba(0,68,129,0.25)] cursor-pointer shrink-0"
                >
                  <span>🚀 {language === 'KR' ? '나의 추천 코스 진단 시작' : 'Start Preferences Quiz'}</span>
                </button>
              </div>
            ) : (
              <div className="bg-white p-6 sm:p-10 rounded-4xl border border-slate-150 shadow-md space-y-6 animate-fade-in relative overflow-hidden text-left" id="active-quiz-container">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 text-[#004481] font-sans font-black text-xs border border-blue-100 shadow-3xs">
                      Q
                    </span>
                    <div className="text-left">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-mono">TEST PROGRESS / 진단 진행도</span>
                      <span className="text-xs font-black text-slate-700">
                        {quizStep === 8 ? (language === 'KR' ? '진단 완료' : 'Completed') : `${quizStep} / ${quizQuestions.length}`}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={resetQuiz} 
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {quizStep < 8 && (
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#004481] h-full transition-all duration-300 rounded-full"
                      style={{ width: `${(quizStep / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                )}

                {quizStep === 8 ? (
                  (() => {
                    const resultType = getQuizResultType();
                    const result = getResultDetails(resultType);
                    return (
                      <div className="space-y-6 animate-fade-in text-left">
                        <div className={`p-6 sm:p-8 rounded-3xl border ${result.bgClass} space-y-4`}>
                          <div className="space-y-1.5">
                            <span className={`inline-block text-[10px] font-black px-2.5 py-1 rounded-lg ${result.badgeColor} uppercase tracking-wider font-mono`}>
                              {language === 'KR' ? '추천 성향 결과' : 'Your Travel Type'}
                            </span>
                            <h4 className="text-lg sm:text-xl font-heading font-black">{language === 'KR' ? result.titleKo : result.titleEn}</h4>
                            <p className="text-xs sm:text-sm font-semibold opacity-80 italic">{language === 'KR' ? result.subTitleKo : result.subTitleEn}</p>
                          </div>

                          <div className="pt-4 border-t border-black/10 space-y-3">
                            <span className="text-[10px] font-black opacity-60 uppercase tracking-wider block font-mono">{language === 'KR' ? '추천 1박 2일 코스 요약' : 'RECOMMENDED 1N2D TIMELINE'}</span>
                            <div className="space-y-2 text-xs sm:text-sm font-semibold">
                              {(language === 'KR' ? result.courseKo : result.courseEn).map((line, idx) => (
                                <p key={idx} className="flex gap-2">
                                  <span className="text-[#004481] font-black shrink-0">➔</span>
                                  <span>{line}</span>
                                </p>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-black/10 text-xs sm:text-sm">
                            <div className="space-y-1">
                              <span className="text-[10px] font-black opacity-60 uppercase tracking-wider block font-mono">{language === 'KR' ? '추천 핵심 명소' : 'KEY HOTSPOTS'}</span>
                              <p className="font-semibold text-slate-700">{language === 'KR' ? result.hotspotsKo : result.hotspotsEn}</p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] font-black opacity-60 uppercase tracking-wider block font-mono">{language === 'KR' ? '추천 부산 먹거리' : 'RECOMMENDED FOOD'}</span>
                              <p className="font-semibold text-slate-700">{language === 'KR' ? result.foodKo : result.foodEn}</p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-black/10 space-y-1.5 text-xs">
                            <span className="text-[10px] font-black opacity-60 uppercase tracking-wider block font-mono">💡 {language === 'KR' ? '로컬 가이드 꿀팁' : 'LOCAL TRAVEL TIP'}</span>
                            <p className="leading-relaxed font-semibold">{language === 'KR' ? result.tipKo : result.tipEn}</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => {
                              if (resultType === 'type1') {
                                setActiveCategory('1NIGHT');
                              } else if (resultType === 'type2') {
                                setActiveCategory('HISTORY');
                              } else {
                                setActiveCategory('3NIGHTS');
                              }
                              setQuizActive(false);
                            }}
                            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#004481] hover:bg-[#003366] text-white text-xs sm:text-sm font-black transition-all cursor-pointer shadow-md text-center"
                          >
                            {language === 'KR' ? '이 추천 코스의 무장애 동선 상세보기 ➔' : 'View Step-Free Itinerary Details ➔'}
                          </button>
                          <button
                            onClick={resetQuiz}
                            className="py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-black transition-all cursor-pointer"
                          >
                            {language === 'KR' ? '테스트 다시하기 🔄' : 'Retake Quiz 🔄'}
                          </button>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  (() => {
                    const q = quizQuestions[quizStep - 1];
                    return (
                      <div className="space-y-6 animate-fade-in text-left">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-[#004481] uppercase tracking-wider block font-mono">QUESTION 0{quizStep}</span>
                          <h4 className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                            {language === 'KR' ? q.questionKo : q.questionEn}
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {q.options.map((opt, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleAnswerSelect(opt.type)}
                              className="p-5 rounded-2xl border border-slate-200 hover:border-[#004481] hover:bg-blue-50/[0.03] text-left transition-all active:scale-[0.99] cursor-pointer group flex items-start gap-4 shadow-3xs"
                            >
                              <span className="text-2xl shrink-0 p-1 bg-slate-50 group-hover:bg-blue-50 rounded-xl border border-slate-100 transition-colors">
                                {opt.icon}
                              </span>
                              <div className="space-y-1 pt-1">
                                <span className="text-[9.5px] font-black text-[#004481] tracking-wider block font-mono">OPTION {opt.type}</span>
                                <p className="text-xs sm:text-sm font-extrabold text-slate-700 leading-normal group-hover:text-slate-900 transition-colors">
                                  {language === 'KR' ? opt.textKo : opt.textEn}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-black">
                          <button
                            onClick={() => {
                              if (quizStep > 1) {
                                  setQuizStep(prev => prev - 1);
                                  setAnswers(prev => prev.slice(0, -1));
                              } else {
                                resetQuiz();
                              }
                            }}
                            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                          >
                            {language === 'KR' ? '이전 단계' : 'Back'}
                          </button>
                          <span className="text-slate-400 font-mono">
                            {quizStep} / {quizQuestions.length}
                          </span>
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            )}
          </div>
        ) : (
          (() => {
            const course = filteredCourses[0]; 
            if (!course) {
              return (
                <div className="bg-white rounded-3xl p-12 border border-slate-100 text-center text-slate-400">
                  <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-base font-bold text-slate-600">
                    {language === 'KR' ? '선택하신 카테고리의 일정을 불러올 수 없습니다.' : 'Could not fetch this category.'}
                  </p>
                </div>
              );
            }

            const getStepIllustrationType = (titleKo: string, cat: string): 'temple' | 'park' | 'food' | 'cafe' | 'sea' | 'transit' | 'village' | 'history' | 'culture' | 'default' => {
              const normalized = titleKo.toLowerCase();
              if (normalized.includes('절') || normalized.includes('범어사') || normalized.includes('석불사') || normalized.includes('사찰') || normalized.includes('용궁사')) return 'temple';
              if (normalized.includes('공원') || normalized.includes('대숲') || normalized.includes('생태') || normalized.includes('유원지') || normalized.includes('수목원') || normalized.includes('숲')) return 'park';
              if (normalized.includes('식당') || normalized.includes('음식') || normalized.includes('국밥') || normalized.includes('파전') || normalized.includes('불고기') || normalized.includes('시장') || normalized.includes('먹거리') || normalized.includes('식도락') || normalized.includes('밀면') || normalized.includes('갈비') || normalized.includes('미식') || normalized.includes('낙지')) return 'food';
              if (normalized.includes('카페') || normalized.includes('커피') || normalized.includes('디저트')) return 'cafe';
              if (normalized.includes('바다') || normalized.includes('해변') || normalized.includes('해운대') || normalized.includes('광안리') || normalized.includes('송도') || normalized.includes('해상') || normalized.includes('수변') || normalized.includes('스카이워크') || normalized.includes('전망대') || normalized.includes('포구') || normalized.includes('선착장')) return 'sea';
              if (normalized.includes('열차') || normalized.includes('철도') || normalized.includes('모노레일') || normalized.includes('지하철') || normalized.includes('정거장') || normalized.includes('리프트') || normalized.includes('케이블카') || normalized.includes('패스')) return 'transit';
              if (normalized.includes('마을') || normalized.includes('레고') || normalized.includes('감천') || normalized.includes('동네') || normalized.includes('주택') || normalized.includes('흰여울')) return 'village';
              if (normalized.includes('역사') || normalized.includes('기념관') || normalized.includes('박물관') || normalized.includes('피난') || normalized.includes('임시수도') || normalized.includes('문화재')) return 'history';
              if (normalized.includes('문화') || normalized.includes('회관') || normalized.includes('전시') || normalized.includes('미술관') || normalized.includes('공연')) return 'culture';
              
              if (cat === 'GOURMET') return 'food';
              if (cat === 'HISTORY') return 'history';
              if (cat === '1NIGHT') return 'sea';
              if (cat === '3NIGHTS') return 'park';
              return 'default';
            };

            // Unified premium travel flyer layout mapping for each category
            const themeMap: Record<CategoryType, {
              gradient: string;
              primaryBg: string;
              primaryText: string;
              borderAccent: string;
              sealText: string;
              sealColor: string;
              illustrationType: 'temple' | 'park' | 'food' | 'cafe' | 'sea' | 'transit' | 'village' | 'history' | 'culture' | 'default';
              headerBg: string;
              accentBg: string;
              accentText: string;
              accentBorder: string;
            }> = {
              DAY: {
                gradient: "from-[#004481] via-[#005fa8] to-[#012521]",
                primaryBg: "bg-emerald-50/40",
                primaryText: "text-emerald-950",
                borderAccent: "border-emerald-200",
                sealText: language === 'KR' ? "★ 싱그러운 하루 특선" : "★ ECO GREEN DETOX",
                sealColor: "bg-emerald-400 text-emerald-950",
                illustrationType: "park",
                headerBg: "bg-emerald-50",
                accentBg: "bg-emerald-50",
                accentText: "text-emerald-800",
                accentBorder: "border-emerald-200",
              },
              '1NIGHT': {
                gradient: "from-[#0c0f2b] via-[#161a4f] to-[#31255c]",
                primaryBg: "bg-indigo-50/40",
                primaryText: "text-indigo-950",
                borderAccent: "border-indigo-200",
                sealText: language === 'KR' ? "★ 로맨틱 야경 특선" : "★ NIGHT HORIZON SPECIAL",
                sealColor: "bg-violet-400 text-white",
                illustrationType: "sea",
                headerBg: "bg-indigo-50",
                accentBg: "bg-violet-50/60",
                accentText: "text-violet-800",
                accentBorder: "border-violet-200/50",
              },
              '2NIGHTS': {
                gradient: "from-[#a13905] via-[#cf4f0a] to-[#7c1432]",
                primaryBg: "bg-amber-50/40",
                primaryText: "text-amber-950",
                borderAccent: "border-amber-200",
                sealText: language === 'KR' ? "★ 감성골목 2박 특선" : "★ TRENDY ALLEY EXPLORER",
                sealColor: "bg-amber-400 text-amber-950",
                illustrationType: "village",
                headerBg: "bg-amber-50",
                accentBg: "bg-amber-500/10",
                accentText: "text-amber-900",
                accentBorder: "border-amber-200/50",
              },
              '3NIGHTS': {
                gradient: "from-[#023e20] via-[#056334] to-[#012521]",
                primaryBg: "bg-emerald-50/40",
                primaryText: "text-emerald-950",
                borderAccent: "border-emerald-200",
                sealText: language === 'KR' ? "★ 자연사색 3박 특선" : "★ BOTANICAL ESCAPE",
                sealColor: "bg-emerald-400 text-slate-900",
                illustrationType: "park",
                headerBg: "bg-emerald-50",
                accentBg: "bg-emerald-50",
                accentText: "text-emerald-800",
                accentBorder: "border-emerald-200",
              },
              '4NIGHTS': {
                gradient: "from-[#003875] via-[#0058b5] to-[#041a38]",
                primaryBg: "bg-sky-50/40",
                primaryText: "text-sky-950",
                borderAccent: "border-sky-200",
                sealText: language === 'KR' ? "★ 센텀마스터 4박 특선" : "★ DEEP STAY CATALOG",
                sealColor: "bg-sky-400 text-slate-900",
                illustrationType: "transit",
                headerBg: "bg-sky-50",
                accentBg: "bg-sky-50",
                accentText: "text-sky-850",
                accentBorder: "border-sky-200",
              },
              GOURMET: {
                gradient: "from-[#b5142a] via-[#e62e49] to-[#800515]",
                primaryBg: "bg-rose-50/40",
                primaryText: "text-rose-950",
                borderAccent: "border-rose-200",
                sealText: language === 'KR' ? "★ 백년미식 백투백 특선" : "★ 100-YEAR CULINARY MAP",
                sealColor: "bg-rose-400 text-slate-900",
                illustrationType: "food",
                headerBg: "bg-rose-50",
                accentBg: "bg-rose-500/[0.04]",
                accentText: "text-rose-800",
                accentBorder: "border-rose-200/60",
              },
              HISTORY: {
                gradient: "from-[#4a3f35] via-[#635548] to-[#29221b]",
                primaryBg: "bg-stone-100/50",
                primaryText: "text-stone-950",
                borderAccent: "border-stone-200",
                sealText: language === 'KR' ? "★ 피란수도 역사 특선" : "★ HISTORIC MEMOIR TRAIL",
                sealColor: "bg-amber-200 text-stone-900",
                illustrationType: "history",
                headerBg: "bg-stone-50",
                accentBg: "bg-stone-50/70",
                accentText: "text-amber-900",
                accentBorder: "border-stone-200",
              }
            };

            const targetCourse = activeCategory === 'DAY'
              ? (filteredCourses[activeDayCourseIndex] || filteredCourses[0])
              : filteredCourses[0];

            const theme = themeMap[activeCategory as CategoryType] || themeMap['DAY'];

            // Extract distinct days present in steps
            const daysArray = Array.from(new Set(targetCourse.steps.map(step => {
              const timeLower = step.time?.toLowerCase() || '';
              if (timeLower.includes('day 1')) return 'Day 1';
              if (timeLower.includes('day 2')) return 'Day 2';
              if (timeLower.includes('day 3')) return 'Day 3';
              if (timeLower.includes('day 4')) return 'Day 4';
              if (timeLower.includes('day 5')) return 'Day 5';
              return 'Day 1';
            })));
            daysArray.sort((a, b) => a.localeCompare(b));
            if (daysArray.length === 0) daysArray.push('Day 1');

            const getStepsForDay = (dayStr: string) => {
              return targetCourse.steps.filter(step => {
                const timeLower = step.time?.toLowerCase() || '';
                if (dayStr === 'Day 1') {
                  return timeLower.includes('day 1') || 
                    (!timeLower.includes('day 2') && 
                     !timeLower.includes('day 3') && 
                     !timeLower.includes('day 4') && 
                     !timeLower.includes('day 5'));
                }
                return timeLower.includes(dayStr.toLowerCase());
              });
            };

            return (
              <div className="space-y-8 animate-fade-in text-left">
                {/* DAY Course Sub-Tab Selector (only for DAY category) */}
                {activeCategory === 'DAY' && (
                  <div className="bg-slate-50/85 p-1.5 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row gap-2 shadow-[inset_0_1px_3px_rgba(0,0,0,0.01)]">
                    <button
                      onClick={() => setActiveDayCourseIndex(0)}
                      className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer border ${
                        activeDayCourseIndex === 0
                          ? 'bg-[#004481] text-white shadow-md border-[#004481] transform scale-[1.01]'
                          : 'bg-white hover:bg-slate-50 text-slate-500 border-slate-200/50'
                      }`}
                    >
                      <ElegantIllustration type="history" size="sm" className={activeDayCourseIndex === 0 ? "text-white" : "text-slate-400"} />
                      <span>{language === 'KR' ? '부산 중구 원도심 역사·미식' : 'Historic Jung-gu Alleys'}</span>
                    </button>
                    <button
                      onClick={() => setActiveDayCourseIndex(1)}
                      className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer border ${
                        activeDayCourseIndex === 1
                          ? 'bg-[#004481] text-white shadow-md border-[#004481] transform scale-[1.01]'
                          : 'bg-white hover:bg-slate-50 text-slate-500 border-slate-200/50'
                      }`}
                    >
                      <ElegantIllustration type="park" size="sm" className={activeDayCourseIndex === 1 ? "text-white" : "text-slate-400"} />
                      <span>{language === 'KR' ? '초록초록 디톡스 생태공원' : 'Green Eco Detox Park'}</span>
                    </button>
                  </div>
                )}

                {/* 1. PREMIUM TRAVEL FLYER HEADER BANNER */}
                <div className={`relative bg-gradient-to-br ${theme.gradient} text-white p-8 sm:p-12 rounded-4xl border-4 border-white shadow-xl overflow-hidden`}>
                  {/* Decorative grid pattern layout */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  
                  {/* Decorative frame borders inside */}
                  <div className="absolute inset-3 sm:inset-4 border border-white/20 rounded-3xl pointer-events-none"></div>
                  
                  {/* Blueprint crosshairs / Corner plus signs representing structural design */}
                  <div className="absolute top-5 left-5 text-white/30 text-lg font-mono select-none">+</div>
                  <div className="absolute top-5 right-5 text-white/30 text-lg font-mono select-none">+</div>
                  <div className="absolute bottom-5 left-5 text-white/30 text-lg font-mono select-none">+</div>
                  <div className="absolute bottom-5 right-5 text-white/30 text-lg font-mono select-none">+</div>

                  {/* Elegant Top Seals */}
                  <div className="flex flex-wrap items-center gap-3 mb-6 relative z-10">
                    <span className={`${theme.sealColor} text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-lg shadow-sm border border-black/10 flex items-center gap-2 transform -rotate-1`}>
                      <span>{theme.sealText}</span>
                    </span>
                    <span className="bg-white/15 backdrop-blur-md text-white text-[10px] font-bold px-3.5 py-1.5 rounded-lg border border-white/20 shadow-xs flex items-center gap-1.5">
                      <Footprints className="w-3.5 h-3.5 shrink-0" />
                      <span>{language === 'KR' ? '무장애 1등급 검증 코스' : 'Barrier-Free Grade 1 Approved'}</span>
                    </span>
                  </div>

                  <div className="relative z-10 space-y-4 max-w-4xl">
                    <h2 className="text-2xl sm:text-4xl font-black font-heading tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                      {language === 'KR' ? targetCourse.titleKo : targetCourse.titleEn}
                    </h2>
                    <p className="text-xs sm:text-base text-white/90 font-medium leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]">
                      {language === 'KR' ? targetCourse.subtitleKo : targetCourse.subtitleEn}
                    </p>
                  </div>

                  {/* Dynamic side Illustration instead of floating stickers */}
                  <div className="absolute right-6 bottom-6 opacity-10 hidden md:block scale-150 transform translate-x-4 translate-y-4 text-white">
                    <ElegantIllustration type={theme.illustrationType} size="hero" />
                  </div>
                </div>

                {/* 2. "어떤 패키지여행인가요?" Q&A INTRO CARD */}
                <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-150 shadow-sm relative overflow-hidden">
                  {/* Floating light decorative category illustration */}
                  <div className="absolute -top-6 -right-6 text-slate-100 opacity-20 select-none pointer-events-none scale-150 transform rotate-12">
                    <ElegantIllustration type={theme.illustrationType} size="hero" />
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-slate-100 pb-8 mb-8">
                    {/* Retro Illustrated Stamp with vector art */}
                    <div className="flex flex-col items-center justify-center text-center p-4 w-32 h-32 rounded-full bg-slate-50 border-2 border-dashed border-[#004481]/20 shrink-0 shadow-xs relative">
                      <ElegantIllustration type={theme.illustrationType} size="md" className="text-[#004481]" />
                      <span className="text-[10px] font-black text-[#004481] mt-2 bg-blue-50/80 border border-blue-200/50 px-2.5 py-1 rounded-md whitespace-nowrap tracking-tight shadow-3xs">
                        {language === 'KR' ? '안전 보장' : "Safe Way"}
                      </span>
                    </div>

                    <div className="text-left space-y-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-100 px-4 py-1.5 text-[11px] font-black text-rose-600 tracking-wide">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>{language === 'KR' ? 'Q. 어떤 여행 일정인가요?' : 'Q. What kind of tour is this?'}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-800 leading-snug">
                        {language === 'KR' 
                          ? '가족 • 연인 • 부모님 모두가 평온하게 누리는 100% 검증된 무장애 힐링 안내서' 
                          : 'A 100% verified step-free path designed meticulously for comfortable stays.'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed font-sans">
                        {language === 'KR'
                          ? '부산의 푸른 비경은 보고 싶지만 가파른 지형이나 턱 높은 식당 때문에 혹시 걱정하셨나요? 이 패키지는 휠체어나 유모차가 단차 걱정 없이 부드럽게 진입할 수 있는 넓은 도로, 완만한 경사 우회 슬로프, 장애인 전용 엘리베이터 연계 및 안전 시설이 완벽히 검증된 명품 도보 노선입니다.'
                          : 'Worried about steep hills, steps, or inaccessible facilities? Fret not! This masterpiece itinerary features fully paved coastal promenades, step-free store entries, public high-speed lifts, and accessible facilities.'}
                      </p>
                    </div>
                  </div>

                  {/* Bullet badges using Lucide Icons for high-end feel */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-150/80 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-[#004481]" />
                      </div>
                      <div>
                        <p className="text-[11.5px] font-black text-[#004481]">{language === 'KR' ? '추천 대상' : 'Recommended For'}</p>
                        <p className="text-xs text-slate-600 font-bold mt-1 leading-relaxed">
                          {language === 'KR' ? '휠체어/유모차 이용객, 실버 세대 가족' : 'Wheelchairs, strollers, seniors, and active families'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-150/80 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        <Footprints className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div>
                        <p className="text-[11.5px] font-black text-emerald-800">{language === 'KR' ? '보행 난이도' : 'Walking Level'}</p>
                        <p className="text-xs text-slate-600 font-bold mt-1 leading-relaxed">
                          {language === 'KR' ? '계단 완전 배제, 완만하고 평탄한 포장로' : 'Zero staircases, fully paved wide roads'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-150/80 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-purple-700" />
                      </div>
                      <div>
                        <p className="text-[11.5px] font-black text-purple-800">{language === 'KR' ? '편의 시설' : 'Infrastructure'}</p>
                        <p className="text-xs text-slate-600 font-bold mt-1 leading-relaxed">
                          {language === 'KR' ? '장애인 화장실 인접, 넓은 무단차 엘리베이터' : 'Accessible restroom networks, high-speed lifts'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. CORE MILESTONES CARD GRID with elegant vector illustrations */}
                <div className="space-y-5">
                  <div className="text-center space-y-1.5">
                    <span className="bg-blue-50 text-[#004481] px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider inline-block border border-blue-150">
                      ★ {language === 'KR' ? '부산 코스 주요 경유지 일람' : 'Course Milestones At a Glance'}
                    </span>
                    <h3 className="text-base sm:text-xl font-black text-slate-800">
                      {language === 'KR' ? '대표 명소를 동선 순서대로 만나보세요' : 'Explore Major Milestones in Chronological Order'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 justify-center">
                    {targetCourse.steps.map((step, idx) => {
                      const illType = getStepIllustrationType(step.titleKo, activeCategory);

                      return (
                        <div 
                          key={idx}
                          className="group flex flex-col items-center bg-white p-6 rounded-3xl border border-slate-150 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md text-center cursor-pointer relative overflow-hidden"
                        >
                          {/* Inner double border decorative line */}
                          <div className="absolute inset-1.5 border border-slate-100 rounded-2xl pointer-events-none group-hover:border-blue-100 transition-colors"></div>

                          {/* Illustration shape mimicking the poster's products */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-50/80 border border-slate-150 group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-all flex items-center justify-center shadow-3xs relative shrink-0 text-slate-600 group-hover:text-[#004481]">
                            <div className="scale-90 group-hover:scale-100 transition-transform duration-300">
                              <ElegantIllustration type={illType} size="md" />
                            </div>
                            {/* Tiny badge with step number */}
                            <span className="absolute -bottom-1 right-1 w-6 h-6 rounded-full bg-[#004481] text-white flex items-center justify-center text-[10px] font-black border-2 border-white shadow-xs">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                          </div>

                          <div className="mt-4 space-y-1.5 w-full relative z-10">
                            <h4 className="text-xs sm:text-sm font-black text-slate-800 line-clamp-1 group-hover:text-[#004481] transition-colors leading-tight px-1">
                              {language === 'KR' 
                                ? step.titleKo.split(':')[0].split('-').pop()?.trim() 
                                : step.titleEn.split(':')[0].split('-').pop()?.trim()}
                            </h4>
                            <p className="text-[9px] text-slate-400 font-black tracking-widest uppercase line-clamp-1">
                              {language === 'KR' ? '무장애 검증' : 'Verified'}
                            </p>
                            <div className="pt-1">
                              <span className="text-[9.5px] px-2.5 py-1 rounded-md bg-blue-50/60 text-blue-700 font-black border border-blue-100/50 group-hover:bg-[#004481] group-hover:text-white group-hover:border-[#004481] transition-all whitespace-nowrap">
                                details ➔
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>


                {/* 4. DETAIL CHRONOLOGICAL ITINERARY TIMELINE & STORY SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Category Highlight Sidebar (Story section) */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Retro Travel Flyer Highlights Box */}
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4 relative overflow-hidden text-left">
                      <div className="absolute top-0 right-0 p-6 text-5xl opacity-5 pointer-events-none">⚓</div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        {language === 'KR' ? 'CAMP MEMO / 여행 가이드 코멘트' : 'CAMP MEMO / LOCAL GUIDE NOTE'}
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-[#004481] font-heading flex items-center gap-1.5">
                        <Compass className="w-4 h-4 shrink-0" />
                        <span>{language === 'KR' ? '동선 검증 및 이동 비결' : 'Verified Transit Secrets'}</span>
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                        {language === 'KR' 
                          ? '오목조목 정비된 데크길과 계단이 없는 평탄 지도를 활용해, 여행 내내 계단을 한 번도 마주하지 않도록 설계되었습니다. 각 도착지마다 지하철 엘리베이터 승차 위치와 턱 없는 진입 슬라이드를 사전에 검증하여 여정이 더욱 포근해집니다.' 
                          : 'Our expert local guides have mapped and physically walked each street. High-speed elevators and flat pavements allow strollers and wheelchairs to wander worry-free.'}
                      </p>

                      <div className="pt-3 border-t border-slate-200/80 space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">INFO CHECK / 요약 규격</span>
                        <div className="grid grid-cols-2 gap-2 text-[10.5px] font-black text-slate-700">
                          <div className="bg-white p-2 rounded-xl border border-slate-200/50">
                            <span className="text-slate-400 block text-[8.5px] mb-0.5">{language === 'KR' ? '소요 시간' : 'Duration'}</span>
                            {language === 'KR' ? targetCourse.durationKo : targetCourse.durationEn}
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-slate-200/50">
                            <span className="text-slate-400 block text-[8.5px] mb-0.5">{language === 'KR' ? '보행 난이도' : 'Difficulty'}</span>
                            {language === 'KR' ? `쉬움 [${targetCourse.difficultyKo}]` : `Easy [${targetCourse.difficultyEn}]`}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Extra Sidebar based on active category (preserving historical details) */}
                    {activeCategory === 'HISTORY' && (
                      <div className="bg-[#fcfaf4] p-5.5 rounded-3xl border border-amber-200/70 text-left space-y-3 font-sans">
                        <span className="text-[10px] font-black text-amber-800 tracking-wider block uppercase font-mono">HISTORY DETAILED INSIGHT / 초량 이바구 돋보기</span>
                        <h4 className="text-sm font-black text-amber-950 font-heading">6.25 피란 수도와 산복도로</h4>
                        <p className="text-xs text-stone-500 leading-relaxed font-semibold">
                          {language === 'KR' 
                            ? '6.25 전쟁 당시 수많은 피란민들이 도망쳐 내려와 영도와 초량 산기슭에 손수 돌을 쌓아 임시 가옥을 지으며 터전을 이룬 것이 오늘날 산복도로의 기원입니다. 과거에 물동이를 이고 힘겹게 오르던 고갯길은 이제 주민과 여행자를 위해 모노레일과 야자매트로 다정하게 정비되었습니다.' 
                            : 'During the Korean War, thousands of refugees built stone homes on vertical cliffs surrounding Choryang. The historical steep valleys are now fully equipped with a modern monorail for seniors and stroller access.'}
                        </p>
                      </div>
                    )}

                    {activeCategory === '1NIGHT' && (
                      <div className="bg-indigo-50/50 p-5 rounded-3xl border border-indigo-150/70 text-left space-y-2.5">
                        <h6 className="text-xs font-black text-indigo-900 flex items-center gap-1.5">
                          <span>☕</span>
                          <span>{language === 'KR' ? '아침 일출 명당 & 보행 편한 카페' : 'Morning Vista Cafe Recommendations'}</span>
                        </h6>
                        <p className="text-[11px] sm:text-xs text-indigo-950/70 font-semibold leading-relaxed">
                          {language === 'KR' 
                            ? '민락항이나 광안리 수변 공원 근처 카페들은 대부분 1층에 턱이 아예 없는 통유리로 지어져 있어 아침 바다와 갈매기를 감상하며 따뜻한 바닐라 라떼를 맛보기 완전 편안합니다.' 
                            : 'Most oceanfront cafes around Gwangalli or Millak harbor are structurally barrier-free, allowing cozy stroller roll-ups right next to sunlit windows.'}
                        </p>
                      </div>
                    )}

                    {activeCategory === '2NIGHTS' && (
                      <div className="bg-amber-500/[0.02] p-5 rounded-3xl border border-dashed border-amber-200 mt-4 text-left">
                        <span className="text-[10px] font-black text-amber-850 uppercase tracking-wider block mb-1">Accessibility Insight / 편안한 관람 가이드</span>
                        <p className="text-xs text-amber-900/80 leading-normal font-semibold">
                          {language === 'KR' 
                            ? '전포·서면 상가 구역은 평지 보도 정비가 잘 되어 있으며, 해변열차 탑승 시 리프트 보드나 휠체어 경사 슬라이드가 안정적으로 지원되므로 걱정 없이 누릴 수 있습니다.' 
                            : 'Jeonpo & Seomyeon have flat shopping lanes, while Haeundae Green Railway station has premium accessibility ramps and boarding platform lifts for robust safety.'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Detailed Timeline / Step-by-Step path */}
                  <div className="lg:col-span-2 space-y-6">
                    {daysArray.map((dayLabel) => {
                      const daySteps = getStepsForDay(dayLabel);
                      if (daySteps.length === 0) return null;

                      return (
                        <div 
                          key={dayLabel} 
                          className="bg-white p-6 sm:p-8 rounded-4xl border border-slate-150 shadow-[0_2px_12px_rgba(0,0,0,0.01)] space-y-6 text-left"
                        >
                          <h4 className="text-base sm:text-lg font-black text-slate-800 border-b border-slate-100 pb-3.5 flex items-center gap-2.5">
                            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 text-[#004481] font-sans font-black text-xs border border-blue-100 shadow-2xs">
                              {dayLabel === 'Day 1' ? 'D1' : dayLabel === 'Day 2' ? 'D2' : dayLabel === 'Day 3' ? 'D3' : dayLabel === 'Day 4' ? 'D4' : 'D5'}
                            </span>
                            <span>{language === 'KR' ? `${dayLabel} 무장애 동선 안내` : `${dayLabel} Step-Free Details`}</span>
                          </h4>

                          <div className="relative pl-6 sm:pl-8 space-y-6 text-left">
                            {/* Vertical timeline track line */}
                            <div className="absolute left-[11px] sm:left-[15px] top-3.5 bottom-6 w-0.5 border-l border-dashed border-slate-200"></div>

                            {daySteps.map((st, sidx) => (
                              <div key={sidx} className="relative group text-left space-y-2">
                                {/* Bullet number inside a high-contrast sticker */}
                                <div className="absolute -left-[27px] sm:-left-[31px] top-1.5 w-6 h-6 rounded-full bg-slate-50 border border-slate-300 flex items-center justify-center text-[10px] font-black text-slate-700 shadow-3xs font-mono group-hover:bg-[#004481] group-hover:text-white group-hover:border-[#004481] transition-all duration-200">
                                  {sidx + 1}
                                </div>

                                <div className="space-y-1 text-left">
                                  {/* Step Time or Indicator */}
                                  {st.time && (
                                    <span className="text-[10px] font-black text-slate-400 tracking-wide block uppercase font-mono">
                                      ⏱️ {st.time.replace(/Day\s*\d+\s*-\s*/gi, '')}
                                    </span>
                                  )}

                                  <h5 className="text-sm sm:text-base font-black text-stone-850 flex flex-wrap items-center gap-1.5 leading-snug">
                                    <span className="text-blue-700 font-black mr-0.5">
                                      {language === 'KR' ? `Course ${sidx + 1} ➔` : `Course ${sidx + 1} ➔`}
                                    </span>
                                    <span>{language === 'KR' ? st.titleKo : st.titleEn}</span>
                                  </h5>

                                  <p className="text-xs sm:text-sm text-stone-500 font-semibold leading-relaxed pt-1">
                                    {language === 'KR' ? st.descKo : st.descEn}
                                  </p>

                                  {/* Gourmet Michelin-guide indicators */}
                                  {activeCategory === 'GOURMET' && (
                                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-black text-rose-900 bg-rose-50/50 p-2 rounded-xl mt-2 max-w-max border border-rose-100">
                                      <span>✅ {language === 'KR' ? '턱 없음 / 우회 경판 완비' : 'No doorsill doorstep'}</span>
                                      <span className="w-1 h-1 bg-rose-300 rounded-full"></span>
                                      <span>✅ {language === 'KR' ? '넓은 입식 의자테이블' : 'Seat tables provided'}</span>
                                    </div>
                                  )}

                                  {/* Public Transit Subway Station accessibility guidance */}
                                  {st.stationInfoKo && (
                                    <div className="mt-2.5 text-[10px] sm:text-[10.5px] font-bold text-blue-800 bg-blue-50/50 px-3 py-1 rounded-xl border border-blue-100/60 max-w-max flex items-center gap-1">
                                      <span>🚇</span>
                                      <span>{language === 'KR' ? st.stationInfoKo : st.stationInfoEn}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. OVERALL TRIP TIPS / PRECAUTIONS BOTTOM BANNER */}
                <div className={`p-5 sm:p-7 text-left flex items-start gap-4 rounded-3xl border ${theme.accentBorder} ${theme.accentBg}`}>
                  <div className={`p-2.5 rounded-xl bg-white border ${theme.accentBorder} ${theme.accentText} shrink-0 mt-0.5 shadow-3xs`}>
                    <Info className="w-4 h-4 shrink-0" />
                  </div>
                  <div className="space-y-1 text-left">
                    <span className={`text-[10.5px] font-black ${theme.accentText} uppercase tracking-wider block`}>
                      ★ {language === 'KR' ? '무장애 안전 이동 및 핵심 꿀팁' : 'BARRIER-FREE LOCAL TRIP TIPS'}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                      {language === 'KR' ? targetCourse.overallTipKo : targetCourse.overallTipEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })())}

          {/* ========================================================= */}
          {/* ORIGINAL BACKUP RENDER ENGINE (Bypassed but kept intact for fallback safety) */}
          {/* ========================================================= */}
          {(() => {
            const course = filteredCourses[0];
            if (!course) return null;

            switch (activeCategory) {
              // -------------------------------------------------------------
              // PAGE 1: DAY TRIP (당일치기) - Styled like a high-speed travel voucher/pass
              // -------------------------------------------------------------
              case 'DAY': {
                const course = filteredCourses[activeDayCourseIndex] || filteredCourses[0];
                const isJunggu = activeDayCourseIndex === 0;
                
                // Unified Theme Configuration
                const t = isJunggu 
                  ? {
                      gradient: "from-amber-500/10 via-amber-500/5 to-white",
                      border: "border-amber-200",
                      badgeBg: "bg-amber-100",
                      badgeText: "text-amber-900",
                      titleText: "text-amber-950",
                      borderDashed: "border-amber-200",
                      icon: "🏛️",
                      bulletIcon: "🏛️",
                      bulletColor: "border-amber-500 text-amber-600",
                      stepBg: "bg-white p-5 rounded-2xl border border-amber-100 hover:border-amber-200 transition-all shadow-[0_2px_15px_rgba(245,158,11,0.02)] text-left",
                      stepHeaderBg: "bg-amber-50 text-amber-850",
                      tipBg: "bg-amber-500/[0.03] p-5 sm:p-6 text-left flex items-start gap-3.5 rounded-2xl border border-amber-200/50",
                      tipIconBg: "p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5",
                      tipText: "text-xs sm:text-sm text-amber-900/80 leading-relaxed font-semibold",
                      lineColor: "border-amber-400",
                      passTitleKo: "🎫 중구 원도심 역사·미식 모바일 패스",
                      passTitleEn: "🎫 Jung-gu History & Gourmet 1-Day Pass",
                      passDescKo: "BIFF광장의 따스한 길거리 씨앗호떡 미식부터 용두산공원 하늘전망대까지, 원도심의 매력과 피란 기억을 유모차·휠체어 맞춤형 편안한 경사로로 편리하게 이동하며 완전 정복합니다.",
                      passDescEn: "A master guide wandering through Gukje Market, Bosudong book alleys, and panoramic clifftop hills seamlessly without step limits.",
                      ticketNum: "BS-JUNGGU-HISTORIC-2026",
                      tipLabelKo: "💡 중구 골목길 이동 완벽 돌파 꿀팁!",
                      tipLabelEn: "💡 JUNG-GU NAVIGATION LOCAL TIP",
                      durationKo: "추천 소요: 당일 8시간 완결",
                      durationEn: "Duration: 8 Hours"
                    }
                  : {
                      gradient: "from-emerald-500/10 via-emerald-500/5 to-white",
                      border: "border-emerald-250",
                      badgeBg: "bg-emerald-100",
                      badgeText: "text-emerald-950",
                      titleText: "text-emerald-990",
                      borderDashed: "border-emerald-200",
                      icon: "🌿",
                      bulletIcon: "🌳",
                      bulletColor: "border-emerald-500 text-emerald-600",
                      stepBg: "bg-white p-5 rounded-2xl border border-emerald-100 hover:border-emerald-200 transition-all shadow-[0_2px_15px_rgba(16,185,129,0.02)] text-left",
                      stepHeaderBg: "bg-emerald-50 text-emerald-800",
                      tipBg: "bg-emerald-500/[0.03] p-5 sm:p-6 text-left flex items-start gap-3.5 rounded-2xl border border-emerald-200/50",
                      tipIconBg: "p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0 mt-0.5",
                      tipText: "text-xs sm:text-sm text-emerald-900/80 leading-relaxed font-semibold",
                      lineColor: "border-emerald-400",
                      passTitleKo: "🎫 초록초록 디톡스 일일 모바일 패스",
                      passTitleEn: "🎫 Green Green Detox 1-Day Pass",
                      passDescKo: "낙동강 물길을 따라 삼락, 맥도, 대저생태공원까지 드넓게 흘러가는 초록빛 속에서 온몸 가득 맑은 숨과 평화를 얻는 당일 전용 비대면 가이드입니다.",
                      passDescEn: "A master guide strolling through serene green grass waves with zero step barriers in 1 day.",
                      ticketNum: "BS-ECO-DETOX-2026",
                      tipLabelKo: "💡 맑은 생태숲 전용 이동 및 편의 꿀팁!",
                      tipLabelEn: "💡 ECO-FRIENDLY TRAVEL TIP",
                      durationKo: "추천 소요: 당일 6시간 완결",
                      durationEn: "Duration: 6 Hours"
                    };

                return (
                  <div className="space-y-6 animate-fade-in">
                    
                    {/* Course Selection Sub-Tabs */}
                    <div className="bg-slate-50/80 p-1.5 rounded-2xl border border-slate-100/70 flex flex-col sm:flex-row gap-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                      <button
                        onClick={() => setActiveDayCourseIndex(0)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer border ${
                          activeDayCourseIndex === 0
                            ? 'bg-amber-600 text-white shadow-md border-amber-600 transform scale-[1.01]'
                            : 'bg-white hover:bg-slate-50 text-slate-500 border-slate-200/50'
                        }`}
                      >
                        <span>🏛️</span>
                        <span>{language === 'KR' ? '부산 중구 원도심 역사·미식' : 'Historic Jung-gu Alleys'}</span>
                      </button>
                      <button
                        onClick={() => setActiveDayCourseIndex(1)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer border ${
                          activeDayCourseIndex === 1
                            ? 'bg-emerald-600 text-white shadow-md border-emerald-600 transform scale-[1.01]'
                            : 'bg-white hover:bg-slate-50 text-slate-500 border-slate-200/50'
                        }`}
                      >
                        <span>🌿</span>
                        <span>{language === 'KR' ? '초록초록 디톡스 생태공원' : 'Green Eco Detox Park'}</span>
                      </button>
                    </div>

                    {/* Retro Themed Ticket Header */}
                    <div className={`bg-gradient-to-br ${t.gradient} p-6 sm:p-8 rounded-3xl border ${t.border} shadow-sm relative overflow-hidden`}>
                      <div className="absolute right-0 top-0 text-7xl select-none opacity-5 transform translate-x-4 -translate-y-4">{t.icon}</div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`bg-white/80 border ${t.border} ${t.badgeText} text-[10px] font-black px-2.5 py-1 rounded-full uppercase`}>
                          {language === 'KR' ? t.durationKo : t.durationEn}
                        </span>
                        <span className="bg-stone-100 text-stone-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          {language === 'KR' ? '보행 편의성: 매우 편함 (낮은 단차)' : 'Step-free level: Very Convenient (No Steps)'}
                        </span>
                      </div>

                      <h3 className={`text-xl sm:text-2xl font-black font-heading ${t.titleText} tracking-tight leading-tight`}>
                        {language === 'KR' ? t.passTitleKo : t.passTitleEn}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-500 font-semibold mt-1">
                        {language === 'KR' ? t.passDescKo : t.passDescEn}
                      </p>

                      {/* Mock Ticket Barcode */}
                      <div className={`mt-5 pt-4 border-t border-dashed ${t.borderDashed} flex items-center justify-between gap-4`}>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-stone-400 tracking-wider">ECO-TICKET NUMBER</span>
                          <span className="text-xs font-mono font-bold text-stone-700">#{t.ticketNum}</span>
                        </div>
                        <div className="flex gap-0.5 h-7 opacity-25">
                          <div className="w-[1px] bg-black h-full"></div>
                          <div className="w-[3px] bg-black h-full"></div>
                          <div className="w-[1px] bg-black h-full"></div>
                          <div className="w-[2px] bg-black h-full"></div>
                          <div className="w-[4px] bg-black h-full"></div>
                          <div className="w-[1px] bg-black h-full"></div>
                          <div className="w-[2px] bg-black h-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Hourly Train Route Steps */}
                    <div className="relative pl-6 sm:pl-8 space-y-6 text-left" id="day-trip-steps">
                      {/* Vertical Train Track connecting dots */}
                      <div className={`absolute left-[11px] sm:left-[15px] top-6 bottom-6 w-0.5 border-l-2 border-dashed ${t.lineColor}`}></div>

                      {course.steps.map((step, idx) => (
                        <div key={idx} className="relative group text-left">
                          {/* Station-like themed bullet */}
                          <div className={`absolute -left-[27px] sm:-left-[31px] top-2 w-6 h-6 rounded-full bg-white border-2 ${t.bulletColor} flex items-center justify-center text-[10px] font-black shadow-sm`}>
                            {t.bulletIcon}
                          </div>

                          <div className={t.stepBg}>
                            {step.stationInfoKo && (
                              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b ${t.borderDashed}/50 pb-2 mb-3`}>
                                <span className={`text-[10.5px] font-bold ${t.badgeText} ${t.badgeBg} rounded-lg px-2 py-0.5 max-w-max self-start text-left`}>
                                  🚇 {language === 'KR' ? step.stationInfoKo : step.stationInfoEn}
                                </span>
                              </div>
                            )}

                            <h4 className="text-sm sm:text-base font-black text-stone-800 leading-snug">
                              {language === 'KR' ? step.titleKo : step.titleEn}
                            </h4>
                            <p className="text-xs sm:text-sm text-stone-500 font-semibold leading-relaxed font-sans mt-2">
                              {language === 'KR' ? step.descKo : step.descEn}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Local tip highlight */}
                    <div className={t.tipBg}>
                      <div className={t.tipIconBg}>
                        <Info className="w-4 h-4 shrink-0" />
                      </div>
                      <div className="space-y-1 select-none text-left">
                        <span className="text-[10.5px] font-black uppercase tracking-wide opacity-80">
                          {language === 'KR' ? t.tipLabelKo : t.tipLabelEn}
                        </span>
                        <p className={t.tipText}>
                          {language === 'KR' ? course.overallTipKo : course.overallTipEn}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              // -------------------------------------------------------------
              // PAGE 2: 1 NIGHT (1박) - Styled like a romantic twilight page
              // -------------------------------------------------------------
              case '1NIGHT':
                return (
                  <div className="space-y-6 animate-fade-in">
                    {/* Starry Night Sky Banner */}
                    <div className="bg-gradient-to-r from-violet-950 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-indigo-950 text-white relative overflow-hidden shadow-lg">
                      {/* Little glowing star indicators */}
                      <div className="absolute top-4 right-12 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                      <div className="absolute top-10 right-28 w-1 h-1 bg-white rounded-full opacity-60"></div>
                      <div className="absolute bottom-6 right-8 w-1 h-1 bg-amber-200 rounded-full animate-pulse"></div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-indigo-500/35 text-indigo-200 text-[10px] font-black px-2.5 py-1 rounded-full border border-indigo-400/20">
                          {language === 'KR' ? '🌙 로맨틱 야경 1박 2일 수평선' : '🌙 Romantic Night Out'}
                        </span>
                        <span className="bg-violet-500/30 text-violet-200 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          {language === 'KR' ? '동선: 계단 없는 평지 가득' : 'No steps beachfront paths'}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black font-heading text-violet-100 tracking-tight leading-tight">
                        {language === 'KR' ? '🌌 광안리 밤바다 & 트렌디 복합문화 쉼터 1박 2일 코스' : '🌌 Gwangalli Night Wave LED & Trendy Cultural Shelter'}
                      </h3>
                      <p className="text-xs sm:text-sm text-indigo-200/80 mt-1 max-w-2xl font-semibold">
                        {language === 'KR' 
                          ? '달이 뜨는 광안리 바닷가의 로맨틱한 파도 버스킹과 대형 엘리베이터 동선이 갖춰진 민락더마켓 오션뷰 맛집 정복!' 
                          : 'Exquisite evening restaurant plazas and broad wood coastal paths built friendly for stroller & elderly stays.'}
                      </p>
                    </div>

                    {/* Vertical Day-by-Day Journey List */}
                    <div className="space-y-6">
                      {/* Day 1 Section */}
                      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-violet-100 shadow-[0_4px_20px_rgba(109,40,217,0.02)] space-y-5 text-left">
                        <h4 className="text-base sm:text-lg font-black text-violet-950 border-b border-violet-100/70 pb-3 flex items-center gap-2">
                          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-violet-50 text-violet-700 font-sans font-black text-xs">
                            D1
                          </span>
                          <span>{language === 'KR' ? 'Day 1 일정' : 'Day 1 Itinerary'}</span>
                        </h4>

                        <div className="relative pl-6 sm:pl-8 space-y-6 text-left">
                          {/* Vertical Track lines */}
                          <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-3 w-0.5 border-l border-dashed border-violet-200"></div>

                          {course.steps
                            .filter(st => st.time?.includes('Day 1'))
                            .map((st, sidx) => (
                              <div key={sidx} className="relative group text-left">
                                {/* bullet number */}
                                <div className="absolute -left-[27px] sm:-left-[31px] top-0.5 w-6 h-6 rounded-full bg-violet-50 border border-violet-200 flex items-center justify-center text-[10px] font-black text-violet-700 shadow-xs font-mono group-hover:bg-violet-500 group-hover:text-white group-hover:border-violet-500 transition-all">
                                  {sidx + 1}
                                </div>

                                <div className="space-y-1">
                                  <h5 className="text-sm font-black text-stone-850 flex flex-wrap items-center gap-1 leading-snug">
                                    <span className="text-violet-600 font-extrabold mr-1">
                                      {language === 'KR' ? `코스 ${sidx + 1} >` : `Course ${sidx + 1} >`}
                                    </span>
                                    <span>{language === 'KR' ? st.titleKo : st.titleEn}</span>
                                  </h5>
                                  <p className="text-xs sm:text-sm text-stone-500 font-semibold leading-relaxed">{language === 'KR' ? st.descKo : st.descEn}</p>
                                  {st.stationInfoKo && (
                                    <div className="mt-1.5 text-[10px] font-bold text-violet-850 bg-violet-50/50 px-2.5 py-0.5 rounded border border-violet-100 max-w-max">
                                      🚇 {language === 'KR' ? st.stationInfoKo : st.stationInfoEn}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Day 2 Section */}
                      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-100 shadow-[0_4px_20px_rgba(79,70,229,0.02)] space-y-5 text-left">
                        <h4 className="text-base sm:text-lg font-black text-indigo-950 border-b border-indigo-100/70 pb-3 flex items-center gap-2">
                          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 font-sans font-black text-xs">
                            D2
                          </span>
                          <span>{language === 'KR' ? 'Day 2 일정' : 'Day 2 Itinerary'}</span>
                        </h4>

                        <div className="relative pl-6 sm:pl-8 space-y-6 text-left">
                          {/* Vertical Track lines */}
                          <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-12 w-0.5 border-l border-dashed border-indigo-200"></div>

                          {course.steps
                            .filter(st => st.time?.includes('Day 2'))
                            .map((st, sidx) => (
                              <div key={sidx} className="relative group text-left">
                                {/* bullet number */}
                                <div className="absolute -left-[27px] sm:-left-[31px] top-0.5 w-6 h-6 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[10px] font-black text-indigo-700 shadow-xs font-mono group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 transition-all">
                                  {sidx + 1}
                                </div>

                                <div className="space-y-1">
                                  <h5 className="text-sm font-black text-stone-850 flex flex-wrap items-center gap-1 leading-snug">
                                    <span className="text-indigo-600 font-extrabold mr-1">
                                      {language === 'KR' ? `코스 ${sidx + 1} >` : `Course ${sidx + 1} >`}
                                    </span>
                                    <span>{language === 'KR' ? st.titleKo : st.titleEn}</span>
                                  </h5>
                                  <p className="text-xs sm:text-sm text-stone-500 font-semibold leading-relaxed">{language === 'KR' ? st.descKo : st.descEn}</p>
                                  {st.stationInfoKo && (
                                    <div className="mt-1.5 text-[10px] font-bold text-indigo-850 bg-indigo-50/50 px-2.5 py-0.5 rounded border border-indigo-100 max-w-max">
                                      🚇 {language === 'KR' ? st.stationInfoKo : st.stationInfoEn}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}

                          {/* Extra Morning Café Lounge Tip block (Simulating separate designed details) */}
                          <div className="bg-gradient-to-br from-[#004481]/5 to-sky-50/15 p-4 rounded-2xl border border-indigo-100 text-left">
                            <h6 className="text-xs font-black text-indigo-900 flex items-center gap-1.5">
                              <span>☕</span>
                              <span>{language === 'KR' ? '아침 일출 명당 & 보행 편한 카페' : 'Morning Vista Cafe Recommendations'}</span>
                            </h6>
                            <p className="text-[11px] sm:text-xs text-stone-500 font-semibold leading-normal mt-1.5">
                              {language === 'KR' 
                                ? '민락항이나 광안리 수변 공원 근처 카페들은 대부분 1층에 턱이 아예 없는 통유리로 지어져 있어 아침 바다와 갈매기를 감상하며 따뜻한 바닐라 라떼를 맛보기 완전 편안합니다.' 
                                : 'Most oceanfront cafes around Gwangalli or Millak harbor are structurally barrier-free, allowing cozy stroller roll-ups right next to sunlit windows.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overall tip banner */}
                    <div className="bg-violet-500/[0.03] p-5 sm:p-6 text-left flex items-start gap-3.5 rounded-2xl border border-violet-100">
                      <div className="p-2 rounded-xl bg-violet-100 text-violet-700 shrink-0 mt-0.5">
                        <Info className="w-4 h-4 text-violet-700 shrink-0" />
                      </div>
                      <div className="space-y-1 select-none text-left">
                        <span className="text-[10.5px] font-black text-violet-850 uppercase tracking-wide">
                          {language === 'KR' ? '🌙 바다야경 전용 보행 꿀팁!' : '🌙 NIGHT VIEW ROAD EXPERIENCE TIP'}
                        </span>
                        <p className="text-xs sm:text-sm text-indigo-950/80 leading-relaxed font-semibold">
                          {language === 'KR' ? course.overallTipKo : course.overallTipEn}
                        </p>
                      </div>
                    </div>
                  </div>
                );

              // -------------------------------------------------------------
              // PAGE 3: 2 NIGHTS (2박) - Styled as a horizontal active tabbed layout
              // -------------------------------------------------------------
              case '2NIGHTS':
                return (
                  <div className="space-y-6 animate-fade-in text-left">
                    {/* Sunset Amber Glow Header */}
                    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 sm:p-8 rounded-3xl text-white relative overflow-hidden shadow-md text-left">
                      <div className="absolute right-0 bottom-0 text-8xl select-none opacity-5 transform translate-y-6 translate-x-4">🌅</div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-white/20 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                          {language === 'KR' ? '🌅 낙조 명당 2박 3일' : '🌅 Golden Sunset 2 Nights'}
                        </span>
                        <span className="bg-amber-400/35 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                          {language === 'KR' ? '난이도: 보통 (완만한 우회로 추천)' : 'Difficulty: Moderate (Asphalt ramps used)'}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight leading-tight">
                        {language === 'KR' ? '🌅 트렌디 감성과 바다 비경을 담은 2박 3일 낭만 코스' : '🌅 Trendy Cafe & Coastal Wonders 2N3D Route'}
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-50/80 mt-1 max-w-2xl font-semibold">
                        {language === 'KR' 
                          ? '전포카페거리, 해동용궁사부터 망미 골목까지 감성 넘치는 핫플레이스들을 경사 걱정 없이 평탄하고 편리한 길로 만나는 일주 코스예요.' 
                          : 'Explore the high view ridges and beautiful coastlines of Busan without steps.'}
                      </p>
                    </div>

                    {/* Vertical Day-by-Day Journey List */}
                    <div className="space-y-6">
                      {/* Day 1 Section */}
                      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-[0_4px_20px_rgba(245,158,11,0.02)] space-y-5 text-left">
                        <h4 className="text-base sm:text-lg font-black text-amber-950 border-b border-amber-100/70 pb-3 flex items-center gap-2">
                          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-50 text-amber-700 font-sans font-black text-xs">
                            D1
                          </span>
                          <span>{language === 'KR' ? 'Day 1 (도심 골목 & 바다 랜드마크)' : 'Day 1 (Urban Alleys & Beaches)'}</span>
                        </h4>

                        <div className="relative pl-6 sm:pl-8 space-y-6 text-left">
                          {/* Vertical Track lines */}
                          <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-3 w-0.5 border-l border-dashed border-amber-200"></div>

                          {course.steps
                            .filter(st => st.time?.includes('Day 1'))
                            .map((st, sidx) => (
                              <div key={sidx} className="relative group text-left">
                                {/* bullet number */}
                                <div className="absolute -left-[27px] sm:-left-[31px] top-0.5 w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[10px] font-black text-amber-700 shadow-xs font-mono group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all">
                                  {sidx + 1}
                                </div>

                                <div className="space-y-1">
                                  <h5 className="text-sm font-black text-stone-850 flex flex-wrap items-center gap-1 leading-snug">
                                    <span className="text-amber-600 font-extrabold mr-1">
                                      {language === 'KR' ? `코스 ${sidx + 1} >` : `Course ${sidx + 1} >`}
                                    </span>
                                    <span>{language === 'KR' ? st.titleKo : st.titleEn}</span>
                                  </h5>
                                  <p className="text-xs sm:text-sm text-stone-500 font-semibold leading-relaxed">{language === 'KR' ? st.descKo : st.descEn}</p>
                                  {st.stationInfoKo && (
                                    <div className="mt-1.5 text-[10px] font-bold text-amber-850 bg-amber-50/50 px-2.5 py-0.5 rounded border border-amber-100 max-w-max">
                                      🚇 {language === 'KR' ? st.stationInfoKo : st.stationInfoEn}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Accessibility Box Day 1 */}
                        <div className="bg-amber-500/[0.02] p-4.5 rounded-2xl border border-dashed border-amber-200/60 mt-4 ml-0 sm:ml-8">
                          <span className="text-[10px] font-black text-amber-850 uppercase tracking-wider block mb-1">Accessibility Insight / 편안한 관람 가이드</span>
                          <p className="text-xs text-amber-900/80 leading-normal font-semibold">
                            {language === 'KR' 
                              ? '전포·서면 상가 구역은 평지 보도 정비가 잘 되어 있으며, 해변열차 탑승 시 리프트 보드나 휠체어 경사 슬라이드가 안정적으로 지원되므로 걱정 없이 누릴 수 있습니다.' 
                              : 'Jeonpo & Seomyeon have flat shopping lanes, while Haeundae Green Railway station has premium accessibility ramps and boarding platform lifts for robust safety.'}
                          </p>
                        </div>
                      </div>

                      {/* Day 2 Section */}
                      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-[0_4px_20px_rgba(245,158,11,0.02)] space-y-5 text-left">
                        <h4 className="text-base sm:text-lg font-black text-amber-950 border-b border-amber-100/70 pb-3 flex items-center gap-2">
                          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-50 text-amber-700 font-sans font-black text-xs">
                            D2
                          </span>
                          <span>{language === 'KR' ? 'Day 2 (벚꽃 물결 & 기암절벽 푸른 바다)' : 'Day 2 (Blossom Walks & Ocean Shrines)'}</span>
                        </h4>

                        <div className="relative pl-6 sm:pl-8 space-y-6 text-left">
                          {/* Vertical Track lines */}
                          <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-3 w-0.5 border-l border-dashed border-amber-200"></div>

                          {course.steps
                            .filter(st => st.time?.includes('Day 2'))
                            .map((st, sidx) => (
                              <div key={sidx} className="relative group text-left">
                                {/* bullet number */}
                                <div className="absolute -left-[27px] sm:-left-[31px] top-0.5 w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[10px] font-black text-amber-700 shadow-xs font-mono group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all">
                                  {sidx + 1}
                                </div>

                                <div className="space-y-1">
                                  <h5 className="text-sm font-black text-stone-850 flex flex-wrap items-center gap-1 leading-snug">
                                    <span className="text-amber-600 font-extrabold mr-1">
                                      {language === 'KR' ? `코스 ${sidx + 1} >` : `Course ${sidx + 1} >`}
                                    </span>
                                    <span>{language === 'KR' ? st.titleKo : st.titleEn}</span>
                                  </h5>
                                  <p className="text-xs sm:text-sm text-stone-500 font-semibold leading-relaxed">{language === 'KR' ? st.descKo : st.descEn}</p>
                                  {st.stationInfoKo && (
                                    <div className="mt-1.5 text-[10px] font-bold text-amber-850 bg-amber-50/50 px-2.5 py-0.5 rounded border border-amber-100 max-w-max">
                                      🚇 {language === 'KR' ? st.stationInfoKo : st.stationInfoEn}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Accessibility Box Day 2 */}
                        <div className="bg-amber-500/[0.02] p-4.5 rounded-2xl border border-dashed border-amber-200/60 mt-4 ml-0 sm:ml-8">
                          <span className="text-[10px] font-black text-amber-850 uppercase tracking-wider block mb-1">Accessibility Insight / 편안한 관람 가이드</span>
                          <p className="text-xs text-amber-900/80 leading-normal font-semibold">
                            {language === 'KR' 
                              ? '온천천 유역의 경사 슬로프는 곳곳에 넓게 배치되어 있고, 해동용궁사는 주차장 및 매표소 방면의 턱 없는 완만한 연결 슬로프를 타고 진입하면 계단이 완전히 우회됩니다.' 
                              : 'Oncheoncheon riverway access ramps sit near central bridges. The side entrance trails at Haedong Yonggungsa temple completely bypass vertical stairs.'}
                          </p>
                        </div>
                      </div>

                      {/* Day 3 Section */}
                      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-[0_4px_20px_rgba(245,158,11,0.02)] space-y-5 text-left">
                        <h4 className="text-base sm:text-lg font-black text-amber-950 border-b border-amber-100/70 pb-3 flex items-center gap-2">
                          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-50 text-amber-700 font-sans font-black text-xs">
                            D3
                          </span>
                          <span>{language === 'KR' ? 'Day 3 (향토 역사 & 예술 골목 정취)' : 'Day 3 (History & Art Alleys)'}</span>
                        </h4>

                        <div className="relative pl-6 sm:pl-8 space-y-6 text-left">
                          {/* Vertical Track lines */}
                          <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-3 w-0.5 border-l border-dashed border-amber-200"></div>

                          {course.steps
                            .filter(st => st.time?.includes('Day 3'))
                            .map((st, sidx) => (
                              <div key={sidx} className="relative group text-left">
                                {/* bullet number */}
                                <div className="absolute -left-[27px] sm:-left-[31px] top-0.5 w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[10px] font-black text-amber-700 shadow-xs font-mono group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all">
                                  {sidx + 1}
                                </div>

                                <div className="space-y-1">
                                  <h5 className="text-sm font-black text-stone-850 flex flex-wrap items-center gap-1 leading-snug">
                                    <span className="text-amber-600 font-extrabold mr-1">
                                      {language === 'KR' ? `코스 ${sidx + 1} >` : `Course ${sidx + 1} >`}
                                    </span>
                                    <span>{language === 'KR' ? st.titleKo : st.titleEn}</span>
                                  </h5>
                                  <p className="text-xs sm:text-sm text-stone-500 font-semibold leading-relaxed">{language === 'KR' ? st.descKo : st.descEn}</p>
                                  {st.stationInfoKo && (
                                    <div className="mt-1.5 text-[10px] font-bold text-amber-850 bg-amber-50/50 px-2.5 py-0.5 rounded border border-amber-100 max-w-max">
                                      🚇 {language === 'KR' ? st.stationInfoKo : st.stationInfoEn}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Accessibility Box Day 3 */}
                        <div className="bg-amber-500/[0.02] p-4.5 rounded-2xl border border-dashed border-amber-200/60 mt-4 ml-0 sm:ml-8">
                          <span className="text-[10px] font-black text-amber-850 uppercase tracking-wider block mb-1">Accessibility Insight / 편안한 관람 가이드</span>
                          <p className="text-xs text-amber-900/80 leading-normal font-semibold">
                            {language === 'KR' 
                              ? '수영사적공원은 울창한 영험 숲길이 단차 없는 지면과 친환경 목재 가이드데크로 포장되어 휠체어 주행이 매우 수월하며, 팔도시장 역시 턱이 정리된 현대식 구역 중심입니다.' 
                              : 'Suyeong Historical Park and Paldo Market present highly polished modern lanes and wood boards, allowing wheel strolls under the ancient pine shade.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Overall tip banner */}
                    <div className="bg-amber-500/[0.03] p-5 sm:p-6 text-left flex items-start gap-3.5 rounded-2xl border border-amber-100">
                      <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                        <Info className="w-4 h-4 text-amber-700 shrink-0" />
                      </div>
                      <div className="space-y-1 select-none text-left">
                        <span className="text-[10.5px] font-black text-amber-850 uppercase tracking-wide">
                          {language === 'KR' ? '🌅 낙조 여행 전용 이동 꿀팁!' : '🌅 GOLDEN SUNSET PATHWAYS TIP'}
                        </span>
                        <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-semibold">
                          {language === 'KR' ? course.overallTipKo : course.overallTipEn}
                        </p>
                      </div>
                    </div>
                  </div>
                );

              // -------------------------------------------------------------
              // PAGE 4: 3 NIGHTS (3박) - Styled as an organic forest nature journal
              // -------------------------------------------------------------
              case '3NIGHTS':
                return (
                  <div className="space-y-6 animate-fade-in text-left">
                    {/* Organic Green Journal Banner */}
                    <div className="bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-900 p-6 sm:p-8 rounded-3xl text-emerald-50 relative overflow-hidden shadow-md text-left">
                      <div className="absolute right-2 top-2 text-8xl select-none opacity-5 transform translate-y-2">🌿</div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-emerald-700 bg-opacity-50 text-emerald-150 text-[10px] font-black px-2.5 py-1 rounded-full uppercase border border-emerald-600/30">
                          {language === 'KR' ? '🌿 자연 힐링 3박 4일' : '🌿 Organic Rest 3 Nights'}
                        </span>
                        <span className="bg-teal-700 bg-opacity-40 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          {language === 'KR' ? '테마: 온천천 강물 꽃길과 대숲' : 'Theme: Quiet waterway bamboo paths'}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black font-heading text-emerald-50 tracking-tight leading-tight">
                        {language === 'KR' ? '🌿 영도 절벽 수평선 & 온천천 강변 꽃밭 3박 4일 완벽 휴식 코스' : '🌿 Yeongdo Horizon Blue & Oncheon Creek Flowy Spring 3N4D'}
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-2xl font-semibold">
                        {language === 'KR' 
                          ? '계단을 없앤 긴 전용 우회 램프(경사 스위치백)를 통해 동래역에서 강변 수변 공원으로 바로 사뿐히 하강하고, 수평선 너머로 배들이 오고 가는 온천천 물소리를 벗하는 완만한 사색의 여정입니다.' 
                          : 'Descend smoothly along Switchback ramp lanes to stroll scenic bamboo canals and flower margins with modern flat amenities.'}
                      </p>
                    </div>

                    {/* Vertically connected list of Days for 3 Nights Botanical Rest */}
                    <div className="space-y-6">
                      {[1, 2, 3].map((dayNum) => {
                        const daySteps = course.steps.filter(st => st.time?.includes(`Day ${dayNum}`));
                        if (daySteps.length === 0) return null;

                        return (
                          <div key={dayNum} className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-[0_4px_20px_rgba(16,185,129,0.02)] space-y-5 text-left">
                            <h4 className="text-base sm:text-lg font-black text-emerald-950 border-b border-emerald-100/70 pb-3 flex items-center gap-2">
                              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 font-sans font-black text-xs">
                                D{dayNum}
                              </span>
                              <span>{language === 'KR' ? `Day ${dayNum} 일정` : `Day ${dayNum} Itinerary`}</span>
                            </h4>

                            <div className="relative pl-6 sm:pl-8 space-y-6 text-left">
                              {/* Vertical Track lines */}
                              <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-3 w-0.5 border-l border-dashed border-emerald-200"></div>

                              {daySteps.map((st, sidx) => (
                                <div key={sidx} className="relative group text-left">
                                  {/* bullet number */}
                                  <div className="absolute -left-[27px] sm:-left-[31px] top-0.5 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[10px] font-black text-emerald-700 shadow-xs font-mono group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all">
                                    {sidx + 1}
                                  </div>

                                  <div className="space-y-1">
                                    <h5 className="text-sm font-black text-stone-850 flex flex-wrap items-center gap-1 leading-snug">
                                      <span className="text-emerald-600 font-extrabold mr-1">
                                        {language === 'KR' ? `코스 ${sidx + 1} >` : `Course ${sidx + 1} >`}
                                      </span>
                                      <span>{language === 'KR' ? st.titleKo : st.titleEn}</span>
                                    </h5>
                                    <p className="text-xs sm:text-sm text-stone-500 font-semibold leading-relaxed">{language === 'KR' ? st.descKo : st.descEn}</p>
                                    {st.stationInfoKo && (
                                      <div className="mt-1.5 text-[10px] font-bold text-teal-850 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-100 max-w-max">
                                        🚇 {language === 'KR' ? st.stationInfoKo : st.stationInfoEn}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Botanical Overall tip */}
                    <div className="bg-emerald-500/[0.03] p-5 sm:p-6 text-left flex items-start gap-3.5 rounded-2xl border border-emerald-100">
                      <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                        <Info className="w-4 h-4 text-emerald-700 shrink-0" />
                      </div>
                      <div className="space-y-1 select-none text-left">
                        <span className="text-[10.5px] font-black text-emerald-850 uppercase tracking-wide">
                          {language === 'KR' ? '🌿 자연 쉼터 전용 이동 꿀팁!' : '🌿 NATURAL ESCAPE MOVEMENT TIP'}
                        </span>
                        <p className="text-xs sm:text-sm text-emerald-900/80 leading-relaxed font-semibold">
                          {language === 'KR' ? course.overallTipKo : course.overallTipEn}
                        </p>
                      </div>
                    </div>
                  </div>
                );

              // -------------------------------------------------------------
              // PAGE 5: 4 NIGHTS (4박) - Compiled as an Interactive Travel Guide Catalog
              // -------------------------------------------------------------
              case '4NIGHTS':
                return (
                  <div className="space-y-6 animate-fade-in text-left">
                    {/* Sky Blue Guidebook Header */}
                    <div className="bg-gradient-to-br from-sky-700 to-blue-800 p-6 sm:p-8 rounded-3xl text-white relative overflow-hidden shadow-md text-left">
                      <div className="absolute right-2 top-2 text-7xl select-none opacity-5 transform translate-y-2">🏠</div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-sky-600/50 text-sky-100 text-[10px] font-black px-2.5 py-1 rounded-full uppercase border border-sky-500/20">
                          {language === 'KR' ? '🏠 4박 5일 장기 체류 종합 마스터' : '🏠 4N5D Long Stay Master'}
                        </span>
                        <span className="bg-sky-500/40 text-sky-200 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          {language === 'KR' ? '평크션: 실내 엘리베이터 정밀 조율' : 'Includes mall lift routes'}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight leading-tight">
                        {language === 'KR' ? '🏠 부산 편안한 보행 종합 선물세트: 4박 5일 실내외 쾌적 일주 코스' : '🏠 Comprehensive Barrier-Free Busan Layout: 4N5D Master Plan'}
                      </h3>
                      <p className="text-xs sm:text-sm text-sky-100/80 mt-1 max-w-2xl font-semibold">
                        {language === 'KR' 
                          ? '대중교통 광장 엘리베이터 탐방부터 유모차 전용 와이드 쉘터 개찰구 위치 가이드, 센텀시티 초대형 패밀리 아케이드 수영 강변 산책로 완벽 가이드!' 
                          : 'Deep long stays targeting air-conditioned indoor mega malls, custom accessible subway gate numbers, and flat garden links.'}
                      </p>
                    </div>

                    {/* Vertical Day-by-Day Journey List */}
                    <div className="space-y-6">
                      {[1, 2, 3, 4, 5].map((dayNum) => {
                        const daySteps = course.steps.filter(st => st.time?.includes(`Day ${dayNum}`));
                        if (daySteps.length === 0) return null;

                        const dayTitlesKo = [
                          '동부산 오션 시닉 벨트',
                          '원도심 역사 컬처 루트',
                          '트렌디 영 스트리트 & 화려한 광안리 밤바다',
                          '서부산 에코 & 명품 일몰 투어',
                          '하이테크 하이엔드 센텀 & 마린시티'
                        ];
                        const dayTitlesEn = [
                          'East Busan Ocean Scenic Belt',
                          'Old Downtown History & Culture',
                          'Trendy Alleys & Gwangalli Waves',
                          'West Busan Eco & Golden Sunset',
                          'Hi-Tech Centum & Marine City'
                        ];

                        return (
                          <div key={dayNum} className="bg-white p-6 sm:p-8 rounded-3xl border border-sky-100 shadow-[0_4px_20px_rgba(14,165,233,0.02)] space-y-5 text-left">
                            <h4 className="text-base sm:text-lg font-black text-sky-950 border-b border-sky-100/70 pb-3 flex items-center gap-2">
                              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-sky-50 text-sky-700 font-sans font-black text-xs">
                                D{dayNum}
                              </span>
                              <span>
                                {language === 'KR' 
                                  ? `Day ${dayNum} (${dayTitlesKo[dayNum - 1]})` 
                                  : `Day ${dayNum} (${dayTitlesEn[dayNum - 1]})`}
                              </span>
                            </h4>

                            <div className="relative pl-6 sm:pl-8 space-y-6 text-left">
                              {/* Vertical Track lines */}
                              <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-3 w-0.5 border-l border-dashed border-sky-200"></div>

                              {daySteps.map((st, sidx) => (
                                <div key={sidx} className="relative group text-left">
                                  {/* bullet number */}
                                  <div className="absolute -left-[27px] sm:-left-[31px] top-0.5 w-6 h-6 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-[10px] font-black text-sky-700 shadow-xs font-mono group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-all">
                                    {sidx + 1}
                                  </div>

                                  <div className="space-y-1">
                                    <h5 className="text-sm font-black text-stone-850 flex flex-wrap items-center gap-1 leading-snug">
                                      <span className="text-sky-600 font-extrabold mr-1">
                                        {language === 'KR' ? `코스 ${sidx + 1} >` : `Course ${sidx + 1} >`}
                                      </span>
                                      <span>{language === 'KR' ? st.titleKo : st.titleEn}</span>
                                    </h5>
                                    <p className="text-xs sm:text-sm text-stone-500 font-semibold leading-relaxed">{language === 'KR' ? st.descKo : st.descEn}</p>
                                    {st.stationInfoKo && (
                                      <div className="mt-1.5 text-[10px] font-bold text-sky-850 bg-sky-50/50 px-2.5 py-0.5 rounded border border-sky-100 max-w-max">
                                        🚇 {language === 'KR' ? st.stationInfoKo : st.stationInfoEn}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Overall tip banner */}
                    <div className="bg-sky-500/[0.03] p-5 sm:p-6 text-left flex items-start gap-3.5 rounded-2xl border border-sky-100">
                      <div className="p-2 rounded-xl bg-sky-100 text-sky-700 shrink-0 mt-0.5">
                        <Info className="w-4 h-4 text-sky-700 shrink-0" />
                      </div>
                      <div className="space-y-1 select-none text-left">
                        <span className="text-[10.5px] font-black text-sky-850 uppercase tracking-wide">
                          {language === 'KR' ? '🏠 장기 체류 전용 이동 꿀팁!' : '🏠 DEEP ACCESSIBLE STAY TRAVEL TIP'}
                        </span>
                        <p className="text-xs sm:text-sm text-blue-900/80 leading-relaxed font-semibold">
                          {language === 'KR' ? course.overallTipKo : course.overallTipEn}
                        </p>
                      </div>
                    </div>
                  </div>
                );

              // -------------------------------------------------------------
              // PAGE 6: GOURMET (식도락) - Styled like a premium Michelin Guide Card layout
              // -------------------------------------------------------------
              case 'GOURMET':
                return (
                  <div className="space-y-6 animate-fade-in text-left">
                    {/* Gastro-guide Banner */}
                    <div className="bg-gradient-to-br from-rose-500 to-red-600 p-6 sm:p-8 rounded-3xl text-white relative overflow-hidden shadow-md text-left">
                      <div className="absolute right-1 top-1 text-8xl select-none opacity-5 transform translate-y-3">🍕</div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-white/20 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase border border-white/10">
                          {language === 'KR' ? '🍴 침샘 가득 백년가게 정복' : '🍴 Genuine Local Cuisines'}
                        </span>
                        <span className="bg-rose-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                          {language === 'KR' ? '입식 테이블 & 경사용 경판 설치 완료' : 'Only flat doorways mapped'}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight leading-tight">
                        {language === 'KR' ? '❤️ 대가족 인생 꿀맛! 영양 만점 부산 로컬 미식 편한 길 지도' : '❤️ Delicious Local Cuisines in Busan: Zero-Step Gastronomy Guide'}
                      </h3>
                      <p className="text-xs sm:text-sm text-rose-50/80 mt-1 max-w-2xl font-semibold">
                        {language === 'KR' 
                          ? '유모차나 소형 캐스터도 턱 없이 부드럽게 미끄러져 들어갑니다! 원조 부산 돼지국밥 노포부터 푹신하고 넓은 남포동 BIFF 야외 로드푸드 광장 씨앗호떡까지 입속 축제를 만나세요.' 
                          : 'Saddle up near flat floor entrees for steaming pork broth soups and sweet seed pancakes.'}
                      </p>
                    </div>

                    {/* Gourmet restaurant review catalog style! No dots or lines! */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="gourmet-catalog">
                      {course.steps.map((step, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white rounded-3xl border border-rose-100 hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between shadow-[0_2px_12px_rgba(244,63,94,0.01)] text-left"
                        >
                          <div className="space-y-3 text-left">
                            <div className="flex items-center justify-between border-b border-rose-50 pb-2">
                              {/* Michelin like star ranking */}
                              <span className="text-xs font-black text-amber-500">
                                ⭐⭐⭐⭐⭐ <span className="text-stone-400 font-black text-[10px] ml-1">5.0</span>
                              </span>
                              <span className="text-[10px] bg-rose-50 text-rose-800 font-extrabold px-2 py-0.5 rounded-lg">
                                {idx === 0 ? (language === 'KR' ? '🍚 소울푸드' : 'Rice soup site') : (language === 'KR' ? '🍡 길거리간식' : 'Stall dessert')}
                              </span>
                            </div>

                            <h4 className="text-base font-black text-stone-800 leading-snug">
                              🍔 {language === 'KR' ? step.titleKo : step.titleEn}
                            </h4>

                            <p className="text-xs sm:text-sm text-stone-500 font-semibold leading-relaxed font-sans text-left">
                              {language === 'KR' ? step.descKo : step.descEn}
                            </p>
                          </div>

                          <div className="mt-5 pt-3.5 border-t border-slate-50 space-y-2">
                            {/* Flat seating indicators checklist */}
                            <div className="flex flex-wrap items-center gap-2 text-[10.5px] font-black text-rose-900 bg-rose-50/40 p-2 rounded-xl">
                              <span>✅ {language === 'KR' ? '턱 없음 / 우회 경판 완비' : 'No doorsill doorstep'}</span>
                              <span className="w-1 h-1 bg-rose-300 rounded-full"></span>
                              <span>✅ {language === 'KR' ? '넓은 입식 의자테이블' : 'Seat tables provided'}</span>
                            </div>

                            {step.stationInfoKo && (
                              <div className="text-[10.5px] font-bold text-slate-500 flex items-center gap-1">
                                <span>🚇</span>
                                <span className="font-semibold">{language === 'KR' ? step.stationInfoKo : step.stationInfoEn}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Overall tip banner */}
                    <div className="bg-rose-500/[0.03] p-5 sm:p-6 text-left flex items-start gap-3.5 rounded-2xl border border-rose-100">
                      <div className="p-2 rounded-xl bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                        <Info className="w-4 h-4 text-rose-700 shrink-0" />
                      </div>
                      <div className="space-y-1 select-none text-left">
                        <span className="text-[10.5px] font-black text-rose-850 uppercase tracking-wide">
                          {language === 'KR' ? '💡 로컬 식도락 전용 편의 팁!' : '💡 LOCAL CULINARY ACCESSIBILITY TIP'}
                        </span>
                        <p className="text-xs sm:text-sm text-rose-900/80 leading-relaxed font-semibold">
                          {language === 'KR' ? course.overallTipKo : course.overallTipEn}
                        </p>
                      </div>
                    </div>
                  </div>
                );

              // -------------------------------------------------------------
              // PAGE 7: HISTORY (역사) - Styled like an antique memory scrapbook
              // -------------------------------------------------------------
              case 'HISTORY':
                return (
                  <div className="space-y-6 animate-fade-in text-left">
                    {/* Retro Parchment Scrapbook Header */}
                    <div className="bg-[#fcf8f2] p-6 sm:p-8 rounded-4xl border-2 border-[#d0c3ab] shadow-sm relative overflow-hidden text-left">
                      <div className="absolute right-2 bottom-2 text-7xl select-none opacity-5 transform rotate-12">📜</div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-[#e9ded0] text-amber-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase border border-[#d6cbba]">
                          {language === 'KR' ? '📜 근현대 피란 수도 부산 역사' : '📜 Historic Choryang Refugees Way'}
                        </span>
                        <span className="bg-[#fadcb1]/40 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          {language === 'KR' ? '체험: 산복도로 무료 전망 모노레일 탑승' : 'Experience: Free public glass monorail'}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black font-heading text-stone-800 tracking-tight leading-tight">
                        {language === 'KR' ? '📜 초량 이바구길·산복도로 피란민 고갯길 역사 사색 산책' : '📜 Modern Historic Memoir Walkways: Choryang Ibagu Ridge Walk'}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl font-semibold leading-relaxed">
                        {language === 'KR' 
                          ? '한국 6·25 아픈 피란 역사를 가득 안고 살아온 소박하지만 정겨운 골목입니다. 높은 168 계단구간을 하늘 구름처럼 수월하게 오르내리도록 도와주는 공영 주민용 무료 모노레일을 타고 역사 속 정취를 만끽해보세요.' 
                          : 'Discover Choryangs traditional steep slopes smoothly ascending using the free high-speed glass observation lift.'}
                      </p>
                    </div>

                    {/* Historical Scrapbook Content Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* Left Sidebar block: Historial Story */}
                      <div className="md:col-span-1 bg-[#fbf9f4] p-5.5 rounded-3xl border border-[#dcd1ba] text-left space-y-3 font-sans">
                        <span className="text-[10px] font-black text-amber-800 tracking-wider block uppercase">HISTORY LOGS / 초량 이바구 돋보기</span>
                        <h4 className="text-sm font-black text-amber-950 font-heading">{language === 'KR' ? '6.25 피란 수도와 산복도로' : 'Refugee Cap.'}</h4>
                        <p className="text-xs text-stone-500 leading-relaxed font-semibold">
                          {language === 'KR' 
                            ? '6.25 전쟁 당시 수많은 피란민들이 도망쳐 내려와 영도와 초량 산기슭에 손수 돌을 쌓아 임시 가옥을 지으며 터전을 이룬 것이 오늘날 산복도로의 기원입니다. 과거에 물동이를 이고 힘겹게 오르던 고갯길은 이제 주민과 여행자를 위해 모노레일과 야자매트로 다정하게 정비되었습니다.' 
                            : 'During the Korean War, thousands of refugees built stone homes on vertical cliffs surrounding Choryang.'}
                        </p>
                      </div>

                      {/* Right Timeline Cards block */}
                      <div className="md:col-span-2 space-y-4">
                        {course.steps.map((step, idx) => (
                          <div 
                            key={idx} 
                            className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.01)] text-left space-y-2 relative"
                          >
                            <span className="absolute right-5 top-5 text-xl opacity-35 select-none font-mono font-bold">#0{idx + 1}</span>
                            
                            <h5 className="text-sm sm:text-base font-black text-stone-850">{language === 'KR' ? step.titleKo : step.titleEn}</h5>
                            <p className="text-xs sm:text-sm text-stone-500 font-semibold leading-relaxed font-sans">{language === 'KR' ? step.descKo : step.descEn}</p>

                            {step.stationInfoKo && (
                              <div className="mt-3.5 pt-2.5 border-t border-stone-100 flex items-center gap-1 text-[11.5px] font-extrabold text-[#004481]">
                                <span>🚇</span>
                                <span>{language === 'KR' ? step.stationInfoKo : step.stationInfoEn}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Overall tip block */}
                    <div className="bg-[#fcfaf4] p-5 sm:p-6 text-left flex items-start gap-3.5 rounded-2xl border border-[#d6ccbb]">
                      <div className="p-2 rounded-xl bg-[#ede2cf] text-amber-800 shrink-0 mt-0.5">
                        <Info className="w-4 h-4 text-amber-800 shrink-0" />
                      </div>
                      <div className="space-y-1 select-none text-left">
                        <span className="text-[10.5px] font-black text-[#5c4933] uppercase tracking-wide">
                          {language === 'KR' ? '📜 역사 문화 답사 전용 편의 비결!' : '📜 HISTORICAL PATHWAY SENSING GUIDE'}
                        </span>
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-semibold">
                          {language === 'KR' ? course.overallTipKo : course.overallTipEn}
                        </p>
                      </div>
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: PUBLIC TRANSIT TIPS VIEW                                         */}
      {/* ========================================================================= */}
      {activeSection === 'TRANSIT_TIPS' && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in text-left">
          {/* Header Bar - highly compact */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_4px_15px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-heading font-extrabold text-slate-800 flex items-center gap-2">
                <span>🚇</span>
                <span>{language === 'KR' ? '부산 대중교통 이용 팁' : 'Busan Public Transit Guide'}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-semibold">
                {language === 'KR' 
                  ? '현지인이 전수하는 최신 대중교통 할인 정책과 무료 환승 완전 정복 가이드입니다.' 
                  : 'The latest public transit discount policies and free transfer guides, straight from Busan locals.'}
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/60 border border-blue-100/70 py-0.5 px-2.5 text-[10px] sm:text-xs font-bold text-[#004481]/90">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#004481]"></span>
              </span>
              <span>{language === 'KR' ? '현재 최신 정책 반영됨' : 'Updated with latest policies'}</span>
            </div>
          </div>

          {transitSection === 'SUBMENU' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              {/* SPECIAL BENEFITS / TRANSIT TIPS HEADER SECTION (Style 1: Centered Brand Title) */}
              <div className="text-center py-4 sm:py-6 max-w-3xl mx-auto space-y-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading leading-tight">
                  {language === 'KR' 
                    ? '부산 대중교통 이용 혜택과 주요 수칙' 
                    : 'Busan Public Transit Benefits & Rules'}
                </h1>
              </div>

              {/* CARD GRID (Style 1: Minimalist outline illustrations with numbers) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* CARD 01: 어린이 대중교통 요금 무료 */}
                <div
                  onClick={() => navigateToSubPage('child-free')}
                  className="relative group bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-900 hover:border-[#004481] cursor-pointer shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,68,129,1)] transition-all duration-300 text-center flex flex-col justify-between min-h-[380px]"
                >
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black tracking-tight">
                    01
                  </div>

                  {/* Title */}
                  <div className="mt-4">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
                      {language === 'KR' ? '모든 어린이 무료 혜택' : 'All Children Free Benefit'}
                    </h3>
                  </div>

                  {/* Minimalist Line-Art Illustration */}
                  <div className="my-6 flex justify-center items-center">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                      <svg className="w-24 h-24 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="50" cy="45" r="22" />
                        <path d="M28 45c0-10 10-18 22-18s22 8 22 18" />
                        <path d="M50 27v-5M44 22h12" />
                        <circle cx="42" cy="42" r="2" fill="currentColor" />
                        <circle cx="58" cy="42" r="2" fill="currentColor" />
                        <path d="M44 51c2 4 10 4 12 0" />
                        <circle cx="36" cy="48" r="1.5" fill="currentColor" opacity="0.5" />
                        <circle cx="64" cy="48" r="1.5" fill="currentColor" opacity="0.5" />
                        <path d="M25 80c5-12 12-13 25-13s20 1 25 13" />
                        <path d="M18 25l2 2m0-2l-2 2M82 25l2 2m0-2l-2 2" strokeWidth="1" />
                        <path d="M50 12l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z" strokeWidth="1" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  {/* Subtext */}
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed">
                      {language === 'KR' 
                        ? '만 6세~12세 요금 0원 무료 혜택 등록 및 교통카드 사용법 상세 안내' 
                        : 'Registering for ₩0 fares & using transit cards for kids aged 6 to 12.'}
                    </p>
                    <div className="inline-flex items-center justify-center gap-2 w-full bg-[#004481] hover:bg-[#003566] text-white border-2 border-slate-900 text-xs sm:text-sm font-black py-2.5 px-4 rounded-xl shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all duration-200 group-hover:scale-[1.02]">
                      <span>{language === 'KR' ? '상세 가이드 보기' : 'View Full Guide'}</span>
                      <span className="text-sm">➔</span>
                    </div>
                  </div>
                </div>

                {/* CARD 02: 부산 지하철 & 무료 환승 제도 */}
                <div
                  className="relative group bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-900 hover:border-[#004481] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all duration-300 text-center flex flex-col justify-between min-h-[380px]"
                >
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black tracking-tight">
                    02
                  </div>

                  {/* Title */}
                  <div className="mt-4">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
                      {language === 'KR' ? '부산 대중교통 환승 혜택' : 'Busan Transit Transfer Benefits'}
                    </h3>
                  </div>

                  {/* Minimalist Line-Art Illustration */}
                  <div className="my-6 flex justify-center items-center">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 transition-colors">
                      <svg className="w-24 h-24 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 80V40c0-20 15-30 35-30s35 10 35 30v40" strokeDasharray="2 2" stroke="#cbd5e1" />
                        <rect x="25" y="30" width="50" height="42" rx="10" />
                        <rect x="30" y="36" width="40" height="18" rx="4" />
                        <circle cx="37" cy="62" r="3" fill="currentColor" />
                        <circle cx="63" cy="62" r="3" fill="currentColor" />
                        <path d="M10 88h80M25 88l-5 6M75 88l5 6" />
                        <path d="M45 62h10" />
                        <path d="M50 30V18m-10 0h20" />
                      </svg>
                    </div>
                  </div>

                  {/* Subtext */}
                  <div>
                    <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed mb-4">
                      {language === 'KR' 
                        ? '30분 이내 무료 환승 및 4대 지하철 노선 거점 주요 수칙 가이드' 
                        : 'Free transfers within 30 minutes & key stations overview for 4 lines.'}
                    </p>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-black uppercase">
                      {language === 'KR' ? '아래 상세 안내 포함' : 'Detailed below'}
                    </span>
                  </div>
                </div>

                {/* CARD 03: 버스 휴대품 반입 기준 */}
                <div
                  className="relative group bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-900 hover:border-[#004481] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all duration-300 text-center flex flex-col justify-between min-h-[380px]"
                >
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black tracking-tight">
                    03
                  </div>

                  {/* Title */}
                  <div className="mt-4">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
                      {language === 'KR' ? '버스 휴대품 반입 기준' : 'Bus Carry-on Limits'}
                    </h3>
                  </div>

                  {/* Minimalist Line-Art Illustration */}
                  <div className="my-6 flex justify-center items-center">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 transition-colors">
                      <svg className="w-24 h-24 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="28" y="32" width="44" height="48" rx="6" />
                        <path d="M42 32V20h16v12" />
                        <path d="M34 44h32M34 54h32M34 64h32" strokeWidth="1" strokeDasharray="1 1" />
                        <circle cx="36" cy="83" r="3" />
                        <circle cx="64" cy="83" r="3" />
                        <path d="M64 40l6 10-4 2-6-10z" fill="currentColor" opacity="0.1" />
                        <path d="M18 32v48M14 32h8M14 80h8" strokeWidth="1" stroke="#94a3b8" />
                        <text x="8" y="60" fontSize="8" fill="#64748b" fontWeight="bold" stroke="none" fontFamily="monospace">H</text>
                        <path d="M28 90h44M28 86v8M72 86v8" strokeWidth="1" stroke="#94a3b8" />
                        <text x="46" y="98" fontSize="8" fill="#64748b" fontWeight="bold" stroke="none" fontFamily="monospace">W</text>
                      </svg>
                    </div>
                  </div>

                  {/* Subtext */}
                  <div>
                    <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed mb-4">
                      {language === 'KR' 
                        ? '시내버스 내 20kg 미만, 50×40×20cm 규격 등 승차 허용 수하물 상세' 
                        : 'Allowed carry-on bag sizes (under 20kg, 50x40x20cm) guidelines.'}
                    </p>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-black uppercase">
                      {language === 'KR' ? '아래 상세 안내 포함' : 'Detailed below'}
                    </span>
                  </div>
                </div>
              </div>

              {/* HIGH-VISIBILITY DETAIL PANELS (Style 2: Layout like the brochure flyers in image 2) */}
              <div className="space-y-8 pt-8 border-t border-slate-100">
{/* Sub-panel 2: High-contrast split scorecard for transfer guidelines */}
                <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
                  <div className="p-6 sm:p-8 bg-[#004481]/5 border-b border-slate-100 flex items-center gap-2.5">
                    <span className="text-xl">🔄</span>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-800">
                        {language === 'KR' ? '부산 대중교통 무료 환승 기준 안내' : 'Busan Public Transit Free Transfer Guide'}
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        {language === 'KR' ? '버스, 지하철 간 무료 환승을 위해 탑승 전 반드시 숙지하세요.' : 'Important rules for hassle-free free transit connection.'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-150">
                    {/* Left: Allowed transfers (Green highlights) */}
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex items-center gap-2 text-emerald-800">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <p className="text-sm font-black uppercase tracking-wider">{language === 'KR' ? '무료 환승 적용 가능 수칙' : 'Allowed / Applies to'}</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3.5 bg-emerald-50/40 rounded-2xl border border-emerald-100/50">
                          <span className="text-xl text-emerald-600 shrink-0">✓</span>
                          <div className="space-y-0.5">
                            <h4 className="text-xs sm:text-sm font-black text-slate-800">{language === 'KR' ? '하차 태그 후 30분 이내 승차' : 'Tap off within 30 Minutes'}</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                              {language === 'KR' 
                                ? '교통카드 하차 접촉 후 30분 이내에 환승 수단에 승차해야 정상 적용됩니다.' 
                                : 'You must tap card on departure and board next transit within 30 mins.'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3.5 bg-emerald-50/40 rounded-2xl border border-emerald-100/50">
                          <span className="text-xl text-emerald-600 shrink-0">✓</span>
                          <div className="space-y-0.5">
                            <h4 className="text-xs sm:text-sm font-black text-slate-800">{language === 'KR' ? '최대 2회 (총 3대 수단) 지원' : 'Up to 2 consecutive transfers'}</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                              {language === 'KR' 
                                ? '버스 ➔ 버스, 버스 ➔ 지하철 등 상이한 노선 및 교통수단 간 최대 2회 연계 혜택을 줍니다.' 
                                : 'Supports up to 2 transfers across different routes/means (e.g. Bus ➔ Subway).'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Excluded transfers (Red highlights) */}
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex items-center gap-2 text-rose-800">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        <p className="text-sm font-black uppercase tracking-wider">{language === 'KR' ? '환승 적용 예외 및 불가 기준' : 'Exclusions / Disallowed'}</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100/50">
                          <span className="text-xl text-rose-600 shrink-0">✗</span>
                          <div className="space-y-0.5">
                            <h4 className="text-xs sm:text-sm font-black text-slate-800">{language === 'KR' ? '동일 번호 버스 노선 간 환승 불가' : 'Same Bus Route Number'}</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                              {language === 'KR' 
                                ? '동일 노선(예: 100번 버스에서 내린 뒤 같은 번호인 100번 승차)은 환승 할인이 적용되지 않습니다.' 
                                : 'Transfer discount is bypassed if boarding the exact same bus route number.'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100/50">
                          <span className="text-xl text-rose-600 shrink-0">✗</span>
                          <div className="space-y-0.5">
                            <h4 className="text-xs sm:text-sm font-black text-slate-800">{language === 'KR' ? '지하철 개찰구 외부 이용 간 환승 불가' : 'Subway to Subway (Exit/Re-enter)'}</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                              {language === 'KR' 
                                ? '개찰구 밖으로 나갔다가 지하철을 다시 탑승할 경우 환승으로 인정되지 않고 기본요금이 새로 청구됩니다.' 
                                : 'Exiting a subway turnstile and re-entering does not count as a transfer.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-panel 3: Illustrated luggage & food allowance comparison block based on provided regulations */}
                <div className="bg-[#fcfcfd] p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🚌</span>
                      <h3 className="text-base sm:text-lg font-black text-slate-800">
                        {language === 'KR' ? '부산 시내버스 휴대품 및 음식물 반입 기준' : 'Busan City Bus Luggage & Food Regulations'}
                      </h3>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-rose-50 text-rose-600 border border-rose-100 uppercase self-start sm:self-auto">
                      {language === 'KR' ? '탑승 전 확인 필수' : 'Check before boarding'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* LEFT: Personal Belongings Regulations (휴대품 반입 규정) */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/70 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🧳</span>
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-800">
                            {language === 'KR' ? '휴대품 반입 규정' : 'Restrictions on Personal Belongings'}
                          </h4>
                          <p className="text-[10px] sm:text-xs text-rose-600 font-extrabold mt-0.5">
                            {language === 'KR' ? '부피가 큰 거대물품 등을 들고 타지 맙시다.' : 'No Bulky Belongings Allowed.'}
                          </p>
                        </div>
                      </div>

                      {/* Interactive Visual Illustration Board */}
                      <div className="grid grid-cols-2 gap-4 py-4 px-3 bg-slate-50 rounded-2xl border border-slate-100">
                        {/* Allowed (Green) */}
                        <div className="flex flex-col items-center justify-between p-3 bg-white rounded-xl border border-emerald-100 shadow-3xs text-center space-y-2">
                          <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                            {language === 'KR' ? '반입 가능' : 'ALLOWED'}
                          </span>
                          <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-emerald-500 bg-emerald-50/20 shadow-inner">
                            <svg width="72" height="72" viewBox="0 0 100 100" className="w-18 h-18">
                              <g transform="translate(10, 5)">
                                {/* Dimensions indicator lines */}
                                <line x1="8" y1="20" x2="8" y2="72" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                                <text x="1" y="48" fill="#047857" fontSize="8" fontWeight="black">50cm</text>
                                
                                <line x1="20" y1="78" x2="60" y2="78" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                                <text x="32" y="86" fill="#047857" fontSize="8" fontWeight="black">40cm</text>

                                <line x1="64" y1="20" x2="74" y2="10" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                                <text x="70" y="22" fill="#047857" fontSize="8" fontWeight="black">20cm</text>

                                {/* Handle */}
                                <rect x="30" y="5" width="20" height="15" rx="2" fill="none" stroke="#1e293b" strokeWidth="3" />
                                <line x1="30" y1="15" x2="30" y2="20" stroke="#1e293b" strokeWidth="3" />
                                <line x1="50" y1="15" x2="50" y2="20" stroke="#1e293b" strokeWidth="3" />
                                {/* Main body */}
                                <rect x="20" y="20" width="40" height="52" rx="6" fill="#3b82f6" stroke="#1e293b" strokeWidth="3" />
                                {/* Front design / pocket */}
                                <rect x="26" y="28" width="28" height="36" rx="4" fill="#60a5fa" stroke="#1e293b" strokeWidth="2" />
                                {/* Wheels */}
                                <circle cx="28" cy="75" r="4" fill="#1e293b" />
                                <circle cx="52" cy="75" r="4" fill="#1e293b" />
                              </g>
                            </svg>
                          </div>
                          <span className="text-[10px] font-black text-slate-700">
                            {language === 'KR' ? '기내용 20인치 이하' : 'Under 20" Carry-on'}
                          </span>
                        </div>

                        {/* Prohibited (Red) */}
                        <div className="flex flex-col items-center justify-between p-3 bg-white rounded-xl border border-rose-100 shadow-3xs text-center space-y-2">
                          <span className="bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                            {language === 'KR' ? '반입 불가' : 'PROHIBITED'}
                          </span>
                          <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-rose-500 bg-rose-50/20 shadow-inner overflow-hidden">
                            <svg width="72" height="72" viewBox="0 0 100 100" className="w-18 h-18 opacity-80">
                              <g transform="translate(15, 10)">
                                {/* Handle */}
                                <rect x="25" y="2" width="20" height="12" rx="2" fill="none" stroke="#1e293b" strokeWidth="3" />
                                {/* Main body */}
                                <rect x="12" y="14" width="46" height="58" rx="6" fill="#f59e0b" stroke="#1e293b" strokeWidth="3" />
                                {/* Front pocket */}
                                <rect x="18" y="22" width="34" height="42" rx="4" fill="#fbbf24" stroke="#1e293b" strokeWidth="2" />
                                {/* Wheels */}
                                <circle cx="22" cy="75" r="4" fill="#1e293b" />
                                <circle cx="48" cy="75" r="4" fill="#1e293b" />
                              </g>
                            </svg>
                            {/* Prohibited diagonal cross-bar overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <svg width="80" height="80" viewBox="0 0 100 100" className="w-full h-full text-rose-500 stroke-rose-500">
                                <line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-rose-600">
                            {language === 'KR' ? '20인치 초과 캐리어' : 'Over 20" Luggage'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {/* Not Allowed Section */}
                        <div className="p-3.5 bg-rose-50/30 rounded-xl border border-rose-100/50 space-y-2">
                          <div className="flex items-center gap-1.5 text-rose-700 text-xs font-black">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                            <span>{language === 'KR' ? '반입 불가 (Prohibited)' : 'Prohibited Items'}</span>
                          </div>
                          <ul className="text-xs text-slate-600 font-bold space-y-1.5 list-disc pl-4 leading-relaxed">
                            <li>
                              {language === 'KR' 
                                ? '1인당 2개 이상의 캐리어를 들고 탑승하려는 경우' 
                                : 'Carrying 2 or more suitcases per person'}
                            </li>
                            <li>
                              {language === 'KR' 
                                ? '항공기내 반입용 20인치 여행가방 규격(50×40×20cm)을 초과하는 물품' 
                                : 'Items exceeding the standard 20-inch flight carry-on suitcase size'}
                            </li>
                            <li>
                              {language === 'KR' 
                                ? '차량의 통로 및 승·하차문을 막을 염려가 있는 물품' 
                                : 'Items likely to block aisles or entry/exit doors'}
                            </li>
                          </ul>
                        </div>

                        {/* Allowed Section */}
                        <div className="p-3.5 bg-emerald-50/30 rounded-xl border border-emerald-100/50 space-y-2">
                          <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-black">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                            <span>{language === 'KR' ? '반입 가능 (Allowed)' : 'Allowed Items'}</span>
                          </div>
                          <ul className="text-xs text-slate-600 font-bold space-y-1.5 list-disc pl-4 leading-relaxed">
                            <li>
                              {language === 'KR' 
                                ? '중량 20kg 미만, 부피 50 × 40 × 20cm 미만의 허용 규격 내 물품' 
                                : 'Weight under 20kg, dimensions under 50 × 40 × 20cm'}
                            </li>
                            <li>
                              {language === 'KR' 
                                ? '항공기내 반입용 20인치 여행가방 규격 이내의 물품' 
                                : 'Items within standard 20-inch flight carry-on suitcase specifications'}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: Food & Drinks Regulations (음식물 반입 규정) */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/70 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🥤</span>
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-800">
                            {language === 'KR' ? '음식물 반입 규정' : 'Restrictions on Food and Drinks'}
                          </h4>
                          <p className="text-[10px] sm:text-xs text-rose-600 font-extrabold mt-0.5">
                            {language === 'KR' ? '커피 등 음식물을 들고 타지 맙시다.' : 'No Food And Drinks Allowed.'}
                          </p>
                        </div>
                      </div>

                      {/* Interactive Visual Illustration Board */}
                      <div className="grid grid-cols-2 gap-4 py-4 px-3 bg-slate-50 rounded-2xl border border-slate-100">
                        {/* Allowed (Green) */}
                        <div className="flex flex-col items-center justify-between p-3 bg-white rounded-xl border border-emerald-100 shadow-3xs text-center space-y-2">
                          <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                            {language === 'KR' ? '반입 가능' : 'ALLOWED'}
                          </span>
                          <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-emerald-500 bg-emerald-50/20 shadow-inner">
                            <svg width="72" height="72" viewBox="0 0 100 100" className="w-18 h-18">
                              <g transform="translate(25, 8)">
                                {/* Cap */}
                                <rect x="18" y="5" width="14" height="8" rx="1.5" fill="#3b82f6" stroke="#1e293b" strokeWidth="3" />
                                {/* Neck */}
                                <rect x="21" y="13" width="8" height="6" fill="#e2e8f0" stroke="#1e293b" strokeWidth="3" />
                                {/* Main plastic bottle body with ridges */}
                                <path d="M12 19 C12 19, 10 24, 10 28 L10 70 C10 73, 13 75, 16 75 L34 75 C37 75, 40 73, 40 70 L40 28 C40 24, 38 19, 38 19 Z" fill="#93c5fd" stroke="#1e293b" strokeWidth="3" />
                                {/* Horizontal ridges */}
                                <line x1="14" y1="32" x2="36" y2="32" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                                <line x1="14" y1="44" x2="36" y2="44" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                                <line x1="14" y1="56" x2="36" y2="56" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                              </g>
                            </svg>
                          </div>
                          <span className="text-[10px] font-black text-slate-700">
                            {language === 'KR' ? '뚜껑이 닫힌 생수/음료' : 'Sealed Water Bottles'}
                          </span>
                        </div>

                        {/* Prohibited (Red) */}
                        <div className="flex flex-col items-center justify-between p-3 bg-white rounded-xl border border-rose-100 shadow-3xs text-center space-y-2">
                          <span className="bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                            {language === 'KR' ? '반입 불가' : 'PROHIBITED'}
                          </span>
                          <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-rose-500 bg-rose-50/20 shadow-inner overflow-hidden">
                            <svg width="72" height="72" viewBox="0 0 100 100" className="w-18 h-18 opacity-80">
                              <g transform="translate(20, 8)">
                                {/* Straw */}
                                <path d="M42 5 L42 22 L32 22" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                {/* Lid */}
                                <ellipse cx="30" cy="24" rx="20" ry="6" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
                                <rect x="20" y="24" width="20" height="3" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2" />
                                {/* Cup body */}
                                <path d="M13 28 L18 72 C18 74, 20 76, 22 76 L38 76 C40 76, 42 74, 43 72 L47 28 Z" fill="#fcd34d" stroke="#1e293b" strokeWidth="3" />
                                {/* Coffee sleeve */}
                                <path d="M15 40 L17 56 L43 56 L45 40 Z" fill="#b45309" stroke="#1e293b" strokeWidth="2" />
                                {/* Coffee icon emblem on sleeve */}
                                <circle cx="30" cy="48" r="4" fill="#78350f" />
                              </g>
                            </svg>
                            {/* Prohibited diagonal cross-bar overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <svg width="80" height="80" viewBox="0 0 100 100" className="w-full h-full text-rose-500 stroke-rose-500">
                                <line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-rose-600">
                            {language === 'KR' ? '일회용 테이크아웃 컵' : 'Disposable Cups & Drinks'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {/* Not Allowed Section */}
                        <div className="p-3.5 bg-rose-50/30 rounded-xl border border-rose-100/50 space-y-2">
                          <div className="flex items-center gap-1.5 text-rose-700 text-xs font-black">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                            <span>{language === 'KR' ? '반입 불가 (Prohibited)' : 'Prohibited Food/Drinks'}</span>
                          </div>
                          <ul className="text-xs text-slate-600 font-bold space-y-1.5 list-disc pl-4 leading-relaxed">
                            <li>
                              {language === 'KR' 
                                ? '가벼운 충격에도 쏟아질 우려가 있는 일회용 용기(일명 \'테이크아웃 컵\') 등에 담긴 음식물 및 음료' 
                                : 'Food and drinks in disposable containers/cups (e.g., takeout cups) prone to spilling upon light impact'}
                            </li>
                          </ul>
                        </div>

                        {/* Allowed Section */}
                        <div className="p-3.5 bg-emerald-50/30 rounded-xl border border-emerald-100/50 space-y-2">
                          <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-black">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                            <span>{language === 'KR' ? '반입 가능 (Allowed)' : 'Allowed Food/Drinks'}</span>
                          </div>
                          <ul className="text-xs text-slate-600 font-bold space-y-1.5 list-disc pl-4 leading-relaxed">
                            <li>
                              {language === 'KR' 
                                ? '차내에서 취식할 목적이 아닌 단순히 운반하기 위해 소지하고 타는 완전히 포장된 음식물 또는 식재료 등' 
                                : 'Fully packaged food or raw ingredients carried simply for transport purposes and not for in-transit consumption'}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {transitSection === 'CHILD_FREE' && (
            <div className="space-y-6 animate-fade-in text-left">
              {/* BRAND HEADER TITLE */}
              <div className="text-center py-4 sm:py-6 max-w-2xl mx-auto space-y-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase font-heading">
                  {language === 'KR' ? '어린이 대중교통 무료 요금 안내' : 'Children Public Transit Free Fare Guide'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-bold">
                  {language === 'KR' 
                    ? '부산 대중교통 어린이 무료 정책의 대상 설정과 올바른 충전카드 등록 요령입니다' 
                    : 'Target group definition and child transit card registration methods'}
                </p>
              </div>

              {/* CARD GRID (Style 1: Minimalist outline illustrations matching first image) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {/* SUB-CARD 01: Eligibility */}
                <div className="relative bg-white p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between text-center min-h-[340px]">
                  <div className="absolute top-4 left-4 w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black tracking-tight">
                    01
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                      {language === 'KR' ? '지원 대상 연령' : 'Target Age Group'}
                    </h3>
                  </div>

                  <div className="my-4 flex justify-center items-center">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                      <svg className="w-16 h-16 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="50" cy="45" r="22" />
                        <path d="M28 45c0-10 10-18 22-18s22 8 22 18" />
                        <path d="M50 27v-5M44 22h12" />
                        <circle cx="42" cy="42" r="2" fill="currentColor" />
                        <circle cx="58" cy="42" r="2" fill="currentColor" />
                        <path d="M44 51c2 4 10 4 12 0" />
                        <circle cx="36" cy="48" r="1.5" fill="currentColor" opacity="0.5" />
                        <circle cx="64" cy="48" r="1.5" fill="currentColor" opacity="0.5" />
                        <path d="M25 80c5-12 12-13 25-13s20 1 25 13" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-500 font-bold leading-relaxed">
                    {language === 'KR' 
                      ? '만 6세 ~ 12세 어린이 전원 대상 (타 지역 거주어린이 및 해외 관광객 포함)' 
                      : 'All kids aged 6 to 12 (includes foreign visitors and domestic travellers).'}
                  </p>
                </div>

                {/* SUB-CARD 02: Benefit */}
                <div className="relative bg-white p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between text-center min-h-[340px]">
                  <div className="absolute top-4 left-4 w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black tracking-tight">
                    02
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                      {language === 'KR' ? '부과 요금 및 혜택' : 'Transit Fare / Fares'}
                    </h3>
                  </div>

                  <div className="my-4 flex justify-center items-center">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                      <svg className="w-16 h-16 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="50" cy="42" r="22" />
                        <circle cx="50" cy="42" r="18" strokeDasharray="3 3" />
                        <path d="M42 61v18l8-6 8 6V61" />
                        <path d="M50 32l3.5 7h7.5l-6 5.5 2 7.5-7-5.5-7 5.5 2-7.5-6-5.5h7.5z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-emerald-600 font-black text-xs block">{language === 'KR' ? '교통카드 접촉 시 0원' : '₩0 with card tap'}</span>
                    <p className="text-xs sm:text-[13px] text-slate-500 font-bold leading-relaxed">
                      {language === 'KR' 
                        ? '※ 단, 현금으로 탑승 결제할 경우 일반 어린이 요금이 그대로 부과됩니다.' 
                        : 'Regular cash fares apply if boarding without tapping a card.'}
                    </p>
                  </div>
                </div>

                {/* SUB-CARD 03: Register */}
                <div className="relative bg-white p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between text-center min-h-[340px]">
                  <div className="absolute top-4 left-4 w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black tracking-tight">
                    03
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                      {language === 'KR' ? '교통카드 등록요령' : 'How to Enroll'}
                    </h3>
                  </div>

                  <div className="my-4 flex justify-center items-center">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                      <svg className="w-16 h-16 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="34" y="20" width="32" height="60" rx="6" />
                        <rect x="38" y="26" width="24" height="42" rx="2" />
                        <circle cx="50" cy="74" r="2.5" />
                        <circle cx="50" cy="44" r="10" strokeDasharray="2 2" />
                        <path d="M45 44l3 3 7-7" strokeWidth="2" stroke="#10b981" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-500 font-bold leading-relaxed">
                    {language === 'KR' 
                      ? '일반 교통카드 구매 후 편의점 계산대에서 직접 생년월일을 등록하거나 앱을 통해 활성화' 
                      : 'Purchase a card at convenience stores and request date-of-birth registration.'}
                  </p>
                </div>

                {/* SUB-CARD 04: Exclusions */}
                <div className="relative bg-white p-5 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between text-center min-h-[340px]">
                  <div className="absolute top-4 left-4 w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black tracking-tight">
                    04
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                      {language === 'KR' ? '이용범위 및 예외' : 'Exclusions'}
                    </h3>
                  </div>

                  <div className="my-4 flex justify-center items-center">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                      <svg className="w-16 h-16 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M50 18L18 74h64L50 18z" />
                        <path d="M50 38v18" strokeWidth="2.5" />
                        <circle cx="50" cy="64" r="2.5" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-500 font-bold leading-relaxed">
                    {language === 'KR' 
                      ? '시내버스, 마을버스, 지하철 1~4호선 해당. (광역급행 2000번 버스 및 코레일 동해선은 무료 대상에서 제외)' 
                      : 'Applies to buses and subways. Excludes Express No. 2000 & Donghae Line.'}
                  </p>
                </div>
              </div>

              {/* DETAIL PAMPHLET CALLOUT (Style 2: High-visibility layout from image 2) */}
              <div className="space-y-6 pt-6 border-t border-slate-150">
                {/* Voice guide terminal box */}
                <div className="bg-gradient-to-br from-[#004481]/5 via-white to-blue-50/10 p-6 rounded-3xl border border-blue-100 shadow-3xs flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-3xl shrink-0 shadow-3xs">
                    🔊
                  </div>
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] bg-blue-600 text-white px-2 rounded-full font-black uppercase tracking-wider block w-max">
                      Voice Announcement Alert
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-slate-800">
                      {language === 'KR' ? '📢 교통카드 접촉 단말기 안내 음성 주의' : '📢 Voice Announcement at Terminal Reader'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                      {language === 'KR' 
                        ? '등록된 어린이 카드를 접촉하면 "어린이입니다"라는 음성 안내가 단말기에서 송출됩니다. 타인의 교통카드를 무단 사용할 경우 관련 규정에 따라 기본요금 30배 가량의 무거운 부가금(벌금)이 징수될 수 있으니 주의 바랍니다.' 
                        : 'Tapping a child card triggers "어린이입니다" (It\'s a child). Severe fines apply to unauthorized users of child/youth transit cards.'}
                    </p>
                  </div>
                </div>

                {/* Infographic with sleek frame border */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <p className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#004481] rounded-full inline-block"></span>
                    <span>{language === 'KR' ? '어린이 대중교통 무료화 등록 방법 안내서' : 'Official Enrollment Guide Infographic'}</span>
                  </p>
                  
                  <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 flex flex-col items-center p-3 shadow-3xs">
                    <img 
                      src={CHILD_TRANSPORT_INFOGRAPHIC_BASE64} 
                      alt={language === 'KR' ? '부산 대중교통 어린이 무료 정책 안내문 (How to Enroll)' : 'How to Enroll in the Free Fare Program Infographic'} 
                      className="w-full h-auto object-contain rounded-xl max-h-[800px]"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <a 
                      href="https://www.busan.go.kr/depart/childtransport" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-black transition-colors hover:underline"
                    >
                      <span>{language === 'KR' ? '출처: 부산광역시 대표포털' : 'Source: Busan Metropolitan City Portal'}</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MAP FULLSCREEN ZOOM MODAL */}
      {mapModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in"
          onClick={() => setMapModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:px-6 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">🗺️</span>
                <h4 className="font-extrabold text-slate-850 text-sm sm:text-base">
                  {language === 'KR' ? '부산 관광 가이드 일러스트 지도' : 'Busan Travel Guide Illustrative Map'}
                </h4>
              </div>
              <button 
                onClick={() => setMapModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer text-sm font-bold border border-slate-200/50"
              >
                ✕
              </button>
            </div>

            {/* Modal Body (Scrollable Image container) */}
            <div className="flex-1 overflow-auto bg-slate-50 p-4 flex items-center justify-center min-h-0">
              <img 
                src="/images/busan_wide_map_1782270122755.jpg"
                alt="Busan Travel Map Illustration Enlarged"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-md border border-slate-200/60"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center shrink-0">
              <p className="text-xs text-slate-500 font-bold">
                {language === 'KR'
                  ? '※ r/BusanTravelTips 커뮤니티와 현지 가이드를 통해 엄선된 추천 장소의 개략적인 일러스트 위치 지도입니다.'
                  : '* This is a schematic illustrative location map of recommended spots curated by locals.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
