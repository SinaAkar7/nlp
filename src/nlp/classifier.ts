import {
  NLPAnalysisResult,
  GenreType,
  GenreProbability,
  TokenWeight,
  RomanceTrope
} from '../types';
import {
  ROMANCE_LEXICON,
  CONTRASTING_GENRE_LEXICON,
  ROMANCE_TROPES_PATTERNS,
  CANONICAL_BOOKS
} from './lexicon';

/**
 * Turkish and multilingual text normalization
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLocaleLowerCase('tr-TR')
    .replace(/['’`´]/g, '') // remove apostrophes for normalized word matching (aşk'ı -> aşkı)
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Turkish light stemmer / root matcher for romance words
 */
function getStemVariants(word: string): string[] {
  const stems = [word];
  
  // Common Turkish suffixes for romance & general words
  const suffixes = [
    'lar', 'ler', 'in', 'ın', 'un', 'ün', 'nin', 'nın', 'nun', 'nün',
    'im', 'ım', 'um', 'üm', 'imiz', 'ımız', 'iniz', 'ınız',
    'de', 'da', 'te', 'ta', 'den', 'dan', 'ten', 'tan',
    'i', 'ı', 'u', 'ü', 'yi', 'yı', 'yu', 'yü',
    'e', 'a', 'ye', 'ya',
    'li', 'lı', 'lu', 'lü', 'siz', 'sız', 'suz', 'süz',
    'ci', 'cı', 'cü', 'cu', 'lik', 'lık', 'luk', 'lük',
    'sel', 'sal'
  ];

  // Specific high-frequency romance root corrections
  if (word.startsWith('aşk')) return ['aşk', word];
  if (word.startsWith('sevgi')) return ['sevgi', word];
  if (word.startsWith('sevgili')) return ['sevgili', 'sevgi', word];
  if (word.startsWith('sevd')) return ['sevda', 'sevgi', word];
  if (word.startsWith('aşık') || word.startsWith('âşık')) return ['aşık', 'aşk', word];
  if (word.startsWith('tutku')) return ['tutku', word];
  if (word.startsWith('romantik') || word.startsWith('romans') || word.startsWith('romantizm')) return ['romantik', 'romantizm', word];
  if (word.startsWith('kalp') || word.startsWith('kalb')) return ['kalp', word];
  if (word.startsWith('gönül') || word.startsWith('gönl')) return ['gönül', word];
  if (word.startsWith('öpüş') || word.startsWith('öpm') || word.startsWith('öpüc')) return ['öpücük', word];
  if (word.startsWith('hasret')) return ['hasret', word];
  if (word.startsWith('özlem')) return ['özlem', word];
  if (word.startsWith('vuslat')) return ['vuslat', word];
  if (word.startsWith('evli') || word.startsWith('evlen')) return ['evlilik', word];
  if (word.startsWith('cinayet')) return ['cinayet', word];
  if (word.startsWith('katil')) return ['katil', word];
  if (word.startsWith('dedektif')) return ['dedektif', word];
  if (word.startsWith('robot')) return ['robot', word];
  if (word.startsWith('galaksi')) return ['galaksi', word];

  for (const suf of suffixes) {
    if (word.length > suf.length + 2 && word.endsWith(suf)) {
      stems.push(word.slice(0, -suf.length));
    }
  }

  return stems;
}

/**
 * Tokenize string into unigrams and n-grams
 */
export function extractTokensAndPhrases(rawText: string): { tokens: string[]; ngrams: string[] } {
  const normalized = normalizeText(rawText);
  if (!normalized) return { tokens: [], ngrams: [] };

  const tokens = normalized.split(/\s+/).filter(t => t.length > 1);
  const ngrams: string[] = [];

  // Bigrams & Trigrams for phrases like "ikinci şans", "yasak aşk", "kırık kalp"
  for (let i = 0; i < tokens.length - 1; i++) {
    ngrams.push(`${tokens[i]} ${tokens[i + 1]}`);
    if (i < tokens.length - 2) {
      ngrams.push(`${tokens[i]} ${tokens[i + 1]} ${tokens[i + 2]}`);
    }
  }

  return { tokens, ngrams };
}

/**
 * Analyze book text (title + optional blurb & author) with NLP
 */
