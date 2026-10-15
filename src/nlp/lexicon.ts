import { RomanceTrope, GenreType } from '../types';

export interface LexiconItem {
  weight: number;
  category: 'romance' | 'contrast';
  genreAffinity?: GenreType;
  explanation: string;
}

// Romantic Lexicon (Turkish and English) with semantic weights
export const ROMANCE_LEXICON: Record<string, LexiconItem> = {
  // Direct Turkish Romantic Words
  'aşk': { weight: 4.5, category: 'romance', genreAffinity: 'Romantik', explanation: 'Doğrudan romantik sevgi ve bağlanma kavramı' },
  'sevgi': { weight: 3.5, category: 'romance', genreAffinity: 'Romantik', explanation: 'Duygusal yakınlık ve muhabbet' },
  'sevgili': { weight: 4.0, category: 'romance', genreAffinity: 'Romantik', explanation: 'Aşk ilişkisi öznesi' },
  'tutku': { weight: 3.8, category: 'romance', genreAffinity: 'Romantik', explanation: 'Yoğun romantik ve fiziksel arzu' },
  'tutkulu': { weight: 3.6, category: 'romance', genreAffinity: 'Romantik', explanation: 'Yoğun duygusal çekim' },
  'romantik': { weight: 5.0, category: 'romance', genreAffinity: 'Romantik', explanation: 'Romantik türün doğrudan göstergesi' },
  'romantizm': { weight: 5.0, category: 'romance', genreAffinity: 'Romantik', explanation: 'Romantizm akımı ve türü' },
  'kalp': { weight: 2.8, category: 'romance', genreAffinity: 'Romantik', explanation: 'Aşk ve duyguların simgesi' },
  'gönül': { weight: 3.0, category: 'romance', genreAffinity: 'Romantik', explanation: 'Geleneksel Türk edebiyatında aşkın makamı' },
  'öpücük': { weight: 4.0, category: 'romance', genreAffinity: 'Romantik', explanation: 'Fiziksel romantik yakınlık' },
  'öpmek': { weight: 3.5, category: 'romance', genreAffinity: 'Romantik', explanation: 'Romantik eylem' },
  'hasret': { weight: 3.2, category: 'romance', genreAffinity: 'Romantik Dram', explanation: 'Kavuşamama ve özlem motifi' },
  'özlem': { weight: 2.8, category: 'romance', genreAffinity: 'Romantik', explanation: 'Sevilen kişiye duyulan arzu' },
  'vuslat': { weight: 3.7, category: 'romance', genreAffinity: 'Romantik', explanation: 'Sevenlerin kavuşması motifi' },
  'hicran': { weight: 3.4, category: 'romance', genreAffinity: 'Romantik Dram', explanation: 'Ayrılık ve hüzün acısı' },
  'ayrılık': { weight: 2.5, category: 'romance', genreAffinity: 'Romantik Dram', explanation: 'Aşk trajedisi ögesi' },
  'sevdalı': { weight: 4.0, category: 'romance', genreAffinity: 'Romantik', explanation: 'Âşık olma hali' },
  'sevda': { weight: 4.2, category: 'romance', genreAffinity: 'Romantik', explanation: 'Derin aşk bağı' },
  'aşık': { weight: 4.2, category: 'romance', genreAffinity: 'Romantik', explanation: 'Aşk duyan kişi' },
  'âşık': { weight: 4.2, category: 'romance', genreAffinity: 'Romantik', explanation: 'Klasik aşk öznesi' },
  'maşuk': { weight: 4.0, category: 'romance', genreAffinity: 'Romantik', explanation: 'Sevilen kişi' },
  'ihtiras': { weight: 3.5, category: 'romance', genreAffinity: 'Romantik', explanation: 'Güçlü tutku ve arzu' },
  'düğün': { weight: 3.2, category: 'romance', genreAffinity: 'Çağdaş Romantizm', explanation: 'Romantik final veya başlangıç motifi' },
  'evlilik': { weight: 2.9, category: 'romance', genreAffinity: 'Romantik', explanation: 'Romantik bağ ve bağlılık motifi' },
  'gelin': { weight: 3.0, category: 'romance', genreAffinity: 'Romantik', explanation: 'Evlilik ve aşk anlatısı' },
  'damat': { weight: 2.8, category: 'romance', genreAffinity: 'Romantik', explanation: 'Evlilik teması' },
  'nişan': { weight: 2.6, category: 'romance', genreAffinity: 'Romantik', explanation: 'Sözleşme ve ilişki adımı' },
  'sevişmek': { weight: 3.8, category: 'romance', genreAffinity: 'Çağdaş Romantizm', explanation: 'Yetişkin romantizm motifi' },
  'kavuşmak': { weight: 3.0, category: 'romance', genreAffinity: 'Romantik', explanation: 'Âşıkların bir araya gelmesi' },
  'sarılmak': { weight: 2.7, category: 'romance', genreAffinity: 'Romantik', explanation: 'Şefkat ve temas' },
  'romans': { weight: 4.8, category: 'romance', genreAffinity: 'Romantik', explanation: 'Romantik ilişki ve kurgu' },
  'gözyaşı': { weight: 2.2, category: 'romance', genreAffinity: 'Romantik Dram', explanation: 'Duygusal yük ve hüzün' },
  'kırık': { weight: 1.5, category: 'romance', genreAffinity: 'Romantik Dram', explanation: 'Kırık kalp mecazı' },
  'sadakat': { weight: 2.5, category: 'romance', genreAffinity: 'Romantik', explanation: 'Aşkta güven ve bağlılık' },
  'ihanet': { weight: 2.2, category: 'romance', genreAffinity: 'Romantik Dram', explanation: 'İlişkide aldatma/çatışma' },
  'kıskançlık': { weight: 2.6, category: 'romance', genreAffinity: 'Romantik', explanation: 'Aşk üçgeni / kıskançlık motifi' },
  'flört': { weight: 3.5, category: 'romance', genreAffinity: 'Çağdaş Romantizm', explanation: 'Romantik ilgi sinyali' },

  // English Romance Keywords
  'love': { weight: 4.5, category: 'romance', genreAffinity: 'Romantik', explanation: 'Core romance marker' },
  'romance': { weight: 5.0, category: 'romance', genreAffinity: 'Romantik', explanation: 'Genre identifier' },
  'romantic': { weight: 4.8, category: 'romance', genreAffinity: 'Romantik', explanation: 'Direct romance descriptor' },
  'passion': { weight: 3.8, category: 'romance', genreAffinity: 'Romantik', explanation: 'Passionate connection' },
  'kiss': { weight: 4.0, category: 'romance', genreAffinity: 'Romantik', explanation: 'Romantic physical intimacy' },
  'heart': { weight: 2.9, category: 'romance', genreAffinity: 'Romantik', explanation: 'Emotional center' },
  'beloved': { weight: 4.0, category: 'romance', genreAffinity: 'Tarihi Romantizm', explanation: 'Object of deep affection' },
  'darcy': { weight: 4.5, category: 'romance', genreAffinity: 'Tarihi Romantizm', explanation: 'Classic Pride & Prejudice romance reference' },
  'bride': { weight: 3.4, category: 'romance', genreAffinity: 'Romantik', explanation: 'Nuptial/wedding motif' },
  'groom': { weight: 3.0, category: 'romance', genreAffinity: 'Romantik', explanation: 'Nuptial motif' },
  'desire': { weight: 3.2, category: 'romance', genreAffinity: 'Romantik', explanation: 'Romantic longing' },
  'soulmate': { weight: 4.6, category: 'romance', genreAffinity: 'Romantik', explanation: 'Destined love' },
  'sweetheart': { weight: 4.0, category: 'romance', genreAffinity: 'Romantik', explanation: 'Endearment term' },
  'forever': { weight: 2.4, category: 'romance', genreAffinity: 'Romantik', explanation: 'Everlasting love trope' },
  'crush': { weight: 3.2, category: 'romance', genreAffinity: 'Genç Yetişkin Romantik', explanation: 'Youth affection' },
  'dating': { weight: 3.5, category: 'romance', genreAffinity: 'Çağdaş Romantizm', explanation: 'Contemporary romance trope' },
  'lover': { weight: 4.2, category: 'romance', genreAffinity: 'Romantik', explanation: 'Partner in romance' },
  'lovers': { weight: 4.3, category: 'romance', genreAffinity: 'Romantik', explanation: 'Romantic duo' },
  'affair': { weight: 3.0, category: 'romance', genreAffinity: 'Romantik Dram', explanation: 'Secret romance drama' }
};

