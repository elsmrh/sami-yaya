import { GoogleGenAI } from "@google/genai";
import { Tone, WishRequest } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWeddingWish = async (request: WishRequest): Promise<string> => {
  try {
    const prompt = `
      Tu es un assistant créatif pour un mariage.
      Écris un court message de félicitations (2-3 phrases max) pour le livre d'or du mariage de Sami et Prescilia.
      
      Contexte :
      - Relation avec les mariés : ${request.relationship}
      - Ton du message : ${request.tone}
      
      Réponds uniquement avec le texte du message, en français.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Félicitations aux mariés !";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "Nos meilleurs vœux de bonheur éternel.";
  }
};