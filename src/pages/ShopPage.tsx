import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Category } from '../types';
import { Search, RotateCcw, Filter } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    priceFilter,
    setPriceFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t.catAll },
    { key: 'apparel', label: t.catApparel },
    { key: 'timepieces', label: t.catTimepieces },
    { key: 'leather', label: t.catLeather },
    { key: 'interior', label: t.catInterior },
    { key: 'ceremony', label: t.catCeremony },
  ];

  // Filtering Logic
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (priceFilter === 'under50k' && product.priceJpy >= 50000) return false;
      if (priceFilter === '50kTo150k' && (product.priceJpy < 50000 || product.priceJpy > 150000)) return false;
      if (priceFilter === 'above150k' && product.priceJpy <= 150000) return false;

      // Search query filter (check English & Japanese names, description, material, origin)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesEn = product.nameEn.toLowerCase().includes(q) || product.descriptionEn.toLowerCase().includes(q) || product.materialEn.toLowerCase().includes(q) || product.originEn.toLowerCase().includes(q);
        const matchesJa = product.nameJa.includes(q) || product.descriptionJa.includes(q) || product.materialJa.includes(q) || product.originJa.includes(q);
        return matchesEn || matchesJa;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priceLow') return a.priceJpy - b.priceJpy;
      if (sortBy === 'priceHigh') return b.priceJpy - a.priceJpy;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured'
    });

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceFilter('all');
    setSortBy('featured');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-h-screen">
      {/* Title Header */}
      <div className="text-center space-y-2 border-b border-neutral-200 pb-8">
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold tracking-wider text-neutral-900">
          {t.navShop}
        </h1>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
          {language === 'en' ? 'Craftsmanship & Pure Aesthetic' : '伝統工芸士の手仕事による極上の作品'}
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        {/* Search & Category Pills Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white transition-colors"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>

          {/* Category Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters: Price Filter & Sorting */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-neutral-100 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-neutral-500 font-medium">
              <Filter className="w-3.5 h-3.5" />
              <span>{t.filterPriceRange}:</span>
            </div>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs text-neutral-800 font-medium focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="all">{t.allPrices}</option>
              <option value="under50k">{t.under50k}</option>
              <option value="50kTo150k">{t.from50kTo150k}</option>
              <option value="above150k">{t.above150k}</option>
            </select>

            {(selectedCategory !== 'all' || priceFilter !== 'all' || searchQuery !== '') && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-amber-900 hover:text-black font-semibold uppercase tracking-wider ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-500 font-medium">{t.sortBy}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs text-neutral-800 font-medium focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="featured">{t.sortFeatured}</option>
              <option value="priceLow">{t.sortPriceLow}</option>
              <option value="priceHigh">{t.sortPriceHigh}</option>
              <option value="rating">{t.sortRating}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid Header Stats */}
      <div className="flex items-center justify-between text-xs text-neutral-500 font-medium px-1">
        <span>
          Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> creations
        </span>
        {searchQuery && (
          <span>
            Search results for &quot;<span className="text-neutral-900 font-semibold">{searchQuery}</span>&quot;
          </span>
        )}
      </div>

      {/* Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white border border-neutral-200 rounded-2xl p-8">
          <p className="font-serif-luxury text-xl font-semibold text-neutral-900">
            {language === 'en' ? 'No items match your selected filters' : '条件に該当する作品が見つかりませんでした'}
          </p>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            {language === 'en'
              ? 'Try adjusting your search criteria or resetting filters to view our full collection.'
              : '検索ワードやカテゴリー条件を変更して、再度お試しください。'}
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-black transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