// Contrasting Genre Lexicon (Negative weights for romance, points toward other genres)
export const CONTRASTING_GENRE_LEXICON: Record<string, LexiconItem> = {
  // Sci-Fi / Cyber / Space
  'robot': { weight: -4.0, category: 'contrast', genreAffinity: 'Bilim Kurgu', explanation: 'Yapay mekanik varlık göstergesi' },
  'galaksi': { weight: -3.5, category: 'contrast', genreAffinity: 'Bilim Kurgu', explanation: 'Uzay operası terimi' },
  'uzay': { weight: -3.2, category: 'contrast', genreAffinity: 'Bilim Kurgu', explanation: 'Astrofizik ve uzay mekanı' },
  'yapay': { weight: -2.8, category: 'contrast', genreAffinity: 'Bilim Kurgu', explanation: 'Yapay zeka / sentetik kurgu' },
  'sibernetik': { weight: -4.5, category: 'contrast', genreAffinity: 'Bilim Kurgu', explanation: 'Siberpunk ögesi' },
  'solucandeliği': { weight: -4.0, category: 'contrast', genreAffinity: 'Bilim Kurgu', explanation: 'Astrofizik bilim kurgu motifi' },
  'mars': { weight: -3.0, category: 'contrast', genreAffinity: 'Bilim Kurgu', explanation: 'Gezegenlerarası kurgu' },
  'kuantum': { weight: -3.8, category: 'contrast', genreAffinity: 'Bilim Kurgu', explanation: 'Teorik fizik ve sert bilim kurgu' },

  // Crime / Detective / Thriller
  'cinayet': { weight: -4.2, category: 'contrast', genreAffinity: 'Polisiye & Gerilim', explanation: 'Ölüm ve adli vaka anlatısı' },
  'katil': { weight: -4.0, category: 'contrast', genreAffinity: 'Polisiye & Gerilim', explanation: 'Cinayet faili' },
  'dedektif': { weight: -4.5, category: 'contrast', genreAffinity: 'Polisiye & Gerilim', explanation: 'Polisiye araştırmacı' },
  'ceset': { weight: -4.0, category: 'contrast', genreAffinity: 'Polisiye & Gerilim', explanation: 'Adli tıp ve cinayet kanıtı' },
  'polis': { weight: -3.0, category: 'contrast', genreAffinity: 'Polisiye & Gerilim', explanation: 'Güvenlik birimi ve soruşturma' },
  'soruşturma': { weight: -3.5, category: 'contrast', genreAffinity: 'Polisiye & Gerilim', explanation: 'Adli araştırma süreci' },
  'morg': { weight: -4.0, category: 'contrast', genreAffinity: 'Polisiye & Gerilim', explanation: 'Cinayet ve adli mekan' },
  'seri': { weight: -2.8, category: 'contrast', genreAffinity: 'Polisiye & Gerilim', explanation: 'Seri katil anlatısı' },

  // Dystopia / Politics / War
  'distopya': { weight: -4.0, category: 'contrast', genreAffinity: 'Distopya', explanation: 'Karanlık gelecek kurgusu' },
  'totaliter': { weight: -4.2, category: 'contrast', genreAffinity: 'Distopya', explanation: 'Otoriter baskı rejimi' },
  'isyan': { weight: -2.5, category: 'contrast', genreAffinity: 'Distopya', explanation: 'Rejim karşıtı ayaklanma' },
  'baskı': { weight: -2.0, category: 'contrast', genreAffinity: 'Distopya', explanation: 'Toplumsal denetim' },
  'savaş': { weight: -3.2, category: 'contrast', genreAffinity: 'Tarih & Biyografi', explanation: 'Askeri çatışma ve yıkım' },
  'ordu': { weight: -3.0, category: 'contrast', genreAffinity: 'Tarih & Biyografi', explanation: 'Askeri birlik' },
  'cephe': { weight: -2.8, category: 'contrast', genreAffinity: 'Tarih & Biyografi', explanation: 'Muharebe alanı' },

  // Horror
  'dehşet': { weight: -3.8, category: 'contrast', genreAffinity: 'Korku & Gerilim', explanation: 'Korku ve ürperti ögesi' },
  'korku': { weight: -3.0, category: 'contrast', genreAffinity: 'Korku & Gerilim', explanation: 'Korku edebiyatı motifi' },
  'şeytan': { weight: -3.5, category: 'contrast', genreAffinity: 'Korku & Gerilim', explanation: 'Doğaüstü karanlık varlık' },
  'lanet': { weight: -2.8, category: 'contrast', genreAffinity: 'Korku & Gerilim', explanation: 'Okült ve gotik lanet' },

  // Philosophy / Non-fiction
  'felsefe': { weight: -3.5, category: 'contrast', genreAffinity: 'Felsefe & Düşünce', explanation: 'Düşünsel ve felsefi inceleme' },
  'mantık': { weight: -2.8, category: 'contrast', genreAffinity: 'Felsefe & Düşünce', explanation: 'Rasyonel analiz' },
  'ekonomi': { weight: -3.8, category: 'contrast', genreAffinity: 'Felsefe & Düşünce', explanation: 'İktisadi analiz' },
  'sosyoloji': { weight: -3.6, category: 'contrast', genreAffinity: 'Felsefe & Düşünce', explanation: 'Toplum bilimi' },
  'teori': { weight: -2.8, category: 'contrast', genreAffinity: 'Felsefe & Düşünce', explanation: 'Kuramsal çerçeve' }
};

