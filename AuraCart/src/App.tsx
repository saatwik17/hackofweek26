import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Trash2, ArrowRight, Search, Menu, User, X } from 'lucide-react';
import { LinkedList, Product, CartItem } from './lib/LinkedList';
import { ProductCard } from './components/ProductCard';
import { Background3D } from './components/Background3D';
import { ToastContainer, ToastItem, ToastType } from './components/Toast';
import { Checkout } from './components/Checkout';
import { BannerCarousel } from './components/BannerCarousel';

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Aura Studio Wireless Noise Cancelling Headphones',
    price: 24999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p7',
    name: 'UltraHD 4K Smart TV 55"',
    price: 45999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p2',
    name: 'Nexus Pro Mechanical Gaming Keyboard (RGB)',
    price: 11999,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p3',
    name: 'ErgoGlide Wireless Ergonomic Mouse',
    price: 6999,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p4',
    name: 'Chrono Smartwatch Series X with Health Tracking',
    price: 31999,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p8',
    name: 'FitPro Active Fitness Band',
    price: 3999,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p5',
    name: 'Visionary VR Headset - 128GB Edition',
    price: 39999,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p9',
    name: 'ProGamer Wireless Controller',
    price: 4999,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p6',
    name: 'Lumina LED Desk Lamp with Wireless Charging',
    price: 4599,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p10',
    name: 'Smart Home Hub Speaker',
    price: 8999,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p11',
    name: 'AuraPhone 15 Pro Max',
    price: 129999,
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800'
  }
];

const CATEGORIES = ['All', 'Electronics', 'Smartphones', 'Computers', 'Wearables', 'Gaming', 'Home'];

