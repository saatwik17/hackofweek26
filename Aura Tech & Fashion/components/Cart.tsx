import React from 'react';
import { CartItem } from '../types';
import { formatINR } from '../App';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMRP = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const savings = totalMRP - total;

  return (
    <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-blue-600 text-white">
          <h2 className="text-lg font-medium">My Cart ({items.length})</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <svg className="w-20 h-20 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <p className="font-medium text-lg">Your cart is empty!</p>
              <p className="text-sm">Add items to it now.</p>
              <button onClick={onClose} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded shadow-sm hover:bg-blue-700">Shop Now</button>
            </div>
          ) : (
            items.map((item) => {
              const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
              return (
                <div key={item.id} className="bg-white p-4 rounded border border-gray-200 flex gap-4 shadow-sm group">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                      <div className="text-xs text-gray-500 mt-1">Category: {item.category}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-gray-900">{formatINR(item.price)}</span>
                        <span className="text-xs text-gray-400 line-through">{formatINR(item.originalPrice)}</span>
                        <span className="text-xs text-green-600 font-bold">{discount}% Off</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4">
                         <div className="flex items-center border border-gray-300 rounded-full bg-white">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-full disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >-</button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-full"
                            >+</button>
                         </div>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-sm font-medium text-gray-800 hover:text-red-500 uppercase tracking-wide"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-gray-500 font-medium text-sm uppercase mb-3">Price Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Price ({items.length} items)</span>
                  <span>{formatINR(totalMRP)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- {formatINR(savings)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Delivery Charges</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-dashed border-gray-300 my-2"></div>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-green-700 font-medium">
                You will save {formatINR(savings)} on this order
              </div>
            </div>
            <div className="p-4">
              <button 
                onClick={() => {
                   onClose();
                   onCheckout();
                }}
                className="w-full bg-orange-600 text-white py-3.5 rounded-lg font-bold hover:bg-orange-700 shadow-md transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;