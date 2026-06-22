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
    id: 'itinerary-day-junggu',
    titleKo: '역사와 맛이 살아숨쉬는 부산 중구 골목길 상생 당일 코스',
    titleEn: 'Busan Jung-gu Historic & Gourmet Time Travel Day Tour',
    subtitleKo: 'BIFF광장부터 용두산공원까지, 아련한 피란 시절의 역사와 다채로운 길거리 미식을 함께 누리는 종합 하루 투어예요.',
    subtitleEn: 'A rich single-day stroll through BIFF Square, classic markets, historic alleys, and scenic Yongdusan Park',
    category: 'DAY',
    durationKo: '당일치기 (약 8시간)',
    durationEn: '1 Day (Approx. 8 Hours)',
    tagKo: '원도심 역사미식 🏛️',
    tagEn: 'Historic Downtown 🏛️',
    difficultyKo: '보통',
    difficultyEn: 'Moderate',
    overallTipKo: '부산 중구는 산기슭의 오래된 골목과 경사가 다소 남아 있으나, 보수동책방골목 평지 유도선, 40계단 기념관 내부 고속 엘리베이터 공중 연계, 용두산공원 전용 우회 램프와 슬로프가 매우 체계적으로 관리되어 있어 누구나 힘들이지 않고 원도심의 진정한 매력을 완주할 수 있습니다.',
    overallTipEn: 'While the historic central downtown features steep alleys, modern detours bypass traditional steps. Accessible elevators, wide pathways, and smooth pavement enable a comfortable, rich roll for strollers and wheelchairs.',
    steps: [
      {
        time: '09:30 - 11:30',
        titleKo: 'BIFF광장 - 국제시장 - 부평깡통시장: 침샘 가득 시네마 미식천국',
        titleEn: 'BIFF Square, Gukje Market & Bupyeong Kkangtong Market',
        descKo: '활기찬 자갈치역 앞 광장에서 영화인들의 핸드프린팅이 가득한 BIFF광장으로 이동하여 전국적인 명물 씨앗호떡으로 입안 가득 감칠맛을 즐깁니다. 이어 아치형 비바람 가림막(아케이드)이 높다랗게 정비된 국제시장과 깡통시장의 평탄한 사거리 골목을 거닐며 3대 소문난 떡볶이와 보들보들한 비빔당면을 맛보며 활력을 안사하세요.',
        descEn: 'Kick off your morning at BIFF Square with delicious warm seed pancakes. Seamlessly glide into the spacious indoor shopping rows of Gukje Market and Bupyeong Kkangtong Market, paved perfectly level for effortless rolling.',
        icon: 'Food',
        stationInfoKo: '자갈치역(1호선) 7번 출구 평탄한 무장벽 골목 인도 도보 3분',
        stationInfoEn: 'Jagalchi Station (Line 1) Exit 7, 3 mins flat barrier-free walk'
      },
      {
        time: '11:30 - 13:30',
        titleKo: '보수동책방골목 - 부산근대역사관 개방형 아카이브 전시 센터',
        titleEn: 'Bosudong Book Street & Busan Modern History Museum',
        descKo: '오랜 고서들이 오붓이 쌓인 보수동책방골목입니다. 보행에 어려움을 줄 수 있는 안쪽 좁고 험한 계단 대신, 바깥쪽 넓은 보행로 눈높이를 따라 종이 내음을 가만히 사색하며 걷기 좋습니다. 곧이어 옆에 있는 부산근대역사관(부산근현대역사관) 실내로 들어갑니다. 단차가 완전히 철폐된 입구와 내부 초고속 와이드 엘리베이터, 무장벽 화장실을 활용하여 근현대사를 배울 수 있습니다.',
        descEn: 'Inhale the soothing woodsy scent of rare books along Bosudong Book Alley. Continue to the reconstructed Busan Modern History Museum, featuring beautiful glass auto-entryways, pristine elevator networks, and barrier-free exhibit layouts.',
        icon: 'Map'
      },
      {
        time: '13:30 - 15:30',
        titleKo: '부산영화체험박물관/트릭아이뮤지엄부산 & 40계단 문화관 가상현실 여정',
        titleEn: 'Museum of Movies, Trickeye Museum & 40 Steps Memorial',
        descKo: '실감 나는 크로마키 영화 촬영과 입체 트릭아이 착시 포토존이 다채로운 신개념 미디어 복합 놀이터예요. 전 층이 매끈한 고급 우레탄 바닥이며 휠체어 전용 리프트와 체험석이 골고루 비치되어 환상적입니다. 이어 근처에 위치한 피란 시절의 애환이 깃든 40계단 거리로 걸어가, 40계단 기념관 내부의 공용 고속 엘리베이터를 타고 계단 상단부 가로수길로 안전하게 올라가 가상 명상을 가질 수 있습니다.',
        descEn: 'Step into green-screen movie sets and fun optical illusions at the Museum of Movies. Then, head to the emotive 40 Steps Street. Bypass the historic steep staircase entirely by utilizing the public elevator located inside the memory building.',
        icon: 'Camera',
        stationInfoKo: '중앙역(1호선) 11번, 13번 출구 평지 보도 연계 편리',
        stationInfoEn: 'Jungang Station (Line 1) Exits 11 or 13, smooth flat sidewalks'
      },
      {
        time: '16:00 - 18:00',
        titleKo: '용두산공원 & 부산타워: 원도심과 갈매기 바다를 굽어보는 하늘 정원',
        titleEn: 'Yongdusan Park & Busan Tower Sky Observatory',
        descKo: '도심 속 울창한 수목이 매력적인 용두산공원에 닿는 마침표입니다. 광복동 쇼핑 거리에서 수직 에스컬레이터에 올라 올라가거나, 유모차/휠체어 동반 시 대청동 방향에서 완만한 차도 슬로프 인도를 타면 정밀한 공원 광장에 평탄하게 입성합니다. 노을이 지는 부산타워(다이아몬드타워) 초고속 엘리베이터에 승차하여, 시그니처 360도 원경 유리창 너머 아름답게 펼쳐진 남항과 자갈치 바닷물결, 초량 야경을 감상해보세요.',
        descEn: 'Conclude your historical loop at Yongdusan Park. Travel easily to the scenic hilltop via the sheltered Gwangbok-dong street escalator network. Ascend Busan Tower Observatory to marvel at 360-degree vistas of the glittering ports.',
        icon: 'Sunset',
        stationInfoKo: '남포역(1호선) 7번 출구 평탄 인도 도보 5분',
        stationInfoEn: 'Nampo Station (Line 1) Exit 7, 5 mins walk via wide sidewalk'
      }
    ]
  },
  {
    id: 'itinerary-day',
    titleKo: '초록빛 물결 속의 힐링, 초록초록 디톡스 일일 투어',
    titleEn: 'Green Detox Daily Tour: Healing in the Waves of Green',
    subtitleKo: '낙동강 물줄기를 따라 하얗고 푸르게 반짝이는 삼락, 맥도, 대저생태공원의 싱그러운 힐링 하루 코스예요.',
    subtitleEn: 'A peaceful eco-adventure through Samnak, Maekdo, and Daejeo Eco Parks along the Nakdong River',
    category: 'DAY',
    durationKo: '당일치기 (약 6시간)',
    durationEn: '1 Day (Approx. 6 Hours)',
    tagKo: '초록 디톡스 🌿',
    tagEn: 'Green Detox 🌿',
    difficultyKo: '쉬움',
    difficultyEn: 'Easy',
    overallTipKo: '낙동강 하구에 넓게 펼쳐진 3대 생태공원은 경사나 계단이 전혀 없는 넓고 평탄한 보행로와 아늑한 나무 데크길로 이루어져 있습니다. 교통약자는 물론 바쁜 일상 속 가만히 불어오는 풀바람을 느끼며 숨을 고르고 싶은 분들에게 최고의 선물 같은 무장벽 힐링 코스예요.',
    overallTipEn: 'The three major eco-parks along the Nakdong River feature paved esplanades and perfectly flat wooden decks with zero stairs or steep slopes. It offers an ideal barrier-free healing destination for everyone seeking a peaceful natural retreat.',
    steps: [
      {
        time: '10:00 - 12:30',
        titleKo: '삼락생태공원: 싱그러운 버드나무 그늘과 드넓은 연꽃 단지 산책',
        titleEn: 'Samnak Eco Park: Weeping Willows & Lotus Marshland',
        descKo: '여행을 시작하는 삼락생태공원은 탁 트인 푸른 잔디광장과 마음을 평온하게 해주는 버드나무들이 우리를 맞아줍니다. 유모차나 휠체어가 부드럽게 지날 수 있는 완만하고 드넓은 목재 데크길을 밟으며 연꽃 물결이 뽐내는 은은한 향기를 온몸으로 비워내고 맑은 미풍을 느껴봐요.',
        descEn: 'Begin your detox with endless green lawns and calming weeping willow trees. Follow the flat, wide wooden boardwalk crossing over the lotus marshland. The entire trail is seamlessly connected with zero-step pavement, letting you breathe in the crisp natural air.',
        icon: 'Compass',
        stationInfoKo: '괘법르네시떼역(부산김해경전철) 1번 출구에서 수동/전동 보행교(엘리베이터 완비) 연계 편리',
        stationInfoEn: 'Gwaebeop Renecite Station Exit 1 connected via a fully accessible pedestrian bridge and elevator'
      },
      {
        time: '12:30 - 14:30',
        titleKo: '맥도생태공원: 한적하고 오붓한 연꽃 강변길과 아늑한 가로수 터널길',
        titleEn: 'Maekdo Eco Park: Quiet Lotus Estuary & Forest Tunnel',
        descKo: '삼락공원과 대저공원 사이에 보물처럼 안겨 있는 맥도생태공원은 낙동강변에서 가장 호젓하고 때 묻지 않은 비밀 정원 같은 공간입니다. 곧게 뻗은 메타세쿼이아 길과 울창한 가로수들이 이루는 초록 터널은 단차가 단 1cm도 없이 매끄러운 평지로 닦여 있어 온전히 사색과 평온을 누리기 참 좋습니다.',
        descEn: 'Maekdo is a quiet hidden gem nestled calmly between the larger parks. Its iconic Metasequoia walkway and cherry-tree tunnels are beautifully paved, enabling a silky-smooth roll. Find a shaded bench along the lotus paths, and immerse yourself in absolute tranquility.',
        icon: 'Coffee',
        stationInfoKo: '사상역 인근에서 저상버스로 연계 권장',
        stationInfoEn: 'Transit via local low-floor bus or accessible taxi from Sasang Station is recommended'
      },
      {
        time: '14:30 - 17:00',
        titleKo: '대저생태공원: 생기 넘치는 초록빛 대지와 속삭이는 대나무 숲 쉼표',
        titleEn: 'Daejeo Eco Park: Grasslands & Quiet Bamboo Canopy',
        descKo: '마지막 힐링 명소인 대저생태공원은 드넓은 초록 대지(봄에는 샛노란 유채꽃, 가을에는 흔들리는 핑크뮬리)가 시야를 가득 채워 마음에 평안을 줍니다. 공원 한쪽 깊숙이 자리한 아늑한 대나무 숲길은 평탄하게 정비되어 있어 휠체어와 유모차가 드나들기 편하고, 대나무 잎이 바람에 스치며 들려주는 시냇물 같은 소리에 젖어 편평히 하루 일정을 마무리해보세요.',
        descEn: 'Daejeo Eco Park welcomes you with vast organic colors. The dense bamboo grove trail is covered in soft coconut-fiber mats, providing clean traction for flat rolls. Wrap up your day surrounded by rustling leaves and therapeutic breezes under the vast southern sky.',
        icon: 'Sunset',
        stationInfoKo: '강서구청역(3호선) 1번 또는 3번 출구 평탄한 무장벽 해변 진입로 도보 5분',
        stationInfoEn: 'Gangseo-gu Office Station (Line 3) Exits 1 or 3, 5 mins flat barrier-free walk'
      }
    ]
  },
  {
    id: 'itinerary-1night',
    titleKo: '부산 명소 대집성 1박 2일 무장벽 드림 코스',
    titleEn: 'Busan Highlights Complete 1N2D Dream Course',
    subtitleKo: '영도대교부터 태종대, 해운대 해변과 오륙도 스카이워크까지 부산의 로망 명소를 경사 걱정 없이 즐기는 종합 코스예요.',
    subtitleEn: 'From historic Yeongdo Bridge to Haeundae and Oryukdo Skywalk seamlessly',
    category: '1NIGHT',
    durationKo: '1박 2일',
    durationEn: '1 Night 2 Days',
    tagKo: '부산 드림코스 🌙',
    tagEn: 'Busan Dream 🌙',
    difficultyKo: '보통',
    difficultyEn: 'Moderate',
    overallTipKo: '전통적인 계단 명소인 흰여울문화마을과 이기대산책로는 전망 데크와 평탄 우회 루트를 통해 완벽하게 극복 가능합니다. 태종대에서는 특별 리프트 스페이스가 탑승 지원되는 편안한 다누비열차를 이용하는 것이 꿀팁입니다.',
    overallTipEn: 'Historic cliff walks like Huinnyeoul and Igidae feature convenient accessible view decks on higher paved roads. Utilize the ramp-friendly Danubi train at Taejongdae to explore seaside forests smoothly.',
    steps: [
      {
        time: 'Day 1 (10:00 - 12:30)',
        titleKo: '영도대교 도개 관람 & 흰여울문화마을·절영해안 산책',
        titleEn: 'Yeongdo Bridge Lift & Huinnyeoul Culture Village View',
        descKo: '매일 열리는 영도대교 도개의 웅장한 도심 진경을 관람한 뒤, 바다가 손에 잡힐 듯한 절영해안을 품은 흰여울문화마을로 이동합니다. 경사 어린 골목계단 대신 바깥쪽 평탄한 해안 전망로와 통유리 바다 뷰 카페 테라스를 거닐며 시원한 오션뷰를 만끽하세요.',
        descEn: 'Marvel at the historic bridge draw show, then head to the iconic blue-and-white Huinnyeoul Village. Avoid steep steps by utilizing wide peripheral roadways and step-free terrace lookup hubs.',
        icon: 'Map',
        stationInfoKo: '남포역(1호선) 6번 출구에서 저상버스 버스정류장 연계 밀착 편리',
        stationInfoEn: 'Flat connection available via low-floor bus lanes at Nampo Station (Line 1) Exit 6'
      },
      {
        time: 'Day 1 (13:30 - 16:00)',
        titleKo: '영도 태종대 가로수 숲길: 다누비열차 투어',
        titleEn: 'Yeongdo Taejongdae Cliff Scenic Forest Drive',
        descKo: '태종대의 수려한 소나무 숲길과 수평선 바위비경을 느낄 수 있는 시그니처 코스입니다. 교통약자를 환대해주는 친환경 순환 열차 다누비열차를 타고 가뿐하게 이동하여 전망대 테라스에서 신선대 바위 비경을 정면으로 감상하세요.',
        descEn: 'Ride the state-of-the-art electric Danubi circular train equipped with accessible boarding spaces. Roll out seamlessly onto the giant clifftop observatory overlook.',
        icon: 'Sunset'
      },
      {
        time: 'Day 1 (17:00 - 20:00)',
        titleKo: '국제시장·부평깡통시장 감칠맛 투어 & 용두산공원 명품 야경',
        titleEn: 'Traditional Markets & Yongdusan Park Night Lights',
        descKo: '화려한 비바람 아케이드가 촘촘히 뻗어 휠체어 주행에 유용한 국제시장과 부평깡통시장에서 따뜻한 씨앗호떡, 물떡, 비빔당면을 맛봅니다. 이후 수직 에스컬레이터와 지그재그 회전형 전용 공원 램프로 이어지는 용두산공원에 올라, 빛나는 부산타워와 조화로운 골목빛 낭만 야경을 바라보며 첫날을 매듭짓습니다.',
        descEn: 'Savor traditional hot pancakes at level-paved Bupyeong Market layouts. Easily climb up to Yongdusan Park via the Gwangbok-dong escalator system to enjoy dynamic neon arrays.',
        icon: 'Night'
      },
      {
        time: 'Day 2 (10:00 - 12:30)',
        titleKo: '해운대해수욕장 송림 테라스 & 아쿠아리움 터널 탐험',
        titleEn: 'Haeundae Beach Paved Decas & SEA LIFE Aquarium',
        descKo: '모래사장을 밟지 않고도 시원하게 밀려드는 하얀 파도를 마주하고 호흡하는 최적화 보도 데크길을 걷습니다. 이어 완만한 경사로와 단차 제로 진입문이 완벽한 SEA LIFE 부산아쿠아리움 지하로 내려가 머리 위 유리창을 가득 메우는 환상적인 오색 바다 동물들의 유영을 입체적으로 관림하세요.',
        descEn: 'Enjoy sea breezes on level wooden boardwalks alongside Haeundae beach. Dive down into the fully ramped SEA LIFE Aquarium to observe exotic marine animals gliding directly above you.',
        icon: 'Food',
        stationInfoKo: '해운대역 3번, 5번 출구 구남로 평지 보도 연계 400m',
        stationInfoEn: 'Haeundae Station (Line 2) Exit 3 or 5, direct straight visual connection'
      },
      {
        time: 'Day 2 (13:30 - 16:30)',
        titleKo: '동백해안산책로(APEC하우스) & 오륙도 스카이워크 공중 산책',
        titleEn: 'Dongbaekseom Coastal Walk (APEC) & Oryukdo Skywalk',
        descKo: '소나무 동백섬 해안 데크를 거쳐 넓은 전용 엘리베이터가 있는 복합건물인 누리마루 APEC하우스에서 탁 트인 바다를 전망합니다. 이어 오륙도 스카이워크로 이동해 바퀴나 유모차가 빠질 틈 없이 조밀하게 보강된 투명 유리판 바닥 보도를 거닐며 에메랄드빛 해안 절벽을 아찔하게 완주해봅니다.',
        descEn: 'Breeze through fragrant pine trees to the stunning APEC House. Then, experience Oryukdo Skywalk, which is engineered tight and fully flat, letting wheels fly over sapphire marine surges safely.',
        icon: 'Camera'
      },
      {
        time: 'Day 2 (17:30 - 20:00)',
        titleKo: '이기대 수변산책로 평지 오션뷰 & 광안대교 낭만 일광노을 밤바다',
        titleEn: 'Igidae Entrance Scenic Path & Gwangan Bridge Sunset LED',
        descKo: '이기대산책로의 계단 숲길로 진입하기 전, 초입 주차장 옆 와이드 해안 데크 광장에 정착해 해운대와 오륙도를 관망합니다. 마지막으로 물감을 뿌린 듯 번지는 노을빛과 은하수 전구들이 하나둘 켜지는 광안대교를 가장 아련하고 가까이 감상하는 평탄 방파제 전망대에 모여 여정의 대미를 장식합니다.',
        descEn: 'Rest at the spacious, barrier-free entrance deck of Igidae to snap panorama photos. Complete the night at the magnificent Gwangalli breakwater walk during the bridge light show.',
        icon: 'Sunset'
      }
    ]
  },
  {
    id: 'itinerary-2nights',
    titleKo: '트렌디 감성과 바다 비경을 담은 2박 3일 낭만 힐링',
    titleEn: 'Trendy Cafe & Coastal Wonders 2N3D Complete Route',
    subtitleKo: '전포까페거리, 해동용궁사부터 망미 골목까지 감성 넘치는 핫플레이스를 평탄 무장벽으로 만나는 일주 코스예요.',
    subtitleEn: 'From trendy Jeonpo alley cafe rows to cliffside seaside shrines and historic market walks',
    category: '2NIGHTS',
    durationKo: '2박 3일',
    durationEn: '2 Nights 3 Days',
    tagKo: '2박 3일 🌅',
    tagEn: '2 Nights 3 Days 🌅',
    difficultyKo: '보통',
    difficultyEn: 'Moderate',
    overallTipKo: '전포카페거리와 해운대 그린레일웨이, 온천천은 완벽하게 평지화되어 있어 쾌적한 롤링이 보장됩니다. 해동용궁사는 우회 진입 램프를 이용해 시원한 동해안의 사찰 비경과 바다 내음을 안전하게 즐기실 수 있습니다.',
    overallTipEn: 'Jeonpo Cafe Street, Haeundae Green Railway, and Oncheoncheon are amazingly flat and smooth. Easily tackle Haedong Yonggungsa Temple through specialized side entry slopes to avoid the dynamic central staircase.',
    steps: [
      // Day 1
      {
        time: 'Day 1',
        titleKo: '전포카페거리 / 전리단길',
        titleEn: 'Jeonpo Cafe Street / Jeonridan-gil',
        descKo: '아기자기한 개성의 이색 디자이너 숍과 턱 없는 단층 감성 카페들이 구비되어 휠체어 주차 및 진입이 평이한 이국적인 도심 명소입니다.',
        descEn: 'Charming independent designer boutiques and trendsetting step-free ground floor cafes offering easy entry.',
        icon: 'Food'
      },
      {
        time: 'Day 1',
        titleKo: '서면 젊음의거리',
        titleEn: 'Seomyeon Street of Youth',
        descKo: '부산 최고의 평지 번화가로, 넓고 매끄럽게 포장된 인도를 따라 활기찬 버스킹과 맛있는 간식 상가들을 유모차로도 쾌적하게 산책할 수 있습니다.',
        descEn: 'Busan’s vibrant central shopping district with wide, beautifully leveled asphalt sidewalks perfect for strolling.',
        icon: 'Walk'
      },
      {
        time: 'Day 1',
        titleKo: '광안리해수욕장 / 광안대교',
        titleEn: 'Gwangalli Beach / Gwangan Bridge',
        descKo: '드넓은 광안대교 현수교의 LED 파도 미디어를 감상하며, 단차가 아예 없는 목재 바다 데크길 위에서 시원한 파도와 아름다운 정취를 느낍니다.',
        descEn: 'Walk on the completely flat Gwangalli wooden boardwalk while marveling at the glowing LED light shows on the bridge.',
        icon: 'Sunset'
      },
      {
        time: 'Day 1',
        titleKo: '광안종합시장',
        titleEn: 'Gwangan General Market',
        descKo: '아날로그 향수와 청년 예술가들의 레트로 감성이 뒤섞인 시장입니다. 평탄하게 정리된 로컬 골목길 속 보물 같은 공방들을 탐색해보는 영감을 선사합니다.',
        descEn: 'A retro-style local market filled with young artisan shops and cozy level pathways for easy rolling.',
        icon: 'Map'
      },
      {
        time: 'Day 1',
        titleKo: '해운대해수욕장 / 송림공원',
        titleEn: 'Haeundae Beach / Songnim Park',
        descKo: '키가 큰 소나무 숲그늘 아래 턱 하나 없이 길게 이어진 송림공원 친환경 목재 데크로드를 숲 향기 가득히 상쾌하게 마주해봅니다.',
        descEn: 'Enjoy a refreshing pine-scented walk on the flat, beautifully continuous boardwalk of forest Songnim Park.',
        icon: 'Walk'
      },
      {
        time: 'Day 1',
        titleKo: '그린레일웨이산책로 / 해운대해변열차',
        titleEn: 'Green Railway / Haeundae Beach Train',
        descKo: '옛 동해남부선 폐철길을 평평한 수평 보도로 업사이클링한 산책로입니다. 교통약자도 가뿐히 무단계 탑승할 수 있는 그림 같은 노랑 빨강 해변열차 드라이브를 곁들여보세요.',
        descEn: 'A former seaside rail track transformed into a fully continuous level walkway. Board the vintage Beach Train via accessible step-free boarding ramps.',
        icon: 'Train'
      },
      // Day 2
      {
        time: 'Day 2',
        titleKo: '온천천산책로 / 온천천카페거리',
        titleEn: 'Oncheoncheon Stream Walk / Cafe Street',
        descKo: '온천가 유역을 따라 끝없이 펼쳐지는 벚꽃과 노란 유채꽃 꽃길입니다. 완만한 전용 경사 램프가 고루 있어 하천변 보도를 유모차나 휠체어로 산책한 뒤 이레 오붓한 카페거리에서 힐링 타임을 가집니다.',
        descEn: 'Cherry blossom dynamic paths along the quiet river. Paved access slopes lead seamlessly to the lovely riverside cafe street.',
        icon: 'Coffee'
      },
      {
        time: 'Day 2',
        titleKo: '해동용궁사',
        titleEn: 'Haedong Yonggungsa Temple',
        descKo: '동해의 성난 파도와 바위 절벽 위에 세워진 아름다운 사찰입니다. 악명 높은 108 가파른 돌계단 대신, 대웅전 방향으로 향하는 완주 휠체어/유모차 전용 우회 램프 보도를 공략하면 웅장한 바다 사찰의 비경을 힘 안 들이고 정면 관망하는 꿀팁이 준비되어 있습니다.',
        descEn: 'The famous cliffside temple. Access via the smooth detour ramp instead of the steep 108 stone steps to comfortably capture the magnificent ocean views.',
        icon: 'Map'
      },
      {
        time: 'Day 2',
        titleKo: '오시리아해안산책로 / 오랑대공원',
        titleEn: 'Osiria Coastal Walk / Orangdae Park',
        descKo: '매끄러운 고성능 우레탄과 아스팔트 포장으로 턱 없이 곧게 이어진 럭셔리 산책로입니다. 바다 위 신비로운 오랑대 석조 제단 용왕단의 기암비경을 바로 앞에서 구경할 수 있습니다.',
        descEn: 'A perfectly paved luxury coastal walkway suitable for smooth rolling. Appreciate the historic shrines standing proudly amidst crushing ocean waves.',
        icon: 'Sunset'
      },
      {
        time: 'Day 2',
        titleKo: '일광해수욕장',
        titleEn: 'Ilgwang Beach',
        descKo: '한적하고 은은한 미를 가진 배 모양 포토존 항구입니다. 모래 먼지 날림 걱정 없는 평탄 방파제와 해안 보도 길을 타고 시원한 명품 은빛 모래 해변을 오롯이 곁에 두고 명상에 젖기 좋은 장소입니다.',
        descEn: 'A tranquil shore with a peaceful ocean view. Smooth harbor walkways let you marvel at the silvery waters with zero dynamic sills.',
        icon: 'Walk'
      },
      // Day 3
      {
        time: 'Day 3',
        titleKo: '수영팔도시장 / 수영사적공원',
        titleEn: 'Suyeong Paldo Market / Suyeong Historical Park',
        descKo: '전통 아케이드가 드높아 우천 시에도 평평하게 카트를 끌며 지역 수산물을 구경할 수 있는 시장, 그리고 천연기념물 거수 곰솔나무가 아늑하게 지켜주는 수영사적공원 숲 데크길을 천천히 걸어가봅니다.',
        descEn: 'Explore local traditional food markets protected by dynamic modern roofs, then slow down under historical black pine trees on flat Suyeong paths.',
        icon: 'Map'
      },
      {
        time: 'Day 3',
        titleKo: '망미골목',
        titleEn: 'Mangmi-gil Alleys',
        descKo: '고즈넉한 주택 골목 사이 숨겨진 감성 도서책방, 예술 가죽 공방, 빈티지 인테리어 가구점들이 가득한 산책로입니다. 높고 낮은 단차 없이 아담한 정취가 서려 고요하지만 기분 좋은 오동나무 골목입니다.',
        descEn: 'Cozy traditional house alleyways packed with miniature galleries, select print bookshops, and quiet craft studios on flat-leveled ground.',
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
      // Day 1
      {
        time: 'Day 1',
        titleKo: '해운대해수욕장',
        titleEn: 'Haeundae Beach',
        descKo: '부산을 대표하는 해변으로, 백사장 뒤편으로 아늑하게 뻗은 평탄 보도블록 덕분에 유모차와 휠체어도 은빛 파도를 보며 아주 부드럽고 상쾌하게 거닐 수 있습니다.',
        descEn: 'Busan\'s symbolic sandy beach with flat walkways, fully barrier-free for wheel access alongside glorious waves.',
        icon: 'Walk',
        stationInfoKo: '해운대역 3번·5번 출구 구남로 광장과 보도 연결 매우 편리',
        stationInfoEn: 'Haeundae Station Exit 3 or 5 links directly to Gunam-ro pedestrian square.'
      },
      {
        time: 'Day 1',
        titleKo: '달맞이길 / 문탠로드',
        titleEn: 'Dalmaji-gil / Moontan Road',
        descKo: '송림과 벚나무가 울창하게 우거진 고즈넉한 힐링 숲길입니다. 울퉁불퉁한 흙길 대신 평평히 정비된 친환경 데크로드를 매끄럽게 따라가며 싱그러운 수목향을 누리기 좋습니다.',
        descEn: 'A cozy pine-scented hillside forest path. Skip rugged dirt roads and slide up beautifully engineered flat boardwalks.',
        icon: 'Walk'
      },
      {
        time: 'Day 1',
        titleKo: '해동용궁사',
        titleEn: 'Haedong Yonggungsa Temple',
        descKo: '기암괴석과 동해안 바다가 맞닿은 관음 성지 사찰입니다. 험난한 108 돌계단을 전면 우회해, 매표소 뒷길의 평평하고 넓은 지상의 우회 단층 통로를 공략하면 파도 절벽을 쾌적하고 편하게 바라봅니다.',
        descEn: 'The scenic cliffside Buddhist temple. Bypassing the extreme 108 vertical steps completely by heading into the smooth side entry slope.',
        icon: 'Map'
      },
      {
        time: 'Day 1',
        titleKo: '청사포',
        titleEn: 'Cheongsapo',
        descKo: '빨강·노랑 대비가 예쁜 등대와 한적한 전경이 머무는 항구입니다. 최근 새롭게 리모델링된 스카이워크 전용 엘리베이터로 편리하게 승강하여 청량한 유리바닥 뒤 바다 절경을 감상할 수 있습니다.',
        descEn: 'A cozy fishing harbor with scenic twin lighthouses. Features a level skywalk with direct elevator lift cabins for effortless sightseeing.',
        icon: 'Sunset'
      },
      {
        time: 'Day 1',
        titleKo: '송정해수욕장',
        titleEn: 'Songjeong Beach',
        descKo: '서퍼들이 가득한 활기찬 모래사장 뒤로 길게 정돈된 나무 데크를 타고 한 송이 연꽃처럼 고요한 죽도공원의 입구 완만 구간까지 모래 번거로움 없이 안전하게 들어옵니다.',
        descEn: 'An open sandy shore filled with active surfers. Walk on beautifully laid flat wood paths leading calmly toward Jukdo Park.',
        icon: 'Walk'
      },
      // Day 2
      {
        time: 'Day 2',
        titleKo: '영도대교 도개 관람',
        titleEn: 'Yeongdo Bridge Drawbridge View',
        descKo: '우리나라 유일의 활개형 도개교입니다. 다리가 하늘 위로 높이 솟아오르는 이색 관람 시간에 맞춰 보도 정비된 평평한 전망 광장에서 역사의 숨결을 쾌적하게 마주합니다.',
        descEn: 'Korea\'s only drawbridge. Gather at the step-free viewing plaza to capture the dynamic bridge lift ceremonies safely.',
        icon: 'Map',
        stationInfoKo: '남포역 6번·8번 출구 엘리베이터 인접 도보 1분',
        stationInfoEn: 'Nampo Station Exit 6 or 8 lists convenient elevators 1 min away.'
      },
      {
        time: 'Day 2',
        titleKo: '영도 태종대 가로수 숲길: 다누비열차 투어',
        titleEn: 'Taejongdae Forest: Danubi Train',
        descKo: '신라 태종 무열왕이 반해 머물렀던 절벽 숲길입니다. 교통약자를 환대하는 친환경 순환 열차인 다누비열차를 타고 편안히 이동하여 대전망대 테라스의 시원한 기암괴석 비경을 감상해 보세요.',
        descEn: 'A stunning seaside pinewood cliff path. Hop onto the friendly Danubi eco-friendly tourist train for level access straight to the cliffs.',
        icon: 'Train'
      },
      {
        time: 'Day 2',
        titleKo: '흰여울문화마을·절영해안 산책',
        titleEn: 'Huw潛yeoul Culture Village / Jeolyung Coast',
        descKo: '절벽 앞 푸른 파도와 그리스 산토리니를 닮은 아기자기한 흰 벽 골목입니다. 가파른 계단 골목길 윗자락의 평평한 상부 전망로를 공략하면 휠체어와 유모차로도 아름다운 흰여울 바다색을 품에 담습니다.',
        descEn: 'A cliffside art village with vibrant cobalt lanes. Choose the beautifully level upper sea-view line to enjoy deep visual horizons without stairs.',
        icon: 'Walk'
      },
      {
        time: 'Day 2',
        titleKo: 'BIFF광장 / 국제시장 / 부평깡통시장 감칠맛 투어',
        titleEn: 'BIFF Square / Gukje / Kkangtong Market',
        descKo: '차량 진입이 통제된 널찍한 보행광장과 평평한 전통시장 아케이드 구역입니다. 새콤달콤 비빔당면부터 쫀득한 물떡과 원조 씨앗호떡까지 로컬 대표 미식들을 단차와 턱 걱정 없이 맛나게 탐방합니다.',
        descEn: 'A vast car-free pedestrian food market zone with dynamic modern roofs. Savor delicious local treats with complete barrier-free flat rolling ease.',
        icon: 'Food'
      },
      {
        time: 'Day 2',
        titleKo: '보수동책방골목',
        titleEn: 'Bosudong Book Alley',
        descKo: '한국전쟁 시절부터 이어져 온 헌책의 아날로그 흔적이 가득한 골목입니다. 길게 난 평지 가로를 걸으며 켜켜이 쌓아 올린 지혜의 종이 내음과 마주해보세요.',
        descEn: 'A historical secondary bookstore district operating since the Korean War. Enjoy walking on flat stone tiles smelling classical prints.',
        icon: 'Map'
      },
      {
        time: 'Day 2',
        titleKo: '용두산공원 명품 야경',
        titleEn: 'Yongdusan Park Scenic Night View',
        descKo: '부산 도심 중앙의 유서 깊은 언덕 공원입니다. 남포동에서 에스컬레이터를 타고 가뿐하게 진입하여 시야가 탁 트인 평탄한 기념비 성벽 정원과 화려한 야간 타워 미디어를 여유롭게 감상합니다.',
        descEn: 'Perched on a historical hill inside Central Nampo. Escalators and flat garden promenades lead seamlessly to the tall glowing tower.',
        icon: 'Sunset'
      },
      // Day 3
      {
        time: 'Day 3',
        titleKo: '서면 번화가 평지 산책',
        titleEn: 'Seomyeon Urban Walk',
        descKo: '부산 심장부의 가장 젊고 평탄한 이색 가로입니다. 꼼꼼히 평탄 정비 완료된 사거리 인도를 따라 개성 강한 브랜드 안테나 가이드 숍과 맛집들을 편히 방문합니다.',
        descEn: 'Vibrant heart of central Busan offering completely flat modern pedestrian lanes and active street busking views.',
        icon: 'Walk'
      },
      {
        time: 'Day 3',
        titleKo: '전포카페거리 / 전리단길',
        titleEn: 'Jeonpo Cafe Street / Jeonridan-gil',
        descKo: '옛 부품 인쇄 골목이 디자인 스튜디오와 노란 커피 숍으로 감각적으로 개조된 로컬 명소입니다. 넓고 평평한 길을 걸어보며 따사로운 분위기의 에스프레소나 밀크티 한 잔을 누립니다.',
        descEn: 'An old machinery district turned into coffee artisan streets with step-free entrances and low barrier visual shops.',
        icon: 'Coffee',
        stationInfoKo: '전포역 엘리베이터 승강기 이용 시 전포카페거리 평지 진로 바로 인접',
        stationInfoEn: 'Jeonpo Station lifts launch visitors straight into level cafe grids.'
      },
      {
        time: 'Day 3',
        titleKo: '밀락더마켓',
        titleEn: 'Millac The Market',
        descKo: '광안리 동쪽 끝의 세련된 초대형 선창가 쉼터 포람입니다. 건물 전면과 측면에 완만한 경사로와 전용 엘리베이터가 배치되어, 버스킹 스탠드가 넘실거리는 실내 홀에서 수변 광장 파도를 황홀히 내려다봅니다.',
        descEn: 'A state-of-the-art dockside indoor complex with wide elevators. Relax inside air-conditioned spaces watching bridge lights details.',
        icon: 'Food'
      },
      {
        time: 'Day 3',
        titleKo: '광안리해수욕장 / 광안대교',
        titleEn: 'Gwangalli Beach & Gwangan Bridge',
        descKo: '다양한 소품숍과 통유리 카페가 즐비한 바닷가 수평로입니다. 모래먼지 날림 걱정이 전무한 우레탄 자전거·보행 전용 산책로 위에서 화려하게 불이 들어오는 무지개 광안대교를 가장 완벽하게 감상할 수 있습니다.',
        descEn: 'A barrier-free beachfront path look facing the gigantic suspension bridge. Perfect high-contrast views on extremely smooth boardwalk paths.',
        icon: 'Sunset'
      },
      {
        time: 'Day 3',
        titleKo: '광안리 M 드론 라이트쇼',
        titleEn: 'Gwangalli M Drone Light Show',
        descKo: '매주 토요일 밤, 수백 대의 오색 드론이 하늘을 화려하게 수놓으며 한 폭의 밤하늘 캔버스를 그립니다. 턱 없는 평탄 보도를 가볍게 누비며 안전하게 수려한 디지털 밤하늘을 만끽해 보세요.',
        descEn: 'A breathtaking night-sky drone choreography held every Saturday. Sit on designated stroller-safe wide viewing spots safely.',
        icon: 'Sunset'
      },
      // Day 4
      {
        time: 'Day 4',
        titleKo: '감천문화마을',
        titleEn: 'Gamcheon Culture Village',
        descKo: '계단식 집들이 옹기종기 모여 있는 알록달록 무지개 빛깔 산등성이 예술 마을입니다. 가파르고 좁은 계단 골목 대신, 버스 하차장에서 이어진 완만한 주 도로 가이드라인과 턱 없는 예술 조형물 포토존 위주로 우회하여 편리하게 탐사합니다.',
        descEn: 'The colorful hillside Korean village with tiny houses. Traverse the main unhurried ridge avenue completely step-free.',
        icon: 'Map'
      },
      {
        time: 'Day 4',
        titleKo: '송도해수욕장 / 송도해상케이블카',
        titleEn: 'Songdo Beach / Marine Cable Car',
        descKo: '바다 한가운데를 비행하듯 가로지르는 크루즈형 케이블카 투어입니다. 지상 승강장에 완비된 고속 휠체어 전용 승강 엘리베이터와 탑승 단차를 없앤 전용 개찰구를 통과해, 넓은 창밖으로 바다 풍경을 안전하게 가슴 가득 담고 날아갑니다.',
        descEn: 'A flying visual cabin ride across ocean ripples. Smooth wheelchair and stroller level entry ramps make boarding comfortable.',
        icon: 'Train'
      },
      {
        time: 'Day 4',
        titleKo: '다대포해수욕장 (생태데크로 & 가시 낙조)',
        titleEn: 'Dadaepo Beach / Reed Eco Sunset',
        descKo: '광활한 갯벌 갈대밭 위로 촘촘히 연결된 친환경 나무 전망 데크길입니다. 틈틈이 턱이 다듬어져 있어 유모차 바퀴 끼임이 예방되며, 붉게 물드는 다대포 특유의 평화로운 황금빛 저녁노을을 평안히 만나봅니다.',
        descEn: 'Watch the crimson sunset on the vast wetland marshlands from perfectly paved wide wood platforms.',
        icon: 'Sunset'
      },
      {
        time: 'Day 4',
        titleKo: '을숙도 철새 & 생태 공원',
        titleEn: 'Eulsukdo Eco & Bird Sanctuary',
        descKo: '낙동강 하구에 퇴적되어 형성된 고요한 천혜의 모래섬 공원입니다. 은빛 물빛을 따라 끝없이 다듬어진 고요하고 평탄한 포장로 위에서 유모차를 밀며 머리 위로 힘차게 날아가는 가을 철새들의 도약을 시원히 관찰하기에 절묘합니다.',
        descEn: 'A peaceful riverside eco-sanctuary with lush reeds. Wheel across asphalt trails watching seasonal birds soar above.',
        icon: 'Map'
      },
      {
        time: 'Day 4',
        titleKo: '가덕도 역사 바다정원',
        titleEn: 'Gadeokdo Ocean Garden',
        descKo: '부산의 평화로운 서쪽 끝자락 바위 섬입니다. 거제 가덕대교가 주는 탁 트인 바다 수평선을 배경 삼아, 편안하게 마련된 경사 램프 주변 한적한 바다정원 산책 테라스에서 정겹게 시간을 물들이기 좋습니다.',
        descEn: 'A pristine island at the western edge of Busan offering gentle shoreline ramps and fresh sea breeze viewing pavilions.',
        icon: 'Walk'
      },
      // Day 5
      {
        time: 'Day 5',
        titleKo: '센텀시티 신세계백화점 / 마린시티 영화의거리',
        titleEn: 'Centum City / Marine City Cinema Street',
        descKo: '실내 전체가 완벽한 무장벽 평면으로 닦여있는 세계 최대 백화점과 수영 강변 가로수길의 힐링입니다. 이어서 높은 고층 빌딩 숲과 바다를 매끈한 광안대교 수평 실루엣 뒤로 마주하는 마린시티 영화의 거리 목재 전망대를 가뿐하게 산책해보세요.',
        descEn: 'Explore the world\'s largest department store, and stroll through flat Cinema Street in Marine City facing high-rise wonders.',
        icon: 'Food',
        stationInfoKo: '센텀시티 지하 연결로를 통해 개찰구 무단계 진입 지원',
        stationInfoEn: 'Centum City subways support direct level access to elevators.'
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
