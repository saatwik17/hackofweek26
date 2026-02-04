import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, CreditCardRecommendation } from '../types';

// --- CONFIGURATION ---
// In production/hackathons, API keys often fail due to quota or env var issues.
// This service implements a "Hybrid" approach:
// 1. Try Real AI (Gemini)
// 2. If failure (missing key/quota), use "Smart Fallback" (Local Logic)
const apiKey = process.env.API_KEY || ""; 
const ai = new GoogleGenAI({ apiKey: apiKey });

// --- SMART FALLBACK DATABASE ---
// A diverse pool of cards to select from if the API fails
const CARD_POOL: (CreditCardRecommendation & { minIncome: number; type: string[] })[] = [
  {
    cardName: "MoneyBack+ Credit Card",
    bankName: "HDFC Bank",
    matchScore: 0, // Calculated dynamically
    minIncome: 300000,
    annualFee: "₹500 + GST",
    features: ["10X CashPoints on Amazon/Flipkart", "Quarterly domestic lounge access", "Gift vouchers on spend milestones"],
    colorTheme: "#FF6B6B",
    reasoning: "",
    loungeAccess: "4 Domestic visits/year",
    rewardRate: "3.3% on Partner Brands",
    welcomeBonus: "500 CashPoints",
    minCreditScore: "700+",
    applyLink: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/moneyback-plus-credit-card",
    type: ['shopping', 'cashback']
  },
  {
    cardName: "SimplyClick Credit Card",
    bankName: "SBI Card",
    matchScore: 0,
    minIncome: 300000,
    annualFee: "₹499 + GST",
    features: ["10X Rewards on Online Spends", "Amazon Gift Card worth ₹500", "1% Fuel Surcharge Waiver"],
    colorTheme: "#4ecdc4",
    reasoning: "",
    loungeAccess: "None",
    rewardRate: "2.5% on Online Spends",
    welcomeBonus: "Amazon Voucher ₹500",
    minCreditScore: "700+",
    applyLink: "https://www.sbicard.com/en/personal/credit-cards/shopping/simplyclick-sbi-card.page",
    type: ['shopping', 'online']
  },
  {
    cardName: "Regalia Gold",
    bankName: "HDFC Bank",
    matchScore: 0,
    minIncome: 1000000,
    annualFee: "₹2,500 + GST",
    features: ["12 Complimentary Lounge Access", "5X Reward Points on Shopping", "Zero Forex Markup"],
    colorTheme: "#1e3a8a",
    reasoning: "",
    loungeAccess: "12 Domestic + 6 International",
    rewardRate: "4 Points per ₹150",
    welcomeBonus: "Club Vistara Silver + MMT Voucher",
    minCreditScore: "750+",
    applyLink: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia-gold-credit-card",
    type: ['travel', 'dining', 'luxury']
  },
  {
    cardName: "SBI Card ELITE",
    bankName: "SBI Card",
    matchScore: 0,
    minIncome: 1000000,
    annualFee: "₹4,999 + GST",
    features: ["Free Movie Tickets ₹6k/yr", "Trident Privilege Membership", "Low Interest Rate"],
    colorTheme: "#312e81",
    reasoning: "",
    loungeAccess: "2 Domestic/qtr + Priority Pass",
    rewardRate: "5X Points on Dining & Movies",
    welcomeBonus: "Voucher worth ₹5,000",
    minCreditScore: "720+",
    applyLink: "https://www.sbicard.com/en/personal/credit-cards/lifestyle/sbi-card-elite.page",
    type: ['movies', 'lifestyle', 'dining']
  },
  {
    cardName: "Magnus Credit Card",
    bankName: "Axis Bank",
    matchScore: 0,
    minIncome: 1800000,
    annualFee: "₹12,500 + GST",
    features: ["Unlimited Lounge Access", "25,000 EDGE Points/month", "Concierge Service"],
    colorTheme: "#451a03",
    reasoning: "",
    loungeAccess: "Unlimited Domestic & International",
    rewardRate: "12 EDGE Points per ₹200",
    welcomeBonus: "Tata CliQ Voucher ₹10,000",
    minCreditScore: "780+",
    applyLink: "https://www.axisbank.com/retail/cards/credit-card/magnus-credit-card",
    type: ['luxury', 'travel', 'rewards']
  },
  {
    cardName: "Amazon Pay ICICI",
    bankName: "ICICI Bank",
    matchScore: 0,
    minIncome: 300000,
    annualFee: "Lifetime Free",
    features: ["5% Cashback on Amazon for Prime", "1% Flat Cashback on all spends", "No Cost EMI offers"],
    colorTheme: "#f59e0b",
    reasoning: "",
    loungeAccess: "None",
    rewardRate: "5% Uncapped Cashback",
    welcomeBonus: "₹1500 value benefits",
    minCreditScore: "730+",
    applyLink: "https://www.icicibank.com/personal-banking/cards/credit-card/amazon-pay-credit-card",
    type: ['shopping', 'cashback']
  },
  {
    cardName: "Rubyx Credit Card",
    bankName: "ICICI Bank",
    matchScore: 0,
    minIncome: 1200000,
    annualFee: "₹3,000 + GST",
    features: ["Dual Card (Amex + MC)", "Entertainment Benefits", "Golf Lessons"],
    colorTheme: "#881337",
    reasoning: "",
    loungeAccess: "2 Domestic per quarter",
    rewardRate: "2 Payback Points per ₹100",
    welcomeBonus: "Vouchers worth ₹5k",
    minCreditScore: "740+",
    applyLink: "https://www.icicibank.com/personal-banking/cards/credit-card/rubyx-credit-card",
    type: ['entertainment', 'travel']
  },
  {
    cardName: "Platinum Travel",
    bankName: "American Express",
    matchScore: 0,
    minIncome: 600000,
    annualFee: "₹3,500 + GST",
    features: ["Milestone Rewards", "Taj Vouchers", "Priority Pass Membership"],
    colorTheme: "#1e293b",
    reasoning: "",
    loungeAccess: "8 Domestic Visits/year",
    rewardRate: "3 Membership Rewards per ₹100",
    welcomeBonus: "10,000 Membership Rewards",
    minCreditScore: "760+",
    applyLink: "https://www.americanexpress.com/in/credit-cards/platinum-travel-credit-card/",
    type: ['travel', 'rewards']
  }
];

