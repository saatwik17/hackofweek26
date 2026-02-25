import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  topic: string;
  persona?: string;
  count?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ topic, persona = 'Teacher', count = 5 }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-200 blur-xl rounded-full opacity-50 animate-pulse"></div>
        <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-indigo-50">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        </div>
      </div>
      <h2 className="mt-8 text-2xl font-bold text-slate-800">The {persona} is writing {count} questions...</h2>
      <p className="text-slate-500 mt-2 text-center max-w-md">
        Gemini AI is generating a unique quiz about <span className="font-semibold text-indigo-600">"{topic}"</span>. This usually takes a few seconds.
      </p>
    </div>
  );
};