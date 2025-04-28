import { describe, test } from "node:test";
import {
  assertMatchesLLMRubric,
  assertMatchesFactuality,
  assertMatchesAnswerRelevance,
  assertMatchesContextRecall,
  assertMatchesContextFaithfulness,
  assertMatchesContextRelevance,
} from "./assertions/promptfoo.js";

describe("the bot", () => {
  test("should return similar embeddings for similar inputs", async () => {
    const rubric = "Should be polite and concise.";
    const output = "Thank you.";

    await assertMatchesLLMRubric(rubric, output);
  });

  const query = "What is the capital of France?";
  const expected = "Paris";
  const output = "The capital of France is Paris.";
  const context =
    "Paris is the capital and largest city of France. With an estimated population of 2,048,472.";

  test("should test factuality", async () => {
    await assertMatchesFactuality(query, expected, output);
  });

  test("should test the answer relevance", async () => {
    await assertMatchesAnswerRelevance(query, output);
  });

  // test("should match context recall", async () => {
  //   console.log(await assertMatchesContextRecall(context, output));
  // });

  test("should test context faithfulness", async () => {
    await assertMatchesContextFaithfulness(query, output, context);
  });

  test("should test context relevance", async () => {
    console.log(await assertMatchesContextRelevance(query, context));
  });
});
