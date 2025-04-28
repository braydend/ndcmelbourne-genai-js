import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";

import { History } from "./history.js";
import { Bot } from "./bot.js";

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
    systemPrompt: "You are a helpful assistant.",
  });

  let userInput = await readline.question("> ");

  while (userInput.toLowerCase() !== ".exit") {
    if (userInput.trim() === "") {
      userInput = await readline.question("> ");
      continue;
    }
    history.addMessage(userInput);
    try {
      const response = await bot.sendMessageStream(userInput);

      for await (const chunk of response) {
        output.write(`${chunk.text}`);
      }
      output.write("\n");

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
