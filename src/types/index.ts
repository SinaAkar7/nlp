export type GenreType = 
  | 'Romantik'
  | 'Romantik Dram'
  | 'Tarihi Romantizm'
  | 'Çağdaş Romantizm'
  | 'Genç Yetişkin Romantik'
  | 'Klasik Edebiyat'
  | 'Polisiye & Gerilim'
  | 'Bilim Kurgu'
  | 'Distopya'
  | 'Epik Fantezi'
  | 'Felsefe & Düşünce'
  | 'Korku & Gerilim'
  | 'Tarih & Biyografi';

export interface TokenWeight {
  word: string;
  weight: number; // positive = romantic, negative = non-romantic
  category: 'romance' | 'contrast' | 'neutral' | 'trope';
  explanation?: string;
}

export interface RomanceTrope {
  id: string;
  name: string;
  englishName: string;
  description: string;
  matchedKeywords: string[];
  confidence: number; // 0 - 100
}

export interface GenreProbability {
  genre: GenreType;
  percentage: number;
}

export interface NLPAnalysisResult {
  id: string;
  title: string;
  author?: string;
  blurb?: string;
  isRomance: boolean;
  romanceScore: number; // 0 - 100
  primaryGenre: GenreType;
  genreProbabilities: GenreProbability[];
  matchedTokens: TokenWeight[];
  detectedTropes: RomanceTrope[];
  sentiment: {
    polarity: number; // -1.0 to 1.0
    label: 'Çok Pozitif' | 'Duygusal & Tutkulu' | 'Melankolik & Dramatik' | 'Nötr' | 'Gerilimli & Karanlık';
  };
  metrics: {
    tokenCount: number;
    romanceDensity: number; // percentage of tokens that are romance-related
    lexicalRichness: number;
  };
  editorialCritique: string;
  analyzedAt: string;
}

export type ReadingStatus = 'want_to_read' | 'reading' | 'completed';

export interface SavedBook {
  id: string;
  analysis: NLPAnalysisResult;
  savedAt: string;
  status: ReadingStatus;
  isFavorite: boolean;
  userRating?: number; // 1-5
  userNote?: string;
}

export interface PredefinedBook {
  id: string;
  title: string;
  author: string;
  year?: number;
  blurb: string;
  knownGenre: GenreType;
  isRomance: boolean;
  coverAccent: string; // hex or tailwind class
}