export function analyzeBookText(title: string, author: string = '', blurb: string = ''): NLPAnalysisResult {
  const cleanTitle = title.trim();
  const normalizedTitle = normalizeText(cleanTitle);
  const combinedText = `${cleanTitle} ${author} ${blurb}`.trim();
  const { tokens, ngrams } = extractTokensAndPhrases(combinedText);

  // Check canonical known books first
  const canonical = CANONICAL_BOOKS[normalizedTitle];

  const matchedTokens: TokenWeight[] = [];
  const matchedWordsSet = new Set<string>();

  let romanceWeightSum = 0;
  let contrastWeightSum = 0;
  let genreScores: Record<GenreType, number> = {
    'Romantik': 0,
    'Romantik Dram': 0,
    'Tarihi Romantizm': 0,
    'Çağdaş Romantizm': 0,
    'Genç Yetişkin Romantik': 0,
    'Klasik Edebiyat': 0,
    'Polisiye & Gerilim': 0,
    'Bilim Kurgu': 0,
    'Distopya': 0,
    'Epik Fantezi': 0,
    'Felsefe & Düşünce': 0,
    'Korku & Gerilim': 0,
    'Tarih & Biyografi': 0
  };

  // 1. Evaluate unigrams and stem matches
  for (const token of tokens) {
    if (matchedWordsSet.has(token)) continue;

    const stems = getStemVariants(token);
    let matched = false;

    // Check Romance Lexicon
    for (const stem of stems) {
      if (ROMANCE_LEXICON[stem]) {
        const item = ROMANCE_LEXICON[stem];
        romanceWeightSum += item.weight;
        if (item.genreAffinity) {
          genreScores[item.genreAffinity] += item.weight * 1.2;
        }
        matchedTokens.push({
          word: token,
          weight: item.weight,
          category: 'romance',
          explanation: item.explanation
        });
        matchedWordsSet.add(token);
        matched = true;
        break;
      }
    }

    if (matched) continue;

    // Check Contrasting Lexicon
    for (const stem of stems) {
      if (CONTRASTING_GENRE_LEXICON[stem]) {
        const item = CONTRASTING_GENRE_LEXICON[stem];
        contrastWeightSum += Math.abs(item.weight);
        if (item.genreAffinity) {
          genreScores[item.genreAffinity] += Math.abs(item.weight) * 1.5;
        }
        matchedTokens.push({
          word: token,
          weight: item.weight,
          category: 'contrast',
          explanation: item.explanation
        });
        matchedWordsSet.add(token);
        break;
      }
    }
  }

  // 2. Evaluate N-grams for compound phrases
  for (const phrase of ngrams) {
    if (phrase === 'yasak aşk' || phrase === 'forbidden love') {
      romanceWeightSum += 4.5;
      genreScores['Romantik Dram'] += 4.0;
      matchedTokens.push({ word: phrase, weight: 4.5, category: 'romance', explanation: 'Klasik yasak aşk teması' });
    } else if (phrase === 'ikinci şans' || phrase === 'second chance') {
      romanceWeightSum += 3.8;
      genreScores['Çağdaş Romantizm'] += 3.5;
      matchedTokens.push({ word: phrase, weight: 3.8, category: 'romance', explanation: 'Yeniden başlayan aşk motifi' });
    } else if (phrase === 'kırık kalp' || phrase === 'broken heart') {
      romanceWeightSum += 3.5;
      genreScores['Romantik Dram'] += 3.5;
      matchedTokens.push({ word: phrase, weight: 3.5, category: 'romance', explanation: 'Duygusal kalp kırıklığı motifi' });
    } else if (phrase === 'sahte ilişki' || phrase === 'fake dating') {
      romanceWeightSum += 4.0;
      genreScores['Çağdaş Romantizm'] += 4.0;
      matchedTokens.push({ word: phrase, weight: 4.0, category: 'romance', explanation: 'Popüler sahte sevgili kurgusu' });
    }
  }

  // 3. Detect Romance Tropes
  const detectedTropes: RomanceTrope[] = [];
  const fullTextNormalized = normalizeText(combinedText);

  for (const tropePattern of ROMANCE_TROPES_PATTERNS) {
    const matchedTriggers: string[] = [];
    for (const trigger of tropePattern.triggers) {
      if (fullTextNormalized.includes(trigger)) {
        matchedTriggers.push(trigger);
      }
    }

    if (matchedTriggers.length > 0) {
      const confidence = Math.min(100, Math.round(55 + matchedTriggers.length * 20));
      detectedTropes.push({
        id: tropePattern.id,
        name: tropePattern.name,
        englishName: tropePattern.englishName,
        description: tropePattern.description,
        matchedKeywords: matchedTriggers,
        confidence
      });
      romanceWeightSum += matchedTriggers.length * 1.5;
    }
  }

  // 4. Compute Romance Confidence Score
  let calculatedScore = 0;

  if (canonical) {
    // If exact canonical match, anchor to validated literary record
    calculatedScore = canonical.score;
    genreScores[canonical.genre] += 12;
    if (canonical.isRomance) {
      romanceWeightSum += 8;
    } else {
      contrastWeightSum += 8;
    }
  } else {
    // Statistical weighted formula
    const rawRatio = romanceWeightSum - (contrastWeightSum * 1.25);
    if (romanceWeightSum === 0 && contrastWeightSum === 0) {
      // Neutral / unknown generic title: default baseline
      calculatedScore = 18;
    } else if (rawRatio > 0) {
      // Positive romance signal
      const scale = 40 + Math.min(58, rawRatio * 10);
      calculatedScore = Math.min(99, Math.round(scale));
    } else {
      // Strongly non-romance signal
      const scale = Math.max(4, Math.round(30 - Math.abs(rawRatio) * 6));
      calculatedScore = scale;
    }
  }

  const isRomance = calculatedScore >= 45;

  // 5. Calculate primary genre and genre probability distribution
  if (isRomance) {
    // Favor appropriate romance subgenre
    if (genreScores['Romantik Dram'] > genreScores['Romantik'] && genreScores['Romantik Dram'] > genreScores['Tarihi Romantizm']) {
      genreScores['Romantik Dram'] += 10;
    } else if (genreScores['Tarihi Romantizm'] > 0) {
      genreScores['Tarihi Romantizm'] += 10;
    } else if (genreScores['Çağdaş Romantizm'] > 0) {
      genreScores['Çağdaş Romantizm'] += 10;
    } else {
      genreScores['Romantik'] += 10;
    }
  } else {
    // If not romance and no strong contrast, default to Classic Literature or Fiction
    if (Object.values(genreScores).every(val => val === 0)) {
      genreScores['Klasik Edebiyat'] = 10;
    }
  }

  const totalGenreScore = Object.values(genreScores).reduce((a, b) => a + b, 0) || 1;
  const genreProbabilities: GenreProbability[] = Object.entries(genreScores)
    .filter(([_, score]) => score > 0)
    .map(([genre, score]) => ({
      genre: genre as GenreType,
      percentage: Math.round((score / totalGenreScore) * 100)
    }))
    .sort((a, b) => b.percentage - a.percentage);

  // If empty, fill fallback
  if (genreProbabilities.length === 0) {
    genreProbabilities.push({ genre: isRomance ? 'Romantik' : 'Klasik Edebiyat', percentage: 100 });
  }

  const primaryGenre: GenreType = canonical ? canonical.genre : (genreProbabilities[0]?.genre || (isRomance ? 'Romantik' : 'Klasik Edebiyat'));

  // 6. Sentiment & Polarity
  let sentimentPolarity = 0;
  if (isRomance) {
    const tragicWords = ['ayrılık', 'hüzün', 'gözyaşı', 'hasret', 'acı', 'veda', 'ölüm'];
    const hasTragic = tokens.some(t => tragicWords.some(w => t.includes(w)));
    sentimentPolarity = hasTragic ? -0.2 : 0.75;
  } else {
    const darkWords = ['cinayet', 'katil', 'ceset', 'savaş', 'dehşet', 'korku'];
    const hasDark = tokens.some(t => darkWords.some(w => t.includes(w)));
    sentimentPolarity = hasDark ? -0.7 : 0.1;
  }

  let sentimentLabel: NLPAnalysisResult['sentiment']['label'] = 'Nötr';
  if (sentimentPolarity > 0.4) {
    sentimentLabel = 'Duygusal & Tutkulu';
  } else if (sentimentPolarity < -0.4) {
    sentimentLabel = 'Gerilimli & Karanlık';
  } else if (sentimentPolarity < 0) {
    sentimentLabel = 'Melankolik & Dramatik';
  } else {
    sentimentLabel = 'Nötr';
  }

  // 7. Editorial critique generation
  let editorialCritique = '';
  if (canonical?.critique) {
    editorialCritique = canonical.critique;
  } else if (isRomance) {
    const tokenList = matchedTokens.filter(t => t.weight > 0).map(t => `"${t.word}"`).join(', ');
    const tropeList = detectedTropes.map(t => t.name).join(', ');
    editorialCritique = `Bu metin, yüksek oranda romantik leksik belirteçler ${tokenList ? `(${tokenList})` : ''} barındırmaktadır. ${
      tropeList ? `Ayrıca "${tropeList}" gibi belirgin aşk kurgusu motifleri tespit edilmiştir. ` : ''
    }Eserde karakterler arası duygusal çekim, aşk çatışması veya romantik bağın ana tema olduğu doğrulanmıştır (%${calculatedScore} Romantizm İndeksi).`;
  } else {
    const contrastTokens = matchedTokens.filter(t => t.weight < 0).map(t => `"${t.word}"`).join(', ');
    editorialCritique = `Metin analizi sonucunda eserin romantizm yerine ${primaryGenre} türüne ait unsurlar taşıdığı belirlenmiştir. ${
      contrastTokens ? `Metinde tespit edilen ${contrastTokens} gibi anahtar kelimeler ` : ''
    }eserin duygusal bir aşk hikayesinden ziyade kurgusal, felsefi, aksiyon veya gerilim ağırlıklı olduğunu göstermektedir (%${100 - calculatedScore} Diğer Tür Uyumu).`;
  }

  const romanceTokensCount = matchedTokens.filter(t => t.weight > 0).length;
  const romanceDensity = tokens.length > 0 ? Math.round((romanceTokensCount / tokens.length) * 100) : 0;

  return {
    id: `nlp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: cleanTitle,
    author: author.trim() || undefined,
    blurb: blurb.trim() || undefined,
    isRomance,
    romanceScore: calculatedScore,
    primaryGenre,
    genreProbabilities,
    matchedTokens,
    detectedTropes,
    sentiment: {
      polarity: sentimentPolarity,
      label: sentimentLabel
    },
    metrics: {
      tokenCount: tokens.length,
      romanceDensity,
      lexicalRichness: Math.min(100, Math.round((new Set(tokens).size / (tokens.length || 1)) * 100))
    },
    editorialCritique,
    analyzedAt: new Date().toISOString()
  };
}
