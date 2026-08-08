import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { formatJpy } from '../utils/formatters';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    setActivePage,
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
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
                <ShoppingBag className="w-5 h-5 text-neutral-800" />
                <h2 className="font-serif-luxury text-lg font-bold text-neutral-900 uppercase tracking-widest">
                  {t.cartTitle}
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="p-4 bg-neutral-200/60 rounded-full text-neutral-500">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-luxury text-lg font-semibold text-neutral-900">
                    {t.cartEmptyTitle}
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-xs">{t.cartEmptyDesc}</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setActivePage('shop');
                    }}
                    className="mt-4 py-2.5 px-6 bg-neutral-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                  >
                    {t.continueShopping}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200 text-xs text-neutral-500">
                    <span>{cart.length} {language === 'en' ? 'items' : '点'}</span>
                    <button
                      onClick={clearCart}
                      className="text-neutral-500 hover:text-rose-600 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{t.clearCart}</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cart.map((item) => {
                      const title = language === 'en' ? item.product.nameEn : item.product.nameJa;
                      return (
                        <div
                          key={item.product.id}
                          className="flex gap-4 p-3 bg-white border border-neutral-200/80 rounded-xl shadow-2xs"
                        >
                          <img
                            src={item.product.image}
                            alt={title}
                            className="w-20 h-24 object-cover rounded-lg bg-neutral-100 shrink-0"
                          />
                          <div className="flex-1 flex flex-col justify-between py-0.5">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="font-serif-luxury text-sm font-semibold text-neutral-900 line-clamp-1">
                                  {title}
                                </h4>
                                <button
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <p className="text-[11px] text-neutral-500 mt-0.5">
                                {language === 'en' ? item.product.originEn : item.product.originJa}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity Control */}
                              <div className="flex items-center border border-neutral-300 rounded-md bg-neutral-50">
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, -1)}
                                  className="px-2 py-1 text-neutral-600 hover:text-black hover:bg-neutral-200/50 rounded-l transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2.5 text-xs font-semibold text-neutral-900 font-mono">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, 1)}
                                  className="px-2 py-1 text-neutral-600 hover:text-black hover:bg-neutral-200/50 rounded-r transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="text-sm font-bold text-neutral-900 font-mono">
                                {formatJpy(item.product.priceJpy * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Footer Order Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-neutral-200 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm font-semibold text-neutral-900">
                    <span>{t.cartSubtotal}</span>
                    <span className="font-mono text-base">{formatJpy(cartSubtotal)}</span>
                  </div>
                  <p className="text-[11px] text-neutral-500">{t.cartTaxIncluded}</p>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('checkout');
                  }}
                  className="w-full py-3.5 px-6 bg-neutral-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{t.checkoutButton}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
