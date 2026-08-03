import React from 'react';
import { 
  Baby, 
  Accessibility, 
  Luggage, 
  Compass, 
  ShieldCheck, 
  MapPin, 
  Train, 
  ArrowRight, 
  AlertCircle,
  FileCheck,
  ChevronRight,
  Utensils,
  Building2,
  Shield,
  CheckCircle2,
  UserCheck,
  Calendar,
  ExternalLink,
  FileText,
  Lock,
  Info,
  Megaphone,
  AlertTriangle,
  Search,
  X
} from 'lucide-react';
import { VerificationBadge } from './VerificationBadge';
import { getTodayDateKR } from '../utils';

interface HomeOverviewSectionProps {
  language?: 'KR' | 'EN';
  onSelectStation: (stationId: string) => void;
  onNavigateToSearch?: (query?: string) => void;
  onNavigateToReport?: () => void;
  onNavigateToNearby?: () => void;
  onNavigateToItinerary?: (category?: 'GOURMET' | 'EXPERIENCE' | 'DAY') => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export function HomeOverviewSection({
  language = 'KR',
  onSelectStation,
  onNavigateToSearch,
  onNavigateToReport,
  onNavigateToNearby,
  onNavigateToItinerary,
  searchQuery = '',
  setSearchQuery
}: HomeOverviewSectionProps) {
  
  // Highlight major stations for the "Station Guides" card carousel / grid
  const featuredStations = [
    { id: 'seomyeon', name: '서면역', lines: [1, 2], desc: '1·2호선 환승 중심역, 승강기 직통 출구 및 와이드 개찰구 연계 가이드' },
    { id: 'busan-stn', name: '부산역', lines: [1], desc: 'KTX·SRT 연계 핵심역, 대형 캐리어 및 유모차 이동에 최적화된 동선' },
    { id: 'haeundae', name: '해운대역', lines: [2], desc: '구남로 및 해수욕장 방향 엘리베이터 출구 및 휠체어 단차 없는 경로' },
  ];

  // 3 Recommended Travel Courses directly linking to Gourmet, Experience & Museum, and Day Trip
  const recommendedCourses = [
    {
      id: 'GOURMET' as const,
      title: language === 'KR' ? '식도락 로컬 미식 코스' : 'Gourmet Local Food Course',
      tag: language === 'KR' ? '🍕 식도락 여행' : '🍕 Gourmet Travel',
      desc: language === 'KR'
        ? '원조 돼지국밥 노포부터 오션뷰 예쁜 카페, 씨앗호떡까지 입구가 평평하고 이동이 편리한 부산 미식 여행'
        : 'Savor traditional pork soup, ocean view cafes, and sweet pancakes with barrier-free access.',
      icon: <Utensils className="w-8 h-8 text-rose-600" />,
      tagBg: 'bg-rose-50',
      tagText: 'text-rose-700 border border-rose-200/60',
      buttonBg: 'bg-slate-900 hover:bg-rose-700'
    },
    {
      id: 'EXPERIENCE' as const,
      title: language === 'KR' ? '체험 & 박물관 문화 코스' : 'Experience & Museum Course',
      tag: language === 'KR' ? '🏛️ 체험&박물관' : '🏛️ Culture & Museum',
      desc: language === 'KR'
        ? '국립해양박물관부터 부산시립미술관, F1963 복합문화공간까지 온 가족이 날씨 상관없이 엘리베이터로 즐기는 문화 체험'
        : 'Explore national maritime museums, art galleries, and cultural centers with step-free elevators.',
      icon: <Building2 className="w-8 h-8 text-amber-600" />,
      tagBg: 'bg-amber-50',
      tagText: 'text-amber-800 border border-amber-200/60',
      buttonBg: 'bg-slate-900 hover:bg-amber-800'
    },
    {
      id: 'DAY' as const,
      title: language === 'KR' ? '원스톱 당일치기 힐링 코스' : 'One-Day Essential Trip',
      tag: language === 'KR' ? '🌿 당일치기' : '🌿 Day Trip',
      desc: language === 'KR'
        ? '부산역에서 출발해 원도심 감천문화마을·영도를 거쳐 광안리 야경까지 하루 만에 완벽하게 정복하는 알짜배기 코스'
        : 'Cover historic downtown spots, Yeongdo cliffs, and Gwangalli night views in a single efficient day.',
      icon: <Compass className="w-8 h-8 text-emerald-600" />,
      tagBg: 'bg-emerald-50',
      tagText: 'text-emerald-800 border border-emerald-200/60',
      buttonBg: 'bg-slate-900 hover:bg-emerald-800'
    },
  ];

  return (
    <div className="space-y-12 text-left font-sans text-slate-800" id="home-overview-section">
      
      {/* ==========================================
          1. HERO HEADER BANNER (Reference Image Style Top Banner)
         ========================================== */}
      <section className="relative rounded-3xl overflow-hidden bg-[#0a192f] text-white p-6 sm:p-12 md:p-14 shadow-xl border border-slate-800">
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none hidden md:block bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent">
          <Train className="w-full h-full p-12 text-blue-200" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-mono font-bold tracking-wider uppercase">
            <span>STEPLESS BUSAN TRANSIT</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight leading-tight text-white">
            계단 없는 부산 도시철도 <br className="hidden sm:inline" />
            <span className="text-blue-400">스탭리스</span> 길잡이
          </h1>

          <p className="text-xs sm:text-base text-slate-300 font-medium leading-relaxed max-w-2xl">
            부산 도시철도를 이용하는 유모차, 휠체어, 대형 캐리어 이용자를 위해 엘리베이터 위치와 계단 없는 이동 경로를 정리합니다.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            {onNavigateToNearby && (
              <button
                onClick={onNavigateToNearby}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <MapPin className="w-4 h-4 text-blue-200 shrink-0" />
                <span>내 주변 출구 찾기</span>
                <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </section>


      {/* ==========================================
          2. COMPACT LIGHT ICON STRIP (주요 대상 및 특장점 - 박스 배경 없이 소형화)
         ========================================== */}
      <section className="py-2 px-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
          
          <div className="pt-2 md:pt-0 space-y-1 flex flex-col items-center">
            <div className="p-2 rounded-full bg-amber-50 text-amber-600">
              <Baby className="w-4 h-4" />
            </div>
            <div className="font-extrabold text-xs text-slate-900">유모차 동반 승객</div>
            <p className="text-2xs text-slate-500 font-medium max-w-[160px]">
              경사로와 승강기 연계 출구를 우선 안내
            </p>
          </div>

          <div className="pt-2 md:pt-0 space-y-1 flex flex-col items-center">
            <div className="p-2 rounded-full bg-blue-50 text-blue-600">
              <Accessibility className="w-4 h-4" />
            </div>
            <div className="font-extrabold text-xs text-slate-900">휠체어·교통약자</div>
            <p className="text-2xs text-slate-500 font-medium max-w-[160px]">
              와이드 개찰구 및 단차 없는 직통 경로
            </p>
          </div>

          <div className="pt-2 md:pt-0 space-y-1 flex flex-col items-center">
            <div className="p-2 rounded-full bg-emerald-50 text-emerald-600">
              <Luggage className="w-4 h-4" />
            </div>
            <div className="font-extrabold text-xs text-slate-900">대형 캐리어 소지자</div>
            <p className="text-2xs text-slate-500 font-medium max-w-[160px]">
              계단 없이 엘리베이터 이용 출구 안내
            </p>
          </div>

          <div className="pt-2 md:pt-0 space-y-1 flex flex-col items-center">
            <div className="p-2 rounded-full bg-purple-50 text-purple-600">
              <FileCheck className="w-4 h-4" />
            </div>
            <div className="font-extrabold text-xs text-slate-900">현장 실측 검증</div>
            <p className="text-2xs text-slate-500 font-medium max-w-[160px]">
              확인 날짜 및 상시 제보 정정 수용
            </p>
          </div>

        </div>
      </section>


      {/* ==========================================
          3. FEATURED STATIONS ("Our Products" / "주요 역 가이드")
         ========================================== */}
      <section className="space-y-6 scroll-mt-24" id="station-guides-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-blue-600 tracking-wider">STATION GUIDES</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1">
              주요 역 이동 경로 가이드
            </h2>
          </div>
          <div className="flex flex-col sm:items-end justify-center">
            <button
              id="btn-go-to-station-search"
              onClick={() => {
                if (onNavigateToSearch) {
                  onNavigateToSearch();
                } else {
                  onSelectStation('');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#004481] border border-blue-200/80 font-bold text-xs transition-colors cursor-pointer w-fit active:scale-98"
            >
              <span>{language === 'KR' ? '출구 정보 더 보기' : 'More Exit Info'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#004481]" />
            </button>
          </div>
        </div>

        {/* Clean Grid Cards matching reference image product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredStations.map((st) => (
            <div 
              key={st.id}
              className="group bg-slate-50/80 hover:bg-white border border-slate-200 rounded-2xl p-6 transition-all shadow-xs hover:shadow-lg flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Station visual top badge */}
                <div className="w-full h-32 bg-white rounded-xl border border-slate-100 flex items-center justify-center p-4 relative overflow-hidden group-hover:border-blue-200 transition-colors">
                  <div className="text-center space-y-1">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-700 font-black text-lg">
                      <Train className="w-5 h-5" />
                    </div>
                    <div className="font-extrabold text-slate-900 text-lg font-heading">{st.name}</div>
                    <div className="flex justify-center gap-1">
                      {st.lines.map((l) => (
                        <span key={l} className="text-2xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {l}호선
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                    {st.name} 이동 경로
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                    {st.desc}
                  </p>
                </div>
              </div>

              {/* Action Button Pills matching reference image */}
              <a
                href={`/search/${st.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectStation(st.id);
                }}
                className="w-full py-2.5 px-4 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                <span>상세 경로 확인</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>


      {/* ==========================================
          3.1 STATIONS SEARCH BAR (부산 지하철역 출구 정보 둘러보기 검색창)
         ========================================== */}
      <section className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900">
            {language === 'KR' ? '부산 지하철역 출구 정보 둘러보기' : 'Subway Exit Information Search'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            {language === 'KR' 
              ? '부산 핵심 주요역의 총 엘리베이터 수, 에스컬레이터 대수를 한눈에 비교하고 탐색해보세요.' 
              : 'Compare and explore elevator and escalator counts across major Busan subway stations.'}
          </p>
        </div>

        {/* Search Bar Input Container */}
        <div className="max-w-xl relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            id="home-stations-search-input"
            value={searchQuery || ''}
            onChange={(e) => {
              const val = e.target.value;
              setSearchQuery?.(val);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onNavigateToSearch?.(searchQuery);
              }
            }}
            placeholder={language === 'KR' ? '역 이름이나 출구를 검색해보세요... (예: 서면역, 7번)' : 'Search station or exit index... (e.g., Jeonpo, 7)'}
            className="w-full pl-11 pr-24 py-3 border border-slate-200 rounded-2xl bg-white text-slate-800 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#003466] text-xs sm:text-sm font-medium"
          />
          <div className="absolute inset-y-0 right-1.5 flex items-center gap-1">
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery?.('')}
                className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                title="초기화"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => onNavigateToSearch?.(searchQuery)}
              className="px-3.5 py-1.5 bg-[#004481] hover:bg-blue-900 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              {language === 'KR' ? '검색' : 'Search'}
            </button>
          </div>
        </div>
      </section>


      {/* ==========================================
          3.5 RECOMMENDED TRAVEL COURSES (추천 여행 코스 3선: 식도락, 체험&박물관, 당일치기)
         ========================================== */}
      <section className="space-y-6 scroll-mt-24" id="recommended-itineraries-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-blue-600 tracking-wider">RECOMMENDED TRAVEL COURSES</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1">
              {language === 'KR' ? '추천 무장애 여행 코스' : 'Recommended Accessible Tours'}
            </h2>
          </div>
          <div className="flex flex-col sm:items-end justify-center">
            <button
              id="btn-go-to-travel-courses"
              onClick={() => {
                if (onNavigateToItinerary) {
                  onNavigateToItinerary('GOURMET');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 font-bold text-xs transition-colors cursor-pointer w-fit active:scale-98"
            >
              <span>{language === 'KR' ? '여행 코스 추천 페이지 바로가기' : 'Go to Recommended Courses'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-800" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendedCourses.map((course) => (
            <div 
              key={course.id}
              className="group bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-blue-200 rounded-2xl p-6 transition-all shadow-xs hover:shadow-lg flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Simple Illustration & Tag - No background box */}
                <div className="flex items-center justify-between gap-3 pt-1 pb-1">
                  <div className="p-2 rounded-2xl group-hover:scale-110 transition-transform">
                    {course.icon}
                  </div>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${course.tagBg} ${course.tagText}`}>
                    {course.tag}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-blue-700 transition-colors font-heading">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                    {course.desc}
                  </p>
                </div>
              </div>

              {/* Action Button Link */}
              <a
                href={`/itinerary-${course.id.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigateToItinerary) {
                    onNavigateToItinerary(course.id);
                  }
                }}
                className={`w-full py-2.5 px-4 rounded-full ${course.buttonBg} text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98`}
              >
                <span>{language === 'KR' ? '추천 코스 보기' : 'Explore Course'}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>


      {/* ==========================================
          5. SERVICE INFORMATION & RELIABILITY CENTER (페이지 최하단)
         ========================================== */}
      <section className="space-y-8 pt-6 border-t border-slate-200/80" id="service-info-section">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-blue-600 tracking-wider">SERVICE & RELIABILITY CENTER</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1 flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-[#004481]" />
              <span>스탭리스 안내 및 검증 센터</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            정보 신뢰성, 조사 방법, 안전 가이드 및 오류 제보
          </p>
        </div>

        {/* 1. 조사 방법과 정보 신뢰성 & 오류 제보 (Top Spotlight Row - Clean Borderless Layout) */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-7 space-y-6 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-blue-50 text-[#004481]">
                <FileCheck className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                  조사 방법 및 정보 신뢰성 안내
                </h3>
                <p className="text-2xs sm:text-xs text-slate-500 font-medium">
                  부산 도시철도 교통약자 이동 동선 직접 계측 및 다각도 검증
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>현장 직접 검증 완료</span>
            </span>
          </div>

          {/* 4-Column Micro Details Grid (No Box Borders, No Background Colors) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-2 border-b border-slate-100">
            {/* Item 1: 조사 담당자 */}
            <div className="space-y-1 flex flex-col justify-center">
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">조사 담당자</span>
              <span className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>플로레르</span>
              </span>
            </div>

            {/* Item 2: 조사 방법 & 출처 */}
            <div className="space-y-1 flex flex-col justify-center">
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">조사 방법 & 출처</span>
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                <Train className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>현장 실측 + 부산교통공사 연계</span>
              </span>
            </div>

            {/* Item 3: 최근 검증 현황 */}
            <div className="space-y-1 flex flex-col justify-center">
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">최근 검증 현황</span>
              <span className="text-xs font-extrabold text-[#004481] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>{getTodayDateKR()} 기준 (매일 현행화)</span>
              </span>
            </div>

            {/* Item 4: 오류 & 고장 신속 제보 */}
            <div className="space-y-1 flex flex-col justify-center">
              <span className="text-2xs font-bold text-amber-600 uppercase tracking-wider block flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>오류 & 고장 신속 제보</span>
              </span>
              {onNavigateToReport ? (
                <button
                  id="btn-report-issue-inline"
                  onClick={onNavigateToReport}
                  className="py-1.5 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-98 group w-fit mt-0.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
                  <span>오류 / 고장 제보하기</span>
                  <ArrowRight className="w-3 h-3 text-amber-100 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ) : (
                <span className="text-xs font-bold text-amber-700">
                  잘못된 정보/고장 발견 시 제보
                </span>
              )}
            </div>
          </div>

          {/* Deep Explanation text (Clean, Borderless, No Background Fill) */}
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-1.5 pt-1">
            <p className="font-semibold text-slate-800 flex items-center gap-1.5">
              <span>🔍</span>
              <strong>스탭리스(Stepless)의 정밀 수동 검증 원칙:</strong>
            </p>
            <p className="text-slate-600 sm:pl-5">
              저희 조사팀은 지도 API에 등록된 출구 정보에만 의존하지 않고 벡스코역, 서면역, 수영역 등 주요 연결 지점의 보도 블록 단차와 엘리베이터 동선을 현장에서 직접 확인하고 계측합니다. 공공데이터의 일시적 불일치나 엘리베이터 보수 점검으로 인한 중단을 발견하셨다면 제보 버튼을 통해 언제든 알려주세요.
            </p>
          </div>
        </div>

        {/* 2. 교통약자 대중교통 이용 가이드 (2-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card A: 유모차·휠체어 안전 탑승 수칙 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-left">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-50 text-[#004481]">
                <Baby className="w-5 h-5" />
              </span>
              <h3 className="text-base font-extrabold text-slate-900 font-heading">
                유모차·휠체어 동반 전철 안전 탑승 수칙
              </h3>
            </div>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-extrabold text-blue-600 shrink-0">1.</span>
                <span>
                  <strong>승강장 간격 유의:</strong> 1호선·2호선 일부 곡선 승강장은 간격이 넓어 고무발판이 설치되어 있습니다. 이동 시 바퀴가 끼이지 않도록 상향 각도를 유지하며 진입하십시오.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-extrabold text-blue-600 shrink-0">2.</span>
                <span>
                  <strong>휠체어 전용 구역 안착:</strong> 차량 내부 전용 휠체어 공간에 정차한 후, 급출발 및 급제동에 대비해 반드시 브레이크 잠금 장치를 채워 고정해 주십시오.
                </span>
              </li>
            </ul>
          </div>

          {/* Card B: 엘리베이터 고장 대처 기법 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-left">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <Train className="w-5 h-5" />
              </span>
              <h3 className="text-base font-extrabold text-slate-900 font-heading">
                엘리베이터 및 리프트 고장 대처 기법
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              역내 엘리베이터가 보수 점검으로 중단된 경우, 당황하지 마시고 각층 개찰구 주변의 <strong>빨간 비상호출 장치</strong> 또는 역무실 번호를 이용해 직원과 직접 소통하십시오. 필요 시 경사로 간이 휠체어 리프트를 통한 수동 지원이 제공됩니다.
            </p>
          </div>
        </div>

      </section>

    </div>
  );
}
