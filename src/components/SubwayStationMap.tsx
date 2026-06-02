import React, { useEffect, useRef, useState } from 'react';
import { Station } from '../types';

interface SubwayStationMapProps {
  station: Station;
  language: 'KR' | 'EN';
}

declare global {
  interface Window {
    naver?: any;
    navermaps_auth_error?: () => void;
  }
}

export default function SubwayStationMap({ station, language }: SubwayStationMapProps) {
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

    // Calculate map focus center dynamically using mathematical average coordinate of all exits
    let totalLat = 0;
    let totalLng = 0;
    exits.forEach(exit => {
      totalLat += exit.latitude;
      totalLng += exit.longitude;
    });
    const centerLat = totalLat / exits.length;
    const centerLng = totalLng / exits.length;

    const mapCenter = new window.naver.maps.LatLng(centerLat, centerLng);

    // Initialise Naver Map instantiation if not built already
    if (!mapInstance.current) {
      mapInstance.current = new window.naver.maps.Map(mapElement.current, {
        center: mapCenter,
        zoom: 16,
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
      mapInstance.current.setZoom(16);
    }

    // Reset previous loaded markers to avoid rendering duplication
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    // Map exits and build markers
    exits.forEach(exit => {
      let emoji = '👟';
      if (exit.hasElevator) emoji = '🛗';
      else if (exit.hasEscalator) emoji = '🪜';

      const line = station.lines[0];
      let mapAccentColor = '#004481'; // default 블루
      if (line === '2') mapAccentColor = '#1b6d24'; // 초록
      else if (line === '동해') mapAccentColor = '#004960'; // 동해 블루

      // Styled custom HTML content conforming to strict anchor constraints
      // Utilizing relative space and absolute translate offset to pivot exactly at bottom-center of triangle pin
      const markerContent = `
        <div style="position: relative; pointer-events: none;">
          <div style="position: absolute; transform: translate(-50%, -100%); display: flex; flex-direction: column; align-items: center; pointer-events: none;">
            <!-- Premium bubble label containing exit name and its mobility emoji -->
            <div style="background-color: white; border: 2.5px solid ${mapAccentColor}; border-radius: 9999px; padding: 5px 12px; font-weight: 850; font-size: 11px; white-space: nowrap; box-shadow: 0 4px 12px rgba(0,0,0,0.18); display: flex; align-items: center; gap: 4.5px; pointer-events: auto; transform: scale(1.0); transition: transform 0.2s ease-in-out;">
              <span style="font-size: 13px; line-height: 1;">${emoji}</span>
              <span style="color: #0f172a; font-family: system-ui, sans-serif; letter-spacing: -0.02e; font-weight: 900;">${exit.number}</span>
            </div>
            <!-- Pin Arrow Indicator -->
            <div style="width: 0; height: 0; border-left: 6.5px solid transparent; border-right: 6.5px solid transparent; border-top: 7px solid ${mapAccentColor}; margin-top: -1px; pointer-events: none;"></div>
          </div>
        </div>
      `;

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(exit.latitude, exit.longitude),
        map: mapInstance.current,
        icon: {
          content: markerContent,
          anchor: new window.naver.maps.Point(0, 0)
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

  }, [station, scriptLoaded]);

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
    </div>
  );
}
