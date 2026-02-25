import React, { useState } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { AppState, Question, QuizConfig } from './types';
import { generateQuizQuestions } from './services/geminiService';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.SETUP);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = async (newConfig: QuizConfig) => {
    setConfig(newConfig);
    setAppState(AppState.LOADING);
    setError(null);

    try {
      const generatedQuestions = await generateQuizQuestions(
        newConfig.topic, 
        newConfig.difficulty, 
        newConfig.persona,
        newConfig.questionCount
      );
      setQuestions(generatedQuestions);
      setAppState(AppState.QUIZ);
    } catch (err) {
      console.error(err);
      setError("Failed to generate quiz. Please try again or choose a different topic.");
      setAppState(AppState.ERROR);
    }
  };

  const handleQuizComplete = (finalScore: number, answers: number[]) => {
    setScore(finalScore);
    setUserAnswers(answers);
    setAppState(AppState.RESULTS);
  };

  const handleRestart = () => {
    setAppState(AppState.SETUP);
    setQuestions([]);
    setScore(0);
    setUserAnswers([]);
    setConfig(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => appState !== AppState.LOADING && handleRestart()}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">M</div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">MindSpark</span>
          </div>
          {appState === AppState.QUIZ && (
            <div className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
              {/* Fix: use questions.length directly as questions is not a property of QuizConfig */}
              {config?.topic} • {config?.difficulty} • {questions.length || config?.questionCount} Qs
            </div>
          )}
        </div>
      </nav>

      <main className="flex-grow flex flex-col justify-center py-12">
        {appState === AppState.SETUP && (
          <SetupScreen onStart={handleStartQuiz} />
        )}

        {appState === AppState.LOADING && config && (
          <LoadingScreen topic={config.topic} persona={config.persona} count={config.questionCount} />
        )}

        {appState === AppState.QUIZ && questions.length > 0 && (
          <QuizScreen 
            questions={questions} 
            onComplete={handleQuizComplete} 
          />
        )}

        {appState === AppState.RESULTS && (
          <ResultScreen 
            score={score} 
            total={questions.length} 
            questions={questions} 
            userAnswers={userAnswers}
            onRestart={handleRestart}
          />
        )}

        {appState === AppState.ERROR && (
          <div className="max-w-md mx-auto px-4 text-center animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-red-100">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Oops! Something went wrong</h3>
              <p className="text-slate-600 mb-6">{error || "We couldn't generate the quiz right now."}</p>
              <button 
                onClick={handleRestart}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
        <p>© {new Date().getFullYear()} MindSpark Quiz Generator. Built with React & Gemini.</p>
      </footer>
    </div>
  );
};

export default App;