import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { TechEvent, RegistrationData } from '../types';
import Confirmation from './Confirmation';

const RegistrationForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    college: '',
    year: '',
    events: [],
    studentId: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegistrationData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleEventChange = (event: string) => {
    setFormData((prev) => {
      const newEvents = prev.events.includes(event)
        ? prev.events.filter((e) => e !== event)
        : [...prev.events, event];
      
      if (errors.events && newEvents.length > 0) {
        setErrors((prevErr) => ({ ...prevErr, events: undefined }));
      }
      return { ...prev, events: newEvents };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, studentId: e.target.files![0] }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.college.trim()) newErrors.college = 'College name is required';
    if (!formData.year) newErrors.year = 'Year of study is required';
    if (formData.events.length === 0) newErrors.events = 'Select at least one event';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 2000);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({ ...prev, studentId: e.dataTransfer.files[0] }));
    }
  };

  if (isSuccess) {
    return <Confirmation />;
  }

  return (
    <section id="register" className="min-h-screen py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-4">
            REGISTER <span className="text-neon-green">NOW</span>
          </h2>
          <p className="text-gray-400 font-inter">Secure your spot in the future.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block font-orbitron text-sm text-neon-blue">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full bg-black/40 border ${errors.fullName ? 'border-red-500' : 'border-gray-600 focus:border-neon-blue'} rounded-lg p-3 text-white outline-none transition-colors`}
              placeholder="John Doe"
            />
            {errors.fullName && <p className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/>{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block font-orbitron text-sm text-neon-blue">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full bg-black/40 border ${errors.email ? 'border-red-500' : 'border-gray-600 focus:border-neon-blue'} rounded-lg p-3 text-white outline-none transition-colors`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/>{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* College */}
            <div className="space-y-2">
              <label className="block font-orbitron text-sm text-neon-blue">College / Department</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                className={`w-full bg-black/40 border ${errors.college ? 'border-red-500' : 'border-gray-600 focus:border-neon-blue'} rounded-lg p-3 text-white outline-none transition-colors`}
                placeholder="Symbiosis Tech"
              />
              {errors.college && <p className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/>{errors.college}</p>}
            </div>

            {/* Year */}
            <div className="space-y-2">
              <label className="block font-orbitron text-sm text-neon-blue">Year of Study</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className={`w-full bg-black/40 border ${errors.year ? 'border-red-500' : 'border-gray-600 focus:border-neon-blue'} rounded-lg p-3 text-white outline-none transition-colors appearance-none`}
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
              {errors.year && <p className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/>{errors.year}</p>}
            </div>
          </div>

          {/* Events */}
          <div className="space-y-3">
            <label className="block font-orbitron text-sm text-neon-blue">Select Events</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(TechEvent).map((event) => (
                <label
                  key={event}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    formData.events.includes(event)
                      ? 'bg-neon-blue/20 border-neon-blue'
                      : 'bg-black/20 border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.events.includes(event)}
                    onChange={() => handleEventChange(event)}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                    formData.events.includes(event) ? 'border-neon-blue bg-neon-blue' : 'border-gray-500'
                  }`}>
                    {formData.events.includes(event) && <CheckCircle className="w-3 h-3 text-black" />}
                  </div>
                  <span className="text-sm font-inter text-gray-200">{event}</span>
                </label>
              ))}
            </div>
            {errors.events && <p className="text-red-500 text-xs flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/>{errors.events}</p>}
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="block font-orbitron text-sm text-neon-blue">
              Student ID (Optional)
            </label>
            <div 
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? 'border-neon-green bg-neon-green/10' : 'border-gray-600 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept="image/*,.pdf"
              />
              <div className="flex flex-col items-center pointer-events-none">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-300">
                  {formData.studentId ? (
                    <span className="text-neon-green font-semibold">{formData.studentId.name}</span>
                  ) : (
                    "Drag & Drop or Click to Upload"
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, PDF</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative group overflow-hidden bg-white text-black font-orbitron font-bold py-4 rounded-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-neon-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            <span className="relative z-10 flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> PROCESSING...
                </>
              ) : (
                "CONFIRM REGISTRATION"
              )}
            </span>
          </button>

        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;