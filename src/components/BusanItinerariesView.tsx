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

type CategoryType = 'DAY' | '1NIGHT' | '2NIGHTS' | '3NIGHTS' | '4NIGHTS' | 'GOURMET' | 'HISTORY';

interface BusanItinerariesViewProps {
  language: 'KR' | 'EN';
  initialCategory?: CategoryType | null;
  onBack?: () => void;
  onSelectCategory?: (category: CategoryType) => void;
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

export default function BusanItinerariesView({ 
  language, 
  initialCategory = null, 
  onBack, 
  onSelectCategory 
}: BusanItinerariesViewProps) {
  // Initially show the categories overview dashboard (null), which is "카테고리만 보여지게 만들어줘"
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(initialCategory || null);

  // Synchronize internal activeCategory state with changes in initialCategory prop
  React.useEffect(() => {
    setActiveCategory(initialCategory || null);
  }, [initialCategory]);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'itinerary-day': true, // Keep day itinerary open by default for immediate preview when selected
  });
  const [activeTab2Nights, setActiveTab2Nights] = useState<number>(0);
  const [activeTab4Nights, setActiveTab4Nights] = useState<number>(0);
  const [activeDayCourseIndex, setActiveDayCourseIndex] = useState<number>(0);

  // Scroll to simulated top of the view/page when the category changes to make it feel like navigating to a new page.
  React.useEffect(() => {
    // Scroll window/page to the top smoothly to simulate brand new page loading
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Also scroll the local container into view as a backup anchor
    const container = document.getElementById('busan-itineraries-container');
    if (container) {
      const timer = setTimeout(() => {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeCategory]);

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
      descKo: '전포·서면 감성 골목과 동해 바위 절벽의 해동용궁사, 그리고 고즈넉한 수영의 명소들을 완만하게 엮어 이동 편의를 만끽하는 매력적인 2박 코스예요.',
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
    <div className="space-y-8 text-left animate-fade-in max-w-5xl mx-auto" id="busan-itineraries-container">
      {/* Header Info Banner - Only visible on main travel tips page */}
      {activeCategory === null && (
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
      )}

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
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(cat.id);
                  } else {
                    setActiveCategory(cat.id);
                  }
                }}
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
        <div className="space-y-8 animate-fade-in text-left">
          {/* Back Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <button
              onClick={() => setActiveCategory(null)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-bold border border-slate-200 text-xs sm:text-sm cursor-pointer transition-all hover:border-slate-300"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <span>{language === 'KR' ? '🗺️ 전체 카테고리로 돌아가기' : '🗺️ Back to All Categories'}</span>
            </button>

            {/* Current Active Category indicator */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeCategoryConfig?.icon}</span>
              <span className="text-sm font-black text-slate-800">
                {language === 'KR' ? activeCategoryConfig?.titleKo : activeCategoryConfig?.titleEn}  
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
                      ? 'bg-[#004481] text-white border-[#004481] shadow-md transform scale-105'
                      : 'bg-white hover:bg-slate-50 text-slate-500 border-slate-200/75'
                  }`}
                >
                  <span>{cat.icon} </span>
                  <span>{language === 'KR' ? cat.titleKo : cat.titleEn}</span>
                </button>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* DYNAMIC RENDERING ENGINE FOR BESPOKE INDEPENDENT PAGES    */}
          {/* ========================================================= */}
          {(() => {
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
                      passDescKo: "BIFF광장의 따스한 길거리 씨앗호떡 미식부터 용두산공원 하늘전망대까지, 원도심의 매력과 피란 기억을 유모차·휠체어 맞춤형 무장벽 슬로프로 완전 정복합니다.",
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
                          {language === 'KR' ? '보행 무장벽 지수: 매우 편함 (단차 없음)' : 'Step-free level: Very Convenient (No Steps)'}
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
                              <span>{language === 'KR' ? '아침 일출 명당 & 무장벽 카페' : 'Morning Vista Cafe Recommendations'}</span>
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
                          ? '전포카페거리, 해동용궁사부터 망미 골목까지 감성 넘치는 핫플레이스들을 경사 걱정 없이 평탄 무장벽으로 만나는 일주 코스예요.' 
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
                          <span className="text-[10px] font-black text-amber-850 uppercase tracking-wider block mb-1">Accessibility Insight / 무장벽 관찰 지도</span>
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
                          <span>{language === 'KR' ? 'Day 2 (벚꽃 물결 & 기암절벽 동해 바다)' : 'Day 2 (Blossom Walks & Ocean Shrines)'}</span>
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
                          <span className="text-[10px] font-black text-amber-850 uppercase tracking-wider block mb-1">Accessibility Insight / 무장벽 관찰 지도</span>
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
                          <span className="text-[10px] font-black text-amber-850 uppercase tracking-wider block mb-1">Accessibility Insight / 무장벽 관찰 지도</span>
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
                        {language === 'KR' ? '🏠 부산 무장벽 종합 선물세트: 4박 5일 실내외 쾌적 일주 코스' : '🏠 Comprehensive Barrier-Free Busan Layout: 4N5D Master Plan'}
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
                        {language === 'KR' ? '❤️ 대가족 인생 꿀맛! 영양 만점 부산 로컬 미식 무장벽 맵' : '❤️ Delicious Local Cuisines in Busan: Zero-Step Gastronomy Guide'}
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
                          {language === 'KR' ? '💡 로컬 식도락전용 무장벽 비결!' : '💡 LOCAL CULINARY ACCESSIBILITY TIP'}
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
                          ? '한국 6·25 아픈 피란 역사를 가득 안고 살아온 소박하지만 정겨운 골목입니다. 무자비한 168 계단지대를 한순간 하늘 구름처럼 수월하게 고속 수직 이동시켜 주는 공영 무장벽 모노레일을 타고 역사 속 정취를 만끽해보세요.' 
                          : 'Discover Choryangs traditional steep slopes smoothly ascending using the free high-speed glass observation lift.'}
                      </p>
                    </div>

                    {/* Historical Scrapbook Content Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* Left Sidebar block: Historial Story */}
                      <div className="md:col-span-1 bg-[#fbf9f4] p-5.5 rounded-3xl border border-[#dcd1ba] text-left space-y-3 font-sans">
                        <span className="text-[10px] font-black text-amber-800 tracking-wider block uppercase">HISTORY LOGS / 초량 이바구 돋보기</span>
                        <h4 className="text-sm font-black text-amber-950 font-heading">{language === 'KR' ? '6.25 피란 수도와 산복도로' : 'Korean War Provisional Capital'}</h4>
                        <p className="text-xs text-stone-500 leading-relaxed font-semibold">
                          {language === 'KR' 
                            ? '6.25 전쟁 당시 수많은 피란민들이 도망쳐 내려와 영도와 초량 산기슭에 손수 돌을 쌓아 임시 가옥을 지으며 터전을 이룬 것이 오늘날 산복도로의 기원입니다. 과거에 물동이를 이고 힘겹게 오르던 고갯길은 이제 주민과 여행자를 위해 모노레일과 야자매트로 다정하게 정비되었습니다.' 
                            : 'During the Korean War, thousands of refugees built stone homes on vertical cliffs surrounding Choryang. The historical steep valleys are now fully equipped with a modern monorail for seniors and stroller access.'}
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
                          {language === 'KR' ? '📜 역사 문화 답사 전용 무장벽 비결!' : '📜 HISTORICAL PATHWAY SENSING GUIDE'}
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
    </div>
  );
}
