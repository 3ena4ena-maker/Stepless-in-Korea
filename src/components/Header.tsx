/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Train, Globe, Menu, X, Landmark, Compass, HelpCircle, Calendar, Info } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: 'KR' | 'EN';
  toggleLanguage: () => void;
}

export default function Header({ currentTab, setCurrentTab, language, toggleLanguage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { id: 'home', label: language === 'KR' ? '홈' : 'Home', icon: Compass },
    { id: 'search', label: language === 'KR' ? '출구 정보 및 역 검색' : 'Station Info', icon: Train },
    { id: 'schedule', label: language === 'KR' ? '부산 주요일정표' : 'Busan Schedule', icon: Calendar },
    { id: 'tips', label: language === 'KR' ? '여행 팁' : 'Travel Tips', icon: HelpCircle },
    { id: 'about', label: language === 'KR' ? '사이트 소개' : 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => {
              window.scrollTo(0, 0);
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
              setCurrentTab('home');
            }} 
            className="flex items-center gap-2.5 cursor-pointer group"
            id="header-logo-container"
          >
            <div className="p-2 rounded-xl bg-gradient-to-tr from-[#004481] to-[#1b6d24] text-white group-hover:scale-105 transition-transform shadow-xs">
              <Train className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold font-heading tracking-tight text-slate-800 flex items-center gap-1.5">
                Stepless <span className="text-xs bg-emerald-50 text-emerald-700 font-sans px-2 py-0.5 rounded-full font-bold">Busan</span>
              </span>
              <p className="text-[10px] text-slate-400 font-sans font-medium -mt-1">
                계단 없는 최적의 부산 지하철 길잡이
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1" aria-label="Global Navigation">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id || (item.id === 'tips' && currentTab.startsWith('itinerary-'));
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    setCurrentTab(item.id);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#004481] bg-blue-50/90 border border-blue-100 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#004481]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              id="lang-toggle-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 font-sans hover:border-slate-300 font-extrabold transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{language === 'KR' ? 'KR' : 'EN'}</span>
            </button>
            <a
              href="https://www.humetro.busan.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-[#004481] hover:bg-[#003566] text-white text-xs font-extrabold shadow-2xs transition-colors"
            >
              釜山교통공사
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 min-h-[40px] text-xs font-bold rounded-xl border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{language === 'KR' ? 'EN' : 'KR'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-h-[44px] min-w-[44px] rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>



      {/* Mobile Full Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-b border-slate-200/90 shadow-xl animate-fade-in">
          <div className="px-3 pt-2 pb-4 space-y-1.5 sm:px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id || (item.id === 'tips' && currentTab.startsWith('itinerary-'));
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-btn-${item.id}`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-sm sm:text-base font-bold transition-all min-h-[48px] active:scale-[0.99] cursor-pointer ${
                    isActive
                      ? 'text-[#004481] bg-blue-50/80 border border-blue-100/80 shadow-2xs'
                      : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#004481]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-3 border-t border-slate-100 px-3 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Busan humetro helper</span>
              <a
                href="https://www.humetro.busan.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#004481] hover:underline flex items-center gap-1 py-1"
              >
                <span>Humetro 공식 홈페이지</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
