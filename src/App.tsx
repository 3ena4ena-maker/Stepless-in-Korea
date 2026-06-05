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
  Plus,
  RefreshCw,
  Clock,
  ThumbsUp,
  Map,
  Accessibility
} from 'lucide-react';
import Header from './components/Header';
import TimelineVisualizer from './components/TimelineVisualizer';
import SubwayStationMap from './components/SubwayStationMap';
import { STATIONS, INITIAL_REPORTS } from './data';
import { Station, ExitInfo, FacilityReport, StatusType, getExitDisplayName, translateExitNumber, getTranslatedStationName } from './types';

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
  jagalchi: { small: 34, med: 42, large: 4, xlarge: 27 }
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

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<'KR' | 'EN'>('KR');
  const [selectedStationId, setSelectedStationId] = useState<string>('seomyeon');
  const [activePathFilter, setActivePathFilter] = useState<'ALL' | 'ACCESSIBLE' | 'CARRY'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
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
          setCurrentTab={setCurrentTab} 
          language={language} 
          toggleLanguage={toggleLanguage} 
        />

        {/* Core Main Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
          
          {/* Tab 1: HOME LANDING VIEW */}
          {currentTab === 'home' && (
            <div className="space-y-8">
              {/* Feature Hero banner with beautiful illustrations */}
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
                  
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {STATIONS.map(s => {
                      const isActive = selectedStationId === s.id;
                      return (
                        <button
                          key={s.id}
                          id={`quick-station-tab-${s.id}`}
                          onClick={() => {
                            setSelectedStationId(s.id);
                            // Keep all detailed pathways collapsed initially as requested
                            setExpandedExitNum(null);
                          }}
                          className={`py-3 px-2 sm:py-4 rounded-2xl text-xs sm:text-base font-extrabold transition-all border flex flex-col items-center justify-center gap-1 cursor-pointer ${
                            isActive
                              ? 'bg-[#004481] text-white border-[#004481] shadow-md ring-4 ring-blue-50'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-150'
                          }`}
                        >
                          <span className="leading-tight shrink-0 font-heading text-sm sm:text-lg">
                            {language === 'KR' ? s.name : s.englishName}
                          </span>
                          <span className={`text-[9px] font-sans font-medium uppercase tracking-wider block ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                            {language === 'KR' ? s.englishName.split(' ')[0] : s.name}
                          </span>
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
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 font-heading">
                                {getExitDisplayName(activeStation.name, exit.number, language)}
                              </h3>
                            </div>
                            
                            {/* Simple facilities details directly matching user request */}
                            <div className="space-y-2 mt-2">
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
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
                          {/* Operational indicator lights */}
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              exit.status === 'OPERATIONAL' 
                                ? 'bg-emerald-500 animate-pulse' 
                                : exit.status === 'MAINTENANCE'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`} />
                            <span className="text-xs font-bold text-slate-500">
                              {getExitStatusText(exit.status)}
                            </span>
                          </div>

                          {/* Action to expand Timeline Details Inline */}
                          <button
                            id={`expand-exit-btn-${exit.number}`}
                            onClick={() => setExpandedExitNum(isExpanded ? null : exit.number)}
                            className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
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
                      <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 flex flex-col gap-2.5 text-xs mb-1">
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
                ? '부산 지하철 이용객들의 평등하고 자유로운 지상 이동을 지원하기 위해 설계된 교통약자 특화형 편의 플랫폼입니다. 본 서비스는 공공데이터 연계 및 수동 검증 데이터를 기반으로 운영됩니다.' 
                : 'A dedicated public transit helper to establish smooth, accessible pathways throughout major transit hubs.'}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'KR' ? '관련 공공 서비스' : 'Public Agencies'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.humetro.busan.kr" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline flex items-center gap-1">
                  <span>부산교통공사 (Humetro)</span>
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
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 hover:underline">{language === 'KR' ? '이용약관' : 'Terms'}</a>
            <a href="#" className="hover:text-slate-300 hover:underline">{language === 'KR' ? '개인정보처리방침' : 'Privacy'}</a>
            <a href="#" className="hover:text-slate-300 hover:underline">{language === 'KR' ? '고객센터' : 'Customer Support'}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
