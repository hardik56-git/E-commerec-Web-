import React, { useState } from 'react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { formatJpy } from '../utils/formatters';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t } = useLanguage();
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  const inWish = isInWishlist(product.id);
  const title = language === 'en' ? product.nameEn : product.nameJa;
  const material = language === 'en' ? product.materialEn : product.materialJa;
  const origin = language === 'en' ? product.originEn : product.originJa;

  return (
    <div
      className="group relative bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-neutral-900 text-white rounded-full shadow-xs">
            {language === 'en' ? 'New Release' : '新作'}
          </span>
        )}
        {product.isFeatured && (
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-amber-900/90 text-amber-100 rounded-full shadow-xs">
            {language === 'en' ? 'Masterpiece' : '逸品'}
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className={`absolute top-3 right-3 z-10 p-2.5 rounded-full transition-all duration-200 ${
          inWish
            ? 'bg-rose-50 text-rose-600 border border-rose-200'
            : 'bg-white/90 backdrop-blur-xs text-neutral-600 hover:text-rose-600 hover:bg-white shadow-xs'
        }`}
        title={inWish ? t.removeFromWishlist : t.addToWishlist}
        aria-label="Wishlist toggle"
      >
        <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-4/5 overflow-hidden bg-neutral-100 cursor-pointer" onClick={() => setQuickViewProduct(product)}>
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay Quick Actions on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-white/90 hover:bg-white text-neutral-900 text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.quickView}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex-1 py-2 px-3 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.addToCart}</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] text-neutral-500 font-medium uppercase tracking-wider mb-1">
            <span>{origin}</span>
            <div className="flex items-center gap-1 text-amber-600 font-semibold">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-serif-luxury text-base font-semibold text-neutral-900 hover:text-amber-900 transition-colors cursor-pointer line-clamp-1"
          >
            {title}
          </h3>

          <p className="text-xs text-neutral-500 mt-1 line-clamp-1 font-normal">
            {material}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-base font-bold text-neutral-900 font-mono tracking-tight">
            {formatJpy(product.priceJpy)}
          </span>

          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {t.inStock}
          </span>
        </div>
      </div>
    </div>
  );
};
