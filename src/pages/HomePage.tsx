import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { Hero } from '../components/Hero';
import { FeaturesTicker } from '../components/FeaturesTicker';
import { ProductCard } from '../components/ProductCard';
import { Category } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    setActivePage,
  } = useStore();

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t.catAll },
    { key: 'apparel', label: t.catApparel },
    { key: 'timepieces', label: t.catTimepieces },
    { key: 'leather', label: t.catLeather },
    { key: 'interior', label: t.catInterior },
    { key: 'ceremony', label: t.catCeremony },
  ];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <Hero />

      {/* Value Proposition Ticker */}
      <FeaturesTicker />

      {/* Featured Masterpieces Collection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-neutral-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.featuredTitle}</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-neutral-900 tracking-wide">
              {t.featuredSubtitle}
            </h2>
          </div>

          <button
            onClick={() => setActivePage('shop')}
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-neutral-900 hover:text-amber-900 transition-colors group"
          >
            <span>{t.viewAllProducts}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200/80 border border-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