// Recognized Romance Tropes Dictionary
export const ROMANCE_TROPES_PATTERNS: Array<{
  id: string;
  name: string;
  englishName: string;
  description: string;
  triggers: string[];
}> = [
  {
    id: 'enemies_to_lovers',
    name: 'Nefretten Doğan Aşk',
    englishName: 'Enemies to Lovers',
    description: 'Birbirinden nefret eden veya rakip olan iki karakterin zamanla güçlü bir aşka sürüklenmesi.',
    triggers: ['nefret', 'düşman', 'gurur', 'kibir', 'hate', 'enemy', 'rival', 'rekabet', 'karşıt', 'pride', 'prejudice']
  },
  {
    id: 'forbidden_love',
    name: 'Yasak Aşk',
    englishName: 'Forbidden Love',
    description: 'Toplumsal engeller, statü farkları, aile kuralları veya gizlilik nedeniyle yaşanması imkansız görülen aşk.',
    triggers: ['yasak', 'gizli', 'günah', 'engel', 'imkansız', 'haram', 'tabu', 'forbidden', 'secret', 'scandalous', 'taboo']
  },
  {
    id: 'second_chance',
    name: 'İkinci Şans',
    englishName: 'Second Chance',
    description: 'Geçmişte yarım kalan veya ayrılıkla sonuçlanan bir aşkın yıllar sonra yeniden canlanması.',
    triggers: ['ikinci şans', 'yeniden', 'yıllar sonra', 'eski sevgili', 'geri dönüş', 'second chance', 'reunite', 'hatırla']
  },
  {
    id: 'fake_dating',
    name: 'Sahte İlişki',
    englishName: 'Fake Dating',
    description: 'Belirli bir amaç uğruna sahte bir çift gibi davranmaya başlayan kişilerin gerçeğe dönüşen duyguları.',
    triggers: ['sahte', 'anlaşma', 'oyun', 'evlilik oyunu', 'numara', 'fake dating', 'pretend', 'contract']
  },
  {
    id: 'slow_burn',
    name: 'Yavaş Yavaş Alevlenen Aşk',
    englishName: 'Slow Burn',
    description: 'İlk bakışta değil; sabır, derin sohbetler ve adım adım gelişen yoğun çekimle olgunlaşan aşk.',
    triggers: ['yavaş', 'adım adım', 'sessizce', 'zamanla', 'bekleyiş', 'slow burn', 'gentle', 'gradual']
  },
  {
    id: 'tragic_melodrama',
    name: 'Kavuşamayan Âşıklar / Melodram',
    englishName: 'Tragic / Melodramatic Romance',
    description: 'Hastalık, ölüm veya talihsiz yazgılar yüzünden hüzünle biten gözyaşı dolu aşk anlatısı.',
    triggers: ['hastalık', 'veda', 'ölüm', 'gözyaşı', 'hüzün', 'kavuşamamak', 'melankoli', 'leyla', 'mecnun', 'ferhat', 'şirin', 'tragedy', 'tears']
  },
  {
    id: 'friends_to_lovers',
    name: 'Arkadaşlıktan Aşka',
    englishName: 'Friends to Lovers',
    description: 'Yılların dostluğunun bir anda saklanan hislerin itirafıyla romantik bir aşka evrilmesi.',
    triggers: ['dost', 'arkadaş', 'çocukluk', 'itiraf', 'friends', 'best friend', 'companion']
  },
  {
    id: 'royalty_billionaire',
    name: 'Asil / Zengin & Sıradan Biri',
    englishName: 'Royalty & Billionaire Romance',
    description: 'Büyük zenginlik, soyluluk veya güç ile mütevazı bir yaşam arasındaki çekim.',
    triggers: ['kont', 'dük', 'prens', 'holding', 'milyarder', 'soylu', 'saray', 'duke', 'prince', 'billionaire', 'lord']
  }
];

