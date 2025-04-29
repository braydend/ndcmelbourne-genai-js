import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";

import { History } from "./history.js";
import {Bot} from "./bot.js";
import {search} from "./db.js";

export async function main() {
  const history = new History();
  const readline = createInterface({
    input,
    output,
    terminal: true,
    history: history.messages.toReversed(),
    removeHistoryDuplicates: true,
  });
  const chat = new Bot();

  let userInput = await readline.question("> ");

  while (userInput.toLowerCase() !== ".exit") {
    if (userInput.trim() === "") {
      userInput = await readline.question("> ");
      continue;
    }
    history.addMessage(userInput);

    if (userInput.toLowerCase().startsWith("search:")) {
        const searchQuery = userInput.slice(7).trim();
        await search(searchQuery);
        userInput = await readline.question("> ");
        continue;
    }

    if (userInput.toLowerCase().startsWith("help:")) {
      const searchQuery = userInput.slice(7).trim();
      const context = (await search(searchQuery)).join("\n");
      const prompt = `
        Given the following context
        ---
        ${context}
        ---
        
        Answer the given question:
        ---
        ${searchQuery}
        ---
        
        If you don't know the answer, say "Sorry, I don't know"
      `;

      // Set new prompt to the user input to it can fall through to the chat
      userInput = prompt;
    }

    try {
      const response = await chat.sendMessageStream(userInput);

      for await (const chunk of response) {
        if (chunk.text) {
          output.write(`${chunk.text}`);
        }
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
