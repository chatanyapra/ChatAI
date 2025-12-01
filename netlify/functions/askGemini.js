import { GoogleGenAI } from "@google/genai";

export const handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: { "Allow": "POST" },
            body: JSON.stringify({ error: "Method Not Allowed" })
        };
    }

    try {
        const { question } = JSON.parse(event.body ?? "{}");
        if (!question) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing question" })
            };
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("Gemini API key not set");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Server not configured" })
            };
        }

        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: question
        });

        const answer = response.candidates[0].content.parts[0].text;

        return {
            statusCode: 200,
            body: JSON.stringify({ answer })
        };
    } catch (error) {
        console.error("askGemini failure:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Unexpected server error" })
        };
    }
};