// Curated canonical literary database for immediate pinpoint accuracy on world & Turkish classics
export const CANONICAL_BOOKS: Record<string, {
  genre: GenreType;
  isRomance: boolean;
  score: number;
  tropes: string[];
  critique: string;
}> = {
  'aşk ve gurur': {
    genre: 'Tarihi Romantizm',
    isRomance: true,
    score: 98,
    tropes: ['enemies_to_lovers'],
    critique: 'Jane Austen\'ın başyapıtı; Elizabeth Bennet ve Bay Darcy arasındaki ilk izlenim, toplumsal sınıf çatışması ve gurur ile kibir engellerinin aşılmasını ele alan dünya edebiyatının temel romantik romanıdır.'
  },
  'pride and prejudice': {
    genre: 'Tarihi Romantizm',
    isRomance: true,
    score: 98,
    tropes: ['enemies_to_lovers'],
    critique: 'A definitive historical romance exploring social standing, pride, prejudice, and the electric tension between Elizabeth Bennet and Mr. Darcy.'
  },
  'kürk mantolu madonna': {
    genre: 'Romantik Dram',
    isRomance: true,
    score: 92,
    tropes: ['tragic_melodrama', 'slow_burn'],
    critique: 'Sabahattin Ali\'nin ölümsüz eseri; Raif Efendi ile Maria Puder\'in Berlin\'deki derin, melankolik ve bir ömür boyu unutulamayan aşkını içsel monologlar ve tablonun büyüleyici aurasıyla işler.'
  },
  'aşk-ı memnu': {
    genre: 'Romantik Dram',
    isRomance: true,
    score: 96,
    tropes: ['forbidden_love', 'tragic_melodrama'],
    critique: 'Halid Ziya Uşaklıgil\'in Türk edebiyatına kazandırdığı en büyük yasak aşk anlatısı; Bihter ve Behlül\'ün vicdani yıkım, tutku ve toplumsal felaketle örülü trajedisi.'
  },
  'jane eyre': {
    genre: 'Tarihi Romantizm',
    isRomance: true,
    score: 94,
    tropes: ['forbidden_love', 'slow_burn'],
    critique: 'Charlotte Brontë\'nin gotik ve bağımsız kadın karakteri Jane Eyre ile gizemli Edward Rochester arasındaki ahlaki, duygusal ve tutkulu bağı konu alır.'
  },
  'uğultulu tepeler': {
    genre: 'Romantik Dram',
    isRomance: true,
    score: 91,
    tropes: ['tragic_melodrama', 'enemies_to_lovers'],
    critique: 'Emily Brontë\'nin vahşi Yorkshire bataklıklarında geçen Heathcliff ve Catherine arasındaki saplantılı, doğaüstü ve yok edici aşk fırtınası.'
  },
  'wuthering heights': {
    genre: 'Romantik Dram',
    isRomance: true,
    score: 91,
    tropes: ['tragic_melodrama', 'enemies_to_lovers'],
    critique: 'A dark, brooding gothic romance of obsessive love, revenge, and transcendent connection across generations.'
  },
  'bizimle başladı bizimle bitti': {
    genre: 'Çağdaş Romantizm',
    isRomance: true,
    score: 93,
    tropes: ['second_chance', 'tragic_melodrama'],
    critique: 'Colleen Hoover\'ın çok satan çağdaş romantizm romanı; Lily, Ryle ve ilk aşkı Atlas arasında geçen travma, fedakarlık ve sevgi sınırlarını sorgulayan dokunaklı bir anlatı.'
  },
  'it ends with us': {
    genre: 'Çağdaş Romantizm',
    isRomance: true,
    score: 93,
    tropes: ['second_chance', 'tragic_melodrama'],
    critique: 'A poignant contemporary romance dealing with past trauma, fierce passion, and difficult choices in modern love.'
  },
  'çalıkuşu': {
    genre: 'Romantik Dram',
    isRomance: true,
    score: 90,
    tropes: ['second_chance', 'enemies_to_lovers'],
    critique: 'Reşat Nuri Güntekin\'in Feride ve Kâmran arasındaki gurur yüzünden ertelenmiş fakat Anadolu\'nun dört bir yanında büyüyen samimi aşk hikayesi.'
  },
  'eylül': {
    genre: 'Romantik Dram',
    isRomance: true,
    score: 94,
    tropes: ['forbidden_love', 'tragic_melodrama'],
    critique: 'Mehmet Rauf\'un Türk edebiyatının ilk psikolojik romanı kabul edilen eseri; Suad, Süreyya ve Necib arasındaki suskun, vicdani ve içsel yasak aşk üçgeni.'
  },
  'senden önce ben': {
    genre: 'Romantik Dram',
    isRomance: true,
    score: 95,
    tropes: ['tragic_melodrama', 'slow_burn'],
    critique: 'Jojo Moyes\'in dünya çapında ses getiren romanı; neşeli Louisa Clark ile yaşama sevincini yitirmiş Will Traynor arasındaki dönüştürücü ve yürek burkan aşk.'
  },
  'me before you': {
    genre: 'Romantik Dram',
    isRomance: true,
    score: 95,
    tropes: ['tragic_melodrama', 'slow_burn'],
    critique: 'An emotionally shattering romance about finding life\'s meaning through unexpected love.'
  },
  'normal people': {
    genre: 'Çağdaş Romantizm',
    isRomance: true,
    score: 89,
    tropes: ['second_chance', 'friends_to_lovers'],
    critique: 'Sally Rooney\'nin modern gençlik dinamiklerini, iletişim kopukluklarını ve Connell ile Marianne\'in birbirini şekillendiren kopuk ama sürekli bağı.'
  },
  'aynı yıldızın altında': {
    genre: 'Genç Yetişkin Romantik',
    isRomance: true,
    score: 94,
    tropes: ['tragic_melodrama'],
    critique: 'John Green\'in Hazel ve Augustus isimli iki kanser hastası gencin sonsuzluğu kısıtlı günlere sığdıran dokunaklı ilk aşkı.'
  },
  'the fault in our stars': {
    genre: 'Genç Yetişkin Romantik',
    isRomance: true,
    score: 94,
    tropes: ['tragic_melodrama'],
    critique: 'A modern YA romance exploring mortality, wit, and profound devotion between two terminally ill teenagers.'
  },
  '1984': {
    genre: 'Distopya',
    isRomance: false,
    score: 18,
    tropes: [],
    critique: 'George Orwell\'in totaliter rejim, tele-ekranlar, düşünce polisi ve Büyük Birader denetimini konu alan politik distopya başyapıtı. Winston ve Julia\'nın yakınlaşması bir aşk anlatısından ziyade rejime karşı siyasi bir başkaldırıdır.'
  },
  'suç ve ceza': {
    genre: 'Klasik Edebiyat',
    isRomance: false,
    score: 15,
    tropes: [],
    critique: 'Fyodor Dostoyevski\'nin Raskolnikov\'un ahlaki hezeyanlarını, işlediği cinayeti ve vicdani kefaretini derinlemesine inceleyen psikolojik felsefi romanı.'
  },
  'crime and punishment': {
    genre: 'Klasik Edebiyat',
    isRomance: false,
    score: 15,
    tropes: [],
    critique: 'Dostoevsky\'s psychological masterpiece exploring moral transgression, crime, guilt, and philosophical redemption.'
  },
  'dune': {
    genre: 'Bilim Kurgu',
    isRomance: false,
    score: 14,
    tropes: [],
    critique: 'Frank Herbert\'in Arrakis çöl gezegeninde baharat ticareti, ekoloji, din ve hanedan savaşlarını anlatan epik bilim kurgu destanı.'
  },
  'sefiller': {
    genre: 'Klasik Edebiyat',
    isRomance: false,
    score: 22,
    tropes: [],
    critique: 'Victor Hugo\'nun Jean Valjean, adalet, yoksulluk ve 19. yüzyıl Fransız toplumunun çilesini anlatan anıtsal sosyal romanı.'
  },
  'tutunamayanlar': {
    genre: 'Klasik Edebiyat',
    isRomance: false,
    score: 12,
    tropes: [],
    critique: 'Oğuz Atay\'ın Selim Işık\'ın intiharı ardından Turgut Özben\'in burjuva aydınını ve modern yabancılaşmayı sorguladığı postmodern Türk edebiyatı doruğu.'
  },
  'hayvan çiftliği': {
    genre: 'Distopya',
    isRomance: false,
    score: 8,
    tropes: [],
    critique: 'George Orwell\'in totaliter diktatörlükleri ve devrimlerin yozlaşmasını hayvanlar üzerinden hicveden alegorik romanı.'
  },
  'dönüşüm': {
    genre: 'Klasik Edebiyat',
    isRomance: false,
    score: 9,
    tropes: [],
    critique: 'Franz Kafka\'nın Gregor Samsa\'nın bir sabah dev bir böceğe dönüşmesiyle yabancılaşma ve aile bağlarının çöküşünü anlatan varoluşçu metni.'
  },
  'yüzüklerin efendisi': {
    genre: 'Epik Fantezi',
    isRomance: false,
    score: 20,
    tropes: [],
    critique: 'J.R.R. Tolkien\'in Orta Dünya\'da Tek Yüzük\'ü yok etme mücadelesini ve kardeşliği anlatan efsanevi epik fantezi üçlemesi.'
  }
};
