import { GoogleGenAI, Chat } from "@google/genai";
import { Trip } from "../types";

// Hardcoded API Key as requested
const apiKey = 'AIzaSyBeKkVbXz8kag3GPhTjuq6acZmcIwMfqzM';
const ai = new GoogleGenAI({ apiKey });

// Cache chat sessions to maintain context per trip if needed
const chatSessions: Record<string, Chat> = {};

export const getGeminiChatResponse = async (trip: Trip, userMessage: string, chatHistoryId: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing.";
  }

  try {
    let chat = chatSessions[chatHistoryId];

    if (!chat) {
      chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are the travel blogger who went to ${trip.location}. 
          You wrote a blog post titled "${trip.title}".
          Your style is adventurous, descriptive, and helpful.
          Answer questions about your trip to ${trip.location} specifically.
          Based on these highlights: ${trip.highlights.join(', ')}.
          Keep answers concise (under 100 words) but engaging.`,
        },
      });
      chatSessions[chatHistoryId] = chat;
    }

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "I'm speechless! Try asking again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to my travel journal right now. Please try again later.";
  }
};

export const generateExtendedStory = async (trip: Trip): Promise<string> => {
    if (!apiKey) return "API Key missing.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Write a vivid, first-person travel blog entry about a trip to ${trip.location}. 
            Title: ${trip.title}.
            Key highlights to include: ${trip.highlights.join(', ')}.
            The tone should be inspiring and personal. Length: approx 300 words. Format using Markdown.`
        });
        return response.text || "Could not generate story.";
    } catch (error) {
        console.error("Gemini Story Gen Error", error);
        return "Failed to load the full story from the archives.";
    }
}