import React, { useState } from 'react';
import {
  X,
  Heart,
  BookOpen,
  Copy,
  Check,
  BookmarkPlus,
  Sparkles,
  Info
} from 'lucide-react';
import { NLPAnalysisResult } from '../types';
import { useStorage } from '../context/StorageContext';

interface BookDetailModalProps {
  analysis: NLPAnalysisResult | null;
  onClose: () => void;
  onSelectForEdit?: (title: string, author?: string, blurb?: string) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  analysis,
  onClose,
  onSelectForEdit
}) => {
  const [copied, setCopied] = useState(false);
  const { saveAnalysis, isBookSaved } = useStorage();

  if (!analysis) return null;

  const alreadySaved = isBookSaved(analysis.title);

  const handleCopySummary = () => {
    const text = `Romanza NLP Analiz Raporu
Eser: ${analysis.title} ${analysis.author ? `(${analysis.author})` : ''}
Tür Tespiti: ${analysis.isRomance ? 'Romantik Kitap' : analysis.primaryGenre}
Romantizm İndeksi: %${analysis.romanceScore}
Duygu Durumu: ${analysis.sentiment.label}
Tespit Edilen Temalar: ${analysis.detectedTropes.map((t) => t.name).join(', ') || 'Belirtilmedi'}
Değerlendirme: ${analysis.editorialCritique}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-[#fcfbf9] border border-stone-200 rounded-lg max-w-2xl w-full p-6 sm:p-8 shadow-xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-800 rounded-md transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-10 border-b border-stone-200 pb-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider font-sans text-stone-500 mb-1">
            <span>Doğal Dil İşleme Raporu</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">ID: {analysis.id.slice(0, 10)}</span>
          </div>

          <h3 className="font-editorial text-3xl font-bold text-stone-900 leading-tight">
            {analysis.title}
          </h3>

          {analysis.author && (
            <p className="text-sm font-medium text-stone-600 mt-1">
              Yazar: {analysis.author}
            </p>
          )}
        </div>

        {/* Core Diagnosis Row */}
        <div className="py-5 border-b border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-stone-200 rounded-md">
            <span className="text-xs text-stone-500 uppercase tracking-wider font-sans block mb-1">
              Tür Kararı
            </span>
            <div className="flex items-center gap-2">
              {analysis.isRomance ? (
                <Heart className="w-5 h-5 text-rose-800 fill-current" />
              ) : (
                <BookOpen className="w-5 h-5 text-stone-700" />
              )}
              <span className="font-editorial text-2xl font-bold text-stone-900">
                {analysis.isRomance ? 'Romantik' : analysis.primaryGenre}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1 font-sans">
              {analysis.isRomance ? 'Aşk ve duygusal çatışma ana aks' : 'Kurgu veya düşünce ana aks'}
            </p>
          </div>

          <div className="p-4 bg-white border border-stone-200 rounded-md">
            <span className="text-xs text-stone-500 uppercase tracking-wider font-sans block mb-1">
              Romantizm Olasılığı
            </span>
            <div className="font-editorial text-3xl font-bold text-stone-900 tabular-nums">
              %{analysis.romanceScore}
            </div>
            <div className="w-full h-1.5 bg-stone-100 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full ${analysis.isRomance ? 'bg-rose-900' : 'bg-stone-700'}`}
                style={{ width: `${analysis.romanceScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Excerpt if present */}
        {analysis.blurb && (
          <div className="py-4 border-b border-stone-200">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
              İncelenen Metin / Alıntı
            </span>
            <p className="text-xs text-stone-700 italic font-sans leading-relaxed bg-stone-50 p-3 rounded border border-stone-200/60">
              "{analysis.blurb}"
            </p>
          </div>
        )}

        {/* Detected Tropes */}
        {analysis.detectedTropes.length > 0 && (
          <div className="py-4 border-b border-stone-200">
            <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-800" />
              <span>Tespit Edilen Aşk Motifleri (Romance Tropes)</span>
            </span>
            <div className="space-y-2">
              {analysis.detectedTropes.map((trope) => (
                <div key={trope.id} className="p-3 bg-white border border-stone-200 rounded-md text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-stone-900">{trope.name} ({trope.englishName})</strong>
                    <span className="text-rose-900 font-mono tabular-nums">%{trope.confidence} Güven</span>
                  </div>
                  <p className="text-stone-600 mt-1">{trope.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lexicon Tokens Table */}
        <div className="py-4 border-b border-stone-200">
          <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
            <Info className="w-3.5 h-3.5 text-stone-500" />
            <span>Leksik Sözcük Ağırlıkları</span>
          </span>

          <div className="max-h-40 overflow-y-auto border border-stone-200 rounded-md divide-y divide-stone-100 bg-white text-xs">
            {analysis.matchedTokens.length === 0 ? (
              <div className="p-3 text-stone-500 italic text-center">
                Belirgin bir leksik ağırlık terimi eşleşmedi.
              </div>
            ) : (
              analysis.matchedTokens.map((t, idx) => (
                <div key={idx} className="p-2.5 flex items-center justify-between gap-3 font-sans">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900">"{t.word}"</span>
                    {t.explanation && (
                      <span className="text-stone-500 text-[11px] truncate max-w-xs">
                        · {t.explanation}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-mono tabular-nums px-1.5 py-0.5 rounded font-medium ${
                      t.weight > 0 ? 'bg-rose-50 text-rose-900' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {t.weight > 0 ? `+${t.weight}` : t.weight}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Editorial Critique */}
        <div className="py-4">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
            Edebi Değerlendirme & Gerekçe
          </span>
          <p className="font-editorial text-stone-800 text-base italic leading-relaxed">
            "{analysis.editorialCritique}"
          </p>
        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-md hover:bg-stone-50 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı!' : 'Raporu Kopyala'}</span>
            </button>

            {onSelectForEdit && (
              <button
                onClick={() => {
                  onSelectForEdit(analysis.title, analysis.author, analysis.blurb);
                  onClose();
                }}
                className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-md hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Laboratuvarda Düzenle
              </button>
            )}
          </div>

          <button
            onClick={() => saveAnalysis(analysis, 'want_to_read')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              alreadySaved
                ? 'bg-stone-200 text-stone-700'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {alreadySaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Profile Kaydedildi</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Profile Kaydet</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
