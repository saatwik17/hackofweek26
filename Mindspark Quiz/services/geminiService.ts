import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const generateMockQuiz = (topic: string, difficulty: string, persona: string, count: number): Question[] => {
  const questions: Question[] = [];
  
  const templates = [
    {
      q: `What is the core concept of ${topic}?`,
      options: [`It is a type of food`, `It is the fundamental principle of the subject`, `It is a historical event`, `It is a mathematical formula`],
      correct: 1,
      exp: `The core concept of ${topic} revolves around its fundamental principles.`
    },
    {
      q: `Who is most commonly associated with the discovery or popularization of ${topic}?`,
      options: [`Albert Einstein`, `A renowned expert in the field`, `Isaac Newton`, `Marie Curie`],
      correct: 1,
      exp: `Many experts have contributed to ${topic}, making it a collaborative human effort.`
    },
    {
      q: `Which of the following best describes the impact of ${topic} on modern society?`,
      options: [`It has no impact`, `It revolutionized how we approach related problems`, `It is only relevant in theory`, `It is an outdated concept`],
      correct: 1,
      exp: `${topic} has significantly revolutionized its respective field and modern society.`
    },
    {
      q: `In the context of ${topic}, what does a ${difficulty.toLowerCase()} approach typically involve?`,
      options: [`Ignoring the basics`, `Applying standard methodologies`, `Guessing randomly`, `Overcomplicating simple tasks`],
      correct: 1,
      exp: `A ${difficulty.toLowerCase()} approach to ${topic} requires applying standard, proven methodologies.`
    },
    {
      q: `As a ${persona}, how would you summarize the importance of ${topic}?`,
      options: [`It's not important at all`, `It is crucial for understanding the broader context`, `It's just a passing trend`, `It's only useful for passing exams`],
      correct: 1,
      exp: `From the perspective of a ${persona}, ${topic} is absolutely crucial for a deep understanding.`
    },
    {
      q: `What is a common misconception about ${topic}?`,
      options: [`That it is completely understood`, `That it is too simple`, `That it has no practical application`, `All of the above`],
      correct: 3,
      exp: `There are many misconceptions about ${topic}, including its complexity and applicability.`
    }
  ];

  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    questions.push({
      id: `mock-${Date.now()}-${i}`,
      questionText: template.q,
      options: [...template.options],
      correctAnswerIndex: template.correct,
      explanation: template.exp
    });
  }

  return questions;
};

export const generateQuizQuestions = async (topic: string, difficulty: string, persona: string, count: number): Promise<Question[]> => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  
  // Fallback to mock data if no API key is provided
  if (!apiKey || apiKey === 'undefined' || apiKey === '') {
    console.warn("No Gemini API key found. Falling back to mock data.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return generateMockQuiz(topic, difficulty, persona, count);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-3-flash-preview";
    
    const prompt = `You are a ${persona}. 
    Create a ${count}-question multiple choice quiz about "${topic}". 
    The difficulty level should be ${difficulty}.
    Search the web for real, factual information about "${topic}" to create accurate and relevant questions.
    Ensure the questions are clear, educational, and factually correct based on real-world data.
    Adopt the tone and style of a ${persona} in the questions and explanations.
    Provide 4 options for each question.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              questionText: { type: Type.STRING, description: "The text of the question" },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "An array of 4 possible answers"
              },
              correctAnswerIndex: { 
                type: Type.INTEGER, 
                description: "The zero-based index of the correct answer in the options array" 
              },
              explanation: { 
                type: Type.STRING, 
                description: "A brief explanation of why the correct answer is right" 
              }
            },
            required: ["questionText", "options", "correctAnswerIndex", "explanation"],
            propertyOrdering: ["questionText", "options", "correctAnswerIndex", "explanation"]
          }
        }
      }
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error("No data returned from Gemini");
    }

    const data = JSON.parse(rawText);
    
    // Add unique IDs to questions
    return data.map((q: any, index: number) => ({
      ...q,
      id: `q-${Date.now()}-${index}`
    }));

  } catch (error) {
    console.error("Error generating quiz:", error);
    console.warn("API call failed. Falling back to mock data.");
    return generateMockQuiz(topic, difficulty, persona, count);
  }
};