import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { formatJpy } from '../utils/formatters';
import { Order } from '../types';
import { ShieldCheck, Lock, CreditCard, CheckCircle, Truck, ArrowLeft, ShoppingBag } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    cart,
    cartSubtotal,
    placeOrder,
    setActivePage,
  } = useStore();

  const [form, setForm] = useState({
    customerName: '',
    email: '',
    address: '',
    city: 'Tokyo',
    postalCode: '',
    paymentMethod: 'credit_card' as Order['paymentMethod'],
  });

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="p-4 bg-emerald-100 text-emerald-800 rounded-full w-fit mx-auto">
          <CheckCircle className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-900">
            {language === 'en' ? 'Order Confirmed' : 'ご注文完了'}
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-neutral-900">
            {language === 'en' ? 'Thank You For Your Order' : 'ご注文ありがとうございます'}
          </h1>
          <p className="text-xs font-mono text-neutral-500">
            {language === 'en' ? 'Order Reference:' : '注文番号:'} <strong className="text-neutral-900 font-bold">{confirmedOrder.id}</strong>
          </p>
        </div>

        <div className="p-6 bg-white border border-neutral-200 rounded-2xl text-left space-y-4 shadow-2xs">
          <h3 className="font-serif-luxury text-base font-semibold border-b pb-2">
            {language === 'en' ? 'Order Details' : 'ご注文内容'}
          </h3>

          <div className="space-y-3 divide-y divide-neutral-100">
            {confirmedOrder.items.map((item) => (
              <div key={item.product.id} className="pt-3 first:pt-0 flex justify-between items-center text-xs">
                <div>
                  <p className="font-semibold text-neutral-900">
                    {language === 'en' ? item.product.nameEn : item.product.nameJa}
                  </p>
                  <p className="text-neutral-500">Qty: {item.quantity}</p>
                </div>
                <span className="font-mono font-bold text-neutral-900">
                  {formatJpy(item.product.priceJpy * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 flex justify-between font-bold text-sm">
            <span>{t.cartSubtotal}</span>
            <span className="font-mono text-base">{formatJpy(confirmedOrder.totalJpy)}</span>
          </div>

          <div className="pt-3 border-t border-neutral-100 text-xs text-neutral-600 space-y-1">
            <p><strong>{language === 'en' ? 'Customer:' : 'お名前:'}</strong> {confirmedOrder.customerName}</p>
            <p><strong>{language === 'en' ? 'Shipping Address:' : 'お届け先:'}</strong> {confirmedOrder.postalCode}, {confirmedOrder.city}, {confirmedOrder.address}</p>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-center gap-2">
          <Truck className="w-4 h-4 text-amber-800" />
          <span>
            {language === 'en'
              ? 'Estimated Express Delivery: 1-2 Business Days via Yamato Transport'
              : 'お届け予定日: ヤマト運輸速達にて1〜2営業日以内'}
          </span>
        </div>

        <button
          onClick={() => setActivePage('shop')}
          className="px-8 py-3.5 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-black transition-colors"
        >
          {t.continueShopping}
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-neutral-400 mx-auto" />
        <h2 className="font-serif-luxury text-2xl font-bold text-neutral-900">
          {t.cartEmptyTitle}
        </h2>
        <p className="text-xs text-neutral-500">{t.cartEmptyDesc}</p>
        <button
          onClick={() => setActivePage('shop')}
          className="px-6 py-3 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
        >
          {t.continueShopping}
        </button>
      </div>
    );
  }

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName || !form.email || !form.address || !form.postalCode) return;

    const newOrder = placeOrder({
      customerName: form.customerName,
      email: form.email,
      address: form.address,
      city: form.city,
      postalCode: form.postalCode,
      paymentMethod: form.paymentMethod,
    });

    setConfirmedOrder(newOrder);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back to Shop */}
      <button
        onClick={() => setActivePage('shop')}
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.continueShopping}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Checkout Form */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="font-serif-luxury text-2xl font-bold text-neutral-900">
              {language === 'en' ? 'Checkout & Shipping Details' : 'お届け先・お支払い情報'}
            </h2>
            <div className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium border border-emerald-200">
              <Lock className="w-3.5 h-3.5" />
              <span>256-bit SSL</span>
            </div>
          </div>

          <form onSubmit={handlePlaceOrderSubmit} className="space-y-6">
            {/* Customer Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                1. {language === 'en' ? 'Customer Information' : 'お客様情報'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-700">
                    {language === 'en' ? 'Full Name' : 'お名前'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    placeholder={language === 'en' ? 'Taro Yamada' : '山田 太郎'}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-700">
                    {language === 'en' ? 'Email Address' : 'メールアドレス'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="taro.yamada@example.jp"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-4 pt-4 border-t border-neutral-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                2. {language === 'en' ? 'Japan Delivery Address' : '日本国内配送先'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-700">
                    {language === 'en' ? 'Postal Code' : '郵便番号'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.postalCode}
                    onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                    placeholder="104-0061"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-neutral-700">
                    {language === 'en' ? 'Prefecture & City' : '都道府県・市区町村'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Tokyo, Chuo-ku Ginza"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-700">
                  {language === 'en' ? 'Street Address & Building' : '町名・番地・マンション名'} *
                </label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="6-Chome 10-1"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4 pt-4 border-t border-neutral-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                3. {language === 'en' ? 'Payment Method (Japanese Yen)' : 'お支払い方法（日本円）'}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, paymentMethod: 'credit_card' })}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    form.paymentMethod === 'credit_card'
                      ? 'border-neutral-900 bg-neutral-50 shadow-xs'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span className="text-xs font-semibold text-neutral-900">
                    {language === 'en' ? 'Credit Card (JCB/Visa)' : 'クレジットカード'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, paymentMethod: 'paypay' })}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    form.paymentMethod === 'paypay'
                      ? 'border-neutral-900 bg-neutral-50 shadow-xs'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-xs font-bold text-red-600 font-mono">PayPay</span>
                  <span className="text-xs font-semibold text-neutral-900">PayPay 決済</span>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, paymentMethod: 'konbini' })}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    form.paymentMethod === 'konbini'
                      ? 'border-neutral-900 bg-neutral-50 shadow-xs'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-xs font-bold text-emerald-600 font-mono">Convenience</span>
                  <span className="text-xs font-semibold text-neutral-900">コンビニ決済</span>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, paymentMethod: 'bank_transfer' })}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    form.paymentMethod === 'bank_transfer'
                      ? 'border-neutral-900 bg-neutral-50 shadow-xs'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-xs font-bold text-blue-600 font-mono">Bank</span>
                  <span className="text-xs font-semibold text-neutral-900">銀行振込</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {language === 'en'
                  ? `Pay ${formatJpy(cartSubtotal)} & Complete Order`
                  : `${formatJpy(cartSubtotal)} を支払って注文を確定する`}
              </span>
            </button>
          </form>
        </div>

        {/* Right Order Summary Column */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs h-fit">
          <h3 className="font-serif-luxury text-lg font-bold text-neutral-900 border-b pb-3">
            {t.cartTitle} ({cart.length})
          </h3>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
            {cart.map((item) => {
              const title = language === 'en' ? item.product.nameEn : item.product.nameJa;
              return (
                <div key={item.product.id} className="flex gap-3 items-center">
                  <img
                    src={item.product.image}
                    alt={title}
                    className="w-14 h-16 object-cover rounded-lg bg-neutral-100 shrink-0"
                  />
                  <div className="flex-1 text-xs">
                    <p className="font-semibold text-neutral-900 line-clamp-1">{title}</p>
                    <p className="text-neutral-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-mono font-bold text-xs text-neutral-900">
                    {formatJpy(item.product.priceJpy * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-neutral-200 space-y-2 text-xs">
            <div className="flex justify-between font-semibold text-neutral-900">
              <span>{t.cartSubtotal}</span>
              <span className="font-mono text-base font-bold">{formatJpy(cartSubtotal)}</span>
            </div>
            <p className="text-[11px] text-neutral-500">{t.cartTaxIncluded}</p>
            <p className="text-[11px] text-emerald-700 font-semibold pt-1">
              ✓ {t.featureShippingTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
