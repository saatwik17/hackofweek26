import React, { useState } from 'react';
import { Button } from './Button';
import { Sparkles, BookOpen, GraduationCap, BrainCircuit, User, Bot, Crown, Glasses, Wand2, Smile, ListOrdered } from 'lucide-react';
import { QuizConfig } from '../types';

interface SetupScreenProps {
  onStart: (config: QuizConfig) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [persona, setPersona] = useState('Teacher');
  const [questionCount, setQuestionCount] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onStart({ topic, difficulty, persona, questionCount });
    }
  };

  const difficulties = [
    { value: 'Easy', icon: BookOpen, label: 'Beginner', desc: 'Fundamental concepts' },
    { value: 'Medium', icon: GraduationCap, label: 'Intermediate', desc: 'Standard curriculum' },
    { value: 'Hard', icon: BrainCircuit, label: 'Expert', desc: 'Complex reasoning' },
  ];

  const personas = [
    { id: 'Teacher', icon: Glasses, label: 'Teacher', desc: 'Clear & Educative' },
    { id: 'Wizard', icon: Wand2, label: 'Wizard', desc: 'Magical & Mysterious' },
    { id: 'Robot', icon: Bot, label: 'Robot', desc: 'Precise & Logical' },
    { id: 'King', icon: Crown, label: 'Royal', desc: 'Formal & Majestic' },
    { id: 'Comedian', icon: Smile, label: 'Comedian', desc: 'Fun & Witty' },
    { id: 'Detective', icon: User, label: 'Detective', desc: 'Inquisitive' },
  ];

  const questionCounts = [3, 5, 10, 15];

  return (
    <div className="max-w-2xl mx-auto px-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-indigo-600 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-indigo-400 to-transparent"></div>
          <Sparkles className="w-12 h-12 text-white/90 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2 relative z-10">Quiz Generator</h1>
          <p className="text-indigo-100 relative z-10">Create a unique quiz instantly with AI.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-2">
              What should the quiz be about?
            </label>
            <div className="relative">
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Photosynthesis, The French Revolution, React Hooks..."
                className="block w-full px-4 py-4 rounded-xl border-slate-200 border-2 bg-white text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500 transition-colors text-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">
                Difficulty Level
              </label>
              <div className="space-y-3">
                {difficulties.map((diff) => {
                  const Icon = diff.icon;
                  const isSelected = difficulty === diff.value;
                  return (
                    <button
                      key={diff.value}
                      type="button"
                      onClick={() => setDifficulty(diff.value as any)}
                      className={`w-full flex items-center p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50' 
                          : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <div className="flex-grow">
                        <span className={`block font-semibold text-sm ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                          {diff.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">
                Number of Questions
              </label>
              <div className="grid grid-cols-2 gap-3">
                {questionCounts.map((count) => {
                  const isSelected = questionCount === count;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setQuestionCount(count)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 h-[60px] ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50' 
                          : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-xl font-bold ${isSelected ? 'text-indigo-600' : 'text-slate-600'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center text-slate-500 text-sm mb-1">
                  <ListOrdered className="w-4 h-4 mr-2" />
                  <span className="font-medium">Summary</span>
                </div>
                <p className="text-xs text-slate-400">
                  A {difficulty} difficulty quiz with {questionCount} questions.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-4">
              Who is the Quiz Master?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {personas.map((p) => {
                const Icon = p.icon;
                const isSelected = persona === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPersona(p.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' 
                        : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className={`block font-semibold text-sm ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                        {p.label}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">{p.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Button 
            type="submit" 
            fullWidth 
            disabled={!topic.trim()}
          >
            Generate Quiz
          </Button>
        </form>
      </div>

      <div className="mt-8 text-center text-slate-500 text-sm">
        <p>Powered by Google Gemini 3 Flash • Educational Purpose Only</p>
      </div>
    </div>
  );
};