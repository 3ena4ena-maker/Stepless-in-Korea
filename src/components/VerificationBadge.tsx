import React from 'react';
import { CheckCircle2, ExternalLink, UserCheck, Calendar } from 'lucide-react';
import { getTodayDateKR } from '../utils';

interface VerificationBadgeProps {
  language?: 'KR' | 'EN';
  className?: string;
  stationName?: string;
  variant?: 'card' | 'inline' | 'compact';
}

export function VerificationBadge({ 
  language = 'KR', 
  className = '', 
  stationName,
  variant = 'card'
}: VerificationBadgeProps) {
  const todayStr = getTodayDateKR();
  const naverSearchUrl = stationName 
    ? `https://map.naver.com/v5/search/${encodeURIComponent(stationName)}`
    : 'https://map.naver.com';

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-slate-500 ${className}`}>
        <span className="font-bold text-slate-700 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>{language === 'KR' ? '모든 현장 가본 검증 정보' : 'Field Verified Data'}</span>
        </span>
        <span className="text-slate-300">|</span>
        <span>조사자: <strong className="text-slate-700 font-medium">플로레르</strong></span>
        <span className="text-slate-300">|</span>
        <span>최근 조사일: <strong className="text-slate-700 font-medium">{todayStr} 기준</strong> <span className="text-blue-600">(매일 자동 업데이트)</span></span>
        <span className="text-slate-300">|</span>
        <span>
          공식 출처:{' '}
          <a 
            href={naverSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium underline inline-flex items-center gap-0.5"
          >
            <span>네이버지도</span>
            <ExternalLink className="w-2.5 h-2.5 text-blue-600" />
          </a>
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-emerald-50/90 via-slate-50 to-blue-50/80 border border-emerald-200/80 rounded-2xl p-3.5 sm:p-4 text-xs text-slate-700 shadow-xs ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-extrabold text-emerald-900 bg-emerald-100/90 px-3 py-1 rounded-xl border border-emerald-300/80 shadow-2xs text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{language === 'KR' ? '현장 가본 검증 정보' : 'Directly Visited & Field Verified'}</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-700">
          <span className="inline-flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>조사자: <strong className="text-slate-900 font-black">플로레르</strong></span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>최근 조사일: <strong className="text-slate-900 font-black">{todayStr} 기준</strong></span>
            <span className="text-xs text-[#004481] font-bold">(매일 자동 업데이트)</span>
          </span>
          <span className="text-slate-300">|</span>
          <span>
            공식 출처: {' '}
            <a
              href={naverSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-black underline inline-flex items-center gap-0.5"
            >
              <span>{language === 'KR' ? '네이버지도' : 'Naver Map'}</span>
              <ExternalLink className="w-3 h-3 text-blue-600" />
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
