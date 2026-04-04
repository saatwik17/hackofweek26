import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, MapPin, Truck, CreditCard, Wallet, IndianRupee, Plus } from 'lucide-react';
import { CartItem } from '../lib/LinkedList';

interface CheckoutProps {
  cartItems: CartItem[];
  total: number;
  onBack: () => void;
  onConfirm: () => void;
}

export function Checkout({ cartItems, total, onBack, onConfirm }: CheckoutProps) {
  const [activeStep, setActiveStep] = useState<number>(2); // 1 is Login (completed), 2 is Address
  const [paymentMethod, setPaymentMethod] = useState<string>('upi');
  
  // Address Form State
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    addressLine: '',
    city: '',
    state: '',
    landmark: '',
    type: 'home'
  });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(3);
  };

  const handleSummaryContinue = () => {
    setActiveStep(4);
  };

  const handlePlaceOrder = () => {
    onConfirm();
  };

  const discount = Math.floor(total * 0.15); // Fake 15% discount for realism
  const finalTotal = total - discount;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans selection:bg-blue-500/30">
      {/* Checkout Header */}
      <nav className="bg-[#2874F0] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-1 cursor-pointer"
              onClick={onBack}
            >
              <span className="text-2xl font-bold italic tracking-tight text-white">AuraMart</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <ShieldCheck size={20} className="text-[#FFE500]" />
            <span>100% Secure Payments</span>
          </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Checkout Steps */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Step 1: Login (Pre-completed) */}
          <div className="bg-white rounded-sm shadow-sm flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 text-[#2874F0] w-6 h-6 rounded-sm flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-gray-500 font-medium uppercase text-sm">Login</h3>
                  <Check size={16} className="text-[#2874F0]" />
                </div>
                <p className="text-sm font-bold mt-1">+91 9876543210</p>
              </div>
            </div>
            <button className="text-[#2874F0] font-medium text-sm border border-gray-300 px-4 py-1 rounded-sm hover:bg-gray-50">
              CHANGE
            </button>
          </div>

          {/* Step 2: Delivery Address */}
          <div className="bg-white rounded-sm shadow-sm overflow-hidden">
            <div className={`p-4 flex items-center gap-4 ${activeStep === 2 ? 'bg-[#2874F0] text-white' : 'bg-white text-gray-500'}`}>
              <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-sm font-bold ${activeStep === 2 ? 'bg-white text-[#2874F0]' : 'bg-gray-100 text-[#2874F0]'}`}>
                2
              </div>
              <h3 className={`font-medium uppercase text-sm ${activeStep === 2 ? 'text-white' : 'text-gray-500'}`}>
                Delivery Address
              </h3>
              {activeStep > 2 && <Check size={16} className="text-[#2874F0] ml-2" />}
            </div>
            
            <AnimatePresence>
              {activeStep === 2 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-6 bg-blue-50/30"
                >
                  <form onSubmit={handleAddressSubmit} className="max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input required type="text" placeholder="Name" className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0] text-sm" />
                      <input required type="tel" placeholder="10-digit mobile number" className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0] text-sm" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input required type="text" placeholder="Pincode" className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0] text-sm" />
                      <input required type="text" placeholder="Locality" className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0] text-sm" />
                    </div>
                    <div className="mb-4">
                      <textarea required placeholder="Address (Area and Street)" rows={3} className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0] text-sm resize-none"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input required type="text" placeholder="City/District/Town" className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0] text-sm" />
                      <select required className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0] text-sm bg-white">
                        <option value="">--Select State--</option>
                        <option value="MH">Maharashtra</option>
                        <option value="KA">Karnataka</option>
                        <option value="DL">Delhi</option>
                        <option value="TN">Tamil Nadu</option>
                        <option value="UP">Uttar Pradesh</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-2">Address Type</p>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="addressType" value="home" defaultChecked className="accent-[#2874F0]" />
                          <span className="text-sm">Home (All day delivery)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="addressType" value="work" className="accent-[#2874F0]" />
                          <span className="text-sm">Work (Delivery between 10 AM - 5 PM)</span>
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="bg-[#FB641B] text-white px-8 py-3 rounded-sm font-bold shadow-sm hover:bg-[#e05615] transition-colors">
                      SAVE AND DELIVER HERE
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            
            {activeStep > 2 && (
              <div className="p-4 px-14 text-sm">
                <p className="font-bold mb-1">John Doe <span className="font-normal ml-2">9876543210</span></p>
                <p className="text-gray-600">123, Tech Park Avenue, Block B, Koramangala, Bengaluru, Karnataka - 560034</p>
              </div>
            )}
          </div>

          {/* Step 3: Order Summary */}
          <div className="bg-white rounded-sm shadow-sm overflow-hidden">
            <div className={`p-4 flex items-center gap-4 ${activeStep === 3 ? 'bg-[#2874F0] text-white' : 'bg-white text-gray-500'}`}>
              <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-sm font-bold ${activeStep === 3 ? 'bg-white text-[#2874F0]' : 'bg-gray-100 text-[#2874F0]'}`}>
                3
              </div>
              <h3 className={`font-medium uppercase text-sm ${activeStep === 3 ? 'text-white' : 'text-gray-500'}`}>
                Order Summary
              </h3>
              {activeStep > 3 && <Check size={16} className="text-[#2874F0] ml-2" />}
            </div>

            <AnimatePresence>
              {activeStep === 3 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="p-6 border-b border-gray-200">
                    {cartItems.map((item, idx) => (
                      <div key={item.cartItemId} className={`flex gap-4 ${idx !== 0 ? 'mt-6 pt-6 border-t border-gray-100' : ''}`}>
                        <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded flex items-center justify-center p-2">
                          <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base text-gray-900 font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">Seller: Aura Retail</p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-gray-500 line-through text-sm">
                              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.price * 1.2)}
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.price)}
                            </span>
                            <span className="text-green-600 text-sm font-medium">20% Off</span>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          Delivery by Tomorrow | <span className="text-green-600">Free</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <p className="text-sm text-gray-600">Order confirmation email will be sent to <span className="font-medium text-gray-900">johndoe@example.com</span></p>
                    <button onClick={handleSummaryContinue} className="bg-[#FB641B] text-white px-8 py-3 rounded-sm font-bold shadow-sm hover:bg-[#e05615] transition-colors">
                      CONTINUE
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {activeStep > 3 && (
              <div className="p-4 px-14 text-sm">
                <p className="font-bold">{cartItems.length} Item{cartItems.length > 1 ? 's' : ''}</p>
              </div>
            )}
          </div>

          {/* Step 4: Payment Options */}
          <div className="bg-white rounded-sm shadow-sm overflow-hidden">
            <div className={`p-4 flex items-center gap-4 ${activeStep === 4 ? 'bg-[#2874F0] text-white' : 'bg-white text-gray-500'}`}>
              <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-sm font-bold ${activeStep === 4 ? 'bg-white text-[#2874F0]' : 'bg-gray-100 text-[#2874F0]'}`}>
                4
              </div>
              <h3 className={`font-medium uppercase text-sm ${activeStep === 4 ? 'text-white' : 'text-gray-500'}`}>
                Payment Options
              </h3>
            </div>

            <AnimatePresence>
              {activeStep === 4 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-0"
                >
                  <div className="flex flex-col">
                    {/* UPI */}
                    <label className={`flex items-start gap-4 p-4 border-b border-gray-200 cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}>
                      <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-1 accent-[#2874F0]" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">UPI</span>
                          <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold">Offers available</span>
                        </div>
                        {paymentMethod === 'upi' && (
                          <div className="mt-4 mb-2">
                            <p className="text-sm text-gray-600 mb-3">Choose an option</p>
                            <div className="flex gap-4">
                              <div className="border border-gray-300 rounded p-2 flex items-center gap-2 w-40 cursor-pointer hover:border-[#2874F0]">
                                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold">PhonePe</div>
                                <span className="text-sm">PhonePe</span>
                              </div>
                              <div className="border border-gray-300 rounded p-2 flex items-center gap-2 w-40 cursor-pointer hover:border-[#2874F0]">
                                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold">GPay</div>
                                <span className="text-sm">Google Pay</span>
                              </div>
                            </div>
                            <button onClick={handlePlaceOrder} className="mt-6 bg-[#FB641B] text-white px-8 py-3 rounded-sm font-bold shadow-sm hover:bg-[#e05615] transition-colors text-lg">
                              PAY {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(finalTotal)}
                            </button>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Wallets */}
                    <label className={`flex items-start gap-4 p-4 border-b border-gray-200 cursor-pointer transition-colors ${paymentMethod === 'wallet' ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}>
                      <input type="radio" name="payment" value="wallet" checked={paymentMethod === 'wallet'} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-1 accent-[#2874F0]" />
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">Wallets</span>
                        {paymentMethod === 'wallet' && (
                          <div className="mt-4 mb-2">
                            <button onClick={handlePlaceOrder} className="bg-[#FB641B] text-white px-8 py-3 rounded-sm font-bold shadow-sm hover:bg-[#e05615] transition-colors text-lg">
                              PAY {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(finalTotal)}
                            </button>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Credit / Debit / ATM Card */}
                    <label className={`flex items-start gap-4 p-4 border-b border-gray-200 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}>
                      <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-1 accent-[#2874F0]" />
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">Credit / Debit / ATM Card</span>
                        {paymentMethod === 'card' && (
                          <div className="mt-4 mb-2 max-w-md">
                            <input type="text" placeholder="Enter Card Number" className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0] text-sm mb-3" />
                            <div className="flex gap-3 mb-4">
                              <input type="text" placeholder="MM/YY" className="w-1/2 p-3 border border-gray-300 rounded-sm outline-none focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0] text-sm" />
                              <input type="text" placeholder="CVV" className="w-1/2 p-3 border border-gray-300 rounded-sm outline-none focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0] text-sm" />
                            </div>
                            <button onClick={handlePlaceOrder} className="bg-[#FB641B] text-white px-8 py-3 rounded-sm font-bold shadow-sm hover:bg-[#e05615] transition-colors text-lg">
                              PAY {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(finalTotal)}
                            </button>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Net Banking */}
                    <label className={`flex items-start gap-4 p-4 border-b border-gray-200 cursor-pointer transition-colors ${paymentMethod === 'netbanking' ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}>
                      <input type="radio" name="payment" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-1 accent-[#2874F0]" />
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">Net Banking</span>
                        {paymentMethod === 'netbanking' && (
                          <div className="mt-4 mb-2">
                            <button onClick={handlePlaceOrder} className="bg-[#FB641B] text-white px-8 py-3 rounded-sm font-bold shadow-sm hover:bg-[#e05615] transition-colors text-lg">
                              PAY {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(finalTotal)}
                            </button>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Cash on Delivery */}
                    <label className={`flex items-start gap-4 p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}>
                      <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-1 accent-[#2874F0]" />
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">Cash on Delivery</span>
                        {paymentMethod === 'cod' && (
                          <div className="mt-4 mb-2">
                            <button onClick={handlePlaceOrder} className="bg-[#FB641B] text-white px-8 py-3 rounded-sm font-bold shadow-sm hover:bg-[#e05615] transition-colors text-lg">
                              CONFIRM ORDER
                            </button>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Right Column: Price Details */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-sm shadow-sm sticky top-24">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-gray-500 font-bold uppercase tracking-wide text-base">Price Details</h2>
            </div>
            <div className="p-4 flex flex-col gap-4 border-b border-gray-200 border-dashed">
              <div className="flex justify-between text-gray-900">
                <span>Price ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
                <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total)}</span>
              </div>
              <div className="flex justify-between text-gray-900">
                <span>Discount</span>
                <span className="text-green-600">− {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(discount)}</span>
              </div>
              <div className="flex justify-between text-gray-900">
                <span>Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between text-gray-900 font-bold text-lg">
                <span>Total Amount</span>
                <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(finalTotal)}</span>
              </div>
            </div>
            <div className="p-4 bg-green-50 text-green-700 font-medium text-sm rounded-b-sm">
              You will save {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(discount)} on this order
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-sm font-medium">
            <ShieldCheck size={24} />
            <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
