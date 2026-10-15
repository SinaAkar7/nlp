import React, { useState, useMemo, useRef } from 'react';
import {
  Heart,
  BookOpen,
  Trash2,
  Star,
  Download,
  Upload,
  Edit3,
  Check,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStorage } from '../context/StorageContext';
import { ReadingStatus, NLPAnalysisResult } from '../types';

interface ProfileSectionProps {
  onSelectForAnalysis: (title: string, author?: string, blurb?: string) => void;
  onOpenModal: (analysis: NLPAnalysisResult) => void;
  onGoToAnalyzer: () => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  onSelectForAnalysis,
  onOpenModal,
  onGoToAnalyzer
}) => {
  const {
    savedBooks,
    removeSavedBook,
    updateBookStatus,
    toggleFavorite,
    updateBookNote,
    clearAllSaved,
    exportData,
    importData
  } = useStorage();

  const [activeTab, setActiveTab] = useState<'all' | 'want_to_read' | 'reading' | 'completed' | 'favorites'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNoteText, setEditNoteText] = useState('');
  const [editRating, setEditRating] = useState<number>(5);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compute profile statistics
  const stats = useMemo(() => {
    const total = savedBooks.length;
    if (total === 0) {
      return {
        total: 0,
        romanceCount: 0,
        romanceRatio: 0,
        favoritesCount: 0,
        completedCount: 0,
        topTrope: 'Henüz veri yok'
      };
    }

    const romanceCount = savedBooks.filter((b) => b.analysis.isRomance).length;
    const romanceRatio = Math.round((romanceCount / total) * 100);
    const favoritesCount = savedBooks.filter((b) => b.isFavorite).length;
    const completedCount = savedBooks.filter((b) => b.status === 'completed').length;

    // Count trope frequencies
    const tropeMap: Record<string, number> = {};
    savedBooks.forEach((b) => {
      b.analysis.detectedTropes.forEach((t) => {
        tropeMap[t.name] = (tropeMap[t.name] || 0) + 1;
      });
    });

    const sortedTropes = Object.entries(tropeMap).sort((a, b) => b[1] - a[1]);
    const topTrope = sortedTropes.length > 0 ? sortedTropes[0][0] : 'Çeşitli Temalar';

    return {
      total,
      romanceCount,
      romanceRatio,
      favoritesCount,
      completedCount,
      topTrope
    };
  }, [savedBooks]);

  // Filtered books
  const filteredSavedBooks = useMemo(() => {
    return savedBooks.filter((b) => {
      if (activeTab === 'want_to_read') return b.status === 'want_to_read';
      if (activeTab === 'reading') return b.status === 'reading';
      if (activeTab === 'completed') return b.status === 'completed';
      if (activeTab === 'favorites') return b.isFavorite;
      return true;
    });
  }, [savedBooks, activeTab]);

  const handleStartEdit = (id: string, note?: string, rating?: number) => {
    setEditingId(id);
    setEditNoteText(note || '');
    setEditRating(rating || 5);
  };

  const handleSaveEdit = (id: string) => {
    updateBookNote(id, editNoteText, editRating);
    setEditingId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importData(content);
      if (success) {
        setImportStatus('Arşiv başarıyla içe aktarıldı!');
      } else {
        setImportStatus('Hata: Dosya formatı geçerli bir Romanza arşivi değil.');
      }
      setTimeout(() => setImportStatus(null), 3500);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <section id="profile" className="py-12 px-6 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6 mb-8">
        <div>
          <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold">
            Kişisel Okuma Odası
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-medium mt-1">
            Okuma Arşivi & Edebi Profil
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-2xl font-sans">
            Analiz ettiğiniz veya kaydettiğiniz tüm eserleri burada yönetin, okuma durumunuzu güncelleyin ve kişisel romantizm eğiliminizi takip edin.
          </p>
        </div>

        {/* Export / Import Utilities */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-md hover:bg-stone-50 transition-colors cursor-pointer flex items-center gap-1.5"
            title="Önceden indirilmiş JSON yedeğini yükle"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Arşiv Yükle</span>
          </button>
          <button
            onClick={exportData}
            disabled={savedBooks.length === 0}
            className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-md hover:bg-stone-50 transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            title="Arşivimi JSON dosyası olarak bilgisayara indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Dışa Aktar</span>
          </button>
        </div>
      </div>

      {importStatus && (
        <div className="mb-6 p-3 bg-stone-900 text-white text-xs rounded-md font-sans">
          {importStatus}
        </div>
      )}

      {/* Reader Analytics Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-lg border border-stone-200">
          <span className="text-xs text-stone-500 uppercase tracking-wider font-sans block">
            Kayıtlı Eser Sayısı
          </span>
          <div className="font-editorial text-3xl font-bold text-stone-900 mt-1 tabular-nums">
            {stats.total}
          </div>
          <p className="text-xs text-stone-500 mt-1 font-sans">
            {stats.completedCount} tanesi okundu
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-stone-200">
          <span className="text-xs text-stone-500 uppercase tracking-wider font-sans block">
            Romantizm Oranı
          </span>
          <div className="font-editorial text-3xl font-bold text-rose-900 mt-1 tabular-nums">
            %{stats.romanceRatio}
          </div>
          <p className="text-xs text-stone-500 mt-1 font-sans">
            {stats.romanceCount} romantik kitap
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-stone-200">
          <span className="text-xs text-stone-500 uppercase tracking-wider font-sans block">
            Favori Eserler
          </span>
          <div className="font-editorial text-3xl font-bold text-stone-900 mt-1 tabular-nums">
            {stats.favoritesCount}
          </div>
          <p className="text-xs text-stone-500 mt-1 font-sans">
            Yıldızlanan kitaplar
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-stone-200">
          <span className="text-xs text-stone-500 uppercase tracking-wider font-sans block">
            Öne Çıkan Aşk Teması
          </span>
          <div className="font-editorial text-xl font-bold text-stone-900 mt-2 truncate" title={stats.topTrope}>
            {stats.topTrope}
          </div>
          <p className="text-xs text-stone-500 mt-1 font-sans">
            En sık analiz edilen motif
          </p>
        </div>
      </div>

      {/* Reading Status Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-md overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tüm Kayıtlar ({savedBooks.length})
          </button>
          <button
            onClick={() => setActiveTab('want_to_read')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'want_to_read' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Okunacaklar
          </button>
          <button
            onClick={() => setActiveTab('reading')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'reading' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Okunanlar
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'completed' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Bitenler ({stats.completedCount})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              activeTab === 'favorites' ? 'bg-white text-rose-950 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>Favoriler ({stats.favoritesCount})</span>
          </button>
        </div>

        {savedBooks.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Tüm kayıtlı kitaplarınızı silmek istediğinizden emin misiniz?')) {
                clearAllSaved();
              }
            }}
            className="text-xs text-stone-400 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer self-end sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Tüm Listeyi Sıfırla</span>
          </button>
        )}
      </div>

      {/* Saved Books List */}
      {filteredSavedBooks.length === 0 ? (
        <div className="text-center py-16 bg-white border border-stone-200 rounded-lg p-8">
          <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-3" />
          <p className="font-editorial text-2xl text-stone-800">Bu sekmede henüz kitap bulunmuyor.</p>
          <p className="text-xs text-stone-500 mt-2 font-sans max-w-md mx-auto">
            Metin analiz laboratuvarında analiz ettiğiniz kitapları "Profile Kaydet" butonu ile buraya ekleyebilirsiniz.
          </p>
          <button
            onClick={onGoToAnalyzer}
            className="mt-5 px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Analiz Laboratuvarına Git</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSavedBooks.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-stone-200 rounded-lg p-5 hover:border-stone-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-5"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    item.analysis.isRomance
                      ? 'bg-rose-50 text-rose-950 border border-rose-200'
                      : 'bg-stone-100 text-stone-800 border border-stone-200'
                  }`}>
                    {item.analysis.isRomance ? 'Romantik' : item.analysis.primaryGenre}
                  </span>

                  <span className="text-xs text-stone-400 font-sans tabular-nums">
                    %{item.analysis.romanceScore} Romantizm
                  </span>

                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="cursor-pointer text-stone-400 hover:text-amber-500 transition-colors"
                    title={item.isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        item.isFavorite ? 'text-amber-500 fill-amber-500' : ''
                      }`}
                    />
                  </button>
                </div>

                <h3 className="font-editorial text-2xl font-bold text-stone-900 leading-tight">
                  {item.analysis.title}
                </h3>
                {item.analysis.author && (
                  <p className="text-xs font-medium text-stone-600">
                    {item.analysis.author}
                  </p>
                )}

                {item.analysis.blurb && (
                  <p className="text-xs text-stone-600 line-clamp-2 italic font-sans">
                    "{item.analysis.blurb}"
                  </p>
                )}

                {/* Detected Tropes unboxed */}
                {item.analysis.detectedTropes.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-rose-950 font-sans pt-1">
                    <Sparkles className="w-3 h-3 text-rose-800" />
                    <span>Temalar: {item.analysis.detectedTropes.map((t) => t.name).join(', ')}</span>
                  </div>
                )}

                {/* User Notes and Rating Editor */}
                {editingId === item.id ? (
                  <div className="pt-3 border-t border-stone-100 mt-3 space-y-2 bg-stone-50 p-3 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-stone-700">Puanım:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setEditRating(star)}
                            className="cursor-pointer"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                star <= editRating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={editNoteText}
                      onChange={(e) => setEditNoteText(e.target.value)}
                      placeholder="Kitap hakkında kişisel notunuz..."
                      className="w-full text-xs p-2 bg-white border border-stone-200 rounded focus:outline-hidden"
                    />

                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                      >
                        İptal
                      </button>
                      <button
                        onClick={() => handleSaveEdit(item.id)}
                        className="px-3 py-1 text-xs font-semibold bg-stone-900 text-white rounded cursor-pointer"
                      >
                        Kaydet
                      </button>
                    </div>
                  </div>
                ) : (
                  item.userNote && (
                    <div className="pt-2 text-xs text-stone-700 bg-stone-50/70 p-2.5 rounded border border-stone-200/60 font-sans">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${
                                s <= (item.userRating || 5)
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-stone-300'
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => handleStartEdit(item.id, item.userNote, item.userRating)}
                          className="text-[11px] text-stone-400 hover:text-stone-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Düzenle</span>
                        </button>
                      </div>
                      <p className="italic">"{item.userNote}"</p>
                    </div>
                  )
                )}
              </div>

              {/* Status and Action Controls */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                <select
                  value={item.status}
                  onChange={(e) => updateBookStatus(item.id, e.target.value as ReadingStatus)}
                  className="text-xs font-medium bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 cursor-pointer text-stone-700 focus:outline-hidden"
                >
                  <option value="want_to_read">Okunacak</option>
                  <option value="reading">Okunuyor</option>
                  <option value="completed">Okundu ✓</option>
                </select>

                <div className="flex items-center gap-2">
                  {!item.userNote && editingId !== item.id && (
                    <button
                      onClick={() => handleStartEdit(item.id)}
                      className="text-xs text-stone-500 hover:text-stone-800 px-2 py-1 cursor-pointer flex items-center gap-1"
                      title="Not Ekle"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Not</span>
                    </button>
                  )}

                  <button
                    onClick={() => onOpenModal(item.analysis)}
                    className="text-xs text-stone-600 hover:text-stone-900 px-2 py-1 cursor-pointer"
                  >
                    Rapor
                  </button>

                  <button
                    onClick={() => removeSavedBook(item.id)}
                    className="p-1.5 text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
                    title="Kayıtlardan Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
