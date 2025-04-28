import { GoogleGenAI } from "@google/genai";
import { env } from "node:process";

export const genAI = new GoogleGenAI({ apiKey: env.GOOGLE_API_KEY });

export class Bot {
  constructor(options = {}) {
    this.modelName = options.modelName || "gemini-2.0-flash";
    this.temperature = options.temperature || 0.2;
    this.topP = options.topP || 0.95;
    this.topK = options.topK || 30;
    this.systemPrompt = options.systemPrompt || "You are a helpful assistant.";
    this.toolConfig = options.toolConfig || {};
    this.tools = options.tools || [];

    this.chat = genAI.chats.create({
      model: this.modelName,
      config: {
        temperature: this.temperature,
        topP: this.topP,
        topK: this.topK,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
        systemInstruction: this.systemPrompt,
        toolConfig: this.toolConfig,
        tools: this.tools,
      },
    });
  }

  async sendMessage(message) {
    return await this.chat.sendMessage({ message });
  }

  async sendMessageStream(query) {
    return this.chat.sendMessageStream({ message: query });
  }
}
