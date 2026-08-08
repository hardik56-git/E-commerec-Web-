import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Search, Globe, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const {
    cartTotalCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
    activePage,
    setActivePage,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleNavClick = (page: 'home' | 'shop' | 'about' | 'contact') => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/90 backdrop-blur-md border-b border-neutral-200/80 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-neutral-900 text-neutral-300 text-[11px] tracking-widest uppercase py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span>{language === 'en' ? 'Free Express Shipping Across All Japan Prefectures & Worldwide' : '日本全国・世界主要都市へ無料速達配送'}</span>
        <span className="hidden md:inline-block text-neutral-500">|</span>
        <span className="hidden md:inline text-amber-300/90 font-mono">¥ JPY</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-800 hover:text-black rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-start text-left group focus:outline-none"
          >
            <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-[0.25em] text-neutral-900 group-hover:text-amber-900 transition-colors">
              {t.brandName}
            </span>
            <span className="text-[9px] tracking-[0.3em] font-medium text-neutral-500 uppercase -mt-0.5">
              {t.brandTagline}
            </span>
          </button>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm tracking-widest uppercase text-neutral-700">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors hover:text-black relative py-1 ${
              activePage === 'home'
                ? 'text-black font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black'
                : ''
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className={`transition-colors hover:text-black relative py-1 ${
              activePage === 'shop'
                ? 'text-black font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black'
                : ''
            }`}
          >
            {t.navShop}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors hover:text-black relative py-1 ${
              activePage === 'about'
                ? 'text-black font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black'
                : ''
            }`}
          >
            {t.navAbout}
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors hover:text-black relative py-1 ${
              activePage === 'contact'
                ? 'text-black font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black'
                : ''
            }`}
          >
            {t.navContact}
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Search Box */}
          <div className="relative flex items-center">
            {isSearchExpanded ? (
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  autoFocus
                  className="w-48 sm:w-64 pl-9 pr-8 py-1.5 text-xs bg-white border border-neutral-300 rounded-full focus:outline-none focus:ring-1 focus:ring-neutral-900 shadow-sm"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
                <button
                  onClick={() => {
                    setIsSearchExpanded(false);
                    setSearchQuery('');
                  }}
                  className="absolute right-2.5 text-neutral-400 hover:text-neutral-700 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsSearchExpanded(true);
                  if (activePage !== 'shop') setActivePage('shop');
                }}
                className="p-2 text-neutral-700 hover:text-black rounded-full hover:bg-neutral-200/50 transition-colors"
                title="Search"
                aria-label="Search items"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Language Switcher Badge */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wider text-neutral-800 bg-neutral-200/60 hover:bg-neutral-200 border border-neutral-300/60 rounded-full transition-all duration-200 shadow-xs"
            title="Toggle Language / 言語切り替え"
          >
            <Globe className="w-3.5 h-3.5 text-neutral-600" />
            <span>{language === 'en' ? 'EN | 日本語' : '日本語 | EN'}</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-neutral-700 hover:text-black rounded-full hover:bg-neutral-200/50 transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-amber-800 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all shadow-sm flex items-center gap-2 pl-3.5 pr-4"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wide">{cartTotalCount}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#faf9f6] border-b border-neutral-200 px-6 py-6 flex flex-col gap-4 text-sm uppercase tracking-widest font-medium">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-left py-2 border-b border-neutral-200/60 ${activePage === 'home' ? 'font-bold text-black' : 'text-neutral-600'}`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className={`text-left py-2 border-b border-neutral-200/60 ${activePage === 'shop' ? 'font-bold text-black' : 'text-neutral-600'}`}
          >
            {t.navShop}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`text-left py-2 border-b border-neutral-200/60 ${activePage === 'about' ? 'font-bold text-black' : 'text-neutral-600'}`}
          >
            {t.navAbout}
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`text-left py-2 ${activePage === 'contact' ? 'font-bold text-black' : 'text-neutral-600'}`}
          >
            {t.navContact}
          </button>
        </div>
      )}
    </header>
  );
};
