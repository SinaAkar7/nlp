import React, { useState, useMemo } from 'react';
import { Layers, BookmarkPlus, Check, ArrowRight } from 'lucide-react';
import { analyzeBookText } from '../nlp/classifier';
import { NLPAnalysisResult } from '../types';
import { useStorage } from '../context/StorageContext';

interface BatchAnalyzerSectionProps {
  onSelectForAnalysis: (title: string, author?: string, blurb?: string) => void;
  onOpenModal: (analysis: NLPAnalysisResult) => void;
}

export const BatchAnalyzerSection: React.FC<BatchAnalyzerSectionProps> = ({
  onSelectForAnalysis,
  onOpenModal
}) => {
  const [inputText, setInputText] = useState(
    `Aşk ve Gurur\n1984\nKürk Mantolu Madonna\nSuç ve Ceza\nBizimle Başladı Bizimle Bitti\nDune\nSenden Önce Ben\nTutunamayanlar\nJane Eyre\nHayvan Çiftliği`
  );
  const [savedAllMessage, setSavedAllMessage] = useState(false);

  const { saveAnalysis, isBookSaved } = useStorage();

  // Instant static client NLP processing on every title line
  const batchResults = useMemo(() => {
    const lines = inputText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    return lines.map((line) => {
      // Check if format is "Title - Author"
      let parsedTitle = line;
      let parsedAuthor = '';
      if (line.includes(' - ')) {
        const parts = line.split(' - ');
        parsedTitle = parts[0].trim();
        parsedAuthor = parts[1].trim();
      } else if (line.includes(' / ')) {
        const parts = line.split(' / ');
        parsedTitle = parts[0].trim();
        parsedAuthor = parts[1].trim();
      }
      return analyzeBookText(parsedTitle, parsedAuthor);
    });
  }, [inputText]);

  const romanceCount = batchResults.filter((r) => r.isRomance).length;
  const nonRomanceCount = batchResults.length - romanceCount;
  const averageRomanceScore = batchResults.length > 0
    ? Math.round(batchResults.reduce((acc, curr) => acc + curr.romanceScore, 0) / batchResults.length)
    : 0;

  const handleSaveAll = () => {
    batchResults.forEach((res) => {
      saveAnalysis(res, 'want_to_read');
    });
    setSavedAllMessage(true);
    setTimeout(() => setSavedAllMessage(false), 2500);
  };

  return (
    <section id="batch" className="py-12 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-5 mb-8">
        <div>
          <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold">
            Çoklu Liste Sınıflandırma
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-medium mt-1">
            Toplu Kitap Başlığı Analizi
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-2xl font-sans">
            Birden fazla kitap başlığını her satıra bir tane gelecek şekilde yapıştırın. İstemci NLP motoru tüm listeyi anında sınıflandırsın.
          </p>
        </div>

        {/* Statistical Summary */}
        <div className="flex items-center gap-3 text-xs text-stone-600 font-sans">
          <span>Toplam {batchResults.length} Kitap</span>
          <span aria-hidden="true">·</span>
          <span className="text-rose-900 font-semibold">{romanceCount} Romantik</span>
          <span aria-hidden="true">·</span>
          <span>{nonRomanceCount} Diğer Tür</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">Ortalama %{averageRomanceScore} Romantizm</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Text Area Column */}
        <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="batch-input" className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Kitap İsimleri Listesi (Her satıra bir kitap)
            </label>
            <span className="text-xs text-stone-400 font-sans">
              İsteğe bağlı: "Başlık - Yazar"
            </span>
          </div>

          <textarea
            id="batch-input"
            rows={12}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Aşk ve Gurur&#10;1984&#10;Kürk Mantolu Madonna&#10;Dune..."
            className="w-full px-4 py-3 bg-[#faf8f5] border border-stone-200 rounded-md text-stone-900 text-sm font-sans placeholder:text-stone-400 focus:outline-hidden focus:border-stone-800 transition-colors leading-relaxed"
          />

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setInputText('')}
              className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
            >
              Metni Temizle
            </button>

            <button
              onClick={handleSaveAll}
              disabled={batchResults.length === 0}
              className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 rounded-md cursor-pointer flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              {savedAllMessage ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tümü Profile Kaydedildi!</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>Tümünü Profile Kaydet ({batchResults.length})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Table Column */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-stone-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-stone-500" />
              <span>Sınıflandırma Sonuç Listesi</span>
            </span>
            <span className="text-xs text-stone-500 font-sans">
              Doğal Dil İşleme Çıktıları
            </span>
          </div>

          <div className="divide-y divide-stone-100 max-h-[580px] overflow-y-auto">
            {batchResults.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-500">
                Lütfen sol taraftaki alana en az bir kitap adı yazın.
              </div>
            ) : (
              batchResults.map((result, idx) => {
                const saved = isBookSaved(result.title);
                return (
                  <div
                    key={result.id || idx}
                    className="p-4 hover:bg-stone-50 transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-stone-400 tabular-nums">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <h4 className="font-editorial text-lg font-bold text-stone-900 truncate">
                          {result.title}
                        </h4>
                        {result.author && (
                          <span className="text-xs text-stone-500 truncate">
                            · {result.author}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-stone-500 font-sans mt-0.5">
                        <span className={result.isRomance ? 'text-rose-900 font-semibold' : 'text-stone-700'}>
                          {result.primaryGenre}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums font-mono">%{result.romanceScore} Romantik</span>
                        {result.detectedTropes.length > 0 && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-rose-950 font-medium truncate max-w-[150px]">
                              {result.detectedTropes[0].name}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onSelectForAnalysis(result.title, result.author, result.blurb)}
                        className="p-1.5 text-stone-400 hover:text-stone-900 cursor-pointer"
                        title="Metni Laboratuvarda İncele"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onOpenModal(result)}
                        className="px-2 py-1 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 rounded cursor-pointer"
                      >
                        Rapor
                      </button>

                      <button
                        onClick={() => saveAnalysis(result, 'want_to_read')}
                        className={`p-1.5 rounded cursor-pointer transition-colors ${
                          saved ? 'text-emerald-700 bg-emerald-50' : 'text-stone-500 hover:text-stone-900 bg-stone-100'
                        }`}
                        title={saved ? 'Profile Kaydedildi' : 'Profile Kaydet'}
                      >
                        {saved ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
