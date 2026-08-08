import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { formatJpy } from '../utils/formatters';
import { X, Heart, ShoppingBag, Star, Plus, Minus, Check, MapPin, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuickViewModal: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWish = isInWishlist(product.id);
  const title = language === 'en' ? product.nameEn : product.nameJa;
  const description = language === 'en' ? product.descriptionEn : product.descriptionJa;
  const details = language === 'en' ? product.detailsEn : product.detailsJa;
  const material = language === 'en' ? product.materialEn : product.materialJa;
  const origin = language === 'en' ? product.originEn : product.originJa;

  const images = [product.image, product.secondaryImage].filter(Boolean);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-neutral-900/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 z-10 my-auto"
        >
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-neutral-600 hover:text-black rounded-full shadow-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image Gallery */}
            <div className="p-6 bg-neutral-100 flex flex-col justify-between">
              <div className="aspect-4/5 rounded-2xl overflow-hidden bg-white shadow-xs relative">
                <img
                  src={images[activeImageIndex]}
                  alt={title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 mt-4 justify-center">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-neutral-900 shadow-md' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-500 font-medium uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-800" />
                    <span>{origin}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating} ({product.reviewsCount})</span>
                  </div>
                </div>

                <h2 className="font-serif-luxury text-2xl font-bold text-neutral-900 leading-tight">
                  {title}
                </h2>

                <div className="text-2xl font-bold text-neutral-900 font-mono tracking-tight">
                  {formatJpy(product.priceJpy)}
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed pt-2 border-t border-neutral-100">
                  {description}
                </p>

                {/* Material & Origin Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-neutral-50 border border-neutral-200/80 rounded-xl">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                      <Layers className="w-3 h-3 text-neutral-700" />
                      <span>{t.materialLabel}</span>
                    </div>
                    <p className="text-xs font-semibold text-neutral-900 mt-1">{material}</p>
                  </div>
                  <div className="p-3 bg-neutral-50 border border-neutral-200/80 rounded-xl">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                      <MapPin className="w-3 h-3 text-neutral-700" />
                      <span>{t.originLabel}</span>
                    </div>
                    <p className="text-xs font-semibold text-neutral-900 mt-1">{origin}</p>
                  </div>
                </div>

                {/* Details List */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    {t.detailsHeading}
                  </h4>
                  <ul className="space-y-1 text-xs text-neutral-600">
                    {details.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                    {t.itemQuantity}
                  </span>
                  <div className="flex items-center border border-neutral-300 rounded-lg bg-neutral-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-200/50 rounded-l transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold text-neutral-900 font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-200/50 rounded-r transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-neutral-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.addToCart}</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      inWish
                        ? 'bg-rose-50 border-rose-300 text-rose-600'
                        : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    }`}
                    title={inWish ? t.removeFromWishlist : t.addToWishlist}
                  >
                    <Heart className={`w-5 h-5 ${inWish ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
