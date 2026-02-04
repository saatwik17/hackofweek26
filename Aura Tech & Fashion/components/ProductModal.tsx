import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { getProductCreativeDescription } from '../services/geminiService';
import { formatINR } from '../App';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart, onBuyNow }) => {
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState<{ date: string; free: boolean } | null>(null);
  const [checkingPincode, setCheckingPincode] = useState(false);

  useEffect(() => {
    if (product) {
      setAiDescription(null);
      setLoadingAi(true);
      getProductCreativeDescription(product).then(desc => {
        setAiDescription(desc);
        setLoadingAi(false);
      });
      // Reset pincode state on new product open
      setPincode('');
      setDeliveryInfo(null);
    }
  }, [product]);

  if (!product) return null;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleCheckPincode = () => {
    if (pincode.length !== 6) return;
    setCheckingPincode(true);
    // Simulate API check
    setTimeout(() => {
        const date = new Date();
        date.setDate(date.getDate() + (Math.random() > 0.5 ? 2 : 4));
        setDeliveryInfo({
            date: date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
            free: product.price > 500
        });
        setCheckingPincode(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal Card */}
      <div className="relative bg-white sm:rounded-xl shadow-2xl w-full max-w-6xl h-full sm:h-[90vh] overflow-hidden flex flex-col md:flex-row animate-scale-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shadow-sm"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Left: Image & Thumbnails */}
        <div className="w-full md:w-5/12 h-2/5 md:h-full bg-white border-r border-gray-100 flex flex-col relative p-6">
           <div className="flex-grow flex items-center justify-center relative group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-0 left-0">
                  <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded shadow-sm">
                    {discount}% OFF
                  </div>
              </div>
              <div className="absolute bottom-4 right-4">
                  <button className="bg-white/90 p-2 rounded-full shadow text-gray-500 hover:text-red-500 hover:scale-110 transition-all">
                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                  </button>
              </div>
           </div>
           
           {/* Desktop Action Buttons */}
           <div className="hidden md:flex gap-4 mt-6">
             <button 
                onClick={() => onAddToCart(product)}
                className="flex-1 bg-[#ff9f00] text-white py-4 rounded-sm font-bold text-lg hover:bg-[#f39700] shadow-md transition-transform active:scale-95 uppercase tracking-wide flex justify-center items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
                Add to Cart
              </button>
              <button 
                onClick={() => onBuyNow(product)}
                className="flex-1 bg-[#fb641b] text-white py-4 rounded-sm font-bold text-lg hover:bg-[#e85d19] shadow-md transition-transform active:scale-95 uppercase tracking-wide flex justify-center items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Buy Now
              </button>
           </div>
        </div>

        {/* Right: Details Scrollable */}
        <div className="w-full md:w-7/12 h-3/5 md:h-full overflow-y-auto bg-white flex flex-col">
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Breadcrumb & Title */}
            <div>
              <nav className="text-xs text-gray-500 mb-2 font-medium">Home &gt; {product.category} &gt; {product.name}</nav>
              <h2 className="text-xl md:text-2xl font-medium text-gray-900 leading-tight mb-2">{product.name}</h2>
              <div className="flex items-center gap-3">
                 <div className="flex items-center bg-green-700 text-white px-2 py-0.5 rounded text-xs font-bold gap-1">
                   {product.rating} ★
                 </div>
                 <span className="text-gray-500 text-sm font-medium">{product.reviews.toLocaleString()} Ratings & Reviews</span>
                 <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className="h-5" />
              </div>
            </div>

            {/* Price Block */}
            <div>
               <div className="flex items-baseline gap-3">
                 <span className="text-3xl font-bold text-gray-900">{formatINR(product.price)}</span>
                 <span className="text-gray-500 line-through text-lg">{formatINR(product.originalPrice)}</span>
                 <span className="text-green-600 font-bold text-lg">{discount}% off</span>
               </div>
            </div>

            {/* Pincode & Delivery Section */}
            <div className="border-b border-gray-100 pb-4">
                <p className="text-xs font-bold text-gray-500 mb-2">Delivery</p>
                <div className="flex items-center gap-2 max-w-sm">
                    <div className="relative flex-1">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                         </div>
                         <input 
                            type="text" 
                            placeholder="Enter Delivery Pincode"
                            maxLength={6}
                            value={pincode}
                            onChange={(e) => {
                                if (/^\d*$/.test(e.target.value)) setPincode(e.target.value);
                                setDeliveryInfo(null);
                            }}
                            className="block w-full pl-9 pr-3 py-2 bg-gray-50 border-none rounded-md leading-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-200 sm:text-sm transition-colors"
                        />
                    </div>
                    <button 
                        onClick={handleCheckPincode}
                        className="text-blue-600 font-bold text-sm hover:text-blue-800 disabled:text-gray-400 px-2"
                        disabled={pincode.length !== 6 || checkingPincode}
                    >
                        {checkingPincode ? 'Checking...' : 'Check'}
                    </button>
                </div>
                {deliveryInfo && (
                    <div className="mt-2 flex items-center gap-2 text-sm">
                        <span className="font-bold text-gray-900">Delivery by {deliveryInfo.date}</span>
                        <span className="text-gray-300">|</span>
                        {deliveryInfo.free ? (
                            <span className="text-green-600 font-bold">Free</span>
                        ) : (
                            <span className="text-gray-500">₹40</span>
                        )}
                    </div>
                )}
                 {!deliveryInfo && !checkingPincode && pincode.length === 0 && (
                     <p className="text-xs text-gray-500 mt-1 ml-1">Enter pincode to check estimated delivery date.</p>
                 )}
            </div>

            {/* Available Offers */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-gray-800">Available offers</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                   <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" className="w-5 h-5 mt-0.5" alt="offer"/>
                   <span><strong>Bank Offer</strong> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card. <span className="text-blue-600 cursor-pointer">T&C</span></span>
                </li>
                <li className="flex items-start gap-2">
                   <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" className="w-5 h-5 mt-0.5" alt="offer"/>
                   <span><strong>Partner Offer</strong> Sign up for Aura Pay Later and get ₹500 Gift Card. <span className="text-blue-600 cursor-pointer">Know More</span></span>
                </li>
              </ul>
            </div>

            {/* AI Insight */}
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                 <svg className="w-16 h-16 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
              </div>
              <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2 flex items-center gap-1">
                AI Shopkeeper says:
              </h4>
              {loadingAi ? (
                <div className="space-y-2">
                   <div className="h-2 bg-indigo-200 rounded w-full animate-pulse"></div>
                   <div className="h-2 bg-indigo-200 rounded w-2/3 animate-pulse"></div>
                </div>
              ) : (
                <p className="text-indigo-900 text-sm leading-relaxed font-medium italic relative z-10">"{aiDescription}"</p>
              )}
            </div>
            
            {/* Description & Specs */}
            <div className="border border-gray-200 rounded-lg">
               <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-medium text-gray-700">Product Description</div>
               <div className="p-4 text-sm text-gray-600 leading-relaxed">
                  {product.description}
                  <div className="mt-4 flex flex-wrap gap-2">
                     {product.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs border border-gray-200">#{tag}</span>
                     ))}
                  </div>
               </div>
            </div>

            {/* Protection Plan Mockup */}
             <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                <div className="flex items-center gap-3">
                   <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                   </div>
                   <div>
                      <p className="text-sm font-bold text-gray-800">1 Year Extended Warranty</p>
                      <p className="text-xs text-gray-500">Protect your product for just ₹199</p>
                   </div>
                </div>
                <button className="text-blue-600 font-bold text-sm uppercase">Add</button>
             </div>
          </div>

          {/* Mobile Footer Action (Fixed at bottom) */}
          <div className="md:hidden mt-auto p-2 border-t border-gray-200 bg-white sticky bottom-0 flex gap-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
             <button 
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-white border border-gray-300 text-gray-900 py-3 rounded-sm font-bold transition-colors"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => onBuyNow(product)}
              className="flex-1 bg-orange-600 text-white py-3 rounded-sm font-bold transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;