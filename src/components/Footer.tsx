import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const { setActivePage, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    showToast(
      language === 'en'
        ? 'Welcome to HARDIK Guild. Invitation sent to your email.'
        : 'HARDIK ギルドへのご登録ありがとうございます。案内メールをお送りしました。'
    );
    setEmail('');
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif-luxury text-3xl font-bold tracking-[0.25em] text-white">
              {t.brandName}
            </h3>
            <p className="text-xs tracking-[0.3em] uppercase text-amber-300/80 font-medium">
              {t.brandTagline}
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-md pt-2">
              {language === 'en'
                ? 'Dedicated to bringing Japan’s quietest luxuries, mastercrafts, and organic materials to discerning patrons worldwide.'
                : '日本の伝統美、究極の手仕事、厳選された素材から生まれる至高の静寂を、世界中の美意識ある方々へお届けします。'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8 text-xs uppercase tracking-widest">
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-sm tracking-wider">{t.navShop}</h4>
              <ul className="space-y-2.5 text-neutral-400 font-normal">
                <li>
                  <button onClick={() => { setActivePage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                    {t.catAll}
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActivePage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                    {t.catApparel}
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActivePage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                    {t.catTimepieces}
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActivePage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                    {t.catLeather}
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-sm tracking-wider">HARDIK</h4>
              <ul className="space-y-2.5 text-neutral-400 font-normal">
                <li>
                  <button onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                    {t.navAbout}
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                    {t.navContact}
                  </button>
                </li>
                <li>
                  <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                    {language === 'en' ? 'Terms of Service' : '利用規約'}
                  </a>
                </li>
                <li>
                  <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                    {language === 'en' ? 'Privacy Policy' : 'プライバシーポリシー'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif-luxury text-lg text-white font-semibold tracking-wider">
              {t.newsletterTitle}
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {t.newsletterSubtitle}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.subscribePlaceholder}
                  required
                  className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-xs px-4 py-3 rounded-md focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 px-4 py-2 bg-neutral-100 hover:bg-white text-neutral-900 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1"
                >
                  {isSubscribed ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>{t.footerRights}</p>
          <div className="flex items-center gap-4">
            <span className="px-2.5 py-1 bg-neutral-800 text-neutral-300 font-mono rounded text-[11px] border border-neutral-700">
              {t.currencySymbol} {t.currencyCode} (Japanese Yen)
            </span>
            <p className="text-[11px] text-neutral-400">{t.footerLegalNotice}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
