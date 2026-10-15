import React, { createContext, useContext, useState, useEffect } from 'react';
import { SavedBook, NLPAnalysisResult, ReadingStatus } from '../types';
import { analyzeBookText } from '../nlp/classifier';

interface StorageContextType {
  savedBooks: SavedBook[];
  saveAnalysis: (analysis: NLPAnalysisResult, status?: ReadingStatus, isFavorite?: boolean) => void;
  removeSavedBook: (id: string) => void;
  updateBookStatus: (id: string, status: ReadingStatus) => void;
  toggleFavorite: (id: string) => void;
  updateBookNote: (id: string, note: string, rating?: number) => void;
  isBookSaved: (title: string) => boolean;
  clearAllSaved: () => void;
  exportData: () => void;
  importData: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'romanza_saved_books_v1';

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse saved books from localStorage', e);
    }

    // Default starter saved books for first-time delightful profile experience
    const initial1 = analyzeBookText('Aşk ve Gurur', 'Jane Austen', 'Elizabeth Bennet ve Bay Darcy arasındaki zekâ dolu söz düelloları ve gururu aşan aşk.');
    const initial2 = analyzeBookText('Kürk Mantolu Madonna', 'Sabahattin Ali', 'Raif Efendi ile Maria Puder arasındaki unutulmaz aşk.');
    const initial3 = analyzeBookText('1984', 'George Orwell', 'Totaliter gözetim toplumu ve Büyük Birader distopyası.');

    return [
      {
        id: `saved_${Date.now()}_1`,
        analysis: initial1,
        savedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'completed',
        isFavorite: true,
        userRating: 5,
        userNote: 'Edebiyat tarihinin en kusursuz düşmandan aşka kurgusu, diyaloglar muhteşem.'
      },
      {
        id: `saved_${Date.now()}_2`,
        analysis: initial2,
        savedAt: new Date(Date.now() - 86400000).toISOString(),
        status: 'completed',
        isFavorite: true,
        userRating: 5,
        userNote: 'Raif Efendi’nin derin hüznü ve Maria Puder tablosu yüreğe işliyor.'
      },
      {
        id: `saved_${Date.now()}_3`,
        analysis: initial3,
        savedAt: new Date().toISOString(),
        status: 'want_to_read',
        isFavorite: false,
        userRating: 4,
        userNote: 'Politik bir distopya, romantik değil ancak felsefi olarak çok çarpıcı.'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedBooks));
    } catch (e) {
      console.error('Failed to persist saved books', e);
    }
  }, [savedBooks]);

  const saveAnalysis = (analysis: NLPAnalysisResult, status: ReadingStatus = 'want_to_read', isFavorite: boolean = false) => {
    setSavedBooks(prev => {
      // Check if already saved with same title
      const exists = prev.find(b => b.analysis.title.trim().toLowerCase() === analysis.title.trim().toLowerCase());
      if (exists) {
        return prev.map(b => b.id === exists.id ? { ...b, analysis, savedAt: new Date().toISOString() } : b);
      }
      const newBook: SavedBook = {
        id: `saved_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        analysis,
        savedAt: new Date().toISOString(),
        status,
        isFavorite
      };
      return [newBook, ...prev];
    });
  };

  const removeSavedBook = (id: string) => {
    setSavedBooks(prev => prev.filter(b => b.id !== id));
  };

  const updateBookStatus = (id: string, status: ReadingStatus) => {
    setSavedBooks(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const toggleFavorite = (id: string) => {
    setSavedBooks(prev => prev.map(b => b.id === id ? { ...b, isFavorite: !b.isFavorite } : b));
  };

  const updateBookNote = (id: string, note: string, rating?: number) => {
    setSavedBooks(prev => prev.map(b => b.id === id ? { ...b, userNote: note, userRating: rating ?? b.userRating } : b));
  };

  const isBookSaved = (title: string) => {
    return savedBooks.some(b => b.analysis.title.trim().toLowerCase() === title.trim().toLowerCase());
  };

  const clearAllSaved = () => {
    setSavedBooks([]);
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedBooks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `romanza_okuma_arsivi_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        setSavedBooks(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <StorageContext.Provider
      value={{
        savedBooks,
        saveAnalysis,
        removeSavedBook,
        updateBookStatus,
        toggleFavorite,
        updateBookNote,
        isBookSaved,
        clearAllSaved,
        exportData,
        importData
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};
