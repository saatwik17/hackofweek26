import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using Flash for speed as this is a UI interactive element
const MODEL_NAME = 'gemini-3-flash-preview';

export const searchProductsWithAI = async (query: string, products: Product[]): Promise<{ matchingIds: string[], reasoning: string }> => {
  try {
    const productContext = products.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category, // Added category to context
      description: p.description,
      price: p.price,
      rating: p.rating,
      tags: p.tags.join(', ')
    }));

    const prompt = `
      You are an intelligent shopping assistant for 'Aura', a premium store specializing in Electronics and Fashion in India.
      User Query: "${query}"
      
      Here is our product catalog (prices in INR):
      ${JSON.stringify(productContext)}
      
      Task:
      1. Analyze the user's query. It might be about tech specs (e.g. "laptop for coding") or fashion advice (e.g. "outfit for a wedding").
      2. Select products that match the query best.
      3. If the query is vague, suggest items from both categories (Tech and Fashion) if applicable.
      4. Return a JSON object with a list of matching product IDs and a short, friendly, expert message explaining your choices.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchingIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            reasoning: {
              type: Type.STRING
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      matchingIds: result.matchingIds || [],
      reasoning: result.reasoning || "I couldn't find exactly what you were looking for, but here are our top trending items."
    };

  } catch (error) {
    console.error("Gemini Search Error:", error);
    return { matchingIds: products.map(p => p.id), reasoning: "I'm having a little trouble connecting to my brain right now. Showing all products." };
  }
};

export const getProductCreativeDescription = async (product: Product): Promise<string> => {
  try {
    const prompt = `
      Write a short, persuasive sales pitch (max 2 sentences) for this product for an Indian customer. 
      If it is electronics, highlight performance and specs.
      If it is fashion, highlight style, fabric, and occasion.
      
      Product: ${product.name}
      Category: ${product.category}
      Base Description: ${product.description}
      Price: ₹${product.price}
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || product.description;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return product.description;
  }
};