/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Clock, 
  ChevronDown, 
  ChevronUp, 
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
  Sparkles
} from 'lucide-react';
import { BUSAN_ITINERARIES, ItineraryCourse, ItineraryStep } from '../data/itineraries';

interface BusanItinerariesViewProps {
  language: 'KR' | 'EN';
}

type CategoryType = 'DAY' | '1NIGHT' | '2NIGHTS' | '3NIGHTS' | '4NIGHTS' | 'GOURMET' | 'HISTORY';

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

export default function BusanItinerariesView({ language }: BusanItinerariesViewProps) {
  // Initially show the categories overview dashboard (null), which is "카테고리만 보여지게 만들어줘"
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'itinerary-day': true, // Keep day itinerary open by default for immediate preview when selected
  });

  // Quiz States
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0); // 0: Landing inside card, 1~7: Questions 1~7, 8: Result
  const [answers, setAnswers] = useState<('A' | 'B')[]>([]);

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
          badgeColor: 'bg-orange-100 text-orange-800'
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

  const categoriesConfig: CategoryConfig[] = [
    {
      id: 'DAY',
      icon: '⚡',
      tagKo: '하루 순삭',
      tagEn: 'Day Trip',
      titleKo: '당일치기',
      titleEn: 'Day Trip',
      descKo: '바쁜 일상에서 벗어나, 푸르고 탁 트인 아름다운 해운대와 송정 바다 기슭을 따라 편안하게 힐링하는 당일 하루 코스예요.',
      descEn: 'A fast-paced, step-free scenic ocean escape designed perfectly for 1-day visits.',
      bgClass: 'bg-orange-50/70 hover:bg-orange-50',
      borderClass: 'border-orange-100 hover:border-orange-200',
      textClass: 'text-orange-900'
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
      tagKo: '붉은 석양',
      tagEn: 'Golden Sunset',
      titleKo: '2박',
      titleEn: '2 Nights',
      descKo: '알록달록 아름다운 감천마을의 산책길을 따라 예쁜 전경을 만나고, 해가 지는 다대포 갈대나무 숲에서 평화로운 저녁노을을 만끽하는 여정이에요.',
      descEn: 'Adventure through Gamcheon main peak paths and watch Dadaepo sunset marsh on wide decks.',
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
    <div className="space-y-8 text-left animate-fade-in max-w-5xl mx-auto" id="busan-itineraries-container">
      {/* Header Info Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-left max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-800 flex items-center gap-2.5">
            <span>🗺️</span>
            <span>{language === 'KR' ? '부산 현지인이 추천하는 부산 여행' : 'Stepless Busan Handcrafted Itineraries'}</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed font-medium">
            {language === 'KR' 
              ? '현지인이 알려주는 부산의 매력을 카테고리별로 추천해주는 일정 가이드입니다.' 
              : 'Pristinely curated, 100% step-free travel itineraries designed for families with strollers, heavy luggage carriers, wheelchair users, and senior companions.'}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50/60 border border-blue-100/70 py-1 px-3 text-xs font-extrabold text-[#004481]/90 select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#004481]"></span>
            </span>
            <span>{language === 'KR' ? '⚙️ 현재 더 정확하고 많은 정보를 추천하기 위해 업데이트 중입니다.' : '⚙️ Currently updating to recommend more accurate and richer information.'}</span>
          </div>
        </div>
      </div>

      {/* Main Container Switching: Categories Grid VS Category Detailed Itinerary */}
      {activeCategory === null ? (
        // Mode 2: SHOW CATEGORY ONLY (GRID VIEW) - "카테고리만 보여지게 만들어줘"
        <div className="space-y-8">
          
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" id="categories-overview-grid">
            {categoriesConfig.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-3.5 group transform hover:-translate-y-0.5 hover:shadow-md ${cat.bgClass} ${cat.borderClass}`}
              >
                <span className="text-2.5xl sm:text-3xl select-none shrink-0 transition-transform group-hover:scale-110 duration-200">{cat.icon}</span>
                <div className="flex-1 min-w-0 text-left">
                  <h4 className={`text-xs sm:text-sm md:text-base font-extrabold font-heading tracking-tight text-slate-800`}>
                    {language === 'KR' ? cat.titleKo : cat.titleEn}
                  </h4>
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 group-hover:text-[#004481] transition-colors">
                    {language === 'KR' ? '코스 보기 →' : 'View →'}
                  </span>
                </div>
              </div>
            ))}
          </div>

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
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-6 animate-fade-in relative overflow-hidden">
              {/* Quiz Header with progress bar & close button */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-[#004481] bg-blue-50 px-3 py-1.5 rounded-xl whitespace-nowrap">
                    {quizStep <= quizQuestions.length 
                      ? `${language === 'KR' ? '질문' : 'Question'} ${quizStep} / ${quizQuestions.length}`
                      : (language === 'KR' ? '분석 완료' : 'Analysis Complete')
                    }
                  </span>
                  {quizStep <= quizQuestions.length && (
                    <div className="w-24 sm:w-36 bg-slate-100 h-2 rounded-full overflow-hidden shrink-0">
                      <div 
                        className="bg-[#004481] h-full transition-all duration-300"
                        style={{ width: `${(quizStep / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={resetQuiz}
                  className="px-3 py-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl transition-all cursor-pointer text-xs font-bold border border-slate-100"
                >
                  {language === 'KR' ? '종료하기' : 'Exit Test'}
                </button>
              </div>

              {/* Questions Phase */}
              {quizStep <= quizQuestions.length && quizStep > 0 ? (
                <div className="space-y-6 text-left animate-fade-in">
                  <h3 className="text-sm sm:text-base font-black text-slate-800 leading-relaxed">
                    {language === 'KR' ? quizQuestions[quizStep-1].questionKo : quizQuestions[quizStep-1].questionEn}
                  </h3>

                  <div className="grid grid-cols-1 gap-3.5">
                    {quizQuestions[quizStep-1].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswerSelect(opt.type)}
                        className="w-full text-left p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/[0.15] cursor-pointer transition-all duration-200 flex items-center gap-4 group transform hover:-translate-y-0.5 active:scale-[0.98]"
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-sm font-black text-[#004481] group-hover:bg-[#004481] group-hover:text-white transition-all shrink-0">
                          {opt.type}
                        </div>
                        <span className="text-2xl filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)] select-none shrink-0 transition-transform group-hover:scale-110 duration-200">
                          {opt.icon}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed text-left flex-1">
                          {language === 'KR' ? opt.textKo : opt.textEn}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // RESULTS PHASE
                <div className="space-y-6 text-left py-2 animate-fade-in">
                  {(() => {
                    const resultType = getQuizResultType();
                    const details = getResultDetails(resultType);
                    const countA = answers.filter(a => a === 'A').length;
                    const countB = answers.filter(a => a === 'B').length;

                    return (
                      <div className="space-y-6 max-w-3xl mx-auto">
                        <div className="text-center space-y-4">
                          <h4 className="text-xl sm:text-2xl font-black text-[#004481] tracking-tight leading-snug mt-2 text-center">
                            {language === 'KR' ? details?.titleKo : details?.titleEn}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-500 font-extrabold text-center max-w-xl mx-auto leading-relaxed">
                            {language === 'KR' ? details?.subTitleKo : details?.subTitleEn}
                          </p>
                        </div>

                        {/* Course Schedule Map */}
                        <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-150 space-y-4 text-left">
                          <h5 className="text-xs font-black uppercase text-[#004481] bg-blue-50 px-3 py-1.5 rounded-xl inline-block">
                            📍 {language === 'KR' ? '추천 1박 2일 코스일정' : 'Recommended 1N2D Itinerary'}
                          </h5>
                          <div className="space-y-4 pl-1">
                            {(language === 'KR' ? details?.courseKo : details?.courseEn)?.map((item, idx) => (
                              <div key={idx} className="flex gap-3.5 items-start">
                                <div className="w-6 h-6 rounded-full bg-[#004481] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                                  {idx + 1}
                                </div>
                                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Hotspots & Food side-by-side on desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-150 space-y-2">
                            <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                              <span>🎯</span>
                              <span>{language === 'KR' ? '추천 핫플레이스' : 'Recommended Hotspots'}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                              {language === 'KR' ? details?.hotspotsKo : details?.hotspotsEn}
                            </p>
                          </div>

                          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-150 space-y-2">
                            <div className="text-xs font-black text-slate-800 flex-[#1] flex items-center gap-1.5">
                              <span>🍴</span>
                              <span>{language === 'KR' ? '추천 로컬 푸드' : 'Recommended Local Cuisines'}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                              {language === 'KR' ? details?.foodKo : details?.foodEn}
                            </p>
                          </div>
                        </div>

                        {/* Tip Box */}
                        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-100 text-left relative mt-2">
                          <span className="absolute -top-3 left-6 text-lg">💡</span>
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-amber-800 uppercase tracking-wide">
                              {language === 'KR' ? '알아두면 유용한 현지 여행 꿀팁!' : 'USEFUL TRAVEL TIP!'}
                            </span>
                            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-semibold">
                              {language === 'KR' ? details?.tipKo : details?.tipEn}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                          <button
                            onClick={resetQuiz}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#004481] hover:bg-[#003366] active:scale-95 text-white font-black text-xs sm:text-sm transition-all shadow-[0_4px_12px_rgba(0,68,129,0.15)] cursor-pointer"
                          >
                            <span>🔄 {language === 'KR' ? '테스트 다시 하기' : 'Retake Test'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        // Mode 2: DETAILED ITINERARY PAGE FOR SELECTED CATEGORY - "누르면 그 페이지로 넘어가게 만들어줘"
        <div className="space-y-6">
          {/* Back Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <button
              onClick={() => setActiveCategory(null)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-bold border border-slate-200 text-xs sm:text-sm cursor-pointer transition-all hover:border-slate-300"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <span>{language === 'KR' ? ' 전체 카테고리로 돌아가기' : 'Go Back to Categories'}</span>
            </button>

            {/* Current Active Category indicator */}
            <div className="flex items-center gap-2">
              <span className="text-xl">{activeCategoryConfig?.icon}</span>
              <span className="text-xs sm:text-sm font-black text-slate-700">
                {language === 'KR' ? activeCategoryConfig?.titleKo : activeCategoryConfig?.titleEn}  
                <span className="text-slate-400 font-sans ml-1 text-xs">
                  ({filteredCourses.length} {language === 'KR' ? '개 일정' : 'Itinerary'})
                </span>
              </span>
            </div>
          </div>

          {/* Quick Selection Pills on Top to switch easily */}
          <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100">
            {categoriesConfig.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] sm:text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#004481] text-white border-[#004481] shadow-sm transform scale-105'
                      : 'bg-white hover:bg-slate-50 text-slate-500 border-slate-200/75'
                  }`}
                >
                  <span>{cat.icon} </span>
                  <span>{language === 'KR' ? cat.titleKo : cat.titleEn}</span>
                </button>
              );
            })}
          </div>

          {/* Courses Dynamic Cards Grid */}
          <div className="space-y-6 animate-fade-in" id="itinerary-courses-list">
            {filteredCourses.map((course) => {
              const isExpanded = !!expandedItems[course.id];
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl border border-slate-100/90 shadow-[0_4px_22px_rgba(0,0,0,0.015)] overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.035)] transition-all duration-300 text-left animate-fade-in"
                  id={`course-card-${course.id}`}
                >
                  {/* Card Meta Header */}
                  <div className="p-6 sm:p-8 border-b border-slate-50/70 text-left">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {/* Difficulty Badge */}
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                        course.difficultyKo === '쉬움'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-amber-50 text-amber-800 border border-amber-100'
                      }`}>
                        {language === 'KR' ? `보행 강도: ${course.difficultyKo}` : `Effort Level: ${course.difficultyEn}`}
                      </span>

                      {/* Duration Tag */}
                      <span className="text-[10px] bg-slate-100 border border-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-bold font-sans">
                        {language === 'KR' ? `추천 소요: ${course.durationKo}` : `Duration: ${course.durationEn}`}
                      </span>

                      {/* Topic tag */}
                      <span className="text-[10px] bg-blue-50 border border-blue-50 text-[#004481] px-2.5 py-1 rounded-full font-bold font-sans">
                        {language === 'KR' ? course.tagKo : course.tagEn}
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1 select-none text-left">
                        <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-800 tracking-tight leading-tight">
                          {language === 'KR' ? course.titleKo : course.titleEn}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
                          {language === 'KR' ? course.subtitleKo : course.subtitleEn}
                        </p>
                      </div>

                      {/* Expand / Collapse action */}
                      <button
                        onClick={() => toggleItem(course.id)}
                        className="inline-flex items-center gap-2 px-4.5 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 active:scale-95 text-slate-700 hover:text-slate-900 border border-slate-200/50 text-xs font-black transition-all shrink-0 cursor-pointer font-bold"
                      >
                        <span>{isExpanded ? (language === 'KR' ? '상세 동선 접기' : 'Hide Timeline') : (language === 'KR' ? '상세 동선 펼치기' : 'View Timeline')}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Roadmap Timeline */}
                  {isExpanded && (
                    <div className="p-6 sm:p-8 bg-slate-50/30 border-b border-slate-50/90 animate-fade-in text-left">
                      <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-6 font-sans">
                        {language === 'KR' ? '순차 도보 가이드' : 'COURSE TRAVEL TIMELINE'}
                      </h4>

                      <div className="relative pl-6 sm:pl-8 space-y-7 text-left">
                        {/* Vertical Connecting Line */}
                        <div className="absolute left-[11px] sm:left-[15px] top-3.5 bottom-3.5 w-0.5 border-l-2 border-dashed border-slate-200/80"></div>

                        {course.steps.map((step, idx) => (
                          <div key={idx} className="relative group text-left">
                            {/* Circle bullet with step index */}
                            <div className="absolute -left-[27px] sm:-left-[31px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#004481] flex items-center justify-center text-[10.5px] font-black text-[#004481] shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-transform group-hover:scale-110">
                              {idx + 1}
                            </div>

                            {/* Step details container card */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.005)] hover:border-slate-200/80 transition-all text-left">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h5 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-tight">
                                  {language === 'KR' ? step.titleKo : step.titleEn}
                                </h5>
                              </div>

                              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed font-sans mb-3 text-left">
                                {language === 'KR' ? step.descKo : step.descEn}
                              </p>

                              {step.stationInfoKo && (
                                <div className="inline-flex items-center gap-1.5 bg-emerald-50/60 border border-emerald-100/80 text-emerald-800 px-3 py-1.5 rounded-xl text-[10.5px] font-extrabold animate-fade-in text-left">
                                  <span className="text-emerald-700">🚇</span>
                                  <span className="font-extrabold">{language === 'KR' ? step.stationInfoKo : step.stationInfoEn}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Accessible Tip Banner at bottom of card */}
                  <div className="bg-amber-500/[0.02] p-5 sm:p-6 text-left flex items-start gap-3 border-t border-slate-50/60">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700 shrink-0 mt-0.5">
                      <Info className="w-4 h-4 text-amber-700 shrink-0" />
                    </div>
                    <div className="space-y-1 select-none text-left">
                      <span className="text-xs font-black text-amber-800 uppercase tracking-wide font-sans">
                        {language === 'KR' ? '💡 알고 가면 두 배로 편안한 현지 이동 꿀팁!' : '💡 LOCAL CONVENIENCE & TRAVEL TIP'}
                      </span>
                      <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-semibold text-left">
                        {language === 'KR' ? course.overallTipKo : course.overallTipEn}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}

            {filteredCourses.length === 0 && (
              <div className="bg-white rounded-3xl p-12 border border-slate-100 text-center text-slate-400">
                <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-base font-bold text-slate-600">
                  {language === 'KR' ? '선택하신 카테고리에 알맞은 일정이 아직 없습니다.' : 'No itineraries found matching this category.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
