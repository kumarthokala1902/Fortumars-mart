
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import QuickViewModal from './components/QuickViewModal';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import ProfileView from './components/ProfileView';
import BottomNav from './components/BottomNav';
import { SkeletonProduct } from './components/SkeletonLoader';
import { CATEGORIES } from './constants';
import { CartItem, Product, User } from './types';
import { storageService } from './services/storageService';

type ViewState = 'HOME' | 'LOGIN' | 'ADMIN' | 'PRODUCT_DETAIL' | 'PROFILE';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Load initial data
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedDark = localStorage.getItem('fortumasmart_dark_mode') === 'true';
    const darkState = storedDark || isDark;
    
    setIsDarkMode(darkState);
    if (darkState) document.documentElement.classList.add('dark');

    const init = async () => {
      setIsLoading(true);
      const dbProducts = await storageService.getProducts();
      setProducts(dbProducts);
      
      const savedUser = storageService.getUser();
      if (savedUser) {
        // Hydrate profile from cloud if possible
        const syncedUser = await storageService.syncUserWithCloud(savedUser);
        setCurrentUser(syncedUser);
        storageService.setUser(syncedUser);
      }
      
      setIsLoading(false);
    };
    init();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newVal = !prev;
      localStorage.setItem('fortumasmart_dark_mode', String(newVal));
      if (newVal) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newVal;
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, products]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleLogin = async (user: User) => {
    setIsLoading(true);
    // Sync with Firestore on login
    const syncedUser = await storageService.syncUserWithCloud(user);
    setCurrentUser(syncedUser);
    storageService.setUser(syncedUser);
    setIsLoading(false);
    setView(prev => prev === 'LOGIN' || prev === 'PROFILE' ? 'PROFILE' : 'HOME');
  };

  const handleUpdateProfile = async (updatedUser: User) => {
    setCurrentUser(updatedUser);
    await storageService.updateUserProfile(updatedUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    storageService.setUser(null);
    setView('HOME');
  };

  const handleAddProduct = async (newProduct: Product) => {
    setIsLoading(true);
    await storageService.addProduct(newProduct);
    const updatedProducts = await storageService.getProducts();
    setProducts(updatedProducts);
    setIsLoading(false);
  };

  const handleCheckout = () => {
    if (!currentUser) {
      alert("Please sign in to complete your purchase.");
      setView('LOGIN');
      setIsCartOpen(false);
      return;
    }
    alert(`Success! Thanks, ${currentUser.name}. Your order has been placed.`);
    setCart([]);
    setIsCartOpen(false);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('PRODUCT_DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleShare = (platform: string) => {
    if (!selectedProduct) return;
    const url = window.location.href;
    const text = `Check out this amazing ${selectedProduct.name} at FortumarsMart!`;
    
    let shareUrl = '';
    switch (platform) {
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="max-w-screen-2xl mx-auto p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(12)].map((_, i) => <SkeletonProduct key={i} />)}
        </div>
      );
    }

    if (view === 'LOGIN') return <LoginForm onLogin={handleLogin} onCancel={() => setView('HOME')} />;
    if (view === 'ADMIN') return <AdminDashboard products={products} onAddProduct={handleAddProduct} onBack={() => setView('HOME')} />;
    
    if (view === 'PROFILE') {
      if (!currentUser) return <LoginForm onLogin={handleLogin} onCancel={() => setView('HOME')} />;
      return <ProfileView user={currentUser} onLogout={handleLogout} onBack={() => setView('HOME')} onUpdateProfile={handleUpdateProfile} />;
    }

    if (view === 'PRODUCT_DETAIL' && selectedProduct) {
      return (
        <div className="max-w-screen-xl mx-auto p-4 md:p-8 page-transition pb-24 md:pb-8">
          <button 
            onClick={() => { setSelectedProduct(null); setView('HOME'); }}
            className="mb-8 text-amber-600 hover:text-amber-700 flex items-center gap-2 font-bold group bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 transition-all hover:shadow-md"
          >
            <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
            Back to Shop
          </button>
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 md:p-12 md:flex gap-16 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-700/50 overflow-hidden relative">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative group rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-900 aspect-square">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s]" />
                {selectedProduct.badge && (
                  <span className="absolute top-6 left-6 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-black px-5 py-2 rounded-full text-[10px] shadow-lg uppercase tracking-widest">
                    {selectedProduct.badge}
                  </span>
                )}
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <div className="text-xs font-bold text-amber-500 mb-2 uppercase tracking-widest">{selectedProduct.category}</div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white leading-tight font-poppins">{selectedProduct.name}</h1>
              
              <div className="flex items-center mb-8 bg-slate-50 dark:bg-slate-900/50 self-start px-5 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex text-amber-400 text-sm gap-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-solid fa-star ${i < Math.floor(selectedProduct.rating) ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}`}></i>
                  ))}
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 ml-4 font-bold">{selectedProduct.reviewsCount.toLocaleString()} Verified Purchases</span>
              </div>
              
              <div className="mb-10 flex items-baseline gap-3">
                <span className="text-5xl font-black text-slate-900 dark:text-white">${selectedProduct.price.toLocaleString()}</span>
                <span className="text-sm text-green-500 font-black uppercase bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-full">Fast Delivery Available</span>
              </div>

              <div className="mb-10">
                <h3 className="font-extrabold mb-4 text-slate-900 dark:text-white text-xl font-poppins flex items-center gap-2">
                   <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                   Product Experience
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">{selectedProduct.description}</p>
              </div>

              <div className="mb-10 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Share this discovery</p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => handleShare('x')} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all active:scale-90 border border-slate-100 dark:border-slate-700">
                    <i className="fa-brands fa-x-twitter text-lg"></i>
                  </button>
                  <button onClick={() => handleShare('facebook')} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-[#1877F2] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all active:scale-90 border border-slate-100 dark:border-slate-700">
                    <i className="fa-brands fa-facebook-f text-lg"></i>
                  </button>
                  <button onClick={() => handleShare('linkedin')} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-[#0A66C2] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all active:scale-90 border border-slate-100 dark:border-slate-700">
                    <i className="fa-brands fa-linkedin-in text-lg"></i>
                  </button>
                  <button onClick={() => handleShare('copy')} className={`h-12 px-6 flex items-center justify-center gap-2 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all active:scale-90 border border-slate-100 dark:border-slate-700 font-bold text-xs uppercase tracking-wider ${copySuccess ? 'text-green-500' : 'text-slate-500 dark:text-slate-400'}`}>
                    <i className={`fa-solid ${copySuccess ? 'fa-check' : 'fa-link'}`}></i>
                    {copySuccess ? 'Copied' : 'Copy Link'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="bg-slate-900 dark:bg-slate-700 text-white py-5 rounded-3xl font-black shadow-xl hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  <i className="fa-solid fa-cart-plus text-lg"></i> Add to Bag
                </button>
                <button 
                  onClick={() => { addToCart(selectedProduct); setIsCartOpen(true); }}
                  className="bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 py-5 rounded-3xl font-black shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <i className="fa-solid fa-bolt-lightning text-lg"></i> Checkout Now
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8 page-transition">
        {searchQuery === '' && selectedCategory === 'All' && (
          <div className="relative mb-16 h-[400px] md:h-[600px] overflow-hidden rounded-[3rem] bg-[#131921] group shadow-3xl">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600" 
              className="w-full h-full object-cover opacity-60 transition-transform duration-[3s] group-hover:scale-110" 
              alt="Banner"
            />
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-24 text-white">
              <span className="text-amber-400 font-black text-sm uppercase tracking-[0.3em] mb-4">Summer Collection 2024</span>
              <h2 className="text-5xl md:text-8xl font-black mb-6 leading-[0.9] font-poppins max-w-2xl">Premium <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Lifestyle</span></h2>
              <p className="text-lg md:text-2xl opacity-80 max-w-lg mb-12 font-medium">Elevated essentials for the modern pioneer. Curated by Fortumars AI.</p>
              <div className="flex gap-4">
                 <button className="bg-white text-slate-900 px-10 py-5 rounded-full font-black hover:bg-amber-400 transition-all hover:shadow-[0_0_30px_rgba(255,191,105,0.4)] active:scale-95">
                  Shop Now
                </button>
                 <button className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-5 rounded-full font-black hover:bg-white/20 transition-all active:scale-95">
                  View Lookbook
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
             <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white font-poppins leading-tight">
              {searchQuery ? `Search: "${searchQuery}"` : selectedCategory !== 'All' ? `${selectedCategory}` : "Featured Collections"}
            </h2>
            <div className="h-1.5 w-24 bg-amber-500 rounded-full mt-4"></div>
          </div>
          <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-700 text-sm font-bold text-slate-500">
            Showing {filteredProducts.length} Premium Results
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
                onProductClick={handleProductClick}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white dark:bg-slate-800 rounded-[3rem] border-4 border-dashed border-slate-50 dark:border-slate-700/50">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <i className="fa-solid fa-search text-4xl"></i>
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-xl font-bold">No matches found for your lifestyle.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-8 bg-amber-500 text-slate-900 px-8 py-3 rounded-full font-black hover:bg-amber-400 transition-all shadow-lg active:scale-95"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col selection:bg-amber-100 dark:selection:bg-amber-500/30 dark:bg-slate-900`}>
      <Navbar 
        onSearch={setSearchQuery} 
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={() => {
          setSearchQuery('');
          setSelectedCategory('All');
          setSelectedProduct(null);
          setView('HOME');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onLoginClick={() => setView('LOGIN')}
        onProfileClick={() => setView('PROFILE')}
        onLogout={handleLogout}
        onAdminClick={() => setView('ADMIN')}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div className="bg-slate-900 dark:bg-slate-800 text-white/80 py-3 px-4 text-[11px] font-black uppercase tracking-widest sticky top-[68px] z-40 border-t border-slate-800 dark:border-slate-700 shadow-md">
        <div className="max-w-screen-2xl mx-auto flex items-center gap-8 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => { 
              setSelectedCategory('All'); 
              setView('HOME'); 
              setSelectedProduct(null); 
              setSearchQuery('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap hover:bg-white/10 active:scale-95 ${selectedCategory === 'All' ? 'bg-amber-500 text-slate-900' : ''}`}
          >
            <i className="fa-solid fa-bars-staggered"></i> All Departments
          </button>
          {CATEGORIES.filter(c => c !== 'All').map(cat => (
            <button 
              key={cat} 
              onClick={() => { 
                setSelectedCategory(cat); 
                setView('HOME'); 
                setSelectedProduct(null);
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all hover:bg-white/10 active:scale-95 ${selectedCategory === cat ? 'bg-amber-500 text-slate-900' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-grow bg-slate-50 dark:bg-slate-900 overflow-x-hidden">
        {renderContent()}
      </main>

      <footer className="bg-slate-900 text-white mt-20 pb-20 md:pb-0">
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="w-full bg-slate-800 py-6 text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-700 transition-colors flex items-center justify-center gap-3">
          <i className="fa-solid fa-chevron-up"></i> Return to Summit
        </button>
        <div className="max-w-screen-xl mx-auto px-8 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16">
          <div className="space-y-6">
            <h4 className="font-black text-2xl font-poppins text-amber-400">Fortumars<span className="text-white">Mart</span></h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">Redefining digital retail through neural intelligence and high-end aesthetic curation.</p>
          </div>
          <div>
            <h4 className="font-black mb-8 text-sm uppercase tracking-widest text-slate-500">Corporate</h4>
            <ul className="text-sm space-y-4 font-bold text-slate-300">
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Our Neural Network</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Global Logistics</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 text-sm uppercase tracking-widest text-slate-500">Client Care</h4>
            <ul className="text-sm space-y-4 font-bold text-slate-300">
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Concierge Service</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors">Order Tracking</li>
            </ul>
          </div>
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm">
            <h4 className="font-black mb-4 text-amber-400 font-poppins">The Inner Circle</h4>
            <div className="flex bg-slate-800 p-1.5 rounded-2xl border border-slate-700 focus-within:border-amber-500 transition-colors">
              <input className="bg-transparent px-4 py-2 text-white text-xs rounded-xl w-full focus:outline-none font-bold" placeholder="E-mail Address"/>
              <button className="bg-amber-500 px-6 py-2 text-slate-900 text-xs font-black rounded-xl hover:bg-amber-400 active:scale-95 transition-all">Join</button>
            </div>
          </div>
        </div>
        <div className="bg-black/40 py-10 text-center border-t border-white/5">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">© 2024 FortumarsMart Precision Retail Systems. All Rights Reserved.</p>
        </div>
      </footer>

      <CartSidebar isOpen={isCartOpen} items={cart} onClose={() => setIsCartOpen(false)} onUpdateQuantity={updateCartQuantity} onRemove={removeFromCart} onCheckout={handleCheckout} />
      
      <QuickViewModal 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
        onAddToCart={addToCart} 
        onViewDetails={handleProductClick}
      />

      <BottomNav activeView={view} onViewChange={(v) => { setView(v); setSelectedProduct(null); if (v === 'HOME') { setSelectedCategory('All'); setSearchQuery(''); }}} onCartClick={() => setIsCartOpen(true)} cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)} />
    </div>
  );
};

export default App;
