import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { setActivePage } = useStore();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-neutral-900 text-white overflow-hidden">
      {/* Background Hero Image with Dark Vignette Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2000&auto=format&fit=crop"
          alt="HARDIK Japanese Luxury Collection"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
      </div>

      {/* Hero Banner Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-8">
        <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wider leading-[1.15] text-white">
          {t.heroTitle}
        </h1>

        <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setActivePage('shop')}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-xs uppercase tracking-[0.2em] rounded-full shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3"
          >
            <span>{t.heroCtaPrimary}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActivePage('about')}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 border border-white/30 text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full backdrop-blur-xs transition-all"
          >
            <span>{t.heroCtaSecondary}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
