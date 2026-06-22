/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Train, Globe, Menu, X, Landmark, Compass, HelpCircle, Calendar } from 'lucide-react';

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
    { id: 'search', label: language === 'KR' ? '검색 및 출구 정보' : 'Station Info', icon: Train },
    { id: 'schedule', label: language === 'KR' ? '부산 주요일정표' : 'Busan Schedule', icon: Calendar },
    { id: 'tips', label: language === 'KR' ? '여행 팁' : 'Travel Tips', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
            id="header-logo-container"
          >
            <div className="p-2 rounded-xl bg-gradient-to-tr from-[#004481] to-[#1b6d24] text-white group-hover:scale-105 transition-transform shadow-sm">
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
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-[#004481] bg-slate-50'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#004481] fill-[#004481]/10' : ''}`} />
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 font-sans hover:border-slate-300 font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{language === 'KR' ? 'KR' : 'EN'}</span>
            </button>
            <a
              href="https://www.humetro.busan.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-[#004481] hover:bg-[#003566] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              釜山교통공사
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              {language === 'KR' ? 'EN' : 'KR'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id || (item.id === 'tips' && currentTab.startsWith('itinerary-'));
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-btn-${item.id}`}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2.5 w-full px-4 py-3 rounded-xl text-base font-semibold ${
                    isActive
                      ? 'text-[#004481] bg-blue-50/50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-3 border-t border-slate-100 px-4 flex justify-between items-center">
              <span className="text-xs text-slate-400">Busan humetro helper</span>
              <a
                href="https://www.humetro.busan.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#004481] hover:underline"
              >
                Humetro 공항/철도 조회
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
