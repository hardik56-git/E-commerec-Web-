import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-amber-800 text-xs font-bold uppercase tracking-[0.25em]">
          {t.aboutBadge}
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold tracking-wider text-neutral-900 leading-tight">
          {t.aboutTitle}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
          {t.aboutDesc1}
        </p>
      </div>

      {/* Main Vision Banner */}
      <div className="relative aspect-21/9 rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
        <img
          src="https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1600&auto=format&fit=crop"
          alt="Japanese Atelier Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent flex items-end p-8 sm:p-12">
          <div className="max-w-xl space-y-2 text-white">
            <h3 className="font-serif-luxury text-2xl font-bold">
              {language === 'en' ? 'The Craft of Silence' : '静寂の手仕事'}
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              {t.aboutDesc2}
            </p>
          </div>
        </div>
      </div>

      {/* Four Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="p-6 bg-white border border-neutral-200 rounded-2xl space-y-3 shadow-2xs">
          <div className="p-3 bg-neutral-100 rounded-xl w-fit text-neutral-900">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-serif-luxury text-lg font-semibold text-neutral-900">
            {language === 'en' ? 'Kyoto Silk Weaving' : '京都 西陣織'}
          </h4>
          <p className="text-xs text-neutral-500 leading-relaxed font-light">
            {language === 'en'
              ? 'Woven on Jacquard looms dating back centuries in Kyoto’s Nishijin district, utilizing pure organic raw silk.'
              : '京都西陣にて何世代も受け継がれた織機を使用し、純粋な生絹を贅沢に織り上げます。'}
          </p>
        </div>

        <div className="p-6 bg-white border border-neutral-200 rounded-2xl space-y-3 shadow-2xs">
          <div className="p-3 bg-neutral-100 rounded-xl w-fit text-neutral-900">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-serif-luxury text-lg font-semibold text-neutral-900">
            {language === 'en' ? 'Ginza Urushi Lacquer' : '銀座 漆器と金箔'}
          </h4>
          <p className="text-xs text-neutral-500 leading-relaxed font-light">
            {language === 'en'
              ? 'Hand-applied natural sap from poison ivy trees, hand-polished across dozens of subtle layers.'
              : '天然漆を幾重にも手塗りで塗り重ね、幾日もかけて研ぎ出す最高峰の職人技。'}
          </p>
        </div>

        <div className="p-6 bg-white border border-neutral-200 rounded-2xl space-y-3 shadow-2xs">
          <div className="p-3 bg-neutral-100 rounded-xl w-fit text-neutral-900">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h4 className="font-serif-luxury text-lg font-semibold text-neutral-900">
            {language === 'en' ? 'Tochigi Leather' : '栃木レザー タンニン鞣し'}
          </h4>
          <p className="text-xs text-neutral-500 leading-relaxed font-light">
            {language === 'en'
              ? 'Naturally tanned with mimosa bark over months, yielding deep patina and rich tactile scent.'
              : 'ミモザの樹皮から抽出したタンニンでじっくり鞣された、美しくエイジングする無垢革。'}
          </p>
        </div>

        <div className="p-6 bg-white border border-neutral-200 rounded-2xl space-y-3 shadow-2xs">
          <div className="p-3 bg-neutral-100 rounded-xl w-fit text-neutral-900">
            <Compass className="w-5 h-5" />
          </div>
          <h4 className="font-serif-luxury text-lg font-semibold text-neutral-900">
            {language === 'en' ? 'Kanazawa Gold Gilding' : '金沢 伝統24金箔'}
          </h4>
          <p className="text-xs text-neutral-500 leading-relaxed font-light">
            {language === 'en'
              ? 'Gold leaf beaten down to 1/10,000th of a millimeter by Kanazawa gold artisans.'
              : '1万分の1ミリメートルまで叩きのばした至高の純金箔を茶器や工芸品へ施します。'}
          </p>
        </div>
      </div>
    </div>
  );
};
