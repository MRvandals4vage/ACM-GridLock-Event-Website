
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateIntelReport(name: string, faction: 'RANGER' | 'VILLAIN') {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    You are an AI intelligence officer in a high-tech, futuristic "Power Rangers vs Villains" universe called GRIDLOCK where a massive war has reached a stalemate.
    
    Current Operative: ${name}
    Assigned Faction: ${faction}
    
    Task: Write a 3-paragraph tactical intelligence report for this individual. 
    1. Describe their specific role or "class" in the current stalemate (e.g., Rogue Chrono-Ranger, Bio-mechanical Warlord).
    2. Mention one legendary battle they were involved in.
    3. Provide a cryptic prophecy about their role in breaking the Gridlock.
    
    Keep the tone gritty, cyber-military, and immersive. Use terminology like "Morphing Grid", "Quantum Signature", "Threat Level", and "Temporal Anchors".
    Output purely the text of the report.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text || "Failed to retrieve intelligence. The grid is jammed.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error communicating with command center. Morphing sequence interrupted.";
  }
}
