import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { formatJpy } from '../utils/formatters';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WishlistDrawer: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    products,
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setActivePage,
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#faf9f6] shadow-2xl flex flex-col border-l border-neutral-200"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                <h2 className="font-serif-luxury text-lg font-bold text-neutral-900 uppercase tracking-widest">
                  {t.wishlistTitle}
                </h2>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlistProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="p-4 bg-neutral-200/60 rounded-full text-neutral-500">
                    <Heart className="w-8 h-8 text-neutral-400" />
                  </div>
                  <h3 className="font-serif-luxury text-lg font-semibold text-neutral-900">
                    {t.wishlistEmptyTitle}
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-xs">{t.wishlistEmptyDesc}</p>
                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setActivePage('shop');
                    }}
                    className="mt-4 py-2.5 px-6 bg-neutral-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                  >
                    {t.continueShopping}
                  </button>
                </div>
              ) : (
                wishlistProducts.map((product) => {
                  const title = language === 'en' ? product.nameEn : product.nameJa;
                  return (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3 bg-white border border-neutral-200/80 rounded-xl shadow-2xs items-center"
                    >
                      <img
                        src={product.image}
                        alt={title}
                        className="w-16 h-20 object-cover rounded-lg bg-neutral-100 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-serif-luxury text-sm font-semibold text-neutral-900 line-clamp-1">
                            {title}
                          </h4>
                          <p className="text-xs font-bold text-neutral-900 font-mono mt-0.5">
                            {formatJpy(product.priceJpy)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              addToCart(product);
                              toggleWishlist(product.id);
                            }}
                            className="flex-1 py-1.5 px-3 bg-neutral-900 hover:bg-black text-white text-[11px] font-semibold rounded flex items-center justify-center gap-1 transition-colors"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>{t.addToCart}</span>
                          </button>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors"
                            title={t.removeFromWishlist}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
