import React, { useState, useEffect, useMemo } from 'react';
import {
  Heart,
  BookOpen,
  BookmarkPlus,
  Check,
  Sparkles,
  RotateCcw,
  Sliders,
  ChevronDown,
  Info
} from 'lucide-react';
import { analyzeBookText } from '../nlp/classifier';
import { NLPAnalysisResult, ReadingStatus } from '../types';
import { useStorage } from '../context/StorageContext';

interface AnalyzerSectionProps {
  initialTitle?: string;
  initialAuthor?: string;
  initialBlurb?: string;
  onViewDetails?: (result: NLPAnalysisResult) => void;
}

export const AnalyzerSection: React.FC<AnalyzerSectionProps> = ({
  initialTitle = '',
  initialAuthor = '',
  initialBlurb = '',
  onViewDetails
}) => {
  const [title, setTitle] = useState(initialTitle || 'Aşk ve Gurur');
  const [author, setAuthor] = useState(initialAuthor || 'Jane Austen');
  const [blurb, setBlurb] = useState(initialBlurb || 'Elizabeth Bennet ile gururlu Bay Darcy arasındaki zekâ dolu söz düelloları ve engelleri aşan tutkulu aşk.');
  const [showDetailedInputs, setShowDetailedInputs] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);
  const [targetStatus, setTargetStatus] = useState<ReadingStatus>('want_to_read');
  const [markFavorite, setMarkFavorite] = useState(true);

  const { saveAnalysis, isBookSaved } = useStorage();

  // Keep state in sync if parent changes initial props
  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
      setAuthor(initialAuthor || '');
      setBlurb(initialBlurb || '');
    }
  }, [initialTitle, initialAuthor, initialBlurb]);

  // Instant static client NLP computation
  const analysisResult: NLPAnalysisResult = useMemo(() => {
    return analyzeBookText(title, author, blurb);
  }, [title, author, blurb]);

  const alreadySaved = isBookSaved(analysisResult.title);

  const handleSaveToProfile = () => {
    saveAnalysis(analysisResult, targetStatus, markFavorite);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const handleClear = () => {
    setTitle('');
    setAuthor('');
    setBlurb('');
  };

  return (
    <section id="analyzer" className="py-12 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold">
            Gerçek Zamanlı Doğal Dil İşleme
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-medium mt-1">
            Kitap Metin Analiz Laboratuvarı
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-2xl font-sans">
            Aşağıya bir kitap başlığı veya pasajı yazın. Algoritma yazdığınız her harfte leksik ve anlamsal çözümleme yaparak anında romantizm skorunu hesaplar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDetailedInputs(!showDetailedInputs)}
            className="px-3.5 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-md hover:bg-stone-50 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showDetailedInputs ? 'Basit Başlık Modu' : 'Ayrıntılı Alıntı Modu'}</span>
          </button>
          <button
            onClick={handleClear}
            className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            title="Temizle"
            aria-label="Formu Temizle"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controller Column */}
        <div className="lg:col-span-5 space-y-5 bg-white p-6 rounded-lg border border-stone-200 shadow-xs">
          <div>
            <label htmlFor="book-title" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Kitap Adı <span className="text-rose-700">*</span>
            </label>
            <input
              id="book-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Aşk ve Gurur, Senden Önce Ben, 1984..."
              className="w-full px-4 py-3 bg-[#faf8f5] border border-stone-200 rounded-md text-stone-900 text-base placeholder:text-stone-400 focus:outline-hidden focus:border-stone-800 transition-colors"
            />
          </div>

          {showDetailedInputs && (
            <>
              <div>
                <label htmlFor="book-author" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Yazar Adı (İsteğe Bağlı)
                </label>
                <input
                  id="book-author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Örn: Jane Austen, Sabahattin Ali..."
                  className="w-full px-4 py-2.5 bg-[#faf8f5] border border-stone-200 rounded-md text-stone-900 text-sm placeholder:text-stone-400 focus:outline-hidden focus:border-stone-800 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="book-blurb" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Arka Kapak / Kitaptan Bir Pasaj (İsteğe Bağlı)
                </label>
                <textarea
                  id="book-blurb"
                  rows={4}
                  value={blurb}
                  onChange={(e) => setBlurb(e.target.value)}
                  placeholder="Kitabın konusunu veya öne çıkan bir alıntıyı yapıştırarak analizi zenginleştirebilirsiniz..."
                  className="w-full px-4 py-2.5 bg-[#faf8f5] border border-stone-200 rounded-md text-stone-900 text-sm placeholder:text-stone-400 focus:outline-hidden focus:border-stone-800 transition-colors resize-none leading-relaxed"
                />
              </div>
            </>
          )}

          {/* Quick NLP Status Indicators */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-sans">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>İstemci NLP Motoru Aktif</span>
            </div>
            <div className="flex items-center gap-2 tabular-nums">
              <span>{analysisResult.metrics.tokenCount} Belirteç (Token)</span>
              <span>·</span>
              <span>0 ms Gecikme</span>
            </div>
          </div>

          {/* Action to Save to Profile */}
          <div className="pt-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <select
                  value={targetStatus}
                  onChange={(e) => setTargetStatus(e.target.value as ReadingStatus)}
                  className="w-full appearance-none px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs font-medium text-stone-700 pr-8 cursor-pointer focus:outline-hidden focus:border-stone-800"
                >
                  <option value="want_to_read">Okuma Listeme Ekle</option>
                  <option value="reading">Şu Anda Okuyorum</option>
                  <option value="completed">Okudum Olarak Kaydet</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-3 text-stone-400 pointer-events-none" />
              </div>

              <button
                onClick={handleSaveToProfile}
                disabled={!title.trim()}
                className={`px-4 py-2.5 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
                  alreadySaved
                    ? 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {savedNotification ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Profile Eklendi!</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    <span>{alreadySaved ? 'Kaydı Güncelle' : 'Profile Kaydet'}</span>
                  </>
                )}
              </button>
            </div>

            <label className="mt-2.5 flex items-center gap-2 cursor-pointer text-xs text-stone-600 select-none">
              <input
                type="checkbox"
                checked={markFavorite}
                onChange={(e) => setMarkFavorite(e.target.checked)}
                className="rounded border-stone-300 text-rose-800 focus:ring-0 cursor-pointer"
              />
              <span>Favori kitaplarım arasına ekle</span>
            </label>
          </div>
        </div>

        {/* Live Analysis Output Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className={`p-6 sm:p-8 rounded-lg border transition-all ${
            analysisResult.isRomance
              ? 'bg-[#fcf7f7] border-rose-200/80 shadow-xs'
              : 'bg-white border-stone-200 shadow-xs'
          }`}>
            {/* Top Verdict Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className={`p-2.5 rounded-md ${
                  analysisResult.isRomance
                    ? 'bg-rose-900 text-white'
                    : 'bg-stone-800 text-white'
                }`}>
                  {analysisResult.isRomance ? (
                    <Heart className="w-5 h-5 fill-current" />
                  ) : (
                    <BookOpen className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <div className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold">
                    NLP Karar Çıktısı
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-stone-900 leading-tight">
                    {analysisResult.isRomance ? 'Romantik Kitap Olarak Tanımlandı' : 'Romantik Değil — Diğer Edebi Tür'}
                  </h3>
                </div>
              </div>

              {/* Confidence Score Pill-Free Display */}
              <div className="sm:text-right shrink-0">
                <div className="text-xs text-stone-500 uppercase tracking-wider font-sans">
                  Romantizm İndeksi
                </div>
                <div className="text-3xl font-editorial font-bold text-stone-900 tabular-nums">
                  %{analysisResult.romanceScore}
                </div>
              </div>
            </div>

            {/* Confidence Progress Meter */}
            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between text-xs text-stone-500 font-medium">
                <span>0% (Diğer Türler)</span>
                <span>Eşik: %45</span>
                <span>100% (Saf Romantizm)</span>
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    analysisResult.isRomance ? 'bg-rose-900' : 'bg-stone-700'
                  }`}
                  style={{ width: `${analysisResult.romanceScore}%` }}
                />
              </div>
            </div>

            {/* Genre Probability Distribution */}
            <div className="mt-6 pt-5 border-t border-stone-200/70">
              <p className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-3">
                Tür Olasılık Dağılımı (Leksik Frekans)
              </p>
              <div className="space-y-2">
                {analysisResult.genreProbabilities.slice(0, 4).map((gp) => (
                  <div key={gp.genre} className="flex items-center gap-3 text-xs">
                    <span className="w-36 text-stone-800 font-medium truncate">{gp.genre}</span>
                    <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-stone-800 rounded-full transition-all"
                        style={{ width: `${gp.percentage}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-stone-500 tabular-nums font-semibold">
                      %{gp.percentage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detected Romance Tropes */}
            {analysisResult.detectedTropes.length > 0 && (
              <div className="mt-6 pt-5 border-t border-stone-200/70">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-800" />
                    <span>Tespit Edilen Aşk Temaları & Motifler (Tropes)</span>
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analysisResult.detectedTropes.map((trope) => (
                    <div key={trope.id} className="p-3 bg-white/80 border border-stone-200 rounded-md">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs font-bold text-stone-900">{trope.name}</span>
                        <span className="text-[11px] text-stone-400 font-sans italic">{trope.englishName}</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">{trope.description}</p>
                      <div className="mt-2 text-[11px] text-rose-900 font-medium">
                        Eşleşen kökler: {trope.matchedKeywords.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matched Token Breakdown (Explainability) */}
            <div className="mt-6 pt-5 border-t border-stone-200/70">
              <div className="flex items-center gap-1.5 mb-2.5 text-xs font-semibold text-stone-700 uppercase tracking-wider">
                <Info className="w-3.5 h-3.5 text-stone-500" />
                <span>Metin Analizi Belirteç Haritası (Explainable NLP)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysisResult.matchedTokens.length === 0 ? (
                  <span className="text-xs text-stone-500 italic">
                    Belirgin bir leksik romantizm veya tür anahtar sözcüğü tespit edilmedi; genel edebi varsayım uygulandı.
                  </span>
                ) : (
                  analysisResult.matchedTokens.map((token, idx) => (
                    <div
                      key={idx}
                      className={`text-xs px-2.5 py-1 rounded border flex items-center gap-1.5 font-sans ${
                        token.category === 'romance'
                          ? 'bg-rose-50 text-rose-950 border-rose-200'
                          : 'bg-stone-100 text-stone-800 border-stone-200'
                      }`}
                      title={token.explanation}
                    >
                      <span className="font-semibold">{token.word}</span>
                      <span className="tabular-nums font-mono text-[11px] opacity-75">
                        {token.weight > 0 ? `+${token.weight}` : token.weight}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Editorial Critique Card */}
            <div className="mt-6 pt-5 border-t border-stone-200/70 bg-white/60 p-4 rounded-md border border-stone-200/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                Edebi Değerlendirme & Teşhis
              </span>
              <p className="font-editorial text-stone-800 text-base leading-relaxed italic">
                "{analysisResult.editorialCritique}"
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-stone-500 font-sans">
                <span>Duygu Durumu: <strong className="text-stone-800">{analysisResult.sentiment.label}</strong></span>
                <span>·</span>
                <span>Leksik Zenginlik: <strong className="text-stone-800 tabular-nums">%{analysisResult.metrics.lexicalRichness}</strong></span>
              </div>
            </div>

            {/* Modal Detail Trigger */}
            {onViewDetails && (
              <div className="mt-5 text-right">
                <button
                  onClick={() => onViewDetails(analysisResult)}
                  className="text-xs font-semibold text-rose-900 hover:text-rose-950 underline underline-offset-4 cursor-pointer"
                >
                  Tam NLP Raporunu Aç
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
