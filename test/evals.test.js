import { describe, test, before } from "node:test";
import {
  assertMatchesLLMRubric,
  assertMatchesFactuality,
  assertMatchesAnswerRelevance,
  assertMatchesContextRecall,
  assertMatchesContextFaithfulness,
  assertMatchesContextRelevance,
} from "./assertions/promptfoo.js";
import {search} from "../src/db.js";
import {Bot} from "../src/bot.js";

describe("the bot", () => {
  let bot;
    let query;
    let expected;
    let context;
    let output;

  before(async () => {
     bot = new Bot();

     query = "Why does my computer take a long time to show what key I've pressed on my keyboard?";
    // This is the "truth" that the model must adhere to
     expected = "Your keyboard may not be connected properly or the drivers may be out of date.";
    // This is the data pulled from the vector database
     context = await search(query);
    // This is a stub output we expect the model to return
     output = await bot.sendMessage(`
             Given the following context
        ---
        ${context}
        ---
        
        Answer the given question:
        ---
        ${context.join("\n")}
        ---
        
        If you don't know the answer, say "Sorry, I don't know"`);
  });

  test("should return similar embeddings for similar inputs", async () => {
    const rubric = "Should be polite and concise.";
    const output = "Thank you.";

    await assertMatchesLLMRubric(rubric, output);
  });

  test("should test factuality", async () => {
    await assertMatchesFactuality(query, expected, output);
  });

  test.skip("should test the answer relevance", async () => {
    await assertMatchesAnswerRelevance(query, output);
  });

  // test("should match context recall", async () => {
  //   console.log(await assertMatchesContextRecall(context, output));
  // });

  test("should test context faithfulness", async () => {
    await assertMatchesContextFaithfulness(query, output, context);
  });

  test("should test context relevance", async () => {
    console.log(await assertMatchesContextRelevance(query, context, 0.5));
  });
});
