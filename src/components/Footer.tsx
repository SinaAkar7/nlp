import React from 'react';

interface FooterProps {
  onNavClick: (tab: 'analyzer' | 'library' | 'batch' | 'profile') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="border-t border-stone-200 bg-[#f7f5f1] py-10 px-6 text-stone-600 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-editorial text-xl font-bold text-stone-900 block">
            Romanza NLP
          </span>
          <p className="text-xs text-stone-500 mt-1 max-w-sm">
            Edebi tür tespiti ve romantizm analizi için geliştirilmiş istemci taraflı doğal dil işleme platformu.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-stone-600">
          <button
            onClick={() => onNavClick('analyzer')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Metin Analizi
          </button>
          <button
            onClick={() => onNavClick('library')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Kütüphane
          </button>
          <button
            onClick={() => onNavClick('batch')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Toplu Analiz
          </button>
          <button
            onClick={() => onNavClick('profile')}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Profil & Arşiv
          </button>
        </div>

        <div className="text-xs text-stone-400">
          © {new Date().getFullYear()} Romanza NLP · Statik Metin Sınıflandırıcı
        </div>
      </div>
    </footer>
  );
};
