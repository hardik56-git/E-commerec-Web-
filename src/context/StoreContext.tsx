import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Category, Order } from '../types';
import { PRODUCTS } from '../data/products';

interface ToastState {
  id: number;
  message: string;
  type?: 'success' | 'info';
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  priceFilter: string;
  setPriceFilter: (price: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  activePage: 'home' | 'shop' | 'about' | 'contact' | 'checkout';
  setActivePage: (page: 'home' | 'shop' | 'about' | 'contact' | 'checkout') => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalCount: number;

  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  placedOrders: Order[];
  placeOrder: (customerDetails: { customerName: string; email: string; address: string; city: string; postalCode: string; paymentMethod: Order['paymentMethod'] }) => Order;

  // Toast
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  
  // Cart State with Local Storage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hardik_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with Local Storage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hardik_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders State with Local Storage
  const [placedOrders, setPlacedOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('hardik_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activePage, setActivePage] = useState<'home' | 'shop' | 'about' | 'contact' | 'checkout'>('home');
  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('hardik_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync Wishlist to LocalStorage
  useEffect(() => {
    localStorage.setItem('hardik_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync Orders to LocalStorage
  useEffect(() => {
    localStorage.setItem('hardik_orders', JSON.stringify(placedOrders));
  }, [placedOrders]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor, selectedSize }];
      }
    });
    showToast(`${product.nameEn} added to shopping bag.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.priceJpy * item.quantity, 0);
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed from saved items.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        if (product) {
          showToast(`Saved to wishlist: ${product.nameEn}`);
        }
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const placeOrder = (customerDetails: { customerName: string; email: string; address: string; city: string; postalCode: string; paymentMethod: Order['paymentMethod'] }): Order => {
    const newOrder: Order = {
      id: `HK-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      items: [...cart],
      totalJpy: cartSubtotal,
      ...customerDetails,
      status: 'processing'
    };

    setPlacedOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceFilter,
        setPriceFilter,
        sortBy,
        setSortBy,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        setQuickViewProduct,
        activePage,
        setActivePage,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotalCount,
        toggleWishlist,
        isInWishlist,
        placedOrders,
        placeOrder,
        toast,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
