import * as fs from "node:fs";
import {embed} from "./embedding.js";
import {collection} from "./db.js";

const getDocuments = () => {
  const content = fs.readFileSync("./src/content/faqs.md", "utf-8");
  const documents = content.split("---");

  return documents;
};

export const getDocumentsWithVectors = async () => {
    const documents = getDocuments();
    const documentsWithVectors = [];

    for (const doc of documents) {
        const vector = await embed(doc);
        documentsWithVectors.push({doc, vector});
    }

    return documentsWithVectors;
}

const storeDocumentsWithVectors = async (documentsWithVectors) => {
    try {
        const result = await collection.insertMany(documentsWithVectors.map(({doc, vector}) => ({
            content: doc,
            $vector: vector
        })));

        return result;
    } catch (e) {
        console.error("Failed to store documents with vectors:", e);
    }
};

const main = async () => {
    const documentsWithVectors = await getDocumentsWithVectors();
    const result = await storeDocumentsWithVectors(documentsWithVectors);

    console.log("Stored documents with vectors:", result);
}

await main();