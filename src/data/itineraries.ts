export interface ItineraryStep {
  time?: string;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
  icon?: string;
  stationInfoKo?: string;
  stationInfoEn?: string;
  foodCategory?: 'cafe' | 'brunch' | 'restaurant' | 'streetfood';
  categoryType?: string;
  regionId?: 'haeundae_gijang' | 'gwangalli_centum' | 'seomyeon_jeonpo' | 'nampo_yeongdo' | 'others';
  regionNameKo?: string;
  regionNameEn?: string;
}

export interface ItineraryCourse {
  id: string;
  titleKo: string;
  titleEn: string;
  subtitleKo: string;
  subtitleEn: string;
  category: 'DAY' | '1NIGHT' | '2NIGHTS' | '3NIGHTS' | '4NIGHTS' | 'GOURMET' | 'EXPERIENCE';
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
    id: 'itinerary-day-first-time',
    titleKo: '이동 최소화! 알짜배기 부산 원도심 당일치기 코스',
    titleEn: 'Minimize Movement! Best of Busan Historical Downtown 1-Day Tour',
    subtitleKo: '첫 부산 방문을 위한 알짜배기 코스로, 교통 수단을 효율적으로 사용하여 원도심의 알짜배기 명소와 광안리 야경까지 하루 만에 완전 정복하는 최고의 코스예요.',
    subtitleEn: 'A highly efficient day tour for first-time visitors, covering must-see historic downtown spots, Yeongdo cliffs, and Gwangalli night view.',
    category: 'DAY',
    durationKo: '당일치기 (약 12시간)',
    durationEn: '1 Day (Approx. 12 Hours)',
    tagKo: '첫 방문 필수 🌊',
    tagEn: 'First-time Must 🌊',
    difficultyKo: '보통',
    difficultyEn: 'Moderate',
    overallTipKo: '부산역에서 시작해 원도심인 감천문화마을과 남포동, 영도를 거쳐 광안리 야경으로 이어지는 코스입니다. 지하철과 노선버스를 영리하게 조합하거나 저상버스, 택시 등을 효율적으로 이용하면 이동 거리를 최소화하며 알차게 하루를 보낼 수 있습니다.',
    overallTipEn: 'Starting from Busan Station, this course takes you through Gamcheon, Nampo-dong, Yeongdo, and finishes with Gwangalli night views. Combining the subway, local buses, or taxis minimizes travel time for an incredibly packed single-day itinerary.',
    steps: [
      {
        time: '09:00 - 09:30',
        titleKo: '부산역 (설레는 부산 여행의 시작)',
        titleEn: 'Busan Station (The Start of the Exciting Journey)',
        descKo: 'KTX/SRT 열차에서 내려 힘찬 부산 여행을 시작하는 출발점입니다. 역사 내 짐 보관 서비스나 물품보관함을 이용해 무거운 짐을 보관하거나 숙소로 미리 보내 가벼운 몸으로 여행을 출발하는 것이 요령입니다.',
        descEn: 'Step off your high-speed train and kickstart your adventure. We highly recommend using luggage storage or delivery services within the station to travel light.',
        icon: 'Train',
        stationInfoKo: 'KTX/SRT 부산역 및 지하철 1호선 부산역 연계 편리',
        stationInfoEn: 'Easy transfers between KTX/SRT Busan Station and Subway Line 1.'
      },
      {
        time: '10:00 - 12:00',
        titleKo: '감천문화마을: 알록달록 무지개 빛깔 산등성이 예술마을',
        titleEn: 'Gamcheon Culture Village: Colorful Hillside Rainbow Art Village',
        descKo: '산비탈을 따라 계단식으로 늘어선 아기자기하고 예쁜 파스텔톤 집들이 모여 이국적인 비경을 선사합니다. 어린왕자 동상 앞 포토존에서 인생사진을 남기고 전망대에서 탁 트인 원도심의 바다 풍경을 감상해 보세요.',
        descEn: 'Explore the picturesque pastel-toned houses lined up along the hillside. Capture iconic photos with the Little Prince and enjoy panoramic views of the historic port.',
        icon: 'Map',
        stationInfoKo: '토성역(1호선) 6번 출구 앞 버스정류장에서 사하구1-1, 서구2, 서구2-2 마을버스 환승 후 감천문화마을 하차',
        stationInfoEn: 'Toseong Station (Line 1) Exit 6, transfer to local mini bus Saha 1-1, Seo-gu 2, or Seo-gu 2-2 to Gamcheon Culture Village.'
      },
      {
        time: '12:30 - 15:00',
        titleKo: '부평깡통시장 & 국제시장 & 보수동 책방거리 (남포동 미식/역사 탐방)',
        titleEn: 'Bupyeong Kkangtong Market, Gukje Market & Bosudong Book Alley',
        descKo: '부산 원도심의 심장부에서 따뜻한 비빔당면, 씨앗호떡, 원조 물떡 등 군침 도는 대표 길거리 미식을 맛보며 든든한 점심 식사를 즐깁니다. 평탄하게 이어진 시장 골목을 지나며 영화의 감동이 살아있는 국제시장과 정겨운 종이 냄새 가득한 보수동 책방거리를 도보로 산책하세요.',
        descEn: 'Indulge in Busan’s famous street foods such as spicy glass noodles, sweet seed hotteok, and chewy water rice cakes for lunch. Stroll on flat market aisles and historic alleys filled with cozy rare bookstores.',
        icon: 'Food',
        stationInfoKo: '자갈치역(1호선) 7번 출구 또는 남포역(1호선) 1번/3번 출구 평탄한 도보 5~10분',
        stationInfoEn: 'Jagalchi Station (Line 1) Exit 7 or Nampo Station (Line 1) Exits 1 or 3, smooth 5-10 mins walk.'
      },
      {
        time: '15:30 - 18:30',
        titleKo: '영도 흰여울문화마을 & 태종대: 깎아지른 절벽 위 그리스 감성 바다 수평선',
        titleEn: 'Yeongdo Huinnyeoul Culture Village & Taejongdae Sea Cliffs',
        descKo: '남해 바다가 아득하게 펼쳐지는 절벽을 따라 하얀 골목이 이어지는 그리스 산토리니 풍의 흰여울문화마을입니다. 상부 도로변의 예쁜 바다 뷰 카페에서 티타임을 보낸 후, 태종대로 넘어가 친환경 순환 열차 다누비열차를 타고 수려한 소나무 숲길과 아찔한 해안 절벽 비경을 한눈에 감상해 보세요.',
        descEn: 'A beautiful Santorini-style village with white walls built along steep sea cliffs. Enjoy ocean-view cafes, then head to Taejongdae to ride the friendly Danubi train around the coastal pine forest.',
        icon: 'Sunset',
        stationInfoKo: '남포역 6번 출구 영도대교 정류장에서 6, 9, 82, 85번 등 시내버스 탑승 후 흰여울문화마을 하차',
        stationInfoEn: 'From Nampo Station Exit 6 (Yeongdo Bridge stop), take local bus 6, 9, 82, or 85 to Huinnyeoul Culture Village.'
      },
      {
        time: '19:30 - 21:00',
        titleKo: '광안리해수욕장: 밤하늘을 수놓는 광안대교 다이내믹 야경 쇼',
        titleEn: 'Gwangalli Beach: Dynamic Light Show of Gwangan Bridge',
        descKo: '부산의 잊지 못할 밤을 완성하는 곳입니다. 드넓은 모래사장 뒤편으로 펼쳐지는 아름다운 오색 광안대교 LED 라이팅 쇼를 감상하며 시원한 바닷바람과 함께 여정을 낭만적으로 장식해 보세요. 매주 토요일 저녁에는 화려한 드론 쇼도 열리니 일정을 맞추면 좋습니다.',
        descEn: 'Wrap up your ultimate Busan day. Relax on the beach watching the dynamic colorful LED light show illuminating the gigantic suspension bridge over the gentle waves.',
        icon: 'Sunset',
        stationInfoKo: '광안역(2호선) 3번 또는 5번 출구에서 해변 방향 도보 10분, 또는 버스 연계 편리',
        stationInfoEn: 'Gwangan Station (Line 2) Exit 3 or 5, 10 mins walk down to the beach.'
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
    overallTipKo: '낙동강 하구에 넓게 펼쳐진 3대 생태공원은 경사나 계단이 전혀 없는 넓고 평탄한 보행로와 아늑한 나무 데크길로 이루어져 있습니다. 보행이 불편하신 분들은 물론 바쁜 일상 속 가만히 불어오는 풀바람을 느끼며 숨을 고르고 싶은 분들에게 최고의 선물 같은 편안한 힐링 코스예요.',
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
        stationInfoKo: '강서구청역(3호선) 1번 또는 3번 출구 평탄한 해변 진입로 도보 5분',
        stationInfoEn: 'Gangseo-gu Office Station (Line 3) Exits 1 or 3, 5 mins flat barrier-free walk'
      }
    ]
  },
  {
    id: 'itinerary-1night',
    titleKo: '이동 최소화! 동선 최적화 부산 1박 2일 정복 코스',
    titleEn: 'Minimal Transit! Geographically Optimized 1N2D Busan Route',
    subtitleKo: '첫날은 부산역 중심의 원도심과 영도, 둘째날은 광안리와 해운대·청사포까지 이동 거리를 최적으로 배치한 1박 2일 알짜배기 코스예요.',
    subtitleEn: 'Day 1 focuses on historic downtown & Yeongdo, while Day 2 covers Gwangalli, Haeundae & Cheongsapo with minimal travel time.',
    category: '1NIGHT',
    durationKo: '1박 2일',
    durationEn: '1 Night 2 Days',
    tagKo: '동선 최적화 🌊',
    tagEn: 'Optimal Route 🌊',
    difficultyKo: '보통',
    difficultyEn: 'Moderate',
    overallTipKo: 'Day 1은 1호선 부산역·남포역 축을 따라 감천, 부평깡통시장, 영도를 하나로 묶었습니다. Day 2는 2호선 축을 따라 광안리에서 출발해 해운대, 청사포, 해동용궁사까지 일직선으로 완벽하게 연결됩니다.',
    overallTipEn: 'Day 1 clusters attractions around Subway Line 1 (Busan Stn, Nampo, Yeongdo). Day 2 smoothly follows Line 2 from Gwangalli to Haeundae and Cheongsapo.',
    steps: [
      {
        time: 'Day 1 (10:00 - 12:00)',
        titleKo: '부산역 출발 & 감천문화마을 탐방',
        titleEn: 'Departure from Busan Station & Gamcheon Culture Village',
        descKo: '부산역 도착 후 무거운 짐을 보관하고, 알록달록 파스텔톤 집들이 모여있는 감천문화마을로 이동합니다. 어린왕자 포토존과 마을 전망대에서 이국적인 비경을 즐겨보세요.',
        descEn: 'Leave heavy bags at Busan Station storage and head directly to Gamcheon Village to enjoy pastel-colored houses and the iconic Little Prince view.',
        icon: 'Map',
        stationInfoKo: '토성역(1호선) 6번 출구 앞 마을버스(사하구1-1, 서구2) 환승 10분',
        stationInfoEn: 'Toseong Station (Line 1) Exit 6, transfer to local bus Saha 1-1 or Seo-gu 2.'
      },
      {
        time: 'Day 1 (12:30 - 15:00)',
        titleKo: '부평깡통시장 & 국제시장 & 남포동 (점심 미식 투어)',
        titleEn: 'Bupyeong Kkangtong & Gukje Market Food Tour',
        descKo: '감천에서 바로 내려오면 접해있는 부평깡통시장과 국제시장에서 원조 씨앗호떡, 비빔당면, 물떡 등 부산 대표 로컬 길거리 음식을 맛보며 든든한 점심 식사를 즐깁니다.',
        descEn: 'Just minutes down from Gamcheon, indulge in traditional street delights like seed hotteok, spicy glass noodles, and hot broth rice cakes.',
        icon: 'Food',
        stationInfoKo: '자갈치역(1호선) 7번 출구 또는 남포역(1호선) 도보 5분',
        stationInfoEn: 'Jagalchi Station (Line 1) Exit 7 or Nampo Station 5 mins walk.'
      },
      {
        time: 'Day 1 (15:30 - 18:30)',
        titleKo: '영도 흰여울문화마을 & 태종대 (다누비열차)',
        titleEn: 'Yeongdo Huinnyeoul Village & Taejongdae (Danubi Train)',
        descKo: '남포동에서 영도대교를 건너 바로 이어지는 흰여울문화마을의 해안절벽 카페거리를 거닌 후, 태종대로 넘어가 친환경 다누비열차를 타고 수려한 해안 절벽과 소나무 숲길을 관람합니다.',
        descEn: 'Cross Yeongdo Bridge to reach Huinnyeoul cliffside cafes, then ride the Danubi train through Taejongdae’s ocean-front pine forest.',
        icon: 'Sunset',
        stationInfoKo: '남포역(1호선) 6번 출구에서 시내버스 6, 9, 82, 85번 탑승 15분',
        stationInfoEn: 'Take local bus 6, 9, 82, or 85 from Nampo Station Exit 6.'
      },
      {
        time: 'Day 1 (19:00 - 21:00)',
        titleKo: '용두산공원 부산타워 야경 & 원도심 숙박',
        titleEn: 'Yongdusan Park Busan Tower Night View & Downtown Stay',
        descKo: '남포동 광복로 시내로 돌아와 에스컬레이터를 타고 용두산공원에 올라 화려하게 빛나는 부산타워와 원도심 밤바다 야경을 관람하며 첫날을 마무리합니다.',
        descEn: 'Return to Nampo-dong, take the escalator up to Yongdusan Park, and enjoy panoramic night views from Busan Tower.',
        icon: 'Night',
        stationInfoKo: '남포역(1호선) 1번, 3번 출구 인근 에스컬레이터 이용',
        stationInfoEn: 'Nampo Station (Line 1) Exit 1 or 3, direct escalator access.'
      },
      {
        time: 'Day 2 (09:30 - 12:00)',
        titleKo: '광안리 해수욕장 & 안녕광안리 해안 산책',
        titleEn: 'Gwangalli Beach & Gwangan Bridge Ocean Walk',
        descKo: '2호선을 타고 광안리로 이동하여 드넓은 광안대교를 배경으로 시원한 바닷바람과 함께 모래사장 데크길을 여유롭게 산책하고 예쁜 해변 카페에서 아침 여유를 누립니다.',
        descEn: 'Head to Gwangalli via Line 2. Stroll along the flat boardwalk with stunning views of Gwangan Bridge and relax at beachfront cafes.',
        icon: 'Walk',
        stationInfoKo: '광안역(2호선) 3번, 5번 출구 해변 방향 도보 10분',
        stationInfoEn: 'Gwangan Station (Line 2) Exit 3 or 5, 10 mins walk to beach.'
      },
      {
        time: 'Day 2 (12:30 - 15:00)',
        titleKo: '해운대 해수욕장 & 동백섬 APEC하우스',
        titleEn: 'Haeundae Beach & Dongbaekseom APEC House',
        descKo: '광안리에서 해운대로 이동해 해변 송림공원 산책로와 동백섬 데크길을 따라 걸으며 누리마루 APEC하우스를 탐방하고 구남로 맛집거리에서 맛있는 점심 식사를 즐깁니다.',
        descEn: 'Move to Haeundae, stroll around Dongbaekseom pine-tree trails to APEC House, and have lunch along Gunam-ro food street.',
        icon: 'Food',
        stationInfoKo: '해운대역(2호선) 3번, 5번 출구 또는 동백역 1번 출구',
        stationInfoEn: 'Haeundae Station (Line 2) Exit 3 or 5, or Dongbaek Station Exit 1.'
      },
      {
        time: 'Day 2 (15:30 - 18:00)',
        titleKo: '해운대 그린레일웨이 & 청사포 해변열차',
        titleEn: 'Haeundae Green Railway & Cheongsapo Beach Train',
        descKo: '미포에서 출발하는 그린레일웨이 수평 보행로를 거닐거나 귀여운 해변열차를 타고 청사포로 이동하여 쌍둥이 등대와 동해 바다의 청량한 절경을 감상합니다.',
        descEn: 'Walk the flat Green Railway trail from Mipo to Cheongsapo, or ride the colorful Beach Train to view the iconic twin lighthouses.',
        icon: 'Train',
        stationInfoKo: '해운대 미포 승강장 / 청사포 승강장 연계',
        stationInfoEn: 'Connected via Haeundae Mipo and Cheongsapo platforms.'
      },
      {
        time: 'Day 2 (18:30 - 20:30)',
        titleKo: '해동용궁사 & 오시리아 바다산책 (여행 마무리)',
        titleEn: 'Haedong Yonggungsa Temple & Osiria Coastal Walk',
        descKo: '기장 해동용궁사로 이동하여 바다 위 시원한 관음 성지 사찰을 둘러본 뒤, 오시리아 해안산책로를 거쳐 부산역/사상터미널로 이동하며 알찬 1박 2일 일정을 완수합니다.',
        descEn: 'Visit the famous cliffside Haedong Yonggungsa Temple and Osiria coastal trail before heading back to Busan Station or airport.',
        icon: 'Sunset',
        stationInfoKo: '오시리아역(동해선) 및 택시/시내버스 1001번, 185번 연계',
        stationInfoEn: 'Osiria Station (Donghae Line) or city bus 1001 / 185.'
      }
    ]
  },
  {
    id: 'itinerary-2nights',
    titleKo: '권역별 핵심 완파! 동선 깔끔 2박 3일 낭만 코스',
    titleEn: 'Zonal Perfection! Clean Transit 2N3D Romantic Course',
    subtitleKo: 'Day 1 원도심·영도, Day 2 서면·광안리, Day 3 해운대·기장 오시리아까지 낭비되는 시간 없이 꽉 채운 2박 3일 코스예요.',
    subtitleEn: 'Day 1 Historic Downtown, Day 2 Seomyeon & Gwangalli, Day 3 Haeundae & Gijang Osiria for a seamless 3-day experience.',
    category: '2NIGHTS',
    durationKo: '2박 3일',
    durationEn: '2 Nights 3 Days',
    tagKo: '2박 3일 완벽 동선 🌅',
    tagEn: 'Perfect 2N3D Route 🌅',
    difficultyKo: '보통',
    difficultyEn: 'Moderate',
    overallTipKo: '부산을 3개 핵심 권역(원도심, 중앙/수영, 동부산)으로 깔끔하게 나누어 동선을 구성했습니다. 이동 시간이 획기적으로 줄어들어 카페 투어와 관광을 느긋하게 즐길 수 있습니다.',
    overallTipEn: 'Divided into 3 distinct zones (Downtown, Seomyeon/Gwangan, East Busan). This minimizes travel time between spots and maximizes leisure.',
    steps: [
      // Day 1: 원도심 & 영도 권역
      {
        time: 'Day 1 (10:00 - 12:30)',
        titleKo: '부산역 출발 & 부평깡통시장·국제시장',
        titleEn: 'Busan Station & Bupyeong Market Lunch',
        descKo: '부산역 도착 후 1호선으로 5분 거리인 남포동/자갈치로 이동하여 부평깡통시장의 씨앗호떡, 비빔당면, 물떡으로 즐거운 로컬 점심을 맛봅니다.',
        descEn: 'Arrive at Busan Station, take Line 1 to Nampo/Jagalchi, and enjoy local food favorites at Bupyeong Kkangtong Market.',
        icon: 'Food',
        stationInfoKo: '자갈치역(1호선) 7번 출구 / 남포역 1번 출구',
        stationInfoEn: 'Jagalchi Station (Line 1) Exit 7 or Nampo Station Exit 1.'
      },
      {
        time: 'Day 1 (13:00 - 15:00)',
        titleKo: '용두산공원 & 남포동 광복로 패션거리',
        titleEn: 'Yongdusan Park & Gwangbok-dong Street',
        descKo: '광복로 상가거리 에스컬레이터를 타고 용두산공원에 올라 부산타워와 도심 전경을 둘러본 뒤 아기자기한 보수동 책방골목까지 편하게 산책합니다.',
        descEn: 'Ride the escalator to Yongdusan Park for Busan Tower views, then walk through the nostalgic Bosudong Book Alley.',
        icon: 'Walk',
        stationInfoKo: '남포역(1호선) 1번 출구 도보 3분',
        stationInfoEn: 'Nampo Station (Line 1) Exit 1, 3 mins walk.'
      },
      {
        time: 'Day 1 (15:30 - 18:30)',
        titleKo: '영도 흰여울문화마을 & 태종대 다누비열차',
        titleEn: 'Yeongdo Huinnyeoul Village & Taejongdae',
        descKo: '남포동 바로 건너 영도 흰여울문화마을 바다 카페거리에서 티타임을 갖고, 태종대로 이동해 다누비열차를 타고 감탄을 자아내는 해안 절벽을 관람합니다.',
        descEn: 'Cross over to Yeongdo for Huinnyeoul ocean-view cafes and take the Danubi train at Taejongdae scenic cliff park.',
        icon: 'Sunset',
        stationInfoKo: '남포역 6번 출구 버스정류장에서 시내버스 이용',
        stationInfoEn: 'Catch local buses from Nampo Station Exit 6.'
      },
      {
        time: 'Day 1 (19:00 - 21:00)',
        titleKo: '영도대교 도개 관람 & 원도심 야경',
        titleEn: 'Yeongdo Bridge & Downtown Nightscape',
        descKo: '영도웰컴센터 전망대와 남포동 수변공원에서 화려한 영도대교 및 원도심 야경을 감상하며 첫날 원도심 코스를 완벽하게 매듭짓습니다.',
        descEn: 'Enjoy the vibrant harbor light show and Yeongdo Bridge panorama from the waterfront plaza to conclude Day 1.',
        icon: 'Night',
        stationInfoKo: '남포역(1호선) 6, 8번 출구 인접',
        stationInfoEn: 'Nampo Station Exit 6 or 8.'
      },
      // Day 2: 서면·전포 & 광안리 권역
      {
        time: 'Day 2 (10:30 - 13:30)',
        titleKo: '서면 젊음의거리 & 전포카페거리 / 전리단길',
        titleEn: 'Seomyeon Youth Street & Jeonpo Cafe Street',
        descKo: '부산 중심 서면/전포로 이동하여 트렌디한 감성의 디자이너 숍과 분위기 좋은 예쁜 단층 카페에서 수제 브런치와 에스프레소를 즐깁니다.',
        descEn: 'Explore trendy boutiques and enjoy handmade brunch and specialty coffee along Jeonpo Cafe Street.',
        icon: 'Coffee',
        stationInfoKo: '전포역(2호선) 7번 출구 / 서면역(1,2호선) 2번 출구',
        stationInfoEn: 'Jeonpo Station (Line 2) Exit 7 or Seomyeon Station Exit 2.'
      },
      {
        time: 'Day 2 (14:00 - 16:30)',
        titleKo: '망미골목 & F1963 복합문화공간',
        titleEn: 'Mangmi-gil Alleys & F1963 Cultural Center',
        descKo: '고즈넉한 감성 서점과 공방이 모여있는 망미골목을 거쳐, 고려제강 옛 공장을 리모델링한 대형 복합문화공간 F1963에서 예술 전시와 힐링 정원을 둘러봅니다.',
        descEn: 'Stroll through peaceful Mangmi alleyways and visit F1963, a revitalized eco-friendly cultural art center.',
        icon: 'Map',
        stationInfoKo: '망미역(3호선) 2번 출구 및 시내버스 연계',
        stationInfoEn: 'Mangmi Station (Line 3) Exit 2 with bus connections.'
      },
      {
        time: 'Day 2 (17:00 - 19:00)',
        titleKo: '광안리해수욕장 & 밀락더마켓',
        titleEn: 'Gwangalli Beach & Millac The Market',
        descKo: '광안리 바닷가로 이동하여 탁 트인 광안대교를 바라보며 해안 데크길을 걸은 뒤, 힙한 미식 복합공간 밀락더마켓에서 오션뷰와 함께 맛있는 저녁을 먹습니다.',
        descEn: 'Walk along Gwangalli beach and head to Millac The Market, a trendy indoor seaside hub with delicious dinner options.',
        icon: 'Food',
        stationInfoKo: '광안역(2호선) 3번, 5번 출구 / 민락역 인접',
        stationInfoEn: 'Gwangan Station (Line 2) Exit 3 or 5, close to Millac.'
      },
      {
        time: 'Day 2 (19:30 - 21:00)',
        titleKo: '광안대교 LED 라이팅 쇼 & 드론쇼 (토요일)',
        titleEn: 'Gwangan Bridge Night Show & Drone Performance',
        descKo: '밤하늘을 수놓는 광안대교의 오색 LED 미디어 쇼를 감상합니다. 토요일 방문 시 화려하게 펼쳐지는 광안리 M 드론 라이트쇼까지 관람하는 최고의 낭만을 선사합니다.',
        descEn: 'Marvel at the illumination of Gwangan Bridge. If visiting on Saturday, catch the magical Gwangalli M Drone Light Show.',
        icon: 'Sunset',
        stationInfoKo: '광안리 해변 만남의 광장 앞',
        stationInfoEn: 'In front of Gwangalli Beach Central Plaza.'
      },
      // Day 3: 해운대 & 기장 오시리아 권역
      {
        time: 'Day 3 (09:30 - 12:00)',
        titleKo: '해운대해수욕장 송림공원 & 동백섬 APEC하우스',
        titleEn: 'Haeundae Beach Pine Park & Dongbaekseom',
        descKo: '해운대 해변을 병풍처럼 감싸는 송림공원 데크길과 동백섬 해안 산책로를 걸으며 아침 바다와 누리마루 APEC하우스의 명품 전경을 관람합니다.',
        descEn: 'Walk through Songnim Pine Park and Dongbaekseom coastal trails for panoramic morning sea views.',
        icon: 'Walk',
        stationInfoKo: '해운대역(2호선) 3, 5번 출구 / 동백역 1번 출구',
        stationInfoEn: 'Haeundae Station (Line 2) Exit 3/5 or Dongbaek Station Exit 1.'
      },
      {
        time: 'Day 3 (12:30 - 15:00)',
        titleKo: '해운대 그린레일웨이 & 청사포 해변열차',
        titleEn: 'Haeundae Green Railway & Cheongsapo',
        descKo: '미포에서 평탄한 그린레일웨이 산책로를 따라 걸어 청사포에 도착합니다. 알록달록 해변열차와 청사포 쌍둥이 등대 배경으로 인생 사진을 남깁니다.',
        descEn: 'Walk the smooth Green Railway track or ride the Beach Train to Cheongsapo to take photos with iconic twin lighthouses.',
        icon: 'Train',
        stationInfoKo: '미포 승강장 및 청사포 승강장 연계',
        stationInfoEn: 'Connected via Mipo and Cheongsapo platforms.'
      },
      {
        time: 'Day 3 (15:30 - 17:30)',
        titleKo: '해동용궁사 & 오시리아 오랑대 바다산책로',
        titleEn: 'Haedong Yonggungsa & Osiria Orangdae Walk',
        descKo: '기암절벽 위 수려한 사찰 해동용궁사를 방문해 시원한 바다 내음을 들이키고, 인근 오랑대 공원 해안 산책로를 걸으며 2박 3일 부산 여행을 만족스럽게 마무리합니다.',
        descEn: 'Visit the oceanfront Haedong Yonggungsa Temple and walk Orangdae Park trails before departing for home.',
        icon: 'Sunset',
        stationInfoKo: '오시리아역(동해선) 및 택시/시내버스 1001번 연계',
        stationInfoEn: 'Osiria Station (Donghae Line) or city bus 1001.'
      }
    ]
  },
  {
    id: 'itinerary-3nights',
    titleKo: '부산 전역 완전 정복! 여유로운 3박 4일 완벽 휴식 코스',
    titleEn: 'Full Busan Mastery! Relaxed 3N4D Ultimate Healing Route',
    subtitleKo: 'Day 1 원도심·영도, Day 2 서면·온천천, Day 3 광안리·해운대, Day 4 기장 오시리아까지 부산의 4대 핵심 축을 여유롭게 거니는 최적 코스예요.',
    subtitleEn: 'Day 1 Downtown, Day 2 Seomyeon & Oncheon, Day 3 Gwangalli & Haeundae, Day 4 Gijang Osiria for complete relaxation.',
    category: '3NIGHTS',
    durationKo: '3박 4일',
    durationEn: '3 Nights 4 Days',
    tagKo: '3박 4일 힐링 🌿',
    tagEn: '3N4D Healing 🌿',
    difficultyKo: '보통',
    difficultyEn: 'Moderate',
    overallTipKo: '하루에 한 권역만 집중 탐방하므로 짐 이동이 적고 이동 동선이 수평적으로 깔끔하게 이어집니다. 부산 지하철 1, 2, 3호선 환승 체계를 고려해 동선을 설계했습니다.',
    overallTipEn: 'Focuses on one zone per day to minimize hotel changes and travel overhead. Engineered based on Busan Subway Lines 1, 2, and 3.',
    steps: [
      {
        time: 'Day 1 (원도심 & 영도)',
        titleKo: '부산역 → 감천문화마을 → 부평깡통시장/국제시장 → 영도 흰여울전망대 & 태종대 → 용두산공원 야경',
        titleEn: 'Busan Stn → Gamcheon → Markets → Yeongdo Huinnyeoul & Taejongdae → Yongdusan Nightscape',
        descKo: '첫날은 부산역을 시작으로 원도심의 문화와 역사, 맛있는 미식 시장, 영도의 탁 트인 해안 절벽과 밤바다 야경을 하루 만에 알차게 둘러봅니다.',
        descEn: 'Kickstart your trip with Busan Station, explore historic markets, admire Yeongdo ocean cliffs, and finish with Yongdusan night views.',
        icon: 'Map',
        stationInfoKo: '지하철 1호선 부산역 / 남포역 / 자갈치역 중심',
        stationInfoEn: 'Centering Line 1 Busan Stn, Nampo, Jagalchi.'
      },
      {
        time: 'Day 2 (서면 & 동래/온천천)',
        titleKo: "서면 젊음의거리 → 전포카페거리 → 동래 온천천 수변공원 벚꽃/유채꽃 산책 → 망미골목 F1963",
        titleEn: "Seomyeon → Jeonpo Cafe Street → Oncheoncheon Stream Walk → Mangmi Alley F1963",
        descKo: "둘째 날은 부산 도심의 에너지와 카페 문화, 맑은 하천 산책로와 복합문화공간 F1963에서 예술적 감성을 경험합니다.",
        descEn: "On Day 2, experience urban energy, trendy cafe culture, serene stream walks, and the artistic vibes at F1963 cultural center.",
        icon: "Coffee",
        stationInfoKo: "지하철 1·2호선 서면역, 1호선 동래역/온천장역, 3호선 망미역 연계",
        stationInfoEn: "Connected via Line 1 & 2 Seomyeon Stn, Line 1 Dongnae, Line 3 Mangmi Stn."
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
        descKo: '기암괴석과 푸른 바다가 맞닿은 관음 성지 사찰입니다. 험난한 108 돌계단을 전면 우회해, 매표소 뒷길의 평평하고 넓은 지상의 우회 단층 통로를 공략하면 파도 절벽을 쾌적하고 편하게 바라봅니다.',
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
      // Day 3
      {
        time: 'Day 3',
        titleKo: '해운대 해변열차 & 송정해변 산책',
        titleEn: 'Haeundae Beach Train & Songjeong Beach Walk',
        descKo: '해운대 미포에서 송정까지 탁 트인 동해 바다 라인을 따라 달리는 관광 열차입니다. 휠체어와 유모차가 통째로 승차 가능한 전용 승강장과 경사로가 갖추어져 있어 시원한 바람을 맞으며 연안 절경을 감상할 수 있습니다.',
        descEn: 'A scenic coastal train from Mipo to Songjeong with spacious wheelchair lift boarding.',
        icon: 'Train'
      },
      {
        time: 'Day 3',
        titleKo: '광안리 해수욕장 & 광안대교 수평선 테라스',
        titleEn: 'Gwangalli Beach & Gwangan Bridge View',
        descKo: '다이아몬드릿지 광안대교가 선명하게 조망되는 부산 대표 해변 산책로입니다. 백사장 뒤편으로 끝없이 이어진 단차 없는 야외 테라스 보도를 따라 여유롭게 바닷바람을 쐬기 좋습니다.',
        descEn: 'Flat seaside promenade offering grand panoramic views of Gwangan Diamond Bridge.',
        icon: 'Walk'
      },
      {
        time: 'Day 3',
        titleKo: '광안리 드론라이트쇼 (주말 야경)',
        titleEn: 'Gwangalli Drone Light Show',
        descKo: '매주 토요일 밤 광안리 밤하늘을 수놓는 환상적인 웅장한 드론 라이트쇼입니다. 턱 없는 평탄 보도를 가볍게 누비며 안전하게 수려한 디지털 밤하늘을 만끽해 보세요.',
        descEn: 'A breathtaking night-sky drone choreography held every Saturday. Sit on designated stroller-safe wide viewing spots safely.',
        icon: 'Sunset'
      },

      // Day 4
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '솔솥',
        titleEn: 'Solsot (Seomyeon)',
        descKo: '📍 주소: 부산 부산진구 동천로95번길 15 (전포동 687-14)',
        descEn: '📍 Address: 15, Dongcheon-ro 95beon-gil, Busanjin-gu, Busan',
        icon: 'Food'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '기장손칼국수',
        titleEn: 'Gijang Handmade Noodle',
        descKo: '📍 주소: 부산 부산진구 서면로 56 (부전동 256-6)',
        descEn: '📍 Address: 56, Seomyeon-ro, Busanjin-gu, Busan',
        icon: 'Food'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '고베규카츠',
        titleEn: 'Kobe Gyukatsu',
        descKo: '📍 주소: 부산 부산진구 중앙대로680번가길 29 (부전동 168-382)',
        descEn: '📍 Address: 29, Jungang-daero 680beongagil, Busanjin-gu, Busan',
        icon: 'Food'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '춘하추동밀면 서면본점',
        titleEn: 'Chunhachudong Milmyeon (Seomyeon)',
        descKo: '📍 주소: 부산 부산진구 서면문화로 48-1 (부전동 404-3)',
        descEn: '📍 Address: 48-1, Seomyeonmunhwa-ro, Busanjin-gu, Busan',
        icon: 'Food'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '이재모피자',
        titleEn: 'Lee Jae Mo Pizza (Seomyeon)',
        descKo: '📍 주소: 부산 부산진구 전포대로199번길 12 (전포동 683-8)',
        descEn: '📍 Address: 12, Jeonpo-daero 199beon-gil, Busanjin-gu, Busan',
        icon: 'Food'
      },

      // [브런치]
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'brunch',
        time: '브런치',
        titleKo: '롱드라이버스',
        titleEn: 'Long Drivers',
        descKo: '📍 주소: 부산 부산진구 전포대로176번길 19 1층 (전포동 340-28)',
        descEn: '📍 Address: 1F, 19, Jeonpo-daero 176beon-gil, Busanjin-gu, Busan',
        icon: 'Food'
      },

      // [카페]
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '히떼 로스터리',
        titleEn: 'Hytte Roastery',
        descKo: '📍 주소: 부산 부산진구 전포대로223번길 14 2층 (전포동 664-6)',
        descEn: '📍 Address: 2F, 14, Jeonpo-daero 223beon-gil, Busanjin-gu, Busan',
        icon: 'Coffee'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '먼스커피바',
        titleEn: 'Month Coffee Bar',
        descKo: '📍 주소: 부산 부산진구 전포대로255번길 43 (전포동 309-32)',
        descEn: '📍 Address: 43, Jeonpo-daero 255beon-gil, Busanjin-gu, Busan',
        icon: 'Coffee'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '나이브브류어스',
        titleEn: 'Naive Brewers',
        descKo: '📍 주소: 부산 부산진구 전포대로144 1층 (전포동 355-3)',
        descEn: '📍 Address: 1F, 144, Jeonpo-daero, Busanjin-gu, Busan',
        icon: 'Coffee'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '스트럿커피',
        titleEn: 'Strut Coffee',
        descKo: '주소: 부산 부산진구 전포대로 186 1층',
        descEn: 'Address: 1F, 186 Jeonpo-daero, Busanjin-gu, Busan',
        icon: 'Coffee',
        stationInfoKo: '부산 부산진구 전포대로 186 1층',
        stationInfoEn: '186 Jeonpo-daero, Busanjin-gu, Busan'
      },
      // Day 4�
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
        descKo: '실내 전체가 편리한 평면 보도로 구성된 세계 최대 백화점과 수영 강변 가로수길의 힐링입니다. 이어서 높은 고층 빌딩 숲과 바다를 매끈한 광안대교 수평 실루엣 뒤로 마주하는 마린시티 영화의 거리 목재 전망대를 가뿐하게 산책해보세요.',
        descEn: 'Explore the world\'s largest department store, and stroll through flat Cinema Street in Marine City facing high-rise wonders.',
        icon: 'Food',
        stationInfoKo: '센텀시티 지하 연결로를 통해 개찰구 무단계 진입 지원',
        stationInfoEn: 'Centum City subways support direct level access to elevators.'
      }
    ]
  },
  {
    id: 'itinerary-gourmet',
    titleKo: '현지인 침샘 폭발! 부산에 오면 반드시 먹어야 할 원조 로컬 미식 가이드',
    titleEn: 'Local Foodie Feast: Busan Authentic Gourmet Guide',
    subtitleKo: '제가 직접 가서 맛본 부산 현지인 인정 맛집들이에요. 개인적인 의견이라 모든 분께 완벽히 만족스럽지는 않을 수 있지만 참고하셔서 즐거운 식도락 여행 되세요!',
    subtitleEn: 'Busan local-approved food spots I personally visited and tested. Personal preferences may vary, but hope you enjoy your delicious journey!',
    category: 'GOURMET',
    durationKo: '미식 카테고리별 가이드',
    durationEn: 'Categorized Gourmet Guide',
    tagKo: '식도락 투어 🍕',
    tagEn: 'Foodie Gourmet 🍕',
    difficultyKo: '쉬움',
    difficultyEn: 'Easy',
    overallTipKo: '부산 구석구석 직접 발품 팔아 맛본 맛집들을 [해운대·기장 / 광안리·센텀 / 서면·전포 / 남포·영도 / 그 외 지역] 5개 주요 권역별로 정리했습니다. (개인적인 추천이니 가볍게 참고해 주세요!)',
    overallTipEn: 'Personally tested Busan food spots divided into 5 main regions. (Note: These are subjective recommendations!)',
    steps: [
      // --- 1. 해운대 · 기장 ---
      // [음식점]
      {
        regionId: 'haeundae_gijang',
        regionNameKo: '해운대 · 기장',
        regionNameEn: 'Haeundae & Gijang',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '국보미역본점',
        titleEn: 'Gukbo Miyeok Main Store',
        descKo: '부산 기장군 기장읍 공수해안길 57',
        descEn: '57 Gongsuhaean-gil, Gijang-eup, Gijang-gun, Busan',
        icon: 'Food',
        stationInfoKo: '부산 기장군 기장읍 공수해안길 57 (송정역/오시리아역 인근)',
        stationInfoEn: '57 Gongsuhaean-gil, Gijang-eup, Gijang-gun, Busan'
      },
      {
        regionId: 'haeundae_gijang',
        regionNameKo: '해운대 · 기장',
        regionNameEn: 'Haeundae & Gijang',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '스카이99 그릴앤파스타',
        titleEn: 'Sky99 Grill & Pasta',
        descKo: '부산 해운대구 달맞이길62번길 137 99층',
        descEn: '99F, 137 Dalmaji-gil 62beon-gil, Haeundae-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 해운대구 달맞이길62번길 137 (해운대 엘시티 99층)',
        stationInfoEn: '99F, 137 Dalmaji-gil 62beon-gil, Haeundae-gu, Busan'
      },
      // [카페]
      {
        regionId: 'haeundae_gijang',
        regionNameKo: '해운대 · 기장',
        regionNameEn: 'Haeundae & Gijang',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '카페공지',
        titleEn: 'Cafe Gongji',
        descKo: '부산 기장군 기장읍 기장대로 382-17',
        descEn: '382-17 Gijang-daero, Gijang-eup, Gijang-gun, Busan',
        icon: 'Coffee',
        stationInfoKo: '부산 기장군 기장읍 기장대로 382-17 (기장역 인근)',
        stationInfoEn: '382-17 Gijang-daero, Gijang-eup, Gijang-gun, Busan'
      },

      // --- 2. 광안리 · 센텀 ---
      // [음식점]
      {
        regionId: 'gwangalli_centum',
        regionNameKo: '광안리 · 센텀',
        regionNameEn: 'Gwangalli & Centum',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '돌닭 광안점',
        titleEn: 'Doldak Gwangan',
        descKo: '부산 수영구 광안해변로 225 1층',
        descEn: '225 Gwanganhaebyeon-ro, Suyeong-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 수영구 광안해변로 225 1층 (금련산역 1번 출구)',
        stationInfoEn: '225 Gwanganhaebyeon-ro, Suyeong-gu, Busan'
      },
      {
        regionId: 'gwangalli_centum',
        regionNameKo: '광안리 · 센텀',
        regionNameEn: 'Gwangalli & Centum',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '동방명주',
        titleEn: 'Dongbang Myeongju',
        descKo: '부산 수영구 광안해변로 237',
        descEn: '237 Gwanganhaebyeon-ro, Suyeong-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 수영구 광안해변로 237 (광안역 3번 출구)',
        stationInfoEn: '237 Gwanganhaebyeon-ro, Suyeong-gu, Busan'
      },
      {
        regionId: 'gwangalli_centum',
        regionNameKo: '광안리 · 센텀',
        regionNameEn: 'Gwangalli & Centum',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '엘까르니따스 광안리점',
        titleEn: 'El Carnitas Gwangalli',
        descKo: '부산 수영구 광안해변로 191 1층',
        descEn: '1F, 191 Gwanganhaebyeon-ro, Suyeong-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 수영구 광안해변로 191 1층 (금련산역 1번 출구)',
        stationInfoEn: '1F, 191 Gwanganhaebyeon-ro, Suyeong-gu, Busan'
      },
      {
        regionId: 'gwangalli_centum',
        regionNameKo: '광안리 · 센텀',
        regionNameEn: 'Gwangalli & Centum',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '알로이삥삥',
        titleEn: 'Aroy BbingBbing',
        descKo: '부산 수영구 민락수변로 125 1, 2층',
        descEn: '1-2F, 125 Millaksubyeon-ro, Suyeong-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 수영구 민락수변로 125 (민락수변공원 인근)',
        stationInfoEn: '125 Millaksubyeon-ro, Suyeong-gu, Busan'
      },
      {
        regionId: 'gwangalli_centum',
        regionNameKo: '광안리 · 센텀',
        regionNameEn: 'Gwangalli & Centum',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '할매재첩국부산본점',
        titleEn: 'Halmae Jaecheopguk Busan Main Store',
        descKo: '부산 수영구 광남로120번길 8',
        descEn: '8 Gwangnam-ro 120beon-gil, Suyeong-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 수영구 광남로120번길 8 (금련산역 1번 출구)',
        stationInfoEn: '8 Gwangnam-ro 120beon-gil, Suyeong-gu, Busan'
      },
      // [브런치]
      {
        regionId: 'gwangalli_centum',
        regionNameKo: '광안리 · 센텀',
        regionNameEn: 'Gwangalli & Centum',
        foodCategory: 'brunch',
        time: '브런치',
        titleKo: '워킹홀리데이',
        titleEn: 'Working Holiday',
        descKo: '부산 수영구 광안해변로 235 2층',
        descEn: '2F, 235 Gwanganhaebyeon-ro, Suyeong-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 수영구 광안해변로 235 2층 (광안역 3번 출구)',
        stationInfoEn: '2F, 235 Gwanganhaebyeon-ro, Suyeong-gu, Busan'
      },
      // [카페]
      {
        regionId: 'gwangalli_centum',
        regionNameKo: '광안리 · 센텀',
        regionNameEn: 'Gwangalli & Centum',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '까사부사노 테라스',
        titleEn: 'Casa Busano Terrace',
        descKo: '부산 수영구 광안해변로 179 1층',
        descEn: '1F, 179 Gwanganhaebyeon-ro, Suyeong-gu, Busan',
        icon: 'Coffee',
        stationInfoKo: '부산 수영구 광안해변로 179 1층 (금련산역 1번 출구)',
        stationInfoEn: '1F, 179 Gwanganhaebyeon-ro, Suyeong-gu, Busan'
      },
      {
        regionId: 'gwangalli_centum',
        regionNameKo: '광안리 · 센텀',
        regionNameEn: 'Gwangalli & Centum',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '카페인차저 광안리 본점',
        titleEn: 'Caffeine Charger Gwangalli',
        descKo: '부산 수영구 광안해변로 237 2층',
        descEn: '2F, 237 Gwanganhaebyeon-ro, Suyeong-gu, Busan',
        icon: 'Coffee',
        stationInfoKo: '부산 수영구 광안해변로 237 2층 (광안역 3번 출구)',
        stationInfoEn: '2F, 237 Gwanganhaebyeon-ro, Suyeong-gu, Busan'
      },
      {
        regionId: 'gwangalli_centum',
        regionNameKo: '광안리 · 센텀',
        regionNameEn: 'Gwangalli & Centum',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '커피프론트 센텀시티',
        titleEn: 'Coffee Front Centum City',
        descKo: '부산 해운대구 센텀2로 25 1층',
        descEn: '1F, 25 Centum 2-ro, Haeundae-gu, Busan',
        icon: 'Coffee',
        stationInfoKo: '부산 해운대구 센텀2로 25 1층 (센텀시티역 9번 출구)',
        stationInfoEn: '1F, 25 Centum 2-ro, Haeundae-gu, Busan'
      },

      // --- 3. 서면 · 전포 ---
      // [음식점]
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '양산도 본점',
        titleEn: 'Yangsando Main Branch',
        descKo: '부산 부산진구 골드테마길 61 1층',
        descEn: '61 Goldthema-gil, Busanjin-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 부산진구 골드테마길 61 1층 (서면역 1번 출구)',
        stationInfoEn: '61 Goldthema-gil, Busanjin-gu, Busan'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '솔솥 서면점',
        titleEn: 'Solsot Seomyeon',
        descKo: '부산 부산진구 동천로 58 1층',
        descEn: '58 Dongcheon-ro, Busanjin-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 부산진구 동천로 58 1층 (전포역 5번 출구)',
        stationInfoEn: '58 Dongcheon-ro, Busanjin-gu, Busan'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '기장손칼국수',
        titleEn: 'Gijang Handmade Kalguksu',
        descKo: '부산 부산진구 서면로 56',
        descEn: '56 Seomyeon-ro, Busanjin-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 부산진구 서면로 56 (서면역 7번 출구)',
        stationInfoEn: '56 Seomyeon-ro, Busanjin-gu, Busan'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '고베규카츠 서면점',
        titleEn: 'Kobe Gyukatsu Seomyeon',
        descKo: '부산 부산진구 중앙대로680번가길 29 2층',
        descEn: '2F, 29 Jungang-daero 680beonga-gil, Busanjin-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 부산진구 중앙대로680번가길 29 2층 (서면역 2번 출구)',
        stationInfoEn: '2F, 29 Jungang-daero 680beonga-gil, Busanjin-gu, Busan'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '춘하추동밀면 서면본점',
        titleEn: 'Chunhachudong Milmyeon Seomyeon',
        descKo: '부산 부산진구 서면문화로 48-1',
        descEn: '48-1 Seomyeonmunhwa-ro, Busanjin-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 부산진구 서면문화로 48-1 (서면역 9번 출구)',
        stationInfoEn: '48-1 Seomyeonmunhwa-ro, Busanjin-gu, Busan'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '이재모피자 서면점',
        titleEn: 'Lee Jae Mo Pizza Seomyeon',
        descKo: '부산 부산진구 전포대로209번길 21',
        descEn: '21 Jeonpo-daero 209beongil, Busanjin-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 부산진구 전포대로209번길 21 (전포역 7번 출구)',
        stationInfoEn: '21 Jeonpo-daero 209beongil, Busanjin-gu, Busan'
      },
      // [브런치]
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'brunch',
        time: '브런치',
        titleKo: '롱드라이버스',
        titleEn: 'Long Drivers',
        descKo: '부산 부산진구 서전로58번길 40 1층',
        descEn: '1F, 40 Seojeon-ro 58beongil, Busanjin-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 부산진구 서전로58번길 40 1층 (전포역 8번 출구)',
        stationInfoEn: '1F, 40 Seojeon-ro 58beongil, Busanjin-gu, Busan'
      },
      // [카페]
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '히떼 로스터리',
        titleEn: 'Hytte Roastery',
        descKo: '부산 부산진구 전포대로 223 2층',
        descEn: '2F, 223 Jeonpo-daero, Busanjin-gu, Busan',
        icon: 'Coffee',
        stationInfoKo: '부산 부산진구 전포대로 223 2층 (전포역 7번 출구)',
        stationInfoEn: '2F, 223 Jeonpo-daero, Busanjin-gu, Busan'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '먼스커피바',
        titleEn: 'Month Coffee Bar',
        descKo: '부산 부산진구 전포대로176번길 12.5 1층',
        descEn: '1F, 12.5 Jeonpo-daero 176beongil, Busanjin-gu, Busan',
        icon: 'Coffee',
        stationInfoKo: '부산 부산진구 전포대로176번길 12.5 1층 (전포역 4번 출구)',
        stationInfoEn: '1F, 12.5 Jeonpo-daero 176beongil, Busanjin-gu, Busan'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '나이브브류어스',
        titleEn: 'Naive Brewers',
        descKo: '부산 부산진구 전포대로246번길 15 1층',
        descEn: '1F, 15 Jeonpo-daero 246beongil, Busanjin-gu, Busan',
        icon: 'Coffee',
        stationInfoKo: '부산 부산진구 전포대로246번길 15 1층 (전포역 8번 출구)',
        stationInfoEn: '1F, 15 Jeonpo-daero 246beongil, Busanjin-gu, Busan'
      },
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '스트럿커피',
        titleEn: 'Strut Coffee',
        descKo: '부산 부산진구 전포대로 186 1층',
        descEn: '1F, 186 Jeonpo-daero, Busanjin-gu, Busan',
        icon: 'Coffee',
        stationInfoKo: '부산 부산진구 전포대로 186 1층 (전포역 4번 출구)',
        stationInfoEn: '1F, 186 Jeonpo-daero, Busanjin-gu, Busan'
      },
      // [로드푸드]
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        foodCategory: 'streetfood',
        time: '로드푸드',
        titleKo: '종로복떡집',
        titleEn: 'Jongno Bok Tteokjip',
        descKo: '부산 부산진구 신천대로62번길 42 1층',
        descEn: '1F, 42 Sincheon-daero 62beon-gil, Busanjin-gu, Busan',
        icon: 'Walk',
        stationInfoKo: '부산 부산진구 신천대로62번길 42 (서면역 7번 출구)',
        stationInfoEn: '42 Sincheon-daero 62beon-gil, Busanjin-gu, Busan'
      },

      // --- 4. 남포동 · 영도 ---
      // [음식점]
      {
        regionId: 'nampo_yeongdo',
        regionNameKo: '남포동 · 영도',
        regionNameEn: 'Nampo & Yeongdo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '홍소족발',
        titleEn: 'Hongso Jokbal',
        descKo: '부산 중구 광복로 21-1',
        descEn: '21-1 Gwangbok-ro, Jung-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 중구 광복로 21-1 (자갈치역 7번 출구)',
        stationInfoEn: '21-1 Gwangbok-ro, Jung-gu, Busan'
      },
      {
        regionId: 'nampo_yeongdo',
        regionNameKo: '남포동 · 영도',
        regionNameEn: 'Nampo & Yeongdo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '이재모피자 본점',
        titleEn: 'Lee Jae Mo Pizza Main Store',
        descKo: '부산 중구 광복중앙로 31',
        descEn: '31 Gwangbokjungang-ro, Jung-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 중구 광복중앙로 31 (중앙역 5번 출구)',
        stationInfoEn: '31 Gwangbokjungang-ro, Jung-gu, Busan'
      },
      {
        regionId: 'nampo_yeongdo',
        regionNameKo: '남포동 · 영도',
        regionNameEn: 'Nampo & Yeongdo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '자갈마당',
        titleEn: 'Jagalmadang',
        descKo: '부산 영도구 감지해변길 81',
        descEn: '81 Gamjihaebyeon-gil, Yeongdo-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 영도구 감지해변길 81 (태종대 감지해변)',
        stationInfoEn: '81 Gamjihaebyeon-gil, Yeongdo-gu, Busan'
      },
      {
        regionId: 'nampo_yeongdo',
        regionNameKo: '남포동 · 영도',
        regionNameEn: 'Nampo & Yeongdo',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '영도해녀촌',
        titleEn: 'Yeongdo Haenyeo Village',
        descKo: '부산 영도구 중리남로 2-35',
        descEn: '2-35 Jungrinam-ro, Yeongdo-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 영도구 중리남로 2-35 (영도 중리해변)',
        stationInfoEn: '2-35 Jungrinam-ro, Yeongdo-gu, Busan'
      },
      // [브런치]
      {
        regionId: 'nampo_yeongdo',
        regionNameKo: '남포동 · 영도',
        regionNameEn: 'Nampo & Yeongdo',
        foodCategory: 'brunch',
        time: '브런치',
        titleKo: '몽벨쉘터 영도점',
        titleEn: 'Montbell Shelter Yeongdo',
        descKo: '부산 영도구 해양로 247',
        descEn: '247 Haeyang-ro, Yeongdo-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 영도구 해양로 247 1층',
        stationInfoEn: '1F, 247 Haeyang-ro, Yeongdo-gu, Busan'
      },
      // [카페]
      {
        regionId: 'nampo_yeongdo',
        regionNameKo: '남포동 · 영도',
        regionNameEn: 'Nampo & Yeongdo',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '레귤러하우스',
        titleEn: 'Regular House',
        descKo: '부산 중구 중구로44번길 22 2층',
        descEn: '2F, 22 Jungguro 44beongil, Jung-gu, Busan',
        icon: 'Coffee',
        stationInfoKo: '부산 중구 중구로44번길 22 2층 (자갈치역 7번 출구)',
        stationInfoEn: '2F, 22 Jungguro 44beongil, Jung-gu, Busan'
      },
      {
        regionId: 'nampo_yeongdo',
        regionNameKo: '남포동 · 영도',
        regionNameEn: 'Nampo & Yeongdo',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '광복동12시',
        titleEn: 'Gwangbokdong 12 O\'clock',
        descKo: '부산 중구 광복로 49-1',
        descEn: '49-1 Gwangbok-ro, Jung-gu, Busan',
        icon: 'Coffee',
        stationInfoKo: '부산 중구 광복로 49-1 (남포역 1번 출구)',
        stationInfoEn: '49-1 Gwangbok-ro, Jung-gu, Busan'
      },
      {
        regionId: 'nampo_yeongdo',
        regionNameKo: '남포동 · 영도',
        regionNameEn: 'Nampo & Yeongdo',
        foodCategory: 'cafe',
        time: '카페',
        titleKo: '미피카페 부산',
        titleEn: 'Miffy Cafe Busan',
        descKo: '부산 영도구 절영로 202 2층',
        descEn: '2F, 202 Jeolyeong-ro, Yeongdo-gu, Busan',
        icon: 'Coffee',
        stationInfoKo: '부산 영도구 절영로 202 2층 (흰여울문화마을)',
        stationInfoEn: '2F, 202 Jeolyeong-ro, Yeongdo-gu, Busan'
      },
      // [로드푸드]
      {
        regionId: 'nampo_yeongdo',
        regionNameKo: '남포동 · 영도',
        regionNameEn: 'Nampo & Yeongdo',
        foodCategory: 'streetfood',
        time: '로드푸드',
        titleKo: '이가네떡볶이',
        titleEn: 'Igane Tteokbokki',
        descKo: '부산 중구 부평1길 48',
        descEn: '48 Bupyeong 1-gil, Jung-gu, Busan',
        icon: 'Walk',
        stationInfoKo: '부산 중구 부평1길 48 (부평깡통시장 내, 자갈치역 3번 출구)',
        stationInfoEn: '48 Bupyeong 1-gil, Jung-gu, Busan'
      },
      {
        regionId: 'nampo_yeongdo',
        regionNameKo: '남포동 · 영도',
        regionNameEn: 'Nampo & Yeongdo',
        foodCategory: 'streetfood',
        time: '로드푸드',
        titleKo: 'BIFF광장 씨앗호떡',
        titleEn: 'BIFF Square Seed Hotteok',
        descKo: '부산 중구 구덕로 58-1 BIFF광장',
        descEn: '58-1 Gudeok-ro, Jung-gu, Busan (BIFF Square)',
        icon: 'Walk',
        stationInfoKo: '부산 중구 구덕로 58-1 BIFF광장 (자갈치역 7번 출구)',
        stationInfoEn: '58-1 Gudeok-ro, Jung-gu, Busan'
      },

      // --- 5. 그 외 지역 ---
      // [음식점]
      {
        regionId: 'others',
        regionNameKo: '그 외 지역',
        regionNameEn: 'Other Regions',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '이원화구포국시',
        titleEn: 'Iwonhwa Gupo Guksi',
        descKo: '부산 북구 구포만세길 100',
        descEn: '100 Gupomanse-gil, Buk-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 북구 구포만세길 100 (구포역 3번 출구)',
        stationInfoEn: '100 Gupomanse-gil, Buk-gu, Busan'
      },
      {
        regionId: 'others',
        regionNameKo: '그 외 지역',
        regionNameEn: 'Other Regions',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '동래할매파전',
        titleEn: 'Dongnae Halmae Pajeon',
        descKo: '부산 동래구 명륜로94번길 43-10',
        descEn: '43-10 Myeongnyun-ro 94beon-gil, Dongnae-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 동래구 명륜로94번길 43-10 (동래역 2번 출구)',
        stationInfoEn: '43-10 Myeongnyun-ro 94beon-gil, Dongnae-gu, Busan'
      },
      {
        regionId: 'others',
        regionNameKo: '그 외 지역',
        regionNameEn: 'Other Regions',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '국제밀면 본점',
        titleEn: 'Kukje Milmyeon Main Store',
        descKo: '부산 연제구 중앙대로1235번길 23',
        descEn: '23 Jungang-daero 1235beon-gil, Yeonje-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 연제구 중앙대로1235번길 23 (교대역 5번 출구)',
        stationInfoEn: '23 Jungang-daero 1235beon-gil, Yeonje-gu, Busan'
      },
      {
        regionId: 'others',
        regionNameKo: '그 외 지역',
        regionNameEn: 'Other Regions',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '할매재첩국집',
        titleEn: 'Halmae Jaecheopguk',
        descKo: '부산 수영구 광남로120번길 8',
        descEn: '8 Gwangnam-ro 120beon-gil, Suyeong-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 수영구 광남로120번길 8 (금련산역 1번 출구)',
        stationInfoEn: '8 Gwangnam-ro 120beon-gil, Suyeong-gu, Busan'
      },
      {
        regionId: 'others',
        regionNameKo: '그 외 지역',
        regionNameEn: 'Other Regions',
        foodCategory: 'restaurant',
        time: '음식점',
        titleKo: '다대포버들집바지락해물칼국수',
        titleEn: 'Dadaepo Beodeuljib Kalguksu',
        descKo: '부산 사하구 다대동 1552-20',
        descEn: '1552-20 Dadae-dong, Saha-gu, Busan',
        icon: 'Food',
        stationInfoKo: '부산 사하구 다대동 1552-20 (다대포해수욕장역 1번 출구)',
        stationInfoEn: '1552-20 Dadae-dong, Saha-gu, Busan'
      },
      // [로드푸드]
      {
        regionId: 'others',
        regionNameKo: '그 외 지역',
        regionNameEn: 'Other Regions',
        foodCategory: 'streetfood',
        time: '로드푸드',
        titleKo: '제일떡방앗간',
        titleEn: 'Jeil Tteok Bangatgan',
        descKo: '부산 북구 구포시장길 42',
        descEn: '42 Guposijang-gil, Buk-gu, Busan',
        icon: 'Walk',
        stationInfoKo: '부산 북구 구포시장길 42 (구포시장 내, 덕천역 3번 출구)',
        stationInfoEn: '42 Guposijang-gil, Buk-gu, Busan'
      }
    ]
  },
  {
    id: 'itinerary-experience',
    titleKo: '오감만족 부산! 체험 & 박물관 다채로운 문화 탐방 가이드',
    titleEn: 'Hands-on & Culture: Busan Museums & Interactive Experience Guide',
    subtitleKo: '국립해양박물관, 부산시립미술관, F1963, 국립부산과학관 등 권역별 주요 박물관과 미술관, 체험형 문화공간을 무장애 편의 동선으로 즐기는 가이드예요.',
    subtitleEn: 'Explore National Maritime Museum, Busan Museum of Art, F1963, and Busan National Science Museum with accessible, step-free routes categorized by region.',
    category: 'EXPERIENCE',
    durationKo: '체험 & 박물관 권역별 가이드',
    durationEn: 'Categorized Museum & Experience Guide',
    tagKo: '체험 & 박물관 🏛️',
    tagEn: 'Museum & Experience 🏛️',
    difficultyKo: '쉬움',
    difficultyEn: 'Easy',
    overallTipKo: '부산의 주요 박물관과 미술관, 복합문화공간을 [해운대·기장 / 광안리·센텀 / 서면·전포 / 남포·영도 / 그 외 지역] 5개 권역별로 한눈에 보실 수 있도록 정리했습니다. 모든 시설은 휠체어/유모차가 들어갈 수 있는 엘리베이터, 무장애 경사로, 넓은 화장실이 완비되어 날씨와 상관없이 편리하게 둘러보실 수 있습니다.',
    overallTipEn: 'Busan major museums and cultural centers are categorized into 5 main regions. All listed venues offer full barrier-free access with elevators and wide flat ramps, allowing all visitors to comfortably enjoy rich exhibitions indoors regardless of weather.',
    steps: [
      // --- 1. 해운대 · 기장 ---
      {
        regionId: 'haeundae_gijang',
        regionNameKo: '해운대 · 기장',
        regionNameEn: 'Haeundae & Gijang',
        categoryType: 'SCIENCE_ECO',
        time: '체험박물관',
        titleKo: '국립부산과학관',
        titleEn: 'National Busan Science Museum',
        descKo: '동남권 최대 규모의 체험형 과학 박물관입니다. 자동차, 항공우주, 선박 해양 등 직접 몸으로 눌러보고 체험하는 인터랙티브 전시장이 평지 단층 및 대형 엘리베이터 동선으로 확장되어 누구나 편리하게 즐깁니다.',
        descEn: 'A massive hands-on science complex featuring aerospace, marine science, and interactive physics exhibits with wide step-free halls.',
        icon: 'Camera',
        stationInfoKo: '부산 기장군 기장읍 동부산관광6로 59 (동해선 오시리아역 1번 출구에서 185번 버스 탑승 5분)',
        stationInfoEn: '59 Dongbusangwangwang 6-ro, Gijang-eup, Gijang-gun, Busan'
      },

      // --- 2. 광안리 · 센텀 ---
      {
        regionId: 'gwangalli_centum',
        regionNameKo: '광안리 · 센텀',
        regionNameEn: 'Gwangalli & Centum',
        categoryType: 'ART',
        time: '미디어아트',
        titleKo: '뮤지엄원 (Museum 1)',
        titleEn: 'Museum 1 Media Art Gallery',
        descKo: '센텀시티에 위치한 약 8,000만 개의 LED가 만들어내는 초대형 미디어아트 전문 미술관입니다. 단차 없는 통로와 평지 동선으로 화려한 빛의 미학을 체험할 수 있습니다.',
        descEn: 'A digital art museum featuring massive LED displays and completely step-free exhibition walkways in Centum City.',
        icon: 'Camera',
        stationInfoKo: '부산 해운대구 센텀산단로 99 (2호선 센텀시티역 6번 출구 도보 5분)',
        stationInfoEn: '99 Centumsandan-ro, Haeundae-gu, Busan'
      },
      {
        regionId: 'gwangalli_centum',
        regionNameKo: '광안리 · 센텀',
        regionNameEn: 'Gwangalli & Centum',
        categoryType: 'CULTURE',
        time: '영화도서관',
        titleKo: '영화의전당 라이브러리',
        titleEn: 'Busan Cinema Center Library',
        descKo: '영화의전당 비프힐 4층에 위치한 국내 대표 영화 전문 도서관입니다. 희귀 영화 자료, LP, 영상 매체를 쾌적한 엘리베이터 동선과 라운지 좌석에서 한적하게 감상할 수 있습니다.',
        descEn: 'A specialized cinema library inside Busan Cinema Center BIFF Hill 4F, featuring movie archives, rare videos, and accessible lounge seating.',
        icon: 'Map',
        stationInfoKo: '부산 해운대구 수영강변대로 120 비프힐 4층 (2호선 센텀시티역 6번 출구 도보 7분)',
        stationInfoEn: '4F BIFF Hill, 120 Suyeonggangbyeon-daero, Haeundae-gu, Busan'
      },
      {
        regionId: 'gwangalli_centum',
        regionNameKo: '광안리 · 센텀',
        regionNameEn: 'Gwangalli & Centum',
        categoryType: 'CULTURE',
        time: '복합문화',
        titleKo: 'F1963',
        titleEn: 'F1963 Cultural Center',
        descKo: '옛 와이어 공장을 리노베이션한 매력적인 복합문화공간입니다. 대형 예스24 서점, 국제갤러리 전시, 대나무 숲길 산책로가 평지 및 경사로 동선으로 이어져 휴식하기 좋습니다.',
        descEn: 'A transformed former wire factory complex housing galleries, large bookstores, bamboo gardens, and spacious cafes with step-free access.',
        icon: 'Map',
        stationInfoKo: '부산 수영구 구락로123번길 20 (3호선 망미역 2번 출구에서 버스/택시 이용 5분)',
        stationInfoEn: '20 Gurak-ro 123beon-gil, Suyeong-gu, Busan'
      },

      // --- 3. 서면 · 전포 ---
      {
        regionId: 'seomyeon_jeonpo',
        regionNameKo: '서면 · 전포',
        regionNameEn: 'Seomyeon & Jeonpo',
        categoryType: 'MUSEUM',
        time: '금융박물관',
        titleKo: '증권박물관 부산관',
        titleEn: 'Korea Securities Museum (Busan)',
        descKo: 'BIFC(부산국제금융센터) 내 위치한 금융·증권 전문 박물관입니다. 세계 및 한국 증권 발행의 역사와 금융 경제 체험을 엘리베이터 및 무장애 동선으로 안전하게 탐방할 수 있습니다.',
        descEn: 'Located inside BIFC, a specialized museum showcasing global and Korean securities history and financial economic exhibits with full elevator access.',
        icon: 'Map',
        stationInfoKo: '부산 남구 문현금융로 40 BIFC 2층 (2호선 국제금융센터·부산은행역 3번 출구 연결)',
        stationInfoEn: '2F BIFC, 40 Munhyeongeomyung-ro, Nam-gu, Busan (Directly connected to BIFC Station Exit 3)'
      },

      // --- 4. 남포동 · 영도 ---
      {
        regionId: 'nampo_yeongdo',
        regionNameKo: '남포동 · 영도',
        regionNameEn: 'Nampo & Yeongdo',
        categoryType: 'CULTURE',
        time: '영화체험관',
        titleKo: '부산영화체험박물관',
        titleEn: 'Busan Museum of Movies',
        descKo: '영화의 도시 부산에 위치한 국내 최초의 영화 전문 체험형 박물관입니다. 크로마키 합성, 성우 더빙, 영화 원리 체험 등 다채로운 실내 미디어 체험존과 무장애 이동 동선을 갖추고 있습니다.',
        descEn: 'Korea first movie-themed interactive museum featuring voice dubbing, chroma key synthesis, and cinema exhibits with ramp and elevator access.',
        icon: 'Camera',
        stationInfoKo: '부산 중구 대청로126번길 12 (1호선 중앙역 5번 출구 / 용두산공원 하단 도보 5분)',
        stationInfoEn: '12 Daecheong-ro 126beon-gil, Jung-gu, Busan'
      },
      {
        regionId: 'nampo_yeongdo',
        regionNameKo: '남포동 · 영도',
        regionNameEn: 'Nampo & Yeongdo',
        categoryType: 'ART',
        time: '미디어아트',
        titleKo: '아르떼뮤지엄 부산',
        titleEn: 'ARTE MUSEUM BUSAN',
        descKo: '영도 해안가에 위치한 세계 최대 규모의 몰입형 미디어아트 전시관입니다. 부산의 바다와 자연, 화려한 스펙터클 연출을 완만한 평지 실내 공간과 최신 편의시설로 경험할 수 있습니다.',
        descEn: 'A colossal immersive media art exhibition hall located in Yeongdo, featuring stunning nature-themed digital art on flat indoor floors.',
        icon: 'Camera',
        stationInfoKo: '부산 영도구 해양로 247 (1호선 남포역 6번 출구에서 186, 66번 버스 탑승)',
        stationInfoEn: '247 Haeyang-ro, Yeongdo-gu, Busan'
      },
      {
        regionId: 'nampo_yeongdo',
        regionNameKo: '남포동 · 영도',
        regionNameEn: 'Nampo & Yeongdo',
        categoryType: 'MUSEUM',
        time: '해양박물관',
        titleKo: '국립해양박물관',
        titleEn: 'National Maritime Museum',
        descKo: '아쿠아리움 원통 수조와 해양 전시관, 체험형 에듀케이션 공간을 갖춘 대한민국 대표 해양 박물관입니다. 건물 전체에 엘리베이터와 완만한 경사로가 완비되어 누구나 쾌적하게 관람할 수 있습니다.',
        descEn: 'A magnificent maritime museum featuring a cylindrical aquarium, interactive ocean exhibits, and smooth indoor ramps throughout.',
        icon: 'Camera',
        stationInfoKo: '부산 영도구 해양로301번길 45 (1호선 남포역 6번 출구 버스정류장에서 66번 저상버스 탑승)',
        stationInfoEn: '45 Haeyang-ro 301beon-gil, Yeongdo-gu, Busan'
      },

      // --- 5. 그 외 지역 ---
      {
        regionId: 'others',
        regionNameKo: '그 외 지역',
        regionNameEn: 'Other Regions',
        categoryType: 'SCIENCE_ECO',
        time: '어린이창의',
        titleKo: '부산광역시교육청 어린이창의교육관',
        titleEn: 'Busan Children Creative Education Museum',
        descKo: '초읍 어린이대공원 내 위치한 체험형 과학교육 및 창의 박물관입니다. 우주 탐구관, 로봇 체험관, 다채로운 창의 놀이 공간과 무장애 엘리베이터가 완비되어 아이와 함께 방문하기 최적입니다.',
        descEn: 'An interactive children science and creativity museum located inside Children Park with space, robotics, and accessible elevators.',
        icon: 'Camera',
        stationInfoKo: '부산 부산진구 새싹로 295 (어린이대공원 내, 1호선 서면역/부전역에서 81, 133, 54번 버스 탑승 후 어린이대공원 하차)',
        stationInfoEn: '295 Saessak-ro, Busanjin-gu, Busan'
      }
    ]
  }
];
