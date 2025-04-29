import { DataAPIClient } from "@datastax/astra-db-ts";
import { env } from "node:process";
import {embed} from "./embedding.js";

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_COLLECTION_NAME,
} = env;

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT);
export const collection = db.collection(ASTRA_DB_COLLECTION_NAME);

export const search = async (prompt) => {
  const embeddedPrompt = await embed(prompt);

  const cursor = collection.find({}, { sort:{ $vector: embeddedPrompt}, limit: 5, includeSimilarity: true });

  const results = [];
  for await (const doc of cursor) {
    results.push(doc.content);
  }

  return results;
};