export default function App() {
  const [cartList, setCartList] = useState<LinkedList>(new LinkedList());
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [view, setView] = useState<'shop' | 'checkout'>('shop');
  const [showPromo, setShowPromo] = useState<boolean>(true);

  const showToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleAddHead = (product: Product) => {
    const newItem: CartItem = {
      ...product,
      cartItemId: Math.random().toString(36).substring(2, 9)
    };
    setCartList(prev => prev.addAtHead(newItem));
    showToast(`Added ${product.name} to Head`, 'add');
  };

  const handleAddTail = (product: Product) => {
    const newItem: CartItem = {
      ...product,
      cartItemId: Math.random().toString(36).substring(2, 9)
    };
    setCartList(prev => prev.addAtTail(newItem));
    showToast(`Added ${product.name} to Tail`, 'add');
  };

  const handleRemove = (item: CartItem) => {
    setCartList(prev => prev.removeById(item.cartItemId));
    showToast(`Removed ${item.name}`, 'remove');
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleCheckoutConfirm = () => {
    setCartList(new LinkedList());
    setView('shop');
    showToast('Order Placed Successfully!', 'add');
  };

  const cartItems = cartList.toArray();
  const total = cartList.getTotal();

  if (view === 'checkout') {
    return (
      <>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <Checkout 
          cartItems={cartItems} 
          total={total} 
          onBack={() => setView('shop')} 
          onConfirm={handleCheckoutConfirm} 
        />
      </>
    );
  }

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Background3D />
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* E-commerce Navbar Container */}
      <header className="sticky top-0 z-50 shadow-md">
        {/* Promotional Top Banner */}
        <AnimatePresence>
          {showPromo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white overflow-hidden"
            >
              <div className="max-w-[1400px] mx-auto px-4 py-2 flex items-center justify-between text-sm">
                <div className="flex-1 text-center flex items-center justify-center gap-2 sm:gap-3">
                  <span className="bg-[#FFE500] text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider hidden sm:inline-block">
                    Live Now
                  </span>
                  <p className="font-medium">
                    🚀 Mega Clearance Sale! Get up to <span className="font-bold text-[#FFE500]">80% OFF</span> on top electronics. 
                    <span className="underline ml-2 cursor-pointer hover:text-gray-200 hidden sm:inline-block">Shop Now</span>
                  </p>
                </div>
                <button 
                  onClick={() => setShowPromo(false)} 
                  className="text-white/80 hover:text-white cursor-pointer p-1 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close promotion"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="bg-[#2874F0] text-white">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button className="md:hidden hover:bg-white/10 p-1 rounded"><Menu size={24} /></button>
            <div className="flex items-center gap-1 cursor-pointer">
              <ShoppingCart size={28} className="text-[#FFE500]" />
              <span className="text-2xl font-bold italic tracking-tight">AuraMart</span>
            </div>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-3xl mx-8">
            <div className="flex w-full bg-white rounded-sm overflow-hidden shadow-sm">
              <input 
                type="text" 
                placeholder="Search for products, brands and more" 
                className="w-full px-4 py-2 text-gray-900 outline-none text-sm" 
              />
              <button className="bg-[#FF9900] px-6 text-gray-900 hover:bg-[#e38900] transition-colors cursor-pointer">
                <Search size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 font-medium text-sm">
            <button className="hidden md:flex items-center gap-1 hover:text-gray-200 bg-white text-[#2874F0] px-6 py-1.5 rounded-sm font-bold">
              Login
            </button>
            <button className="hidden lg:flex hover:text-gray-200">More</button>
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-200">
              <div className="relative">
                <ShoppingCart size={24} />
                {cartList.size > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF9900] text-gray-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-[#2874F0]">
                    {cartList.size}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold">Cart</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="md:hidden bg-[#2874F0] p-2 border-t border-blue-400/30">
        <div className="flex w-full bg-white rounded-sm overflow-hidden shadow-sm">
          <input 
            type="text" 
            placeholder="Search for products..." 
            className="w-full px-3 py-2 text-gray-900 outline-none text-sm" 
          />
          <button className="bg-[#FF9900] px-4 text-gray-900">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar py-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-2 py-2 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
                  selectedCategory === category 
                    ? 'border-[#2874F0] text-[#2874F0]' 
                    : 'border-transparent text-gray-600 hover:text-[#2874F0]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      </header>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Products */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
          {/* Slideshow Banner */}
          <BannerCarousel />

          <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-3 mb-4">
              {selectedCategory === 'All' ? 'Top Deals Today' : `Best of ${selectedCategory}`}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 perspective-[1200px]">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddHead={handleAddHead} 
                    onAddTail={handleAddTail} 
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-gray-500">
                  <p className="text-lg">No products found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Linked List Cart */}
        <div className="lg:col-span-4 xl:col-span-3 perspective-[1000px]">
          <motion.div 
            initial={{ rotateY: 15, opacity: 0, x: 50 }}
            animate={{ rotateY: 0, opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="sticky top-24 bg-white border border-gray-200 rounded-sm shadow-md flex flex-col h-[calc(100vh-8rem)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="p-4 border-b border-gray-200 bg-gray-50" style={{ transform: "translateZ(10px)" }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-600 uppercase tracking-wide">Linked List Cart</h2>
                <div className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-bold">
                  {cartList.size} Items
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-3 bg-gray-50/50" style={{ transform: "translateZ(20px)" }}>
              <AnimatePresence mode="popLayout">
                {cartItems.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-gray-500 gap-4"
                  >
                    <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" className="w-40 opacity-80 mix-blend-multiply" />
                    <p className="font-medium text-lg">Your cart is empty!</p>
                    <p className="text-sm">Add items to it now.</p>
                  </motion.div>
                ) : (
                  cartItems.map((item, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -50, scale: 0.9, rotateX: -20 }}
                      animate={{ opacity: 1, x: 0, scale: 1, rotateX: 0 }}
                      exit={{ opacity: 0, x: 50, scale: 0.9, rotateX: 20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      key={item.cartItemId}
                      className="relative group"
                    >
                      <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3 hover:shadow-md transition-shadow">
                        <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-50 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-contain mix-blend-multiply"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                          <p className="text-[10px] text-gray-500 font-mono mt-0.5">Node: {item.cartItemId}</p>
                          <p className="text-sm font-bold text-gray-900 mt-1">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(item)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                          title="Remove Node"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      {/* Linked List Pointer Visualization */}
                      {index < cartItems.length - 1 && (
                        <div className="absolute -bottom-3 left-10 text-blue-400 flex flex-col items-center z-10">
                          <div className="w-0.5 h-3 bg-blue-300" />
                          <ArrowRight size={14} className="rotate-90 -mt-1" />
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t border-gray-200 bg-white" style={{ transform: "translateZ(30px)" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 font-medium">Total Amount</span>
                <span className="text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total)}
                </span>
              </div>
              <button 
                disabled={cartItems.length === 0}
                onClick={() => setView('checkout')}
                className="w-full py-3 rounded-sm bg-[#FB641B] text-white font-bold text-lg shadow-sm hover:bg-[#e05615] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                PLACE ORDER
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
