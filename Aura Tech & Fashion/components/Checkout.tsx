import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatINR } from '../App';

interface CheckoutProps {
  items: CartItem[];
  total: number;
  onBack: () => void;
  onComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, total, onBack, onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isChangingLogin, setIsChangingLogin] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('98765 43210');
  const [tempMobile, setTempMobile] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 2000);
  };

  const handleChangeLogin = () => {
    setIsChangingLogin(true);
    setTempMobile(mobileNumber);
  };

  const handleSaveLogin = () => {
    setMobileNumber(tempMobile);
    setIsChangingLogin(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6 cursor-pointer text-blue-600 font-medium hover:underline" onClick={onBack}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Shop
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-8 space-y-6">
             
             {/* Step 1: Login */}
             <div className="bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                <div className="flex gap-4 items-start">
                   <span className="bg-gray-200 text-blue-600 px-2 py-0.5 text-xs font-bold rounded mt-1">1</span>
                   <div className="flex-1">
                      <h3 className="text-gray-500 font-bold text-sm uppercase">Login</h3>
                      {isChangingLogin ? (
                        <div className="mt-3">
                           <input 
                             type="text" 
                             value={tempMobile}
                             onChange={(e) => setTempMobile(e.target.value)}
                             className="block w-full sm:w-64 border-gray-300 rounded-sm shadow-sm p-2 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm bg-white text-gray-900 mb-2"
                             placeholder="Enter Mobile Number"
                           />
                           <div className="flex gap-3">
                             <button onClick={handleSaveLogin} className="bg-blue-600 text-white px-4 py-1.5 rounded-sm text-sm font-bold uppercase">Save</button>
                             <button onClick={() => setIsChangingLogin(false)} className="text-blue-600 font-bold text-sm uppercase">Cancel</button>
                           </div>
                           <p className="text-xs text-gray-400 mt-2">We will send a checkout verification OTP to this number.</p>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center mt-1">
                           <div className="flex items-center gap-2">
                             <span className="font-bold text-gray-900">+91 {mobileNumber}</span>
                             <span className="bg-white text-blue-600 border border-blue-600 px-2 rounded-sm text-[10px] font-bold">LOGGED IN</span>
                           </div>
                           <button onClick={handleChangeLogin} className="text-blue-600 font-bold text-sm uppercase hover:text-blue-800 border border-transparent hover:border-gray-100 px-2 py-1 rounded">Change</button>
                        </div>
                      )}
                   </div>
                </div>
             </div>

             {/* Step 2: Delivery Address */}
             <div className="bg-white shadow-sm rounded-sm border border-gray-200">
                <div className="p-4 bg-blue-600 text-white flex gap-4 items-center">
                   <span className="bg-white text-blue-600 px-2 py-0.5 text-xs font-bold rounded">2</span>
                   <h3 className="font-bold text-sm uppercase">Delivery Address</h3>
                </div>
                <div className="p-6">
                    <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      <div className="sm:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                        <input type="text" required className="block w-full border-gray-300 rounded-sm shadow-sm p-2 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm bg-white text-gray-900" />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">10-digit mobile number</label>
                        <input type="tel" required pattern="[0-9]{10}" className="block w-full border-gray-300 rounded-sm shadow-sm p-2 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm bg-white text-gray-900" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address (Area and Street)</label>
                        <textarea rows={2} required className="block w-full border-gray-300 rounded-sm shadow-sm p-2 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm bg-white text-gray-900" />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City/District/Town</label>
                        <input type="text" required className="block w-full border-gray-300 rounded-sm shadow-sm p-2 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm bg-white text-gray-900" />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pincode</label>
                        <input type="text" required className="block w-full border-gray-300 rounded-sm shadow-sm p-2 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm bg-white text-gray-900" />
                      </div>
                    </form>
                </div>
             </div>

             {/* Step 3: Payment Options */}
             <div className="bg-white shadow-sm rounded-sm border border-gray-200">
                <div className="p-4 bg-blue-600 text-white flex gap-4 items-center">
                   <span className="bg-white text-blue-600 px-2 py-0.5 text-xs font-bold rounded">3</span>
                   <h3 className="font-bold text-sm uppercase">Payment Options</h3>
                </div>
                <div className="p-4 space-y-4">
                   {/* UPI */}
                   <div className={`border p-4 rounded cursor-pointer flex items-center gap-3 ${paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`} onClick={() => setPaymentMethod('upi')}>
                      <input type="radio" name="payment" checked={paymentMethod === 'upi'} readOnly className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                         <p className="font-medium text-gray-900">UPI</p>
                         <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                      </div>
                      <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/upi_8a666e.png" className="h-6" alt="UPI" />
                   </div>

                   {/* Card */}
                   <div className={`border p-4 rounded cursor-pointer flex items-start gap-3 ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`} onClick={() => setPaymentMethod('card')}>
                      <input type="radio" name="payment" checked={paymentMethod === 'card'} readOnly className="h-4 w-4 text-blue-600 mt-1" />
                      <div className="flex-1">
                         <p className="font-medium text-gray-900">Credit / Debit / ATM Card</p>
                         {paymentMethod === 'card' && (
                           <div className="mt-3 space-y-3">
                              <input type="text" placeholder="Card Number" className="block w-full border border-gray-300 rounded p-2 text-sm bg-white text-gray-900" />
                              <div className="flex gap-2">
                                <input type="text" placeholder="MM/YY" className="block w-1/2 border border-gray-300 rounded p-2 text-sm bg-white text-gray-900" />
                                <input type="text" placeholder="CVV" className="block w-1/2 border border-gray-300 rounded p-2 text-sm bg-white text-gray-900" />
                              </div>
                           </div>
                         )}
                      </div>
                   </div>

                   {/* COD */}
                   <div className={`border p-4 rounded cursor-pointer flex items-center gap-3 ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`} onClick={() => setPaymentMethod('cod')}>
                      <input type="radio" name="payment" checked={paymentMethod === 'cod'} readOnly className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                         <p className="font-medium text-gray-900">Cash on Delivery</p>
                      </div>
                   </div>
                </div>
             </div>

          </div>

          {/* Right Column: Price Details */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
             <div className="bg-white rounded-sm shadow-sm border border-gray-200 sticky top-4">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-gray-500 font-bold text-sm uppercase">Price Details</h3>
                </div>
                <div className="p-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-900">Price ({items.length} items)</span>
                    <span className="text-gray-900 font-medium">{formatINR(total + 500)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">Discount</span>
                    <span className="text-green-600 font-medium">- {formatINR(500)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">Delivery Charges</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t border-dashed border-gray-300 my-2"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Total Amount</span>
                    <span className="text-gray-900">{formatINR(total)}</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 p-4">
                   <p className="text-xs font-bold text-green-600 mb-4">You will save ₹500 on this order</p>
                   <button 
                     form="checkout-form"
                     type="submit" 
                     disabled={loading}
                     className="w-full bg-[#fb641b] text-white py-3.5 rounded-sm font-bold shadow-sm hover:bg-[#e85d19] uppercase tracking-wider flex justify-center items-center gap-2"
                   >
                     {loading ? 'Processing...' : `Place Order`}
                   </button>
                   <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                     <span className="text-xs font-medium">Safe and Secure Payments. 100% Authentic products.</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;