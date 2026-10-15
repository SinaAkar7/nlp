import React from 'react';
import { BookMarked } from 'lucide-react';
import { useStorage } from '../context/StorageContext';

interface HeaderProps {
  activeTab: 'analyzer' | 'library' | 'batch' | 'profile';
  setActiveTab: (tab: 'analyzer' | 'library' | 'batch' | 'profile') => void;
  onNewAnalysisClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onNewAnalysisClick
}) => {
  const { savedBooks } = useStorage();

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f6]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face, no pills/taglines) */}
        <button
          onClick={() => setActiveTab('analyzer')}
          className="text-left cursor-pointer group"
          aria-label="Romanza NLP Ana Sayfa"
        >
          <span className="font-editorial text-2xl font-bold tracking-tight text-stone-900 group-hover:text-rose-900 transition-colors whitespace-nowrap shrink-0">
            Romanza NLP
          </span>
        </button>

        {/* Zone 2: 4 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              activeTab === 'analyzer'
                ? 'text-stone-900 border-rose-900 font-semibold'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            Metin Analizi
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              activeTab === 'library'
                ? 'text-stone-900 border-rose-900 font-semibold'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            Edebi Kütüphane
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              activeTab === 'batch'
                ? 'text-stone-900 border-rose-900 font-semibold'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            Toplu Analiz
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'text-stone-900 border-rose-900 font-semibold'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            <span>Profil & Arşiv</span>
            {savedBooks.length > 0 && (
              <span className="text-xs text-rose-950 font-sans tabular-nums font-semibold">
                ({savedBooks.length})
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNewAnalysisClick}
            className="px-4 py-2 text-xs font-semibold tracking-wide text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Kitap Analiz Et</span>
          </button>
        </div>
      </div>

      {/* Mobile nav rail */}
      <div className="md:hidden flex items-center justify-around px-4 py-2.5 border-t border-stone-200 bg-[#fbf9f6] text-xs font-medium text-stone-600">
        <button
          onClick={() => setActiveTab('analyzer')}
          className={`cursor-pointer whitespace-nowrap py-1 ${activeTab === 'analyzer' ? 'text-rose-900 font-bold' : ''}`}
        >
          Analiz
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`cursor-pointer whitespace-nowrap py-1 ${activeTab === 'library' ? 'text-rose-900 font-bold' : ''}`}
        >
          Kütüphane
        </button>
        <button
          onClick={() => setActiveTab('batch')}
          className={`cursor-pointer whitespace-nowrap py-1 ${activeTab === 'batch' ? 'text-rose-900 font-bold' : ''}`}
        >
          Toplu
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`cursor-pointer whitespace-nowrap py-1 ${activeTab === 'profile' ? 'text-rose-900 font-bold' : ''}`}
        >
          Profil ({savedBooks.length})
        </button>
      </div>
    </header>
  );
};