// --- LOCAL LOGIC ENGINE ---
const getSmartFallback = (profile: UserProfile): CreditCardRecommendation[] => {
  console.log("⚠️ Using Smart Fallback Engine (API Key missing or call failed)");
  
  // 1. Filter by Income Eligibility
  let eligibleCards = CARD_POOL.filter(c => c.minIncome <= profile.annualIncome);
  
  // Fallback if income is too low for any premium cards (ensure at least 4 cards)
  if (eligibleCards.length < 4) {
    eligibleCards = CARD_POOL.slice(0, 4); // Just give the basic ones
  }

  // 2. Score Cards based on User Preferences
  const scoredCards = eligibleCards.map(card => {
    let score = 75; // Base score
    
    // Category Match
    const categoryMatches = profile.topCategories.some(userCat => 
      card.type.some(cardType => userCat.toLowerCase().includes(cardType) || cardType.includes(userCat.toLowerCase()))
    );
    if (categoryMatches) score += 15;

    // Income "Sweet Spot" (Don't recommend entry cards to millionaires)
    if (profile.annualIncome > 1500000 && card.minIncome < 500000) score -= 10;
    if (profile.annualIncome > 1500000 && card.minIncome > 1000000) score += 10;

    // Goal Match
    if (profile.primaryGoal === 'travel' && card.type.includes('travel')) score += 10;
    if (profile.primaryGoal === 'cashback' && card.type.includes('cashback')) score += 10;
    if (profile.primaryGoal === 'luxury' && card.type.includes('luxury')) score += 10;

    // Cap score at 99
    score = Math.min(99, Math.max(60, score));

    // Generate Dynamic Reasoning
    const dynamicReasoning = `Selected because it fits your ₹${(profile.monthlySpend/1000).toFixed(0)}k monthly spend and excels in ${card.type[0]}. Good match for your ${profile.primaryGoal} goal.`;

    return { ...card, matchScore: score, reasoning: dynamicReasoning };
  });

  // 3. Sort by Score and return top 4
  return scoredCards
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);
};

export const getRecommendations = async (profile: UserProfile): Promise<CreditCardRecommendation[]> => {
  const model = "gemini-3-flash-preview";
  
  // Debug Log for user
  if (!apiKey || apiKey === "dummy_key") {
    console.warn("NovaFin: No valid API_KEY found in process.env. Using Smart Fallback.");
    // Simulate network delay for realism
    await new Promise(r => setTimeout(r, 1000));
    return getSmartFallback(profile);
  }

  const prompt = `
    Act as a senior financial analyst for the Indian market.
    Analyze the following user profile:
    - Name: ${profile.name}
    - Annual Income: ₹${profile.annualIncome} (converted to INR context)
    - Credit Score: ${profile.creditScore}
    - Monthly Spending: ₹${profile.monthlySpend}
    - Top Spending Categories: ${profile.topCategories.join(', ')}
    - Primary Goal: ${profile.primaryGoal}

    Recommend exactly 4 distinct credit cards from major RBI-registered banks (e.g., HDFC, SBI, ICICI, Axis, Amex India, Kotak).
    
    For each card:
    1. Provide detailed comparison metrics.
    2. Provide a realistic direct application link or official product page URL for 'applyLink'.
    
    Provide the response strictly in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              cardName: { type: Type.STRING },
              bankName: { type: Type.STRING },
              matchScore: { type: Type.NUMBER, description: "Percentage match 0-100" },
              annualFee: { type: Type.STRING, description: "e.g. ₹499 + GST" },
              features: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              colorTheme: { type: Type.STRING, description: "Hex color code" },
              reasoning: { type: Type.STRING },
              loungeAccess: { type: Type.STRING, description: "Short summary of airport lounge access" },
              rewardRate: { type: Type.STRING, description: "e.g. '3.3% on Travel'" },
              welcomeBonus: { type: Type.STRING, description: "Short summary of welcome gift" },
              minCreditScore: { type: Type.STRING, description: "Minimum recommended score e.g. '750+'" },
              applyLink: { type: Type.STRING, description: "URL to the bank's card application page" }
            },
            required: [
              "cardName", "bankName", "matchScore", "annualFee", "features", 
              "colorTheme", "reasoning", "loungeAccess", "rewardRate", 
              "welcomeBonus", "minCreditScore", "applyLink"
            ]
          }
        }
      }
    });

    const jsonText = response.text || "[]";
    const result = JSON.parse(jsonText) as CreditCardRecommendation[];
    
    if (!result || result.length === 0) {
      throw new Error("Empty response from AI");
    }
    return result;

  } catch (error) {
    console.error("NovaFin AI Error:", error);
    // Gracefully fallback to Smart Local Logic
    return getSmartFallback(profile); 
  }
};