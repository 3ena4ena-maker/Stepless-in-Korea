/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowUpRight, 
  Building
} from 'lucide-react';

interface TimelineVisualizerProps {
  directionDesc: string;
  exitNumber: string;
  stationName: string;
  onGoogleMap: () => void;
  onNaverMap: () => void;
  language: 'KR' | 'EN';
}

export default function TimelineVisualizer({
  directionDesc,
  exitNumber,
  stationName,
  onGoogleMap,
  onNaverMap,
  language
}: TimelineVisualizerProps) {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-[0_8px_32px_rgb(0,0,0,0.15)]">
      
      {/* HEADER SECTION WITH GOOGLE & NAVER MAP NAVIGATION LINKS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/60 pb-3.5 mb-4 gap-3 text-left">
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-heading text-white flex items-center gap-2">
            <span>{stationName} {exitNumber}</span>
            <span className="text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              {language === 'KR' ? '길찾기' : 'Search Map'}
            </span>
          </h3>
        </div>
        
        {/* Real Korean Integrations (Google Maps & Naver Map Search) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onGoogleMap}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            <span className="text-xs">🌐</span>
            <span>{language === 'KR' ? '구글맵' : 'Google Maps'}</span>
          </button>
          <button
            onClick={onNaverMap}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#03C75A] text-white hover:opacity-90 text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowUpRight className="w-3 h-3 text-white" />
            <span>{language === 'KR' ? '네이버 지도' : 'Naver Map'}</span>
          </button>
        </div>
      </div>

      {/* CORE DESTINATIONS SECTION */}
      <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800/60 text-left space-y-3">
        <div className="flex items-center gap-1.5 text-slate-200">
          <Building className="w-4 h-4 text-[#ffde43]" />
          <h4 className="text-xs sm:text-sm font-bold tracking-wide">
            {language === 'KR' ? '출구 일대 주요 목적지 및 공공장소' : 'Key Destinations & Public Areas'}
          </h4>
        </div>

        <div className="bg-slate-900 rounded-lg border border-slate-800/80 p-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {directionDesc.split(',').map((item, idx) => {
              const trimmed = item.trim();
              if (!trimmed) return null;
              
              return (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 bg-slate-950/40 px-3 py-2 rounded-lg border border-slate-800/45 hover:border-slate-700 transition-colors"
                >
                  <span className="text-emerald-500 text-xs shrink-0">📍</span>
                  <p className="text-xs sm:text-sm text-slate-100 font-sans font-bold tracking-tight truncate" title={trimmed}>
                    {trimmed}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
