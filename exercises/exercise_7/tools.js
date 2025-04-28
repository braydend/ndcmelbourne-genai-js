import { Type } from "@google/genai";
import { search } from "./db.js";

const addFunctionDeclaration = {
  name: "add",
  description: "Add two numbers together. Use this for accurate addition.",
  parameters: {
    type: Type.OBJECT,
    description: "The numbers to add together",
    required: ["a", "b"],
    properties: {
      a: {
        type: Type.NUMBER,
        description: "The first number",
      },
      b: {
        type: Type.NUMBER,
        description: "The second number",
      },
    },
  },
};

function add({ a, b }) {
  return { output: String(a + b) };
}

const dateFunctionDeclaration = {
  name: "date",
  description: "Get the current date and time.",
};

function date() {
  return { output: new Date().toISOString() };
}

const faqSearchDeclaration = {
  name: "faqSearch",
  description: "Search the FAQ database for help with technical products.",
  parameters: {
    type: Type.OBJECT,
    description: "The search query",
    required: ["query"],
    properties: {
      query: {
        type: Type.STRING,
        description: "The search query",
      },
    },
  },
};

async function faqSearch({ query }) {
  const results = await search(query, 5);
  return { output: results.map((doc) => doc.content).join("\n") };
}

export const functions = { add, date, faqSearch };
export const functionDeclarations = [
  addFunctionDeclaration,
  dateFunctionDeclaration,
  faqSearchDeclaration,
];
