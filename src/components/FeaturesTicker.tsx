import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Truck, ShieldCheck, Sparkles, Box } from 'lucide-react';

export const FeaturesTicker: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-neutral-900 text-neutral-100 py-10 border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-neutral-800">
          <div className="flex items-center justify-center md:justify-start gap-4 pt-4 md:pt-0 md:pr-6">
            <div className="p-3 bg-neutral-800 rounded-full text-amber-300">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-sm tracking-wider uppercase font-semibold text-white">
                {t.featureShippingTitle}
              </h4>
              <p className="text-xs text-neutral-400 mt-1">{t.featureShippingDesc}</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 pt-6 md:pt-0 md:px-6">
            <div className="p-3 bg-neutral-800 rounded-full text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-sm tracking-wider uppercase font-semibold text-white">
                {t.featureAuthenticityTitle}
              </h4>
              <p className="text-xs text-neutral-400 mt-1">{t.featureAuthenticityDesc}</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 pt-6 md:pt-0 md:pl-6">
            <div className="p-3 bg-neutral-800 rounded-full text-amber-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-sm tracking-wider uppercase font-semibold text-white">
                {t.featureWarrantyTitle}
              </h4>
              <p className="text-xs text-neutral-400 mt-1">{t.featureWarrantyDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
