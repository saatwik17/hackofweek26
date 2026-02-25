import React, { useState } from 'react';
import { Question } from '../types';
import { Button } from './Button';
import { CheckCircle, XCircle, ArrowRight, HelpCircle } from 'lucide-react';

interface QuizScreenProps {
  questions: Question[];
  onComplete: (score: number, answers: number[]) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (isChecked) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    setIsChecked(true);
    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Save answer
    setAnswers(prev => [...prev, selectedOption]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      onComplete(score, [...answers]); // Ensure current answer is included if not already
    }
  };

  // Progress percentage
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 min-h-[400px] flex flex-col">
        <div className="p-8 flex-grow">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-tight">
            {currentQuestion.questionText}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonStyle = "border-slate-200 hover:bg-slate-50 hover:border-indigo-300";
              let icon = null;

              if (isChecked) {
                if (index === currentQuestion.correctAnswerIndex) {
                  buttonStyle = "bg-green-50 border-green-500 text-green-900 ring-1 ring-green-500";
                  icon = <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />;
                } else if (index === selectedOption) {
                  buttonStyle = "bg-red-50 border-red-500 text-red-900 ring-1 ring-red-500";
                  icon = <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />;
                } else {
                  buttonStyle = "opacity-50 border-slate-200";
                }
              } else if (selectedOption === index) {
                buttonStyle = "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600 text-indigo-900";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isChecked}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${buttonStyle}`}
                >
                  <span className="font-medium text-lg">{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {isChecked && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-900 text-sm mb-1">Explanation</p>
                <p className="text-blue-800 text-sm leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          {!isChecked ? (
            <Button 
              onClick={handleCheckAnswer} 
              disabled={selectedOption === null}
              className="w-full sm:w-auto"
            >
              Check Answer
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              className="w-full sm:w-auto"
            >
              {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};