import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductModal from './components/ProductModal';
import { PRODUCTS } from './constants';
import { Product, CartItem, SearchState, PageView } from './types';
import { searchProductsWithAI } from './services/geminiService';

// Utility to format INR
export const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Accessories'];

// Hero Slider Configuration
const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1200',
    title: 'Next Gen Tech',
    subtitle: 'Upgrade your lifestyle with our premium electronics.',
    category: 'Electronics',
    buttonText: 'Explore Electronics'
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200',
    title: 'Summer Fashion',
    subtitle: 'Breezy styles for the perfect look.',
    category: 'Fashion',
    buttonText: 'Shop Fashion'
  },
  {
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1200',
    title: 'Luxury Accessories',
    subtitle: 'The finishing touch you need.',
    category: 'Accessories',
    buttonText: 'View Accessories'
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<PageView>('HOME');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 0, seconds: 0 });
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    isSearching: false,
    results: null
  });

  const productsRef = useRef<HTMLElement>(null);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hero Carousel Logic
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(slideTimer);
  }, []);

  const displayedProducts = useMemo(() => {
    let filtered = PRODUCTS;

    // Filter by Category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by Search Results (AI)
    if (searchState.results !== null) {
      filtered = filtered.filter(p => searchState.results?.includes(p.id));
    }

    return filtered;
  }, [searchState.results, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setIsCartOpen(false);
    setSelectedProduct(null);
    setView('CHECKOUT');
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSearch = async (query: string) => {
    setSearchState(prev => ({ ...prev, isSearching: true, query }));
    
    // Call Gemini API
    const { matchingIds, reasoning } = await searchProductsWithAI(query, PRODUCTS);
    
    setSearchState({
      isSearching: false,
      query,
      results: matchingIds,
      aiMessage: reasoning
    });
    setSelectedCategory('All'); 
  };

  const clearSearch = () => {
    setSearchState({
      query: '',
      isSearching: false,
      results: null,
      aiMessage: undefined
    });
  };

  const handleBannerClick = (category: string) => {
    setSelectedCategory(category);
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // --- VIEWS ---

  if (view === 'SUCCESS') {
     return (
       <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md text-center animate-fade-in-up">
             <div className="checkmark__circle rounded-full border-4 border-white h-24 w-24 mx-auto mb-6 flex items-center justify-center">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                   <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                   <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
             </div>
             <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
             <p className="text-gray-500 mb-8">Thank you for shopping with Aura. Your premium goods will be delivered by {new Date(Date.now() + 3 * 86400000).toLocaleDateString()}.</p>
             <button 
               onClick={() => {
                 setCartItems([]);
                 setView('HOME');
               }}
               className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-slate-800 transition-all hover:scale-105"
             >
               Continue Shopping
             </button>
          </div>
       </div>
     );
  }

  if (view === 'CHECKOUT') {
     return (
       <Checkout 
         items={cartItems} 
         total={total} 
         onBack={() => setView('HOME')}
         onComplete={() => setView('SUCCESS')}
       />
     );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={handleSearch}
        isSearching={searchState.isSearching}
      />

      <main className="flex-grow">
        {/* Creative Bento Grid Hero Section */}
        {searchState.results === null && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 h-auto md:h-[500px]">
            
            {/* Main Hero Card - SLIDESHOW */}
            <div 
              className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer perspective-1000 shadow-sm" 
              onClick={() => handleBannerClick(HERO_SLIDES[currentHeroIndex].category)}
            >
               
               {/* Slideshow Images */}
               {HERO_SLIDES.map((slide, index) => (
                 <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`}
                 >
                    <img 
                      src={slide.image} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-linear scale-100 group-hover:scale-105" 
                      alt={slide.title} 
                    />
                    {/* Clear gradient for text readability without heavy blue shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                 </div>
               ))}

               {/* Content */}
               <div className="absolute bottom-0 left-0 p-8 transform translate-z-20 w-full">
                 <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-2 py-1 rounded uppercase mb-2 inline-block">
                   Featured Collection
                 </span>
                 <h2 className="text-4xl font-serif text-white font-bold mb-2 drop-shadow-md">
                   {HERO_SLIDES[currentHeroIndex].title}
                 </h2>
                 <p className="text-gray-100 mb-4 max-w-sm drop-shadow-sm font-medium">
                   {HERO_SLIDES[currentHeroIndex].subtitle}
                 </p>
                 <div className="flex gap-2">
                    {HERO_SLIDES.map((_, idx) => (
                      <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === currentHeroIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}></div>
                    ))}
                 </div>
               </div>
            </div>

            {/* Secondary Card - Fixed */}
            <div 
              className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer shadow-sm" 
              onClick={() => handleBannerClick('Fashion')}
            >
               <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Fashion" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <div className="absolute bottom-0 left-0 p-6">
                 <h2 className="text-2xl font-serif text-white font-bold mb-1">New Arrivals</h2>
                 <p className="text-gray-200 text-sm mb-3">Fresh styles added daily.</p>
                 <span className="text-white border-b border-white text-xs pb-0.5">Explore</span>
               </div>
            </div>

            {/* Third Card - Accessories */}
            <div 
              className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-2xl cursor-pointer shadow-sm" 
              onClick={() => handleBannerClick('Accessories')}
            >
               <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity" alt="Accessories" />
               <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
               <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                 <h2 className="text-xl font-bold text-white mb-1 shadow-black drop-shadow-lg">Accessories</h2>
                 <p className="text-white text-xs font-medium">Under ₹1999</p>
               </div>
            </div>

            {/* Fourth Card - Deal of Day Timer */}
            <div 
              className="md:col-span-1 md:row-span-1 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleBannerClick('Electronics')}
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
                <h3 className="text-gray-800 font-bold text-lg uppercase tracking-wider mb-2">Deal of the Day</h3>
                <div className="flex gap-2 text-gray-900 font-mono text-2xl font-bold">
                  <div className="bg-gray-100 rounded p-2 min-w-[40px] shadow-inner">{timeLeft.hours.toString().padStart(2, '0')}</div>:
                  <div className="bg-gray-100 rounded p-2 min-w-[40px] shadow-inner">{timeLeft.minutes.toString().padStart(2, '0')}</div>:
                  <div className="bg-gray-100 rounded p-2 min-w-[40px] shadow-inner text-red-500">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                </div>
                <p className="text-gray-500 text-xs mt-2 font-medium">Flat 50% Off on Electronics</p>
            </div>

          </div>
        </section>
        )}

        {/* AI Search Feedback */}
        {searchState.results !== null && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-indigo-900 rounded-2xl p-8 text-center relative overflow-hidden">
               <div className="relative z-10">
                 <p className="text-xs font-bold tracking-wider text-yellow-400 uppercase mb-2">AI Shopkeeper's Suggestion</p>
                 <h2 className="text-2xl font-serif text-white mb-2">"{searchState.query}"</h2>
                 <p className="text-indigo-200 max-w-2xl mx-auto italic mb-6">
                   {searchState.aiMessage}
                 </p>
                 <button onClick={clearSearch} className="text-sm text-white border border-white/30 px-6 py-2 rounded-full hover:bg-white/10 transition-colors">
                   Clear Search & View All
                 </button>
               </div>
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            </div>
          </section>
        )}

        {/* Category Tabs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-2 sticky top-20 z-20 bg-slate-50/90 backdrop-blur py-2">
           <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
             {CATEGORIES.map(cat => (
               <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                  selectedCategory === cat 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
               >
                 {cat}
               </button>
             ))}
           </div>
        </section>

        {/* Product Grid */}
        <section ref={productsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-gray-800">
               {selectedCategory === 'All' ? 'Recommended For You' : `${selectedCategory} Collection`}
             </h2>
             <span className="text-xs font-medium text-gray-500">{displayedProducts.length} Products</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => {
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              
              return (
                <div 
                  key={product.id} 
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Image Area */}
                  <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                       <span className="absolute top-2 left-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                         {product.badge}
                       </span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button 
                        onClick={(e) => {
                           e.stopPropagation();
                           handleAddToCart(product);
                        }}
                        className="w-full bg-white text-black font-bold py-2 rounded text-sm hover:bg-gray-100"
                      >
                        Quick Add
                      </button>
                    </div>
                  </div>
                  
                  {/* Info Area */}
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 h-10 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                       <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                         {product.rating} <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                       </span>
                       <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">{formatINR(product.price)}</span>
                      <span className="text-xs text-gray-500 line-through">{formatINR(product.originalPrice)}</span>
                      <span className="text-xs text-green-600 font-bold">{discount}% off</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {displayedProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 mt-4">
               <p className="text-gray-500 text-lg">No products found.</p>
               <button onClick={clearSearch} className="mt-2 text-blue-600 font-medium hover:underline">Reset Filters</button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-2xl font-serif font-bold">Aura.</div>
              <div className="text-slate-400 text-sm">
                © 2024 Aura Shopping. Premium Quality. Budget Prices.
              </div>
           </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setView('CHECKOUT');
        }}
      />

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
};

export default App;