/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { StorageProvider } from './context/StorageContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AnalyzerSection } from './components/AnalyzerSection';
import { LibrarySection } from './components/LibrarySection';
import { BatchAnalyzerSection } from './components/BatchAnalyzerSection';
import { ProfileSection } from './components/ProfileSection';
import { BookDetailModal } from './components/BookDetailModal';
import { Footer } from './components/Footer';
import { NLPAnalysisResult } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'library' | 'batch' | 'profile'>('analyzer');
  const [analyzerTitle, setAnalyzerTitle] = useState('Aşk ve Gurur');
  const [analyzerAuthor, setAnalyzerAuthor] = useState('Jane Austen');
  const [analyzerBlurb, setAnalyzerBlurb] = useState(
    'Elizabeth Bennet ile gururlu Bay Darcy arasındaki zekâ dolu söz düelloları ve engelleri aşan tutkulu aşk.'
  );
  const [modalAnalysis, setModalAnalysis] = useState<NLPAnalysisResult | null>(null);

  const analyzerRef = useRef<HTMLDivElement>(null);

  const handleSelectSample = (title: string, author?: string, blurb?: string) => {
    setAnalyzerTitle(title);
    setAnalyzerAuthor(author || '');
    setAnalyzerBlurb(blurb || '');
    setActiveTab('analyzer');

    // Scroll to analyzer section smoothly
    setTimeout(() => {
      analyzerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleNewAnalysisClick = () => {
    setActiveTab('analyzer');
    setAnalyzerTitle('');
    setAnalyzerAuthor('');
    setAnalyzerBlurb('');
    setTimeout(() => {
      const input = document.getElementById('book-title');
      input?.focus();
      analyzerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <StorageProvider>
      <div className="min-h-screen flex flex-col bg-[#fbf9f6] text-stone-900 selection:bg-rose-100 selection:text-rose-900">
        {/* Navigation Bar (Strict 3-zone Top Bar Contract) */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onNewAnalysisClick={handleNewAnalysisClick}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {activeTab === 'analyzer' && (
            <>
              <HeroSection
                onSelectSample={handleSelectSample}
                onScrollToAnalyzer={() => {
                  analyzerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              />
              <div ref={analyzerRef}>
                <AnalyzerSection
                  initialTitle={analyzerTitle}
                  initialAuthor={analyzerAuthor}
                  initialBlurb={analyzerBlurb}
                  onViewDetails={(res) => setModalAnalysis(res)}
                />
              </div>

              {/* Curated Preview Strip Below Analyzer */}
              <div className="border-t border-stone-200 bg-[#f7f4ee]/60 py-12">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold">
                        Keşfetmeye Devam Edin
                      </span>
                      <h3 className="font-editorial text-2xl font-bold text-stone-900">
                        Edebiyat Kataloğundan Seçmeler
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('library')}
                      className="text-xs font-semibold text-rose-900 hover:text-rose-950 underline underline-offset-4 cursor-pointer"
                    >
                      Tüm Kütüphaneyi Gör →
                    </button>
                  </div>
                </div>
                <LibrarySection
                  onSelectForAnalysis={handleSelectSample}
                  onOpenModal={(res) => setModalAnalysis(res)}
                />
              </div>
            </>
          )}

          {activeTab === 'library' && (
            <div className="pt-4">
              <LibrarySection
                onSelectForAnalysis={handleSelectSample}
                onOpenModal={(res) => setModalAnalysis(res)}
              />
            </div>
          )}

          {activeTab === 'batch' && (
            <div className="pt-4">
              <BatchAnalyzerSection
                onSelectForAnalysis={handleSelectSample}
                onOpenModal={(res) => setModalAnalysis(res)}
              />
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="pt-4">
              <ProfileSection
                onSelectForAnalysis={handleSelectSample}
                onOpenModal={(res) => setModalAnalysis(res)}
                onGoToAnalyzer={() => setActiveTab('analyzer')}
              />
            </div>
          )}
        </main>

        {/* Linguistic Analysis Modal */}
        {modalAnalysis && (
          <BookDetailModal
            analysis={modalAnalysis}
            onClose={() => setModalAnalysis(null)}
            onSelectForEdit={handleSelectSample}
          />
        )}

        {/* Quiet Editorial Footer */}
        <Footer onNavClick={(tab) => setActiveTab(tab)} />
      </div>
    </StorageProvider>
  );
}
