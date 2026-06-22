export interface ItineraryStep {
  time?: string;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
  icon?: string;
  stationInfoKo?: string;
  stationInfoEn?: string;
}

export interface ItineraryCourse {
  id: string;
  titleKo: string;
  titleEn: string;
  subtitleKo: string;
  subtitleEn: string;
  category: 'DAY' | '1NIGHT' | '2NIGHTS' | '3NIGHTS' | '4NIGHTS' | 'GOURMET' | 'HISTORY';
  durationKo: string;
  durationEn: string;
  tagKo: string;
  tagEn: string;
  difficultyKo: '쉬움' | '보통' | '어려움';
  difficultyEn: 'Easy' | 'Moderate' | 'Challenging';
  overallTipKo: string;
  overallTipEn: string;
  steps: ItineraryStep[];
}

export const BUSAN_ITINERARIES: ItineraryCourse[] = [
  {
    id: 'itinerary-day',
    titleKo: '해운대 & 송정 바다 바람 당일치기 쾌속 힐링 코스',
    titleEn: 'Haeundae & Songjeong Ocean Breeze Day Trip',
    subtitleKo: '지하철과 해변열차만으로 편안하게 다녀오는 바다 여행 당일 코스예요.',
    subtitleEn: 'Zero-step seaside day trip utilizing beach trains and light walk paths',
    category: 'DAY',
    durationKo: '당일치기 (약 6시간)',
    durationEn: '1 Day (Approx. 6 Hours)',
    tagKo: '당일치기 ⚡',
    tagEn: 'Day Trip ⚡',
    difficultyKo: '쉬움',
    difficultyEn: 'Easy',
    overallTipKo: '해운대에서 탑승하는 해변열차는 미포, 청사포, 송정정거장 모두 휠체어와 유모차가 쉽게 다닐 수 있는 평탄 데크 램프로 연결되어 있습니다. 미리 역사 창구에 리프트 상/하차 도움을 요청하시면 매우 쾌적합니다.',
    overallTipEn: 'Every terminal of the Haeundae Beach Train is designed perfectly flat with gentle wooden ramp entrances. The train cabins have safe designated wheelchair and stroller parking spots.',
    steps: [
      {
        time: '11:00 - 13:00',
        titleKo: '해운대 미포정거장 탑승 및 푸른 바다 감상',
        titleEn: 'Boarding at Mipo Station & Sea Sightseeing',
        descKo: '경사가 완만하고 보행 통로가 깔끔하게 되어 있어 아주 편하게 해변열차에 탑승할 수 있어요. 아름다운 바다를 창밖으로 감상하며 힐링하는 시간을 가져보세요.',
        descEn: 'Enter the train via gentle slopes. Marvel at the endless deep blue East Sea and the historic Oryukdo Islands sliding past the wide panorama train windows.',
        icon: 'Platform',
        stationInfoKo: '중동역 7번 출구에서 평지 도보 12분',
        stationInfoEn: 'Jung-dong Station Exit 7, 12 mins flat walk'
      },
      {
        time: '13:00 - 15:00',
        titleKo: '청사포 다릿돌 전망대 공중 산책',
        titleEn: 'Cheongsapo Daritdol Skywalk Walkway',
        descKo: '바다 명소인 다릿돌 전망대는 입구부터 평평하게 이어져 있어 누구나 쉽게 들어갈 수 있어요. 푸른 바다 위 공중을 걷는 듯한 특별한 기분을 느껴보세요.',
        descEn: 'The observatory is built level with the main road. Enjoy a striking, breezy, 360-degree walk 20 meters high over the tide with zero step restrictions.',
        icon: 'Camera'
      },
      {
        time: '15:00 - 17:00',
        titleKo: '송정 정거장 산책 및 해변 카페 쉼터',
        titleEn: 'Songjeong Beach Paved Boardwalk',
        descKo: '송정역에 내려 온 가족이 함께 시원한 송정 해변 길을 걸어보세요. 길가에 있는 예쁜 대형 카페에서 함께 달콤한 커피나 차 한잔을 나누며 쉬어가기 정말 좋습니다.',
        descEn: 'Stroll along the broad, flat beachfront path of Songjeong, famous for surfing. Unwind at local accessible bakeries and tea cafes with flat door entryways.',
        icon: 'Coffee',
        stationInfoKo: '송정역 2번 출구 이용 연계 편리',
        stationInfoEn: 'Songjeong Station (Donghae Line) Exit 2 provides easy link'
      }
    ]
  },
  {
    id: 'itinerary-1night',
    titleKo: '광안리 밤바다와 트렌디 쉘터 1박 2일 야경 코스',
    titleEn: 'Gwangalli Sparkling Waves 1N2D Night Vista Course',
    subtitleKo: '광안대교 다이나믹 LED 파도와 트렌디 복합문화공간 민락더마켓 피치',
    subtitleEn: 'Dynamic LED bridge shows and trendy waterfront food plazas with zero steps',
    category: '1NIGHT',
    durationKo: '1박 2일',
    durationEn: '1 Night 2 Days',
    tagKo: '1박 2일 🌙',
    tagEn: '1 Night 2 Days 🌙',
    difficultyKo: '쉬움',
    difficultyEn: 'Easy',
    overallTipKo: '광안리 해변 인도는 고품격 평평 보도블록으로 정비되어 있습니다. 특히 광안대교 미디어파사드를 가장 선명하게 조망할 수 있는 실내 복합 문화상가인 민락더마켓은 아기자기한 식도락과 맥주 펍이 한눈에 이어집니다.',
    overallTipEn: 'Gwangalli beachfront is fully paved. Millak The Market is highly recommended—it features robust internal lifts, spacious corridors, and amazing picture-perfect glass walls looking out to the bridge.',
    steps: [
      {
        time: 'Day 1 (18:00 - 19:30)',
        titleKo: '민락더마켓 오션뷰 복합공간 저녁 미식',
        titleEn: 'Seaside Market Dinner at Millak The Market',
        descKo: '주차장에서 매장 안까지 엘리베이터가 바로 연결되어 있어 길 찾기도 쉬워요. 평평하고 넓은 공간이라 이동하기 편하고, 맛있는 길거리 음식과 크래프트 맥주를 같이 즐길 수 있어 추천드려요.',
        descEn: 'Lifts connect securely from lower car reserves to the giant market. Discover local draft brewery stations, artisan burger stands, and dessert hubs with zero door sills.',
        icon: 'Food',
        stationInfoKo: '광안역 5번 출구에서 순환선/저상 버스 이동 권장',
        stationInfoEn: 'Transit via local low-floor bus recommended from Gwangan Station Exit 5'
      },
      {
        time: 'Day 1 (19:30 - 21:00)',
        titleKo: '광안리 바다 데크웨이 산책 & 음악 버스킹',
        titleEn: 'Gwangan Night Breeze & Music Walk',
        descKo: '해변을 따라 드넓게 펼쳐진 목재 바닷길을 걸으며 알록달록 반짝이는 광안대교 야경을 감상해보세요. 유모차나 휠체어도 흔들림 없이 편안하게 파도 소리를 가까이서 들을 수 있는 전망대도 곳곳에 마련되어 있어요.',
        descEn: 'Enjoy the ocean sounds and acoustic street music. The broadwalk has custom night lights and flat observation projections enabling close access to the sea without stepping onto sand.',
        icon: 'Night'
      },
      {
        time: 'Day 2 (11:00 - 13:00)',
        titleKo: '안녕광안리 레터링 랜드마크 포토전',
        titleEn: 'Adieu Gwangalli Landmark Photo Photo',
        descKo: '해변 중앙부에 자리 잡은 대표 조형물 앞에서 시원한 밀물 전경과 함께 인증샷을 찍습니다. 주위에는 교통약자도 언제든 기댈 수 있는 등받이 벤치가 여유 가득히 분포되어 안전합니다.',
        descEn: 'Take a classic postcard shot right in front of the colorful Gwangalli lettering monument. Backrest benches are set generously along the paved spaces for rests.',
        icon: 'Camera'
      }
    ]
  },
  {
    id: 'itinerary-2nights',
    titleKo: '오색빛 감천마을과 붉은 낙조 2박 3일 낭만 코스',
    titleEn: 'Gamcheon Colors & Dadaepo Gold 2N3D Pure Path',
    subtitleKo: '완만하고 편안한 길로 만나는 예쁜 감천마을과 낭만적인 다대포 갈대숲 낙조 코스예요.',
    subtitleEn: 'Bypassing steep steps in vertical hills and gliding over Dadaepo sunset marsh',
    category: '2NIGHTS',
    durationKo: '2박 3일',
    durationEn: '2 Night 3 Days',
    tagKo: '2박 3일 🌅',
    tagEn: '2 Night 3 Days 🌅',
    difficultyKo: '보통',
    difficultyEn: 'Moderate',
    overallTipKo: '감천마을은 경사가 급한 골목이 많지만, 포장된 큰길을 따라 여유롭게 올라가면 시그니처 포토존인 어린왕자 동상까지 무리 없이 도착할 수 있어요. 다대포 생태 탐방로는 보도블록과 데크길이 평평하게 잘 관리되고 있어 걷기 아주 좋습니다.',
    overallTipEn: 'Avoid the steep labyrinth stairs of Gamcheon by adhering entirely to the gently sloped main asphalt tourist road. Dadaepo marsh walk is fully level with safe outer railings.',
    steps: [
      {
        time: 'Day 1 (13:00 - 15:00)',
        titleKo: '감천마을 큰길 우회 코스로 안전 전경 투어',
        titleEn: 'Gamcheon Main Ridge Level Walk',
        descKo: '마을 안내소 뒤쪽으로 통하는 넓고 안전한 아스팔트 큰길을 따라 산책해 보세요. 미로처럼 복잡한 샛길만 피하면, 알록달록 오색 기와집 동네의 정겨운 전경을 눈앞에서 편하게 감상하실 수 있습니다.',
        descEn: 'Wand through the historic colorful roofs starting directly from the main tourist information desk. Stick strictly to the asphalt roads to visit the famous Little Prince without steps.',
        icon: 'Map',
        stationInfoKo: '토성역 6번 출구에서 저상버스 또는 두리발 이동 권장',
        stationInfoEn: 'From Toseong Station Exit 6, taxi or low-floor minibus is ideal'
      },
      {
        time: 'Day 2 (16:30 - 18:30)',
        titleKo: '다대포 고우니 생태길 갈대밭 산책 및 일몰',
        titleEn: 'Dadaepo Gowuni Eco Marsh Walk',
        descKo: '바다 위에 놓인 웅장한 평탄 우든 보드워크 교량입니다. 보드 간 틈비가 촘촘하여 유모차 바퀴나 유모자 소형 캐스터가 전혀 빠지지 않는 최고급 쾌적함을 자랑합니다. 타오르는 일몰을 감상해 보세요.',
        descEn: 'Experience the world-renowned marsh sunset on safe, gap-free wooden walkways. Spacing between the planks is minimized to guarantee wheelchairs and strollers never get stuck.',
        icon: 'Sunset',
        stationInfoKo: '다대포해수욕장역 4번 출구와 바로 옆 평지 연결',
        stationInfoEn: 'Dadaepo Beach Station Exit 4 connects directly at level grade'
      },
      {
        time: 'Day 3 (10:00 - 12:00)',
        titleKo: '다대포 꿈의 낙조분수 우레탄 광장 산책',
        titleEn: 'Sunset Fountain Flat Plaza Walk',
        descKo: '기네스북에 등재된 거대한 분수대 주위 광장은 푹신한 아스콘과 고성능 친환경 우레탄 플랫 코스로 마감되어 장애물 하나 없이 광활하게 질주하며 바다 전망을 들이마시기 좋습니다.',
        descEn: 'The spacious arena around the giant fountain offers supportive urethane pavement, which is highly shock-absorbent and uniformly flat for stroller wheels.',
        icon: 'Walk'
      }
    ]
  },
  {
    id: 'itinerary-3nights',
    titleKo: '바다 전망대와 강변 에코 힐링 3박 4일 부산 완벽 휴식',
    titleEn: 'Yeongdo Lookout & Oncheon Stream 3N4D Eco Tour',
    subtitleKo: '지그재그 슬로프를 타고 강변으로 내려가는 비단 투어와 흰여울 수평선',
    subtitleEn: 'Floating clifftops of Yeongdo and scenic Oncheon river flows without steps',
    category: '3NIGHTS',
    durationKo: '3박 4일',
    durationEn: '3 Night 4 Days',
    tagKo: '3박 4일 🌿',
    tagEn: '3 Night 4 Days 🌿',
    difficultyKo: '보통',
    difficultyEn: 'Moderate',
    overallTipKo: '영도 절벽 아래 골목길은 다소 좁고 가파르지만, 산기슭을 지나는 큰길을 이용하면 바다가 시원하게 트인 흰여울전망대에 안전하게 도착할 수 있어요. 온천천 강변 산책로는 동래역 엘리베이터와 연결 통로가 잘 갖춰져 있어 안심하고 산책하기 좋습니다.',
    overallTipEn: 'Stick to the high scenic highway edge on the Yeongdo cliff for marvelous outlooks without descending any stairs. Oncheon stream features modern, long-winding ramps from the rails.',
    steps: [
      {
        time: 'Day 1 (14:00 - 16:00)',
        titleKo: '영도 흰여울 전망대 & 시원한 바다 뷰 카페 테라스',
        titleEn: 'Yeongdo Clifftop Path & Café View',
        descKo: '절벽 위에 넓고 튼튼하게 마련된 바다 전망 테라스예요. 가려지는 시야 없이 투명한 유리 난간 너머로 오고 가는 배들과 푸른 남해 바다를 편안하게 보며, 바로 옆 예쁜 카페에서 따뜻한 차 한 잔 나누어 보세요.',
        descEn: 'Gaze into the harbor from the spacious clifftop balcony. Enjoy gorgeous panoramas of Songdo Beach and Namhang Ship Canal over durable, transparent glass rail fences.',
        icon: 'Coffee',
        stationInfoKo: '남포역 6번 출구에서 저상버스 연계 후 보건고 정류장 하차',
        stationInfoEn: 'Take accessible low-floor bus from Nampo Station Exit 6 to Busan Health High'
      },
      {
        time: 'Day 2 (10:00 - 12:00)',
        titleKo: '영도대교 도개 행사 평지 관람 및 영도 웰컴센터',
        titleEn: 'Yeongdo Bridge Drawbridge Show & Lift',
        descKo: '아래 평지 광장에 모여 매일 거대한 대교가 선박 통행을 위해 이도(도개)되는 과정을 의자에 기대어 관람하며 영도웰컴센터 내부 엘리베이터를 통해 가방을 맡기거나 휴식을 취할 수 있습니다.',
        descEn: 'A flat seaside concrete plaza at the foot of the historical bridge is perfect for a cozy rest. Experience Korea\'s only lifting bridge drawing up in front of your eyes.',
        icon: 'Bridge',
        stationInfoKo: '남포역 8번 출구에서 엘리베이터 탑승 후 평지 도보 3분',
        stationInfoEn: 'Nampo Station Exit 8, 3 mins level walk via flat sidewalk'
      },
      {
        time: 'Day 3 (14:00 - 16:30)',
        titleKo: '온천천 수변공원 벚꽃 램프길 및 자연 명상',
        titleEn: 'Oncheoncheon Stream Spring Nature Trail',
        descKo: '물이 흐르고 유채꽃과 벚꽃이 피어나는 동래 온천천 보행길이에요. 가드레일이 든든하게 마련된 완만한 스위치백 연결 통로를 따라 아래로 내려오면, 졸졸 흐르는 시냇물과 예쁜 꽃길을 안전하고 오붓하게 걸으실 수 있습니다.',
        descEn: 'Descend to the lovely riverbank via a state-of-the-art modern switchback ramp. Walk safely through expansive floral gardens and observe white herons with no stairs in sight.',
        icon: 'Walk',
        stationInfoKo: '동래역 2번 출구 엘리베이터 하차 후 강변 램프 직선 연결',
        stationInfoEn: 'Dongnae Station Exit 2 provides a seamless, flat link to the riverbed ramp'
      }
    ]
  },
  {
    id: 'itinerary-4nights',
    titleKo: '내 집처럼 여유 가득 부산 4박 5일 힐링 종합 종합 마스터 코스',
    titleEn: 'Stroller Master Care: 4N5D Slow Travel Comprehensive Guide',
    subtitleKo: '지하철 교통 정보와 평평하고 잘 닦인 보행로를 따라 부산을 온전히 누려보는 여유로운 장기 여정이에요.',
    subtitleEn: 'The absolute master tour exploring all 4 transport nodes with zero step interruptions',
    category: '4NIGHTS',
    durationKo: '4박 5일',
    durationEn: '4 Night 5 Days',
    tagKo: '4박 5일 장기 체류 🏠',
    tagEn: '4 Night 5 Days 🏠',
    difficultyKo: '쉬움',
    difficultyEn: 'Easy',
    overallTipKo: '부산을 깊고 천천히 누리고 싶으신 분들을 위한 알찬 코스로, 한 구역에 충분히 머물며 여유롭게 이동하기 좋아요. 지하철 역의 엘리베이터 위치와 교통약자 전용 넓은 개찰구를 미리 확인하며 이동하시면 한층 더 편리한 여행이 끝까지 완성된답니다.',
    overallTipEn: 'Designed for deep, unhurried, cozy stays. We leverage all main accessible pathways and wide automatic subway gates to keep the entire transit completely convenient for infants and seniors alike.',
    steps: [
      {
        time: 'Day 1',
        titleKo: '부산역 출발 및 중앙 와이드 엘리베이터 활용 동선',
        titleEn: 'Busan Station Level Entry Hub',
        descKo: 'KTX 대합실부터 지하철 탑승장까지 모두 넓은 고속 엘리베이터와 에스컬레이터로 연결되어 있어, 무거운 짐 가방을 들고 가거나 유모차를 미는 가족분들도 땀 한 방울 흘리지 않고 쾌적하게 탑승할 수 있답니다.',
        descEn: 'The spacious glass pathway connecting the KTX Train Terminal to the Humetro Subway features high-speed wide accessible lifts and uniform tile grading throughout.',
        icon: 'Platform',
        stationInfoKo: '부산역 지하철역과 기차역 광장을 연결하는 엘리베이터 무료 이용 편리',
        stationInfoEn: 'Busan Train Station KTX links to subway platform via oversized direct accessible escalators and lifts'
      },
      {
        time: 'Day 2',
        titleKo: '해운대 우동 맛집 거리 & 아스팔트 카페 탐방',
        titleEn: 'Haeundae Udong Paved Coffee Streets',
        descKo: '아기자기하고 예쁜 카페들이 많은 해리단길 골목투어를 떠나요. 옛 철길 터를 평평하게 가꿔 만든 정원 산책로라서 발걸음 안전하게 주변 맛집과 시그니처 베이커리를 찾아다니며 시간을 보내기 좋답니다.',
        descEn: 'Stroll into Haeridan-gil alleys, rebuilt on flat old railways. The pathways are broad and clear of dirt bumps, providing amazing modern cafes with convenient entrance plates.',
        icon: 'Coffee'
      },
      {
        time: 'Day 3',
        titleKo: '센텀시티 아시아 최대 백화점 실내 패밀리 투어',
        titleEn: 'Centum City Indoor Family Mega Mall',
        descKo: '날씨에 구애받지 않고 든든하게 하루를 보낼 수 있는 초대형 복합 문화 센터예요. 실내 전체가 편안한 평지로 잘 닦여있고, 곳곳에 아늑한 휴식 라운지 및 유모차 대여 서비스와 대형 엘레베이터 동선이 완벽해 아주 편안해요.',
        descEn: 'An ultra-large indoor arcade. It features zero interior steps, sensory nursing rooms, and extensive complimentary rental services for specialized strollers.',
        icon: 'Food',
        stationInfoKo: '센텀시티역 지하 개찰구에서 신세계백화점 지하 1층 직접 연결',
        stationInfoEn: 'Centum City Station ticketing gate links directly to the mall B1'
      }
    ]
  },
  {
    id: 'itinerary-gourmet',
    titleKo: '현지인 침샘 폭발! 부산에 오면 반드시 먹어야 할 원조 로컬 미식 투어',
    titleEn: 'Local Foodie Feast: Busan Authentic Accessible Gourmet Tour',
    subtitleKo: '원조 돼지국밥, 씨앗호떡, 정성껏 끓인 시원한 밀면 등 편안하게 가기 좋은 백년가게 중심 코스예요.',
    subtitleEn: 'Savor pork soup, wheat noodles, and seed hotteok with step-free entrances and accessible tables',
    category: 'GOURMET',
    durationKo: '미식 상시 식사',
    durationEn: 'Meal-By-Meal',
    tagKo: '식도락 투어 🍕',
    tagEn: 'Foodie Gourmet 🍕',
    difficultyKo: '쉬움',
    difficultyEn: 'Easy',
    overallTipKo: '부산의 노포들은 오래된 건물이라 입구 문턱이 있는 곳들이 많지만, 로컬 대표 인기 맛집이랍니다.',
    overallTipEn: 'Traditional food hubs often feature high doorstep sills. The selection below has been thoroughly validated to host gentle outer ramp blocks, modern spacious table spacing, and low-standing self-kiosks.',
    steps: [
      {
        time: '12:00 - 13:30 (점심)',
        titleKo: '부산역 본전돼지국밥 국밥 한 그릇 (경사로 진입 및 입식 테이블)',
        titleEn: 'Original Busan Pork Rice Soup Feast',
        descKo: '부산의 대표적인 소울 푸드 중 하나예요! 입구에 완만한 발판이 놓여 있고 실내 전체에 입식 의자 테이블이 넉넉히 배열되어 있어 온 가족이 함께 따뜻하게 한 그릇 식사를 즐기기에 아주 제격이랍니다.',
        descEn: 'Dive into savoring Busan Soul Food. Featuring a steady outer ramp and wide table alignments, enabling smooth wheels seating seamlessly side-by-side.',
        icon: 'Food',
        stationInfoKo: '부산역 8번 출구에서 평지 도보 2분',
        stationInfoEn: 'Busan Station Exit 8, 2 mins level walk'
      },
      {
        time: '15:00 - 16:30 (디저트/간식)',
        titleKo: '남포동 BIFF 광장 씨앗호떡 및 물떡 (넓고 평평한 야외 로드푸드 존)',
        titleEn: 'BIFF Square Seed Hotteok & Rice Cake',
        descKo: '부산의 시그니처 디저트인 달콤하고 고소한 씨앗호떡과 보들보들한 물떡이에요. 전 구역이 넓고 차가 다니지 않는 인도 광장이라 번거로움 없이 안전하고 자유롭게 길거리 미식을 맛보실 수 있습니다.',
        descEn: 'Try sweet brown sugar seed pancake and chewy hot-broth rice cakes. BIFF square is a vast, fully paved car-free zone allowing perfect ease to roll straight up to direct ordering counters.',
        icon: 'Walk',
        stationInfoKo: '자갈치역 7번 출구에서 보행 광장 직통 연결',
        stationInfoEn: 'Jagalchi Station Exit 7 links directly to the food walk'
      }
    ]
  },
  {
    id: 'itinerary-history',
    titleKo: '피란민의 눈물과 극적 부활: 초량 이바구길·골목길 역사 낭만 산책',
    titleEn: 'Hope & History: Choryang Ibagu & Provisional Capital Living Trail',
    subtitleKo: '근대 역사의 골목길 풍경과 아름다운 기념관들을 모노레일 및 안전한 산책길을 통해 탐방하는 코스예요.',
    subtitleEn: 'Tracing historic paths of refugees using panoramic monorails and accessible flat exhibition rooms',
    category: 'HISTORY',
    durationKo: '4시간',
    durationEn: '4 Hours',
    tagKo: '역사 문화 탐방 📜',
    tagEn: 'Historic Footsteps 📜',
    difficultyKo: '보통',
    difficultyEn: 'Moderate',
    overallTipKo: '초량의 유서 깊은 산복도로는 많은 계단으로 알려져 있지만, 가파른 168계단 바로 옆에 무료 고속 경사식 풍경 모노레일이 안전히 설치되어 있어요! 힘든 오르막 대신 구름 위를 걷는 듯한 공중 전차를 타며 사색을 나누어 보세요.',
    overallTipEn: 'The dizzying 168 stairs of Choryang are accompanied by a fully free, modern glass monorail lift, letting strollers ascend the extreme mountain neighborhoods with ease.',
    steps: [
      {
        time: '10:00 - 11:30',
        titleKo: '초량 이바구길 골목과 쉼터 모노레일 탑승',
        titleEn: 'Choryang Monorail Ascent',
        descKo: '우리나라 현대사의 흔적이 고스란히 남아 있는 고즈넉한 골목길을 만나보세요. 가파른 고갯길을 만났을 땐 걱정을 덜어두고 바로 옆 무료 모노레일에 편안히 탑승하여 아름다운 시내 전경을 내려다볼 수 있어요.',
        descEn: 'Stroll the historical Choryang alleys. On encountering the sheer 168 cliff cliffs, board the free glass public monorail to safely glide straight up to the peak with a wide panorama view.',
        icon: 'Map',
        stationInfoKo: '초량역 3번 출구에서 평지 진입로(초량초등학교 방면) 이용 도보 8분',
        stationInfoEn: 'Choryang Station Exit 3, 8 mins walk via level schools walkway'
      },
      {
        time: '11:40 - 13:00',
        titleKo: '임시수도기념관 아늑한 야외 전시실 및 정원 산책로',
        titleEn: 'Provisional Capital Memorial Hall Site',
        descKo: '근대 역사 속에서 중요한 역할을 해온 옛 경남도지사 관저와 기념전시관입니다. 야외에 마련된 푸른 정원 산책로에는 보행에 편리한 친환경 야자매트가 잘 마련되어 있고, 기념전시실 입구에는 길고 완만한 우회 램프가 깔끔히 연계되어 안전하고 깊이 있는 관람을 즐기시기 좋습니다.',
        descEn: 'Visit the actual historic residence and security bunkers used during the Korean War. The outdoor lush classical gardens are lined with level non-slip weed meshes and access ramps.',
        icon: 'Camera',
        stationInfoKo: '토성역 2번 출구에서 평지 인도 도보 5분',
        stationInfoEn: 'Toseong Station Exit 2, 5 mins level walk with clear tactile cues'
      }
    ]
  }
];
