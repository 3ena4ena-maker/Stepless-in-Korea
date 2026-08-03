import React from 'react';
import { Station } from '../types';
import { VerificationBadge } from './VerificationBadge';
import { Train, Clock, MapPin, AlertTriangle, ArrowRightLeft, ShieldCheck, CheckCircle2, Box, Compass } from 'lucide-react';
import { renderLockerInfo } from '../data/lockers';
import { getNearbyPlaces, NearbyExitBadge } from '../data/nearbyPlaces';

interface StationBarrierFreeCardProps {
  station: Station;
  language?: 'KR' | 'EN';
}

export function StationBarrierFreeCard({ station, language = 'KR' }: StationBarrierFreeCardProps) {
  const lineLabels = station.lines.map(l => `${l}호선`).join(' · ');
  const nearbyPlaces = getNearbyPlaces(station.id, language);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-5 sm:p-7 space-y-6 text-left my-6" id={`station-summary-${station.id}`}>
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#004481] text-white shadow-xs">
              <Train className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              {station.name} {language === 'KR' ? '배리어프리 이동 정보' : 'Barrier-Free Path Info'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            {lineLabels} {station.isTransferStation ? '(환승역)' : ''} — 계단 회피 및 엘리베이터 동선
          </p>
        </div>

        <a
          href={`https://map.naver.com/v5/search/${encodeURIComponent(station.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200/70 px-4 py-2 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1"
        >
          <span>네이버지도에서 {station.name} 보기</span>
        </a>
      </div>

      {/* Summary Table & Step-by-Step Info */}
      <div className="space-y-4">
        <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#004481]" />
          <span>{station.name} 핵심 배리어프리 요약표</span>
        </h3>

        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-2xs">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <tbody>
              {/* 1. 역명 */}
              <tr className="border-b border-slate-150 bg-slate-50/60">
                <th className="py-2.5 px-2.5 sm:py-3 sm:px-4 font-bold text-slate-900 w-24 sm:w-32 bg-slate-100/80 border-r border-slate-200/80 shrink-0 text-2xs sm:text-xs">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Train className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#004481] shrink-0" />
                    <span>역명</span>
                  </div>
                </th>
                <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-slate-800 font-extrabold text-xs sm:text-sm">
                  <p>{station.name} ({lineLabels} {station.isTransferStation ? '환승역' : '단일노선'})</p>
                </td>
              </tr>

              {/* 2. 추천 출구 번호 */}
              <tr className="border-b border-slate-150">
                <th className="py-2.5 px-2.5 sm:py-3 sm:px-4 font-bold text-slate-900 bg-slate-100/80 border-r border-slate-200/80 shrink-0 text-2xs sm:text-xs">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                    <span>출구 번호</span>
                  </div>
                </th>
                <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-slate-800 font-bold text-xs sm:text-sm">
                  <p>{station.recommendedExits || '지상 엘리베이터 완비 출구'}</p>
                </td>
              </tr>

              {/* 3. 엘리베이터 위치 */}
              <tr className="border-b border-slate-150 bg-slate-50/60">
                <th className="py-2.5 px-2.5 sm:py-3 sm:px-4 font-bold text-slate-900 bg-slate-100/80 border-r border-slate-200/80 shrink-0 text-2xs sm:text-xs">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#004481] shrink-0" />
                    <span>엘리베이터 위치</span>
                  </div>
                </th>
                <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-slate-700 font-medium space-y-1.5 text-xs sm:text-sm">
                  {/* Primary Summary Text */}
                  <p className="font-bold text-slate-900">
                    {station.elevatorLocationDesc || '지상 ↔ 개찰구 직통 엘리베이터 구역'}
                  </p>
                  
                  {/* Detailed Elevator Exits from Station Exits Data */}
                  {station.exits && station.exits.filter(e => e.hasElevator).length > 0 && (
                    <div className="pt-1 flex flex-col gap-1 text-2xs sm:text-xs">
                      {station.exits.filter(e => e.hasElevator).map((exit, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-slate-700 bg-white/80 px-2 py-1 rounded-lg border border-slate-200/70">
                          <span className="font-extrabold text-[#004481] shrink-0">📍 {exit.number}:</span>
                          <span className="font-medium text-slate-800">{exit.directionDesc || exit.tip || '지상 연결 엘리베이터 운행'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </td>
              </tr>

              {/* 4. 이동 시간 */}
              <tr className="border-b border-slate-150">
                <th className="py-2.5 px-2.5 sm:py-3 sm:px-4 font-bold text-slate-900 bg-slate-100/80 border-r border-slate-200/80 shrink-0 text-2xs sm:text-xs">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
                    <span>이동 시간</span>
                  </div>
                </th>
                <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-slate-700 font-medium text-xs sm:text-sm">
                  <p>{station.avgMovementTime || '도보 약 2분 소요'}</p>
                </td>
              </tr>

              {/* 5. 환승 동선 */}
              <tr className="border-b border-slate-150 bg-slate-50/60">
                <th className="py-2.5 px-2.5 sm:py-3 sm:px-4 font-bold text-slate-900 bg-slate-100/80 border-r border-slate-200/80 shrink-0 text-2xs sm:text-xs">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <ArrowRightLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
                    <span>환승 동선</span>
                  </div>
                </th>
                <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-slate-700 font-medium text-xs sm:text-sm">
                  <p>{station.transferRouteDesc || '개찰구에서 승강장까지 엘리베이터 무단차 연결'}</p>
                </td>
              </tr>

              {/* 6. 물품보관함 */}
              <tr className="border-b border-slate-150">
                <th className="py-2.5 px-2.5 sm:py-3 sm:px-4 font-bold text-slate-900 bg-slate-100/80 border-r border-slate-200/80 shrink-0 text-2xs sm:text-xs">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Box className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 shrink-0" />
                    <span>물품보관함</span>
                  </div>
                </th>
                <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-slate-700 font-medium text-xs sm:text-sm">
                  {renderLockerInfo(station.id, language)}
                </td>
              </tr>

              {/* 7. 주변 가볼 만한 곳 */}
              <tr className="border-b border-slate-150 bg-sky-50/40">
                <th className="py-2.5 px-2.5 sm:py-3 sm:px-4 font-bold text-slate-900 bg-slate-100/80 border-r border-slate-200/80 shrink-0 text-2xs sm:text-xs">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-700 shrink-0" />
                    <span>{language === 'KR' ? '주변 가볼 만한 곳' : 'Nearby Places'}</span>
                  </div>
                </th>
                <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-slate-800 font-medium text-xs sm:text-sm">
                  {nearbyPlaces.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {nearbyPlaces.map((place, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/90 p-2.5 px-3 rounded-xl border border-sky-100 shadow-2xs">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-extrabold text-slate-900 text-xs sm:text-[13px]">
                              {place.name}
                            </span>
                            <span className="text-slate-600 text-[11px] sm:text-xs">
                              {place.desc}
                            </span>
                          </div>
                          {place.exits && place.exits.length > 0 && (
                            <div className="flex flex-wrap gap-1 items-center shrink-0">
                              {place.exits.map((ex, exIdx) => (
                                <NearbyExitBadge
                                  key={exIdx}
                                  num={ex.num}
                                  type={ex.type}
                                  line={station.lines[0]}
                                  language={language}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs">{language === 'KR' ? '주변 주요 명소 정보 준비 중' : 'Nearby places info coming soon'}</span>
                  )}
                </td>
              </tr>

              {/* 8. 주의사항 */}
              <tr className="bg-amber-50/50">
                <th className="py-3 px-4 font-bold text-amber-900 bg-amber-100/70 border-r border-amber-200/70">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>주의사항</span>
                  </div>
                </th>
                <td className="py-3 px-4 text-amber-900 font-medium">
                  <p>{station.precautions || '혼잡 시간대 대기시간을 고려하여 여유 있게 이동하십시오.'}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dynamic Field Verification Badge right below Caution */}
        <VerificationBadge language={language} stationName={station.name} variant="compact" />
      </div>

      {/* Step-by-Step Movement Guidelines (1 Paragraph per Step Requirement) */}
      <div className="pt-2 space-y-3">
        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <span>🚶‍♂️</span>
          <span>{station.name} 단계별 이동 가이드</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1 text-xs">
            <div className="font-extrabold text-[#004481] flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-[#004481] text-white flex items-center justify-center text-2xs">1</span>
              <span>지상 출입구 접근</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              {station.recommendedExits} 지상 엘리베이터를 이용해 횡단보도 단차 없이 인도에서 바로 승강기에 탑승합니다.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1 text-xs">
            <div className="font-extrabold text-[#004481] flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-[#004481] text-white flex items-center justify-center text-2xs">2</span>
              <span>대합실 및 게이트 이동</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              지하 1층 대합실 엘리베이터에서 내린 후 휠체어·유모차 전용 와이드 개찰구를 통과합니다.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1 text-xs">
            <div className="font-extrabold text-[#004481] flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-[#004481] text-white flex items-center justify-center text-2xs">3</span>
              <span>승강장 탑승</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              플랫폼 연결 승강기를 타고 지하 승강장으로 내려가 탑승 위치(교통약자 우대 구역)에서 안전하게 열차에 탑승합니다.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
