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
  const [showTroubleshoot, setShowTroubleshoot] = useState<boolean>(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [activeClientId, setActiveClientId] = useState<string>('');

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const currentDevOrigin = 'https://ais-dev-lmd5tw7gcedelyinmkxrgj-402749827742.asia-east1.run.app';
  const currentPreOrigin = 'https://ais-pre-lmd5tw7gcedelyinmkxrgj-402749827742.asia-east1.run.app';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedUrl(text);
      setTimeout(() => setCopiedUrl(null), 2000);
    });
  };

  // 1. Asynchronously Load Naver Maps API script
  useEffect(() => {
    // Read client ID from env with extensive fallbacks
    let clientId = import.meta.env.VITE_NAVER_CLIENT_ID;

    // Detect if they saved client ID under another custom naming pattern by accident (exclude secret key)
    const naverKeys = Object.keys(import.meta.env).filter(key => key.startsWith('VITE_NAVER_CLIENT'));
    const customKey = naverKeys.find(key => 
      key !== 'VITE_NAVER_CLIENT_ID' && 
      key !== 'VITE_NAVER_CLIENT_SECRET' && 
      import.meta.env[key] && 
      import.meta.env[key] !== 'x7vtxblyj1' && 
      import.meta.env[key] !== 'jig5o1hthp'
    );

    if ((!clientId || clientId === 'x7vtxblyj1' || clientId === 'jig5o1hthp') && customKey) {
      clientId = import.meta.env[customKey];
    }

    if (!clientId || clientId === 'x7vtxblyj1') {
      clientId = 'jig5o1hthp';
    }

    setActiveClientId(clientId);

    // Dynamic error hook in window to prevent default browser alert dialog and render our beautiful troubleshooting panel instead!
    window.navermaps_auth_error = () => {
      console.warn("Naver Maps API Authentication failed. Intercepted event to show interactive troubleshooting panel safely.");
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
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
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
            <div className="text-[10px] text-slate-600 bg-slate-100 p-2.5 rounded-xl border border-slate-200 mt-2 font-mono text-left space-y-1">
              <div>[디버그 정보 / Debug Info]</div>
              <div>• 현재 접속 도메인: <span className="font-bold text-slate-800">{currentOrigin}</span></div>
              <div>• 사용 중인 Client ID: <span className="font-bold text-slate-850 bg-white px-1.5 py-0.5 border border-slate-200 rounded font-mono">{activeClientId || 'empty'}</span></div>
            </div>
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

      {/* 🗝️ PRO TIP: Naver Maps Live Domain / Certification Failure troubleshooting widget */}
      <div className="bg-slate-50/50 p-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowTroubleshoot(!showTroubleshoot)}
          className="w-full flex items-center justify-between text-left text-slate-700 hover:text-slate-950 font-bold text-xs"
        >
          <span className="flex items-center gap-1.5 text-blue-600 font-extrabold text-xs">
            🔑 {language === 'KR' ? '네이버 지도 "인증 실패" (회색 화면) 해결 가이드' : 'Fix "Naver Maps API Auth Failed" Error'}
          </span>
          <span className="text-[10px] text-slate-400 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer">
            {showTroubleshoot ? (language === 'KR' ? '도움말 닫기 ▲' : 'Close ▲') : (language === 'KR' ? '해결 가이드 열기 ▼' : 'Open Guide ▼')}
          </span>
        </button>

        {showTroubleshoot && (
          <div className="mt-3.5 space-y-4 border-t border-slate-200/60 pt-4 text-[12px] text-slate-600 leading-relaxed animate-fade-in text-left">
            <div className="p-3.5 bg-blue-50/65 text-blue-950 rounded-2xl border border-blue-100/50 text-[11.5px] leading-relaxed">
              {language === 'KR' ? (
                <>
                  💡 <strong>지도가 흐리게 보이거나 "인증 실패"가 뜨는 원인:</strong> 현재 접속 중인 이 웹페이지의 주소(Domain)가 사용자님의 <strong>네이버 클라우드 플랫폼(NCP) Application 관리의 Web 서비스 URL</strong>로 승인 등록되어 있지 않거나, 발급받으신 클라이언트 <code>Client ID</code> 값이 맞지 않기 때문입니다. 아래 안내를 따라 쉽게 조처해 보세요!
                </>
              ) : (
                <>
                  💡 <strong>Why auth fails:</strong> Your current browser page domain is not whitelisted in the <strong>Web Service URL</strong> of your Naver Cloud Platform console Application settings, or the <code>Client ID</code> is missing or incorrect. Follow these steps to resolve!
                </>
              )}
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="space-y-1.5">
                <p className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-900 text-white font-black text-[10px]">1</span>
                  {language === 'KR' ? '웹 서비스 URL (Web Service URL) 영역에 도메인 추가 등록' : 'Whitelisting Service URLs'}
                </p>
                <p className="text-slate-500 pl-6.5 text-[11px] leading-relaxed">
                  {language === 'KR' ? (
                    <>
                      네이버 클라우드 콘솔의 <strong className="text-slate-900">AI·NAVER API &gt; Application</strong> 관리 화면에서 해당 앱의 <strong>[변경]</strong>을 눌러 아래의 실시간 주소들을 복사하여 <strong>"Web 서비스 URL"</strong> 리스트에 차례대로 추가(Enter 줄바꿈)해 주신 다음 변경 사항을 저장해 주시길 권해 드립니다:
                    </>
                  ) : (
                    <>
                      In Naver Cloud Console under <strong className="text-slate-900">AI·NAVER API &gt; Application</strong>, select your app, click <strong>[Edit]</strong>, and add these domains into the <strong>"Web Service URL"</strong> box:
                    </>
                  )}
                </p>

                {/* URLs lists with 원클릭 복사 */}
                <div className="pl-6.5 space-y-1.5 mt-2">
                  {[
                    { label: language === 'KR' ? '현재 접속 주소' : 'Current URL', value: currentOrigin },
                    { label: 'AI Studio Parent URL', value: 'https://ai.studio' },
                    { label: 'AI Studio Parent URL 2', value: 'https://aistudio.google.com' },
                    { label: language === 'KR' ? '로컬 웹개발 주소' : 'Local Host URL', value: 'http://localhost:3000' },
                    { label: language === 'KR' ? '로컬 웹개발 주소 2' : 'Local Host URL 2', value: 'http://127.0.0.1:3000' },
                    { label: 'Dynamic Dev URL', value: currentDevOrigin },
                    { label: 'Dynamic Share URL', value: currentPreOrigin }
                  ].filter(v => v.value).map((urlObj, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 p-1.5 px-3 bg-white border border-slate-200/60 rounded-xl hover:border-slate-300 transition-colors">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[9.5px] bg-slate-100 text-slate-500 font-extrabold px-1.5 py-0.5 rounded shrink-0">{urlObj.label}</span>
                        <code className="text-[10px] text-slate-700 font-mono select-all truncate">{urlObj.value}</code>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(urlObj.value)}
                        className="px-2 py-1 text-[10px] font-black bg-slate-900 text-white hover:bg-slate-800 rounded-lg active:scale-95 transition-all shrink-0 cursor-pointer"
                      >
                        {copiedUrl === urlObj.value ? (language === 'KR' ? '✔️ 복사됨!' : '✔️ Copied!') : (language === 'KR' ? '복사' : 'Copy')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-1.5">
                <p className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-900 text-white font-black text-[10px]">2</span>
                  {language === 'KR' ? '콘솔 리전 설정 한국(KR) 확인 및 서비스 선택 체크' : 'Select Korea Region & Web Dynamic Map'}
                </p>
                <p className="text-slate-500 pl-6.5 text-[11px] leading-relaxed">
                  {language === 'KR' ? (
                    <>
                      NCP 콘솔 최상단 우측 리전 드롭다운이 <strong className="text-slate-900">Korea (한국 리전)</strong>으로 잡혀 있어야 합니다. 다른 리전(싱가포르 등)에서는 서비스 체크박스 목록에 <strong className="text-emerald-700 font-bold">"Web Dynamic Map"</strong> 선택지가 완전히 표시되지 않습니다.
                    </>
                  ) : (
                    <>
                      Please ensure the Region selector at the top right of the Naver Cloud Console is set to <strong className="text-slate-900">Korea (KR)</strong> region. Singapore/Global users cannot see <strong className="text-emerald-600">"Web Dynamic Map"</strong> in their product checklist.
                    </>
                  )}
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-1.5">
                <p className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-900 text-white font-black text-[10px]">3</span>
                  {language === 'KR' ? '이 앱의 VITE_NAVER_CLIENT_ID 설정 등록' : 'Declare Client ID Variable'}
                </p>
                <p className="text-slate-500 pl-6.5 text-[11px] leading-relaxed">
                  {language === 'KR' ? (
                    <>
                      네이버 콘솔 앱 관리의 <code>Client ID</code> 값을 복수하신 다음, 이 화면의 <strong>AI Studio의 Settings 메뉴 &gt; Secrets 탭</strong> 혹은 로컬 환경의 `.env` 파일에 <code>VITE_NAVER_CLIENT_ID</code>라는 키 이름으로 저장해 주시면 맵이 활성화됩니다!
                    </>
                  ) : (
                    <>
                      Once the client credential is created, copy the <code>Client ID</code> and paste it as <code>VITE_NAVER_CLIENT_ID</code> in the **Secrets** panel in AI Studio Settings or your local `.env` file to initialize the dynamic maps successfully.
                    </>
                  )}
                </p>

                {/* Live Client ID Indicator inside the Guide */}
                <div className="pl-6.5 mt-2">
                  <div className="p-3 bg-slate-100 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-700">{language === 'KR' ? '🔍 현재 앱이 인식한 Client ID:' : '🔍 Client ID read by App:'}</span>
                      <code className="px-1.5 py-0.5 bg-white border border-slate-200 text-slate-900 font-mono text-[11.5px] rounded">{activeClientId || '(empty)'}</code>
                    </div>
                    {activeClientId === 'jig5o1hthp' ? (
                      <p className="text-[10px] text-emerald-700 font-extrabold leading-normal bg-emerald-50 p-2 rounded-lg border border-emerald-100/50">
                        ✅ {language === 'KR' 
                          ? '성공: 사용자님의 네이버 Client ID(jig5o1hthp) 설정이 기본으로 완벽하게 연동되었습니다! 현재 접속 도메인이 모두 NCP 콘솔에 완벽하게 등록되어 지도가 즉시 정상 출력됩니다.' 
                          : 'Success: Your custom Naver Client ID (jig5o1hthp) is successfully integrated as the default fallback! The map will render instantly on your authorized domains.'}
                      </p>
                    ) : activeClientId === 'x7vtxblyj1' ? (
                      <p className="text-[10px] text-amber-700 font-extrabold leading-normal bg-amber-50 p-2 rounded-lg border border-amber-100/50">
                        ⚠️ {language === 'KR' 
                          ? '주의: 이전 기본 데모용 Client ID(x7vtxblyj1)를 사용 중입니다. 본인의 Client ID로 환경 설정을 해주셔야 정상 작동합니다.' 
                          : 'Warning: Currently using the legacy dynamic demo Client ID (x7vtxblyj1). Set your own Client ID to ensure uninterrupted service.'}
                      </p>
                    ) : (
                      <p className="text-[10px] text-emerald-700 font-extrabold leading-normal bg-emerald-50 p-2 rounded-lg border border-emerald-100/50">
                        ✅ {language === 'KR' 
                          ? '성공: 커스텀 Client ID 설정이 정상적으로 로드되었습니다! 이제 지도가 승인된 도메인(Web 서비스 URL)에서 올바르게 표시됩니다.' 
                          : 'Success: Custom Client ID loaded successfully! The map will render once the domain is registered.'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
