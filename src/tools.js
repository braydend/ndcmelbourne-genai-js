import { Type } from "@google/genai";

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

export const functions = { add };
export const functionDeclarations = [addFunctionDeclaration];
