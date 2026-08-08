import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';

const AppContent: React.FC = () => {
  const { activePage } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#111111] font-sans antialiased selection:bg-neutral-900 selection:text-white">
      {/* Toast Banner Notifications */}
      <Toast />

      {/* Sticky Top Header Navbar with Language Switcher & Yen Currency Indicator */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'checkout' && <CheckoutPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </LanguageProvider>
  );
}
