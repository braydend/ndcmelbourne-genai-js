import { genAI } from "./bot.js";

export async function embed(text) {
  const response = await genAI.models.embedContent({
    model: "text-embedding-004",
    contents: text,
  });

  return response.embeddings[0].values;
}
