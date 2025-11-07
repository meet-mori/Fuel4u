import { GoogleGenAI } from "@google/genai";
import { FuelType, Coordinates } from '../types';

// FIX: Per coding guidelines, API key must be from process.env.API_KEY
// and we should assume it is pre-configured. The fallback and warning are removed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateConfirmationMessage = async (
  fuelType: FuelType,
  quantity: number,
  location: Coordinates
): Promise<string> => {
  try {
    const prompt = `You are a friendly confirmation bot for an on-demand fuel delivery service in India. A user has requested ${quantity} litres of ${fuelType}. Their location is confirmed at latitude ${location.latitude} and longitude ${location.longitude}. Generate a reassuring and friendly confirmation message for the user. Important:
1. Start with a positive confirmation like "Your request is confirmed!".
2. Clearly state the fuel type (${fuelType}) and quantity (${quantity} litres) back to the user.
3. Provide an estimated delivery time, which should be a random value between 25 and 45 minutes.
4. Include one short, practical safety tip for someone waiting for a delivery on the side of a road in India. For example: "Safety Tip: Please wait in a well-lit area and turn on your vehicle's hazard lights."
5. Keep the entire message concise and easy to read on a mobile screen.
Do not use Markdown formatting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating confirmation message:", error);
    return "Your order has been received! A delivery agent will be assigned shortly. Please wait in a safe, well-lit area.";
  }
};