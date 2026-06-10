import React, { useEffect, useRef, useState } from 'react';
import { Station, translateExitNumber } from '../types';

export function CrosswalkIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block shrink-0 align-middle ${className}`}>
      <g fill="#2563eb">
        <polygon points="4.5,5 5.5,5 2.5,19 0.5,19" />
        <polygon points="6.5,5 7.5,5 5.5,19 3.7,19" />
        <polygon points="8.5,5 9.5,5 8.5,19 6.8,19" />
        <polygon points="10.5,5 11.5,5 11.3,19 9.8,19" />
        <polygon points="12.5,5 13.5,5 14.2,19 12.7,19" />
        <polygon points="14.5,5 15.5,5 17.2,19 15.5,19" />
        <polygon points="16.5,5 17.5,5 20.3,19 18.5,19" />
        <polygon points="18.5,5 19.5,5 23.5,19 21.5,19" />
      </g>
    </svg>
  );
}

interface SubwayStationMapProps {
  station: Station;
  language: 'KR' | 'EN';
  focusedExitCoords?: { latitude: number; longitude: number } | null;
}

declare global {
  interface Window {
    naver?: any;
    navermaps_auth_error?: () => void;
  }
}

export default function SubwayStationMap({ station, language, focusedExitCoords }: SubwayStationMapProps) {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);

  // 1. Asynchronously Load Naver Maps API script
  useEffect(() => {
    // Read client ID from env with extensive fallbacks (defaulting to user-registered jig5o1hthp)
    const env = (import.meta as any).env || {};
    let clientId = env.VITE_NAVER_CLIENT_ID;

    // Detect if they saved client ID under VITE_NAVER_CLIENT_SECRET or any other custom naming pattern by accident
    const naverKeys = Object.keys(env).filter(key => key.startsWith('VITE_NAVER_CLIENT'));
    const customKey = naverKeys.find(key => 
      key !== 'VITE_NAVER_CLIENT_ID' && 
      key !== 'VITE_NAVER_CLIENT_SECRET' && 
      env[key] && 
      env[key] !== 'x7vtxblyj1' && 
      env[key] !== 'jig5o1hthp'
    );

    if ((!clientId || clientId === 'x7vtxblyj1' || clientId === 'jig5o1hthp') && customKey) {
      clientId = env[customKey];
    }

    if (!clientId) {
      clientId = 'jig5o1hthp';
    }

    // Dynamic error hook in window to prevent default browser alert dialog
    window.navermaps_auth_error = () => {
      console.warn("Naver Maps API Authentication failed.");
      setLoadError(true);
    };

    if (window.naver && window.naver.maps) {
      setScriptLoaded(true);
      return () => {
        window.navermaps_auth_error = undefined;
      };
    }

    const scriptId = 'naver-maps-script';
    let existingScript = document.getElementById(scriptId) as HTMLScriptElement;

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&submodules=geocoder`;
      script.async = true;
      script.onload = () => {
        if (window.naver && window.naver.maps) {
          setScriptLoaded(true);
        } else {
          setLoadError(true);
        }
      };
      script.onerror = () => {
        setLoadError(true);
      };
      document.head.appendChild(script);
    } else {
      const interval = setInterval(() => {
        if (window.naver && window.naver.maps) {
          setScriptLoaded(true);
          clearInterval(interval);
        }
      }, 100);
      
      const timeout = setTimeout(() => {
        clearInterval(interval);
        if (!window.naver || !window.naver.maps) {
          setLoadError(true);
        }
      }, 8000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
        window.navermaps_auth_error = undefined;
      };
    }

    return () => {
      window.navermaps_auth_error = undefined;
    };
  }, []);

  // 2. Initialize or Update Map and Markers on Station / Script loaded changes
  useEffect(() => {
    if (!scriptLoaded || !window.naver || !window.naver.maps || !mapElement.current) return;

    const exits = station.exits || [];
    if (exits.length === 0) return;

    // Calculate map focus center dynamically using mathematical average coordinate of all exits or focused override
    let centerLat = 0;
    let centerLng = 0;
    let currentZoom = 16;

    if (focusedExitCoords) {
      centerLat = focusedExitCoords.latitude;
      centerLng = focusedExitCoords.longitude;
      currentZoom = 18;
    } else {
      let totalLat = 0;
      let totalLng = 0;
      exits.forEach(exit => {
        totalLat += exit.latitude;
        totalLng += exit.longitude;
      });
      centerLat = totalLat / exits.length;
      centerLng = totalLng / exits.length;
      currentZoom = 16;
    }

    const mapCenter = new window.naver.maps.LatLng(centerLat, centerLng);

    // Initialise Naver Map instantiation if not built already
    if (!mapInstance.current) {
      mapInstance.current = new window.naver.maps.Map(mapElement.current, {
        center: mapCenter,
        zoom: currentZoom,
        minZoom: 13,
        maxZoom: 19,
        mapTypeControl: false,
        zoomControl: true,
        logoControl: true,
        scaleControl: true,
        draggable: true,
        pinchZoom: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.RIGHT_CENTER
        }
      });
    } else {
      // Update central zoom dynamically and move center with pan animation
      mapInstance.current.setCenter(mapCenter);
      mapInstance.current.setZoom(currentZoom);
    }

    // Reset previous loaded markers to avoid rendering duplication
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    // Map exits and build markers
    exits.forEach(exit => {
      const line = station.lines[0];
      let mapAccentColor = '#F06A00'; // default 주황
      if (line === '2') mapAccentColor = '#1b6d24'; // 초록
      else if (line === '3') mapAccentColor = '#906A3B'; // 브라운
      else if (line === '동해') mapAccentColor = '#004960'; // 동해 블루

      let iconHtml = '';
      if (exit.hasElevator) {
        iconHtml = `
          <svg viewBox="0 0 24 24" fill="none" stroke="${mapAccentColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; flex-shrink: 0; display: inline-block; vertical-align: middle;">
            <rect x="3" y="3" width="18" height="18" rx="2.5" />
            <path d="M 7.5 10 L 9.5 7 L 11.5 10 Z" fill="${mapAccentColor}" stroke="none" />
            <path d="M 7.5 14 L 9.5 17 L 11.5 14 Z" fill="${mapAccentColor}" stroke="none" />
            <line x1="14.5" y1="3" x2="14.5" y2="21" stroke-dasharray="2 2" stroke-width="1.5" />
            <path d="M 14.5 12 L 17.5 12" />
            <path d="M 17.5 12 L 16 10.5" />
            <path d="M 17.5 12 L 16 13.5" />
          </svg>
        `;
      } else if (exit.hasEscalator) {
        iconHtml = `
          <svg viewBox="0 0 24 24" fill="none" stroke="${mapAccentColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; flex-shrink: 0; display: inline-block; vertical-align: middle;">
            <circle cx="10" cy="7.5" r="1.8" fill="${mapAccentColor}" stroke="none" />
            <path d="M 10 10.2 L 10 14" stroke="${mapAccentColor}" stroke-width="2.5" stroke-linecap="round" />
            <path d="M 3.5 19.5 L 7.5 19.5 C 9.5 19.5, 10.5 18, 12 15.5 L 15.5 10 C 17 8, 18 7, 20.5 7 L 22.5 7" />
          </svg>
        `;
      } else {
        iconHtml = `
          <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; flex-shrink: 0; display: inline-block; vertical-align: middle;">
            <path d="M 3.5 19.5 L 7.5 19.5 L 7.5 15.5 L 11.5 15.5 L 11.5 11.5 L 15.5 11.5 L 15.5 7.5 L 20.5 7.5" />
          </svg>
        `;
      }

      // Precise pixel-perfect marker dimensions
      const markerWidth = 140;
      const markerHeight = 44;

      // Styled custom HTML content conforming to strict anchor constraints
      // Designed inside a fixed container of 140x44 pixels with bottom-center flex-alignment.
      // Even if the bubble text overflows wide, the align-items: center ensures symmetrical center-alignment.
      const markerContent = `
        <div style="width: ${markerWidth}px; height: ${markerHeight}px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; position: relative; pointer-events: none;">
          <!-- Premium bubble label containing exit name and its mobility SVG icon -->
          <div style="background-color: white; border: 2.5px solid ${mapAccentColor}; border-radius: 9999px; padding: 5px 12px; font-weight: 850; font-size: 11px; white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.18); display: flex; align-items: center; gap: 4.5px; pointer-events: auto; position: relative; margin-bottom: 2px;">
            <div style="display: flex; align-items: center; justify-content: center; width: 16px; height: 16px;">${iconHtml}</div>
            <span style="color: #0f172a; font-family: system-ui, sans-serif; letter-spacing: -0.02em; font-weight: 900;">${translateExitNumber(exit.number, language)}</span>
          </div>
          <!-- Pin Arrow Indicator -->
          <div style="width: 0; height: 0; border-left: 6.5px solid transparent; border-right: 6.5px solid transparent; border-top: 7px solid ${mapAccentColor}; margin-top: -1px; pointer-events: none;"></div>
        </div>
      `;

      // Define anchor point precisely at (0.5 * Width, 1.0 * Height) i.e. bottom center
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(exit.latitude, exit.longitude),
        map: mapInstance.current,
        icon: {
          content: markerContent,
          size: new window.naver.maps.Size(markerWidth, markerHeight),
          anchor: new window.naver.maps.Point(markerWidth * 0.5, markerHeight)
        }
      });

      // Marker Interactivity listener
      window.naver.maps.Event.addListener(marker, 'click', () => {
        mapInstance.current.panTo(new window.naver.maps.LatLng(exit.latitude, exit.longitude));
        
        // Auto scroll list window viewport target layout to match user-focused exit details
        const el = document.getElementById(`exit-item-${exit.number}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const tabBtn = document.getElementById(`expand-exit-btn-${exit.number}`);
          if (tabBtn) {
            tabBtn.click();
          }
        }
      });

      markersRef.current.push(marker);
    });

    // Add custom crosswalk indicators for Seomyeon Station
    if (station.id === 'seomyeon') {
      const crosswalkPoints = [
        { lat: 35.156981, lng: 129.057776, nameKr: '서면역 부근 횡단보도 1', nameEn: 'Seomyeon Station Crosswalk 1' },
        { lat: 35.157765, lng: 129.060084, nameKr: '서면역 부근 횡단보도 2', nameEn: 'Seomyeon Station Crosswalk 2' }
      ];
      
      const crosswalkMarkerWidth = 32;
      const crosswalkMarkerHeight = 32;
      
      crosswalkPoints.forEach(pt => {
        const titleText = language === 'KR' ? pt.nameKr : pt.nameEn;
        const crosswalkHtml = `
          <div style="width: ${crosswalkMarkerWidth}px; height: ${crosswalkMarkerHeight}px; display: flex; align-items: center; justify-content: center; background-color: #ffffff; border: 2.5px solid #2563eb; border-radius: 9999px; box-shadow: 0 3px 10px rgba(0,0,0,0.18); cursor: pointer;" title="${titleText}">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;">
              <g fill="#2563eb">
                <polygon points="4.5,5 5.5,5 2.5,19 0.5,19" />
                <polygon points="6.5,5 7.5,5 5.5,19 3.7,19" />
                <polygon points="8.5,5 9.5,5 8.5,19 6.8,19" />
                <polygon points="10.5,5 11.5,5 11.3,19 9.8,19" />
                <polygon points="12.5,5 13.5,5 14.2,19 12.7,19" />
                <polygon points="14.5,5 15.5,5 17.2,19 15.5,19" />
                <polygon points="16.5,5 17.5,5 20.3,19 18.5,19" />
                <polygon points="18.5,5 19.5,5 23.5,19 21.5,19" />
              </g>
            </svg>
          </div>
        `;
        
        const crosswalkMarker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(pt.lat, pt.lng),
          map: mapInstance.current,
          icon: {
            content: crosswalkHtml,
            size: new window.naver.maps.Size(crosswalkMarkerWidth, crosswalkMarkerHeight),
            anchor: new window.naver.maps.Point(crosswalkMarkerWidth * 0.5, crosswalkMarkerHeight * 0.5)
          }
        });
        
        markersRef.current.push(crosswalkMarker);
      });
    }

  }, [station, scriptLoaded, focusedExitCoords, language]);

  // Clean-up logic on unmount to release resources safely
  useEffect(() => {
    return () => {
      markersRef.current.forEach(m => {
        if (m) m.setMap(null);
      });
    };
  }, []);

  return (
    <div className="flex flex-col w-full bg-white overflow-hidden rounded-3xl border border-slate-100/80 transition-all duration-300">
      {/* Map display block */}
      <div className="w-full h-[320px] relative bg-slate-50 border-b border-slate-100 transition-all duration-300">
        {loadError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-rose-50/20">
            <span className="text-3xl text-rose-500">🗺️</span>
            <p className="font-extrabold text-sm text-slate-800">
              {language === 'KR' ? '네이버 지도 인프라를 연결할 수 없습니다.' : 'Failed to initialize Naver Maps API.'}
            </p>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              {language === 'KR' 
                ? '네이버 클라우드 환경의 Client ID 설정값 및 리전이 Korea(한국) 국한으로 잘 지정되었는지 확인해 주십시오.' 
                : 'Please make sure VITE_NAVER_CLIENT_ID is active and configured for Korea region nodes.'}
            </p>
          </div>
        ) : !scriptLoaded ? (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-xs font-bold text-slate-400">
              {language === 'KR' ? '실시간 지하철역 지도 데이터 로딩 중...' : 'Streaming maps telemetry...'}
            </p>
          </div>
        ) : (
          <div className="w-full h-full" ref={mapElement} id="subway-naver-map" />
        )}
      </div>

      {/* Information Tip Bar */}
      <div className="bg-slate-50/80 px-4 py-2.5 flex items-start gap-2.5 border-t border-slate-100">
        <span className="text-base sm:text-lg leading-none select-none mt-0.5">💡</span>
        <div className="text-[11.5px] sm:text-xs font-bold text-slate-600 leading-relaxed pt-0.5">
          {language === 'KR' ? (
            <span>
              지도의 <CrosswalkIcon size={16} className="mx-0.5 -mt-0.5" /> 아이콘은 해당 위치에 횡단보도가 설치되어 있음을 나타냅니다.
            </span>
          ) : (
            <span>
              The <CrosswalkIcon size={16} className="mx-0.5 -mt-0.5" /> icon on the map indicates that there is a pedestrian crosswalk located at that position.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
