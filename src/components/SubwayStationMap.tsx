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

  // Naver Map custom client config
  const [naverClientId, setNaverClientId] = useState<string>(() => {
    return localStorage.getItem('custom_naver_client_id') || '';
  });
  const [naverAuthFailed, setNaverAuthFailed] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [tempClientId, setTempClientId] = useState<string>('');

  // Leaflet fallback states & refs
  const [useLeaflet, setUseLeaflet] = useState<boolean>(false);
  const [leafletLoaded, setLeafletLoaded] = useState<boolean>(false);
  const leafletMapInstance = useRef<any>(null);
  const leafletMarkersRef = useRef<any[]>([]);

  // 1. Asynchronously Load Naver Maps API script
  useEffect(() => {
    // Read client ID from state, or env with extensive fallbacks (defaulting to user-registered jig5o1hthp)
    const env = (import.meta as any).env || {};
    let clientId = naverClientId;

    if (!clientId) {
      clientId = env.VITE_NAVER_CLIENT_ID;

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
    }

    // Dynamic error hook in window to prevent default browser alert dialog
    window.navermaps_auth_error = () => {
      console.warn("Naver Maps API Authentication failed.");
      setNaverAuthFailed(true);
    };

    if (window.naver && window.naver.maps) {
      setScriptLoaded(true);
      setNaverAuthFailed(false);
      return () => {
        window.navermaps_auth_error = undefined;
      };
    }

    const scriptId = 'naver-maps-script';
    let existingScript = document.getElementById(scriptId) as HTMLScriptElement;

    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&submodules=geocoder`;
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        if (window.naver && window.naver.maps) {
          setScriptLoaded(true);
          setNaverAuthFailed(false);
        } else {
          console.warn("Naver Maps script loaded but API not available.");
          setNaverAuthFailed(true);
        }
      }, 500);
    };
    script.onerror = () => {
      console.warn("Naver Maps script failed to load.");
      setLoadError(true);
    };
    document.head.appendChild(script);

    return () => {
      window.navermaps_auth_error = undefined;
    };
  }, [naverClientId]);

  // 2. Initialize or Update Map and Markers on Station / Script loaded changes
  useEffect(() => {
    if (useLeaflet) return;
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
      if (exit.hasElevator && exit.hasEscalator) {
        iconHtml = `
          <div style="display: flex; align-items: center; gap: 3px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="${mapAccentColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; flex-shrink: 0; display: inline-block; vertical-align: middle;">
              <rect x="3" y="3" width="18" height="18" rx="2.5" />
              <path d="M 7.5 10 L 9.5 7 L 11.5 10 Z" fill="${mapAccentColor}" stroke="none" />
              <path d="M 7.5 14 L 9.5 17 L 11.5 14 Z" fill="${mapAccentColor}" stroke="none" />
              <line x1="14.5" y1="3" x2="14.5" y2="21" stroke-dasharray="2 2" stroke-width="1.5" />
              <path d="M 14.5 12 L 17.5 12" />
              <path d="M 17.5 12 L 16 10.5" />
              <path d="M 17.5 12 L 16 13.5" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="${mapAccentColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; flex-shrink: 0; display: inline-block; vertical-align: middle;">
              <circle cx="10" cy="7.5" r="1.8" fill="${mapAccentColor}" stroke="none" />
              <path d="M 10 10.2 L 10 14" stroke="${mapAccentColor}" stroke-width="2.5" stroke-linecap="round" />
              <path d="M 3.5 19.5 L 7.5 19.5 C 9.5 19.5, 10.5 18, 12 15.5 L 15.5 10 C 17 8, 18 7, 20.5 7 L 22.5 7" />
            </svg>
          </div>
        `;
      } else if (exit.hasElevator) {
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
            <div style="display: flex; align-items: center; justify-content: center; min-width: 16px; height: 16px;">${iconHtml}</div>
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

    // Add custom crosswalk indicators
    let crosswalkPoints: { lat: number; lng: number; nameKr: string; nameEn: string }[] = [];
    if (station.id === 'seomyeon') {
      crosswalkPoints = [
        { lat: 35.156981, lng: 129.057776, nameKr: '서면역 부근 횡단보도 1', nameEn: 'Seomyeon Station Crosswalk 1' },
        { lat: 35.157765, lng: 129.060084, nameKr: '서면역 부근 횡단보도 2', nameEn: 'Seomyeon Station Crosswalk 2' }
      ];
    } else if (station.id === 'bujeon') {
      crosswalkPoints = [
        { lat: 35.160072, lng: 129.060950, nameKr: '부전역 부근 횡단보도 1', nameEn: 'Bujeon Station Crosswalk 1' },
        { lat: 35.162038, lng: 129.062340, nameKr: '부전역 부근 횡단보도 2', nameEn: 'Bujeon Station Crosswalk 2' },
        { lat: 35.162808, lng: 129.063141, nameKr: '부전역 부근 횡단보도 3', nameEn: 'Bujeon Station Crosswalk 3' },
        { lat: 35.163751, lng: 129.064201, nameKr: '부전역 부근 횡단보도 4', nameEn: 'Bujeon Station Crosswalk 4' }
      ];
    } else if (station.id === 'gwangan') {
      crosswalkPoints = [
        { lat: 35.157177, lng: 129.112880, nameKr: '광안역 부근 횡단보도 1', nameEn: 'Gwangan Station Crosswalk 1' },
        { lat: 35.157072, lng: 129.113787, nameKr: '광안역 부근 횡단보도 2', nameEn: 'Gwangan Station Crosswalk 2' }
      ];
    } else if (station.id === 'suyeong') {
      crosswalkPoints = [
        { lat: 35.164779, lng: 129.114637, nameKr: '수영역 부근 횡단보도 1', nameEn: 'Suyeong Station Crosswalk 1' },
        { lat: 35.168071, lng: 129.114190, nameKr: '수영역 부근 횡단보도 2', nameEn: 'Suyeong Station Crosswalk 2' },
        { lat: 35.167906, lng: 129.116710, nameKr: '수영역 부근 횡단보도 3', nameEn: 'Suyeong Station Crosswalk 3' }
      ];
    } else if (station.id === 'haeundae') {
      crosswalkPoints = [
        { lat: 35.163103, lng: 129.159348, nameKr: '해운대역 부근 횡단보도 1', nameEn: 'Haeundae Station Crosswalk 1' },
        { lat: 35.163592, lng: 129.159008, nameKr: '해운대역 부근 횡단보도 2', nameEn: 'Haeundae Station Crosswalk 2' },
        { lat: 35.163422, lng: 129.158462, nameKr: '해운대역 부근 횡단보도 3', nameEn: 'Haeundae Station Crosswalk 3' }
      ];
    } else if (station.id === 'jagalchi') {
      crosswalkPoints = [
        { lat: 35.097792, lng: 129.028350, nameKr: '자갈치역 부근 횡단보도 1', nameEn: 'Jagalchi Station Crosswalk 1' },
        { lat: 35.097107, lng: 129.025660, nameKr: '자갈치역 부근 횡단보도 2', nameEn: 'Jagalchi Station Crosswalk 2' },
        { lat: 35.098024, lng: 129.029357, nameKr: '자갈치역 부근 횡단보도 3', nameEn: 'Jagalchi Station Crosswalk 3' }
      ];
    } else if (station.id === 'nampo') {
      crosswalkPoints = [
        { lat: 35.097890, lng: 129.032372, nameKr: '남포역 부근 횡단보도 1', nameEn: 'Nampo Station Crosswalk 1' },
        { lat: 35.098062, lng: 129.035629, nameKr: '남포역 부근 횡단보도 2', nameEn: 'Nampo Station Crosswalk 2' },
        { lat: 35.098347, lng: 129.035651, nameKr: '남포역 부근 횡단보도 3', nameEn: 'Nampo Station Crosswalk 3' },
        { lat: 35.098099, lng: 129.035297, nameKr: '남포역 부근 횡단보도 4', nameEn: 'Nampo Station Crosswalk 4' }
      ];
    } else if (station.id === 'jeonpo') {
      crosswalkPoints = [
        { lat: 35.154631, lng: 129.065389, nameKr: '전포역 부근 횡단보도 1', nameEn: 'Jeonpo Station Crosswalk 1' }
      ];
    } else if (station.id === 'busan') {
      crosswalkPoints = [
        { lat: 35.114853, lng: 129.039498, nameKr: '부산역 부근 횡단보도 1', nameEn: 'Busan Station Crosswalk 1' },
        { lat: 35.115799, lng: 129.039960, nameKr: '부산역 부근 횡단보도 2', nameEn: 'Busan Station Crosswalk 2' }
      ];
    } else if (station.id === 'geumnyeonsan') {
      crosswalkPoints = [
        { lat: 35.150313, lng: 129.111266, nameKr: '금련산역 부근 횡단보도 1', nameEn: 'Geumnyeonsan Station Crosswalk 1' },
        { lat: 35.150413, lng: 129.110984, nameKr: '금련산역 부근 횡단보도 2', nameEn: 'Geumnyeonsan Station Crosswalk 2' }
      ];
    } else if (station.id === 'dongbaek') {
      crosswalkPoints = [
        { lat: 35.161513, lng: 129.147828, nameKr: '동백역 부근 횡단보도', nameEn: 'Dongbaek Station Crosswalk' }
      ];
    } else if (station.id === 'bexco') {
      crosswalkPoints = [
        { lat: 35.168088, lng: 129.137516, nameKr: '벡스코역 서측 횡단보도', nameEn: 'Bexco Station West Crosswalk' },
        { lat: 35.168937, lng: 129.138359, nameKr: '벡스코역 7번 출구 방면 횡단보도', nameEn: 'Bexco Station Exit 7 Crosswalk' },
        { lat: 35.168538, lng: 129.138828, nameKr: '벡스코역 남측 올림픽교차로 횡단보도', nameEn: 'Bexco Station South Intersection Crosswalk' },
        { lat: 35.168988, lng: 129.139266, nameKr: '벡스코역 2·4번 출구 삼거리 횡단보도', nameEn: 'Bexco Station Exit 2/4 Intersection Crosswalk' },
        { lat: 35.169338, lng: 129.138922, nameKr: '올림픽교차로 북측 횡단보도', nameEn: 'Olympic Intersection North Crosswalk' }
      ];
    }
    
    if (crosswalkPoints.length > 0) {
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

  // 3. Dynamic Leaflet CSS & Script loader
  useEffect(() => {
    if (!useLeaflet) return;

    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    const cssId = 'leaflet-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const scriptId = 'leaflet-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        if ((window as any).L) {
          setLeafletLoaded(true);
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
        if ((window as any).L) {
          setLeafletLoaded(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [useLeaflet]);

  // 4. Initialize or Update Leaflet Map and Markers
  useEffect(() => {
    if (!useLeaflet || !leafletLoaded || !mapElement.current) return;
    const L = (window as any).L;
    if (!L) return;

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

    // Initialise Leaflet Map instantiation if not built already
    if (!leafletMapInstance.current) {
      leafletMapInstance.current = L.map(mapElement.current, {
        zoomControl: false,
        attributionControl: false
      }).setView([centerLat, centerLng], currentZoom);

      // Add Zoom Control on the top-right
      L.control.zoom({
        position: 'topright'
      }).addTo(leafletMapInstance.current);

      // Add extremely high quality clean Voyager tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(leafletMapInstance.current);
    } else {
      // Update central zoom dynamically and move center smoothly
      leafletMapInstance.current.setView([centerLat, centerLng], currentZoom);
    }

    // Reset previous loaded markers to avoid rendering duplication
    leafletMarkersRef.current.forEach(m => m.remove());
    leafletMarkersRef.current = [];

    // Map exits and build markers
    exits.forEach(exit => {
      const line = station.lines[0];
      let mapAccentColor = '#F06A00'; // default 주황
      if (line === '2') mapAccentColor = '#1b6d24'; // 초록
      else if (line === '3') mapAccentColor = '#906A3B'; // 브라운
      else if (line === '동해') mapAccentColor = '#004960'; // 동해 블루

      let iconHtml = '';
      if (exit.hasElevator && exit.hasEscalator) {
        iconHtml = `
          <div style="display: flex; align-items: center; gap: 3px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="${mapAccentColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; flex-shrink: 0; display: inline-block; vertical-align: middle;">
              <rect x="3" y="3" width="18" height="18" rx="2.5" />
              <path d="M 7.5 10 L 9.5 7 L 11.5 10 Z" fill="${mapAccentColor}" stroke="none" />
              <path d="M 7.5 14 L 9.5 17 L 11.5 14 Z" fill="${mapAccentColor}" stroke="none" />
              <line x1="14.5" y1="3" x2="14.5" y2="21" stroke-dasharray="2 2" stroke-width="1.5" />
              <path d="M 14.5 12 L 17.5 12" />
              <path d="M 17.5 12 L 16 10.5" />
              <path d="M 17.5 12 L 16 13.5" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="${mapAccentColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; flex-shrink: 0; display: inline-block; vertical-align: middle;">
              <circle cx="10" cy="7.5" r="1.8" fill="${mapAccentColor}" stroke="none" />
              <path d="M 10 10.2 L 10 14" stroke="${mapAccentColor}" stroke-width="2.5" stroke-linecap="round" />
              <path d="M 3.5 19.5 L 7.5 19.5 C 9.5 19.5, 10.5 18, 12 15.5 L 15.5 10 C 17 8, 18 7, 20.5 7 L 22.5 7" />
            </svg>
          </div>
        `;
      } else if (exit.hasElevator) {
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

      const markerContent = `
        <div style="width: ${markerWidth}px; height: ${markerHeight}px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; position: relative;">
          <!-- Premium bubble label containing exit name and its mobility SVG icon -->
          <div style="background-color: white; border: 2.5px solid ${mapAccentColor}; border-radius: 9999px; padding: 5px 12px; font-weight: 850; font-size: 11px; white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.18); display: flex; align-items: center; gap: 4.5px; position: relative; margin-bottom: 2px;">
            <div style="display: flex; align-items: center; justify-content: center; min-width: 16px; height: 16px;">${iconHtml}</div>
            <span style="color: #0f172a; font-family: system-ui, sans-serif; letter-spacing: -0.02em; font-weight: 900;">${translateExitNumber(exit.number, language)}</span>
          </div>
          <!-- Pin Arrow Indicator -->
          <div style="width: 0; height: 0; border-left: 6.5px solid transparent; border-right: 6.5px solid transparent; border-top: 7px solid ${mapAccentColor}; margin-top: -1px;"></div>
        </div>
      `;

      // Create Leaflet DivIcon
      const customIcon = L.divIcon({
        html: markerContent,
        className: 'leaflet-custom-marker-wrapper',
        iconSize: [markerWidth, markerHeight],
        iconAnchor: [markerWidth * 0.5, markerHeight]
      });

      const marker = L.marker([exit.latitude, exit.longitude], { icon: customIcon }).addTo(leafletMapInstance.current);

      // Marker click listener
      marker.on('click', () => {
        leafletMapInstance.current.panTo([exit.latitude, exit.longitude]);
        
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

      leafletMarkersRef.current.push(marker);
    });

    // Add custom crosswalk indicators for Leaflet fallback
    let crosswalkPoints: { lat: number; lng: number; nameKr: string; nameEn: string }[] = [];
    if (station.id === 'seomyeon') {
      crosswalkPoints = [
        { lat: 35.156981, lng: 129.057776, nameKr: '서면역 부근 횡단보도 1', nameEn: 'Seomyeon Station Crosswalk 1' },
        { lat: 35.157765, lng: 129.060084, nameKr: '서면역 부근 횡단보도 2', nameEn: 'Seomyeon Station Crosswalk 2' }
      ];
    } else if (station.id === 'bujeon') {
      crosswalkPoints = [
        { lat: 35.160072, lng: 129.060950, nameKr: '부전역 부근 횡단보도 1', nameEn: 'Bujeon Station Crosswalk 1' },
        { lat: 35.162038, lng: 129.062340, nameKr: '부전역 부근 횡단보도 2', nameEn: 'Bujeon Station Crosswalk 2' },
        { lat: 35.162808, lng: 129.063141, nameKr: '부전역 부근 횡단보도 3', nameEn: 'Bujeon Station Crosswalk 3' },
        { lat: 35.163751, lng: 129.064201, nameKr: '부전역 부근 횡단보도 4', nameEn: 'Bujeon Station Crosswalk 4' }
      ];
    } else if (station.id === 'gwangan') {
      crosswalkPoints = [
        { lat: 35.157177, lng: 129.112880, nameKr: '광안역 부근 횡단보도 1', nameEn: 'Gwangan Station Crosswalk 1' },
        { lat: 35.157072, lng: 129.113787, nameKr: '광안역 부근 횡단보도 2', nameEn: 'Gwangan Station Crosswalk 2' }
      ];
    } else if (station.id === 'suyeong') {
      crosswalkPoints = [
        { lat: 35.164779, lng: 129.114637, nameKr: '수영역 부근 횡단보도 1', nameEn: 'Suyeong Station Crosswalk 1' },
        { lat: 35.168071, lng: 129.114190, nameKr: '수영역 부근 횡단보도 2', nameEn: 'Suyeong Station Crosswalk 2' },
        { lat: 35.167906, lng: 129.116710, nameKr: '수영역 부근 횡단보도 3', nameEn: 'Suyeong Station Crosswalk 3' }
      ];
    } else if (station.id === 'haeundae') {
      crosswalkPoints = [
        { lat: 35.163103, lng: 129.159348, nameKr: '해운대역 부근 횡단보도 1', nameEn: 'Haeundae Station Crosswalk 1' },
        { lat: 35.163592, lng: 129.159008, nameKr: '해운대역 부근 횡단보도 2', nameEn: 'Haeundae Station Crosswalk 2' },
        { lat: 35.163422, lng: 129.158462, nameKr: '해운대역 부근 횡단보도 3', nameEn: 'Haeundae Station Crosswalk 3' }
      ];
    } else if (station.id === 'jagalchi') {
      crosswalkPoints = [
        { lat: 35.097792, lng: 129.028350, nameKr: '자갈치역 부근 횡단보도 1', nameEn: 'Jagalchi Station Crosswalk 1' },
        { lat: 35.097107, lng: 129.025660, nameKr: '자갈치역 부근 횡단보도 2', nameEn: 'Jagalchi Station Crosswalk 2' },
        { lat: 35.098024, lng: 129.029357, nameKr: '자갈치역 부근 횡단보도 3', nameEn: 'Jagalchi Station Crosswalk 3' }
      ];
    } else if (station.id === 'nampo') {
      crosswalkPoints = [
        { lat: 35.097890, lng: 129.032372, nameKr: '남포역 부근 횡단보도 1', nameEn: 'Nampo Station Crosswalk 1' },
        { lat: 35.098062, lng: 129.035629, nameKr: '남포역 부근 횡단보도 2', nameEn: 'Nampo Station Crosswalk 2' },
        { lat: 35.098347, lng: 129.035651, nameKr: '남포역 부근 횡단보도 3', nameEn: 'Nampo Station Crosswalk 3' },
        { lat: 35.098099, lng: 129.035297, nameKr: '남포역 부근 횡단보도 4', nameEn: 'Nampo Station Crosswalk 4' }
      ];
    } else if (station.id === 'jeonpo') {
      crosswalkPoints = [
        { lat: 35.154631, lng: 129.065389, nameKr: '전포역 부근 횡단보도 1', nameEn: 'Jeonpo Station Crosswalk 1' }
      ];
    } else if (station.id === 'busan') {
      crosswalkPoints = [
        { lat: 35.114853, lng: 129.039498, nameKr: '부산역 부근 횡단보도 1', nameEn: 'Busan Station Crosswalk 1' },
        { lat: 35.115799, lng: 129.039960, nameKr: '부산역 부근 횡단보도 2', nameEn: 'Busan Station Crosswalk 2' }
      ];
    } else if (station.id === 'geumnyeonsan') {
      crosswalkPoints = [
        { lat: 35.150313, lng: 129.111266, nameKr: '금련산역 부근 횡단보도 1', nameEn: 'Geumnyeonsan Station Crosswalk 1' },
        { lat: 35.150413, lng: 129.110984, nameKr: '금련산역 부근 횡단보도 2', nameEn: 'Geumnyeonsan Station Crosswalk 2' }
      ];
    } else if (station.id === 'dongbaek') {
      crosswalkPoints = [
        { lat: 35.161513, lng: 129.147828, nameKr: '동백역 부근 횡단보도', nameEn: 'Dongbaek Station Crosswalk' }
      ];
    } else if (station.id === 'bexco') {
      crosswalkPoints = [
        { lat: 35.168088, lng: 129.137516, nameKr: '벡스코역 서측 횡단보도', nameEn: 'Bexco Station West Crosswalk' },
        { lat: 35.168937, lng: 129.138359, nameKr: '벡스코역 7번 출구 방면 횡단보도', nameEn: 'Bexco Station Exit 7 Crosswalk' },
        { lat: 35.168538, lng: 129.138828, nameKr: '벡스코역 남측 올림픽교차로 횡단보도', nameEn: 'Bexco Station South Intersection Crosswalk' },
        { lat: 35.168988, lng: 129.139266, nameKr: '벡스코역 2·4번 출구 삼거리 횡단보도', nameEn: 'Bexco Station Exit 2/4 Intersection Crosswalk' },
        { lat: 35.169338, lng: 129.138922, nameKr: '올림픽교차로 북측 횡단보도', nameEn: 'Olympic Intersection North Crosswalk' }
      ];
    }
    
    if (crosswalkPoints.length > 0) {
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

        const crosswalkIcon = L.divIcon({
          html: crosswalkHtml,
          className: 'leaflet-custom-marker-wrapper',
          iconSize: [crosswalkMarkerWidth, crosswalkMarkerHeight],
          iconAnchor: [crosswalkMarkerWidth * 0.5, crosswalkMarkerHeight * 0.5]
        });

        const crosswalkMarker = L.marker([pt.lat, pt.lng], { icon: crosswalkIcon, title: titleText }).addTo(leafletMapInstance.current);
        leafletMarkersRef.current.push(crosswalkMarker);
      });
    }

  }, [station, leafletLoaded, useLeaflet, focusedExitCoords, language]);

  // Clean-up logic on unmount to release resources safely
  useEffect(() => {
    return () => {
      markersRef.current.forEach(m => {
        if (m) m.setMap(null);
      });
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col w-full bg-white overflow-hidden rounded-3xl border border-slate-100/80 transition-all duration-300">
      {/* Map display block */}
      <div className="w-full h-[320px] relative bg-slate-50 border-b border-slate-100 transition-all duration-300">
        
        {/* Floating Map Control Panel */}
        <div className="absolute top-3 left-3 z-[1000] flex gap-2">
          <button
            onClick={() => {
              setTempClientId(naverClientId || (import.meta as any).env?.VITE_NAVER_CLIENT_ID || 'jig5o1hthp');
              setShowSettings(!showSettings);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white shadow-md hover:shadow-lg rounded-full border border-slate-200/80 text-xs font-bold text-slate-700 hover:text-slate-900 transition-all cursor-pointer"
          >
            ⚙️ {language === 'KR' ? '지도 설정' : 'Map Settings'}
          </button>
          
          {useLeaflet && (
            <button
              onClick={() => {
                setUseLeaflet(false);
                setNaverAuthFailed(false);
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white shadow-md hover:bg-blue-700 rounded-full text-xs font-bold transition-all cursor-pointer"
            >
              🗺️ {language === 'KR' ? '네이버 지도로 변경' : 'Switch to Naver Map'}
            </button>
          )}
        </div>

        {/* Settings & Authorization Overlay */}
        {(showSettings || (naverAuthFailed && !useLeaflet)) && (
          <div className="absolute inset-0 bg-slate-900/95 z-[1001] flex flex-col p-5 overflow-y-auto text-slate-100 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h4 className="text-sm font-black tracking-tight text-white flex items-center gap-2">
                🟢 {language === 'KR' ? '네이버 지도 API 설정' : 'Naver Maps API Settings'}
              </h4>
              <button
                onClick={() => {
                  setShowSettings(false);
                  setNaverAuthFailed(false);
                }}
                className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition"
              >
                ✕ {language === 'KR' ? '닫기' : 'Close'}
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
              <p>
                {language === 'KR' ? (
                  <>
                    네이버 지도를 표시하려면 <strong>네이버 클라우드 플랫폼</strong>에 아래 웹 주소를 등록하셔야 합니다.
                  </>
                ) : (
                  <>
                    To display Naver Maps, you must register this app's Web Service URLs in your <strong>NAVER Cloud Platform</strong> settings.
                  </>
                )}
              </p>

              <div className="bg-slate-950 p-3 rounded-xl space-y-2 border border-slate-800">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-500 block">
                  {language === 'KR' ? '등록해야 할 웹 서비스 URL:' : 'Web Service URLs to register:'}
                </span>
                <div className="space-y-1.5 font-mono text-[11px] text-slate-400">
                  <div className="flex items-center justify-between gap-2 bg-slate-900 px-2 py-1 rounded">
                    <span>http://localhost:3000</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('http://localhost:3000');
                        alert(language === 'KR' ? '복사되었습니다!' : 'Copied!');
                      }}
                      className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-[10px] text-slate-300 cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-slate-900 px-2 py-1 rounded">
                    <span className="truncate">{window.location.origin}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.origin);
                        alert(language === 'KR' ? '복사되었습니다!' : 'Copied!');
                      }}
                      className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-[10px] text-slate-300 cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-black text-slate-200">
                  {language === 'KR' ? '네이버 Client ID 입력:' : 'Naver Client ID:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempClientId}
                    onChange={(e) => setTempClientId(e.target.value)}
                    placeholder="jig5o1hthp"
                    className="flex-1 bg-slate-950 text-white border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => {
                      localStorage.setItem('custom_naver_client_id', tempClientId.trim());
                      setNaverClientId(tempClientId.trim());
                      setShowSettings(false);
                      setNaverAuthFailed(false);
                      setUseLeaflet(false);
                      window.location.reload();
                    }}
                    className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                  >
                    {language === 'KR' ? '저장 및 적용' : 'Save & Apply'}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-between gap-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setUseLeaflet(true);
                    setShowSettings(false);
                    setNaverAuthFailed(false);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold py-2 px-3 rounded-xl transition text-center text-[11px] cursor-pointer"
                >
                  🌐 {language === 'KR' ? '대체 지도(Leaflet)로 계속 보기' : 'Use Fallback Leaflet Map'}
                </button>
                
                <button
                  onClick={() => {
                    localStorage.removeItem('custom_naver_client_id');
                    setNaverClientId('');
                    window.location.reload();
                  }}
                  className="text-slate-500 hover:text-slate-300 font-bold py-2 px-3 transition text-center text-[11px] cursor-pointer"
                >
                  🔄 {language === 'KR' ? '기본값 초기화' : 'Reset Default'}
                </button>
              </div>
            </div>
          </div>
        )}

        {loadError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-rose-50/20">
            <span className="text-3xl text-rose-500">🗺️</span>
            <p className="font-extrabold text-sm text-slate-800">
              {language === 'KR' ? '지도를 불러올 수 없습니다.' : 'Failed to initialize Map API.'}
            </p>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              {language === 'KR' 
                ? '지하철역 지도 정보를 표현하기 위한 자원 로드 중 문제가 발생했습니다.' 
                : 'Could not load interactive station map context.'}
            </p>
          </div>
        ) : useLeaflet ? (
          !leafletLoaded ? (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-xs font-bold text-slate-400">
                {language === 'KR' ? '실시간 인터랙티브 지도 준비 중...' : 'Initializing fallback maps...'}
              </p>
            </div>
          ) : (
            <div className="w-full h-full" ref={mapElement} id="subway-leaflet-map" />
          )
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
