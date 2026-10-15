import React, { useState, useMemo } from 'react';
import { Search, Heart, SlidersHorizontal, BookOpen } from 'lucide-react';
import { SAMPLE_BOOKS } from '../data/sampleBooks';
import { analyzeBookText } from '../nlp/classifier';
import { BookCard } from './BookCard';
import { NLPAnalysisResult } from '../types';

interface LibrarySectionProps {
  onSelectForAnalysis: (title: string, author?: string, blurb?: string) => void;
  onOpenModal: (analysis: NLPAnalysisResult) => void;
}

export const LibrarySection: React.FC<LibrarySectionProps> = ({
  onSelectForAnalysis,
  onOpenModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState<'all' | 'romance' | 'non-romance'>('all');
  const [sortBy, setSortBy] = useState<'romance_desc' | 'romance_asc' | 'title_asc' | 'year_desc'>('romance_desc');

  // Pre-analyze sample books statically
  const analyzedSampleBooks = useMemo(() => {
    return SAMPLE_BOOKS.map((b) => ({
      book: b,
      analysis: analyzeBookText(b.title, b.author, b.blurb)
    }));
  }, []);

  // Filtered and sorted books
  const filteredBooks = useMemo(() => {
    return analyzedSampleBooks
      .filter(({ book, analysis }) => {
        const matchesQuery =
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.blurb.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesQuery) return false;

        if (genreFilter === 'romance') return analysis.isRomance;
        if (genreFilter === 'non-romance') return !analysis.isRomance;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'romance_desc') {
          return b.analysis.romanceScore - a.analysis.romanceScore;
        }
        if (sortBy === 'romance_asc') {
          return a.analysis.romanceScore - b.analysis.romanceScore;
        }
        if (sortBy === 'title_asc') {
          return a.book.title.localeCompare(b.book.title, 'tr');
        }
        if (sortBy === 'year_desc') {
          return (b.book.year || 0) - (a.book.year || 0);
        }
        return 0;
      });
  }, [analyzedSampleBooks, searchQuery, genreFilter, sortBy]);

  const romanceCount = analyzedSampleBooks.filter((i) => i.analysis.isRomance).length;
  const nonRomanceCount = analyzedSampleBooks.length - romanceCount;

  return (
    <section id="library" className="py-12 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-5 mb-8">
        <div>
          <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold">
            Referans Edebi Katalog
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-medium mt-1">
            Türk ve Dünya Edebiyatı Koleksiyonu
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-2xl font-sans">
            Aşk romanlarından distopyalara, psikolojik dramlardan bilim kurguya kadar önceden analiz edilmiş başyapıtları inceleyin.
          </p>
        </div>

        {/* Unboxed Count Summary */}
        <div className="flex items-center gap-3 text-xs text-stone-600 font-sans">
          <span>Toplam {analyzedSampleBooks.length} Eser</span>
          <span aria-hidden="true">·</span>
          <span className="text-rose-900 font-semibold">{romanceCount} Romantik</span>
          <span aria-hidden="true">·</span>
          <span>{nonRomanceCount} Diğer Tür</span>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8 bg-stone-50 p-4 rounded-lg border border-stone-200">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kütüphanede kitap veya yazar ara..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-md text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-stone-800"
          />
        </div>

        {/* Genre Filter Segmented Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-md">
          <button
            onClick={() => setGenreFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
              genreFilter === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tümü ({analyzedSampleBooks.length})
          </button>
          <button
            onClick={() => setGenreFilter('romance')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              genreFilter === 'romance'
                ? 'bg-white text-rose-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Heart className="w-3 h-3 text-rose-800" />
            <span>Romantikler ({romanceCount})</span>
          </button>
          <button
            onClick={() => setGenreFilter('non-romance')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              genreFilter === 'non-romance'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>Diğer Türler ({nonRomanceCount})</span>
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-stone-500 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-stone-200 rounded-md px-3 py-2 text-xs font-medium text-stone-800 focus:outline-hidden focus:border-stone-800 cursor-pointer"
          >
            <option value="romance_desc">En Yüksek Romantizm Skoru</option>
            <option value="romance_asc">En Düşük Romantizm Skoru</option>
            <option value="title_asc">Kitap Adı (A - Z)</option>
            <option value="year_desc">Basım Yılı (Yeniden Eskiye)</option>
          </select>
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 bg-white border border-stone-200 rounded-lg p-8">
          <p className="font-editorial text-2xl text-stone-700">Aramanıza uygun eser bulunamadı.</p>
          <p className="text-xs text-stone-500 mt-2 font-sans">
            Farklı bir arama terimi deneyin ya da yukarıdaki analiz laboratuvarına kendi kitabınızı yazın.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setGenreFilter('all');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded cursor-pointer"
          >
            Filtreleri Sıfırla
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(({ book, analysis }) => (
            <BookCard
              key={book.id}
              book={book}
              analysis={analysis}
              onSelectForAnalysis={onSelectForAnalysis}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      )}
    </section>
  );
};
