import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";

import { History } from "./history.js";
import { Bot } from "./bot.js";
import { functions, functionDeclarations } from "./tools.js";

export async function main() {
  const history = new History();
  const readline = createInterface({
    input,
    output,
    terminal: true,
    history: history.messages.toReversed(),
    removeHistoryDuplicates: true,
  });

  const bot = new Bot({
    model: "gemini-2.0-flash",
    temperature: 0.2,
    topP: 0.95,
    topK: 30,
    systemPrompt: "You are a helpful assistant",
    toolConfig: {
      functionCallingConfig: {
        mode: "AUTO",
      },
    },
    tools: [{ functionDeclarations }],
  });

  let userInput = await readline.question("> ");

  while (userInput.toLowerCase() !== ".exit") {
    if (userInput.trim() === "") {
      userInput = await readline.question("> ");
      continue;
    }
    history.addMessage(userInput);
    try {
      const prompt = `Answer the following question:

---
${userInput}
---

If you do not know the answer, use the available tools to find an answer.`;

      const response = await bot.sendMessage(prompt);
      if (!response.functionCalls) {
        output.write(`${response.text}\n`);
      }

      let functionCalls = response.functionCalls;

      while (functionCalls && functionCalls.length > 0) {
        const functionResponses = await Promise.all(
          functionCalls.map(async (call) => {
            const { name, args } = call;
            const response = await functions[name](args);
            return {
              functionResponse: {
                name,
                response,
              },
            };
          })
        );

        const newResponse = await bot.sendMessage(functionResponses);
        if (!newResponse.functionCalls) {
          output.write(newResponse.text);
        }
        functionCalls = newResponse.functionCalls;
      }

      userInput = await readline.question("> ");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      userInput = await readline.question(
        "\nSomething went wrong, try asking again\n\n> "
      );
    }
  }

  await history.addMessage(userInput);

  readline.close();
}
