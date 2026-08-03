import React from 'react';

export interface LockerCount {
  small: number;
  med?: number;
  large?: number;
  xlarge?: number;
}

export const STATION_LOCKER_DATA: Record<string, Record<string, LockerCount> | LockerCount> = {
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
  jagalchi: { small: 34, med: 42, large: 4, xlarge: 27 },
  geumnyeonsan: { small: 18, large: 8, xlarge: 4 },
  dongbaek: { small: 12, large: 6, xlarge: 2 },
  bexco: {
    '2': { small: 32, large: 16, xlarge: 12 },
    '동해': { small: 10, large: 4, xlarge: 4 }
  }
};

export const formatLockerCount = (data: LockerCount, lang: 'KR' | 'EN'): string => {
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

export const getLockerInfoText = (stationId: string, language: 'KR' | 'EN'): string => {
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

export const renderLockerBadges = (data: LockerCount, lang: 'KR' | 'EN'): React.ReactNode => {
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
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 justify-start sm:justify-end">
      {categories.map(({ key, labelKR, labelEN, badgeClass, numClass }) => {
        const val = data[key];
        if (!val) return null;
        const label = lang === 'KR' ? labelKR : labelEN;
        return (
          <span 
            key={key} 
            className={`inline-flex items-center px-2 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-[12px] font-sans font-bold border ${badgeClass} shadow-2xs transition-all duration-150 hover:scale-105`}
          >
            <span className="opacity-80 font-medium mr-1 text-[10px] sm:text-[11px]">{label}</span>
            <span className={`font-black text-xs sm:text-sm tracking-tight ${numClass}`}>{val}</span>
          </span>
        );
      })}
    </div>
  );
};

export const renderLockerInfo = (stationId: string, language: 'KR' | 'EN'): React.ReactNode => {
  const data = STATION_LOCKER_DATA[stationId];
  if (!data) {
    return (
      <div className="flex items-center py-1 text-slate-400 font-medium text-xs">
        {language === 'KR' ? '역내 보관함 정보 미비 / 현장 확인 필요' : 'No locker data available'}
      </div>
    );
  }

  const isMultiLine = '1' in data || '2' in data || '3' in data || '동해' in data;
  if (isMultiLine) {
    const multi = data as Record<string, LockerCount>;
    return (
      <div className="flex flex-col gap-2 w-full">
        {Object.entries(multi).map(([line, counts]) => {
          const lineStr = language === 'KR' 
            ? (line === '동해' ? '동해선' : `${line}호선`) 
            : (line === '동해' ? 'Donghae' : `Line ${line}`);
          return (
            <div key={line} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 w-full pb-1.5 last:pb-0 border-b border-dashed border-slate-200/60 last:border-0">
              <span className="text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[#004481] inline-self-start sm:self-center w-max shrink-0">
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
      <div className="flex justify-start sm:justify-end w-full">
        {renderLockerBadges(data as LockerCount, language)}
      </div>
    );
  }
};
