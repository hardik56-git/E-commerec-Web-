import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { showToast } = useStore();

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitted(true);
    showToast(
      language === 'en'
        ? 'Inquiry received. Our concierges will reach out within 24 hours.'
        : 'お問い合わせを承りました。24時間以内にコンシェルジュよりご連絡いたします。'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-2 border-b border-neutral-200 pb-8">
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold tracking-wider text-neutral-900">
          {t.navContact}
        </h1>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
          {language === 'en' ? 'HARDIK Private Concierge & Guild Atelier' : 'HARDIK プライベートコンシェルジュ'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Address & Locations */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="font-serif-luxury text-xl font-bold text-neutral-900">
              {language === 'en' ? 'Ginza Flagship Boutique' : '銀座 フラッグシップブティック'}
            </h3>

            <div className="space-y-4 text-xs text-neutral-600 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">Ginza 6-Chome, Chuo-ku</p>
                  <p>Tokyo 104-0061, Japan</p>
                  <p className="text-neutral-400 mt-0.5">東京都中央区銀座6丁目10-1</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-900 shrink-0" />
                <p className="font-mono text-neutral-900">+81 (0)3 6288 9010</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-900 shrink-0" />
                <p className="font-mono text-neutral-900">concierge@hardik-japan.jp</p>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-neutral-100">
                <Clock className="w-4 h-4 text-amber-900 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">Boutique Hours</p>
                  <p>Mon - Sun: 11:00 AM - 8:00 PM JST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 text-white rounded-2xl p-6 space-y-3">
            <h4 className="font-serif-luxury text-lg font-semibold text-amber-300">
              {language === 'en' ? 'Kyoto Artisan Studio' : '京都 職人工房'}
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              {language === 'en'
                ? 'Private visits by advance appointment only. Experience Nishijin silk weaving and lacquer gilding in person.'
                : '事前予約制にてご案内しております。西陣織や蒔絵の工房を身近にご見学いただけます。'}
            </p>
          </div>
        </div>

        {/* Right Inquiry Form */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif-luxury text-2xl font-bold text-neutral-900">
                {language === 'en' ? 'Inquiry Submitted' : 'お問い合わせを受け付けました'}
              </h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                {language === 'en'
                  ? 'Thank you for contacting HARDIK. One of our senior concierges will respond to your message shortly.'
                  : 'HARDIKへのお問い合わせありがとうございます。担当者より24時間以内にご連絡を差し上げます。'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-serif-luxury text-xl font-bold text-neutral-900">
                {language === 'en' ? 'Send a Private Message' : 'メッセージを送る'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                    {language === 'en' ? 'Full Name' : 'お名前'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                    {language === 'en' ? 'Email Address' : 'メールアドレス'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  {language === 'en' ? 'Subject' : 'ご件名'}
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder={language === 'en' ? 'e.g., Bespoke Order / Product Inquiry' : '例：特注品・在庫に関するお問い合わせ'}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  {language === 'en' ? 'Message' : 'お問い合わせ内容'} *
                </label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{language === 'en' ? 'Submit Inquiry' : '送信する'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
