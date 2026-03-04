import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'full-time',
    experience: 'beginner'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neo-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
          >
            <div className="bg-neo-white border-2 border-neo-black neo-shadow w-full max-w-md pointer-events-auto relative max-h-[90vh] overflow-y-auto">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-1 hover:bg-neo-pink border-2 border-transparent hover:border-neo-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-neo-green rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-neo-black"
                    >
                      <CheckCircle2 className="w-10 h-10 text-neo-black" />
                    </motion.div>
                    <h3 className="text-3xl font-black mb-4 uppercase">You're In!</h3>
                    <p className="font-medium text-gray-600 mb-8">
                      Thanks for applying, {formData.name.split(' ')[0]}! We'll be in touch shortly to schedule your interview.
                    </p>
                    <Button onClick={onClose} fullWidth>CLOSE</Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-black mb-2 uppercase">Join the Forge</h2>
                    <p className="font-mono text-sm text-gray-500 mb-8">Limited spots available for Batch 04.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="font-bold text-sm uppercase">Full Name</label>
                        <input
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-3 border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-neo-yellow bg-white font-medium"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-bold text-sm uppercase">Email Address</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3 border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-neo-yellow bg-white font-medium"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-bold text-sm uppercase">Phone Number</label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-3 border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-neo-yellow bg-white font-medium"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="font-bold text-sm uppercase">Course</label>
                          <select
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-neo-yellow bg-white font-medium appearance-none"
                          >
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="font-bold text-sm uppercase">Experience</label>
                          <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-neo-black focus:outline-none focus:ring-2 focus:ring-neo-yellow bg-white font-medium appearance-none"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      <Button type="submit" fullWidth size="lg" className="mt-8">
                        SUBMIT APPLICATION
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
