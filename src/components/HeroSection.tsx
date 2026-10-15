import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import heroBannerImage from '../assets/images/hero_literary_romance_1792059862797.jpg';

interface HeroSectionProps {
  onSelectSample: (title: string, author?: string, blurb?: string) => void;
  onScrollToAnalyzer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectSample,
  onScrollToAnalyzer
}) => {
  const quickSamples = [
    { title: 'Aşk ve Gurur', author: 'Jane Austen' },
    { title: 'Kürk Mantolu Madonna', author: 'Sabahattin Ali' },
    { title: '1984', author: 'George Orwell' },
    { title: 'Aşk-ı Memnu', author: 'Halid Ziya Uşaklıgil' },
    { title: 'Bizimle Başladı Bizimle Bitti', author: 'Colleen Hoover' },
    { title: 'Suç ve Ceza', author: 'Fyodor Dostoyevski' },
    { title: 'Dune', author: 'Frank Herbert' },
    { title: 'Senden Önce Ben', author: 'Jojo Moyes' }
  ];

  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-b from-[#fbf9f6] via-[#f7f3ec] to-[#f5efe6] pt-10 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Editorial Headline & Intent */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500 tracking-wider uppercase font-sans">
              <span>Doğal Dil İşleme</span>
              <span aria-hidden="true">·</span>
              <span>Leksik Metin Analizi</span>
              <span aria-hidden="true">·</span>
              <span>Anlık İstemci Tespiti</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.1] font-semibold text-balance">
              Metin Analiziyle Edebiyatın Kalbine Yolculuk.
            </h1>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              Kitap başlıkları ve açıklamalarındaki semantik kelime ağlarını, romantizm leksikonunu ve edebi motifleri
              (Enemies to Lovers, Yasak Aşk, İkinci Şans) anlık olarak çözümleyerek romantik eserleri diğer edebi türlerden ayırın.
            </p>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onScrollToAnalyzer}
                className="px-6 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Hemen Bir Kitap Analiz Et</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-stone-500 flex items-center gap-1.5 px-3 py-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-800" />
                <span>%100 İstemci Taraflı ve Hızlı</span>
              </div>
            </div>

            {/* Curated quick sample triggers */}
            <div className="pt-4 border-t border-stone-200/80">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2.5">
                Hızlı Deneme Örnekleri
              </p>
              <div className="flex flex-wrap gap-2">
                {quickSamples.map((sample) => (
                  <button
                    key={sample.title}
                    onClick={() => onSelectSample(sample.title, sample.author)}
                    className="text-xs font-medium px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200 rounded-md transition-colors cursor-pointer text-left whitespace-nowrap"
                  >
                    <span className="font-semibold">{sample.title}</span>
                    <span className="text-stone-400 text-[11px] ml-1">· {sample.author}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High fidelity editorial photography banner */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-stone-200 shadow-sm bg-stone-100 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] group">
              <img
                src={heroBannerImage}
                alt="Klasik edebiyat ciltleri, mektup ve kurutulmuş güller"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <p className="text-xs font-sans uppercase tracking-widest text-rose-200">
                  Semantik Romanza Algoritması
                </p>
                <p className="font-editorial text-xl font-medium mt-1 text-stone-100">
                  "Aşk, sözcüklerin arasına gizlenmiş en derin frekanstır."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
