import { GoogleGenAI } from "@google/genai";
import { ChatMessage, Product } from "../types";

// Always use the named parameter `apiKey` and obtain it exclusively from `process.env.API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getShoppingAdvice = async (
  history: ChatMessage[],
  products: Product[],
  currentCart: Product[]
) => {
  // Use 'gemini-3-flash-preview' for basic text tasks like shopping advice.
  const model = 'gemini-3-flash-preview';
  
  const productContext = products.map(p => 
    `- ${p.name} ($${p.price}): ${p.description} (Rating: ${p.rating})`
  ).join('\n');

  const cartContext = currentCart.length > 0 
    ? `The user currently has these in their cart: ${currentCart.map(c => c.name).join(', ')}.`
    : "The user's cart is currently empty.";

  const systemInstruction = `
    You are FortumarsMart Assistant, a helpful shopping expert. 
    Available products:
    ${productContext}
    
    ${cartContext}
    
    Guidelines:
    1. Be concise and friendly.
    2. Help users find products based on their needs.
    3. Compare products if asked.
    4. Suggest complementary items.
    5. Do not make up prices or features not listed in the context.
    6. Always format prices correctly.
  `;

  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  try {
    // Call generateContent directly on ai.models.
    const response = await ai.models.generateContent({
      model,
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Access the text property directly from the response object.
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};

/**
 * Generates a high-quality product image based on a text prompt.
 */
export const generateProductImage = async (prompt: string): Promise<string> => {
  // Use 'gemini-2.5-flash-image' for general image generation tasks.
  const model = 'gemini-2.5-flash-image';
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [{ text: `Professional product photography of: ${prompt}. High resolution, clean studio lighting, 4k, realistic texture.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Iterate through candidates and parts to find the image part (inlineData).
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};