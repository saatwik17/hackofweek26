import React from 'react';
import { Button } from './Button';
import { Question } from '../types';
import { Trophy, RefreshCw, Home, Check, X } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  total: number;
  questions: Question[];
  userAnswers: number[]; // Array of indices selected by user
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, questions, userAnswers, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  
  let message = '';
  let colorClass = '';

  if (percentage >= 80) {
    message = 'Outstanding!';
    colorClass = 'text-green-600';
  } else if (percentage >= 60) {
    message = 'Good Job!';
    colorClass = 'text-indigo-600';
  } else {
    message = 'Keep Learning!';
    colorClass = 'text-orange-500';
  }

  return (
    <div className="max-w-4xl mx-auto px-4 w-full animate-in fade-in duration-700">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4 shadow-sm">
          <Trophy className="w-10 h-10 text-yellow-600" />
        </div>
        <h2 className={`text-4xl font-bold mb-2 ${colorClass}`}>{message}</h2>
        <p className="text-slate-600 text-lg">You scored {score} out of {total} ({percentage}%)</p>
      </div>

      <div className="space-y-6 mb-10">
        <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2">Review Answers</h3>
        {questions.map((q, i) => {
          const userAnswerIndex = userAnswers[i];
          const isCorrect = userAnswerIndex === q.correctAnswerIndex;

          return (
            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-start gap-3 mb-4">
                <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                  isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {i + 1}
                </span>
                <div className="flex-grow">
                  <p className="font-semibold text-slate-900 text-lg">{q.questionText}</p>
                </div>
              </div>

              <div className="pl-11 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500 min-w-[80px]">Your Answer:</span>
                  <span className={`font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {q.options[userAnswerIndex]}
                  </span>
                  {isCorrect ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}
                </div>
                
                {!isCorrect && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500 min-w-[80px]">Correct:</span>
                    <span className="font-medium text-green-600">
                      {q.options[q.correctAnswerIndex]}
                    </span>
                  </div>
                )}

                <div className="mt-3 p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
                  <span className="font-semibold text-slate-700">Explanation: </span>
                  {q.explanation}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 pb-12">
        <Button onClick={onRestart} variant="primary">
          <RefreshCw className="w-4 h-4 mr-2" />
          Create New Quiz
        </Button>
      </div>
    </div>
  );
};