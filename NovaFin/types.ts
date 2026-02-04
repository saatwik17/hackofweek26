export interface UserProfile {
  name: string;
  annualIncome: number;
  creditScore: number;
  monthlySpend: number;
  topCategories: string[];
  primaryGoal: 'travel' | 'cashback' | 'balance_transfer' | 'luxury';
}

export interface CreditCardRecommendation {
  cardName: string;
  bankName: string;
  matchScore: number;
  annualFee: string;
  features: string[];
  colorTheme: string; // Hex code or tailwind class hint
  reasoning: string;
  // Comparison Data
  loungeAccess: string;
  rewardRate: string;
  welcomeBonus: string;
  minCreditScore: string;
  applyLink: string;
}

export enum CardType {
  TRAVEL = 'TRAVEL',
  CASHBACK = 'CASHBACK',
  LUXURY = 'LUXURY',
  BUILDER = 'BUILDER'
}