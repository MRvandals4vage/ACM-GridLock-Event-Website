import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { name, faction } = await req.json();

        if (!name || !faction) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return NextResponse.json({ intel: text }, { status: 200 });

    } catch (error: any) {
        console.error("Gemini Error:", error);
        return NextResponse.json({ error: 'Tactical uplink lost' }, { status: 500 });
    }
}
