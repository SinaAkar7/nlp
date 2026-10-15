import React from 'react';
import { Heart, BookOpen, BookmarkPlus, Check, ArrowUpRight } from 'lucide-react';
import { NLPAnalysisResult, PredefinedBook } from '../types';
import { useStorage } from '../context/StorageContext';

interface BookCardProps {
  book: PredefinedBook;
  analysis: NLPAnalysisResult;
  onSelectForAnalysis: (title: string, author?: string, blurb?: string) => void;
  onOpenModal: (analysis: NLPAnalysisResult) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  analysis,
  onSelectForAnalysis,
  onOpenModal
}) => {
  const { saveAnalysis, isBookSaved } = useStorage();
  const alreadySaved = isBookSaved(analysis.title);

  return (
    <div className="group relative bg-white border border-stone-200 rounded-lg p-5 flex flex-col justify-between transition-all duration-200 hover:border-stone-400 hover:shadow-xs">
      <div>
        {/* Book spine accent & header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: book.coverAccent || '#78350f' }}
              aria-hidden="true"
            />
            <span className="text-xs text-stone-500 font-sans">
              {book.year ? `${book.year} Basımı` : 'Klasik Eser'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold tabular-nums">
            {analysis.isRomance ? (
              <span className="text-rose-900 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>%{analysis.romanceScore} Romantik</span>
              </span>
            ) : (
              <span className="text-stone-600 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{analysis.primaryGenre}</span>
              </span>
            )}
          </div>
        </div>

        {/* Title and Author */}
        <h3 className="font-editorial text-2xl font-bold text-stone-900 group-hover:text-rose-950 transition-colors leading-tight">
          {book.title}
        </h3>
        <p className="text-sm font-medium text-stone-600 mt-1">
          {book.author}
        </p>

        {/* Blurb excerpt */}
        <p className="text-xs text-stone-600 mt-3 line-clamp-3 leading-relaxed font-sans">
          {book.blurb}
        </p>

        {/* Unboxed metadata row with typographic separators */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs text-stone-500 font-sans">
          <span>{analysis.primaryGenre}</span>
          <span aria-hidden="true">·</span>
          <span>{analysis.sentiment.label}</span>
          {analysis.detectedTropes.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-rose-900 font-medium">
                {analysis.detectedTropes[0].name}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Card action controls */}
      <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelectForAnalysis(book.title, book.author, book.blurb)}
          className="text-xs font-semibold text-stone-800 hover:text-rose-950 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>Metni İncele</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onOpenModal(analysis)}
            className="px-2.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors cursor-pointer"
            title="NLP Analiz Detayları"
          >
            Rapor
          </button>

          <button
            onClick={() => saveAnalysis(analysis, 'want_to_read', true)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1 cursor-pointer ${
              alreadySaved
                ? 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {alreadySaved ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Kayıtlı</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-3 h-3" />
                <span>Kaydet</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
