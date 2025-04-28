import { describe, test } from "node:test";
import {
  assertMatchesFactuality,
  assertMatchesAnswerRelevance,
  assertMatchesContextRecall,
  assertMatchesContextFaithfulness,
  assertMatchesContextRelevance,
} from "./assertions/promptfoo.js";

import { Bot } from "../src/bot.js";
import { search } from "../src/db.js";

describe("the bot", async () => {
  const bot = new Bot();

  const query = "How do I get my Synapse prediction router to work?";
  const context = (await search(query, 2)).map((doc) => doc.content).join("\n");
  const groundTruth =
    "You will need to power cycle the Synapse router by turning it off for 30 seconds and then back on. Ensure the router has up to date firmware. Lower the 'Prediction Sensitiity' setting if your issues happen at the same time as new activities. Remove any unrecognized devices from the connected device list. Last option is to reset to factory default.";
  const prompt = `Given the following context:

---
${context}
---

Answer the following question:

---
${query}
---

If you do not know the answer, tell the user just to try turning it off and on again.`;
  const output = await bot.sendMessage(prompt);

  test("should test factuality", async () => {
    const output = await bot.sendMessage(query);
    await assertMatchesFactuality(query, groundTruth, output);
  });

  test("should test the answer relevance", async () => {
    await assertMatchesAnswerRelevance(query, output, 0.7);
  });

  test("should match context recall", async () => {
    await assertMatchesContextRecall(context, groundTruth, 0.4);
  });

  test("should test context faithfulness", async () => {
    await assertMatchesContextFaithfulness(query, output, context);
  });

  test("should test context relevance", async () => {
    await assertMatchesContextRelevance(query, context, 0.4);
  });
});
