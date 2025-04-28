import { strict as assert } from "node:assert";
import { assertions } from "promptfoo";

const {
  matchesLlmRubric,
  matchesFactuality,
  matchesAnswerRelevance,
  matchesContextRecall,
  matchesContextRelevance,
  matchesContextFaithfulness,
} = assertions;

const LLMconfig = {
  provider: "google:gemini-2.0-flash",
};

export async function assertMatchesLLMRubric(rubric, output) {
  const gradingResult = await matchesLlmRubric(rubric, output, LLMconfig);
  assert(
    gradingResult.pass,
    `expected
    "${output}"
to pass LLM Rubric
    "${rubric}"
but it did not. Reason:
    "${gradingResult.reason}"`
  );
  return gradingResult;
}

export async function assertMatchesFactuality(query, groundTruth, output) {
  const gradingResult = await matchesFactuality(
    query,
    groundTruth,
    output,
    LLMconfig
  );
  assert(
    gradingResult.pass,
    `expected
    "${output}"
to match factuality with
    "${groundTruth}"
but it did not. Reason:
    "${gradingResult.reason}"`
  );
  return gradingResult;
}

export async function assertMatchesAnswerRelevance(
  query,
  output,
  threshold = 0.8
) {
  const gradingResult = await matchesAnswerRelevance(query, output, threshold);
  assert(
    gradingResult.pass,
    `expected
    "${output}"
to match answer relevance with query
    "${query}"
but it did not. Reason:
    "${gradingResult.reason}"`
  );
  return gradingResult;
}

export async function assertMatchesContextRecall(
  context,
  groundTruth,
  threshold = 0.8
) {
  const gradingResult = await matchesContextRecall(
    context,
    groundTruth,
    threshold,
    LLMconfig
  );
  assert(
    gradingResult.pass,
    `expected
    "${groundTruth}"
to match context recall with context
    "${context}"
but it did not. Reason:
    "${gradingResult.reason}"`
  );
  return gradingResult;
}

export async function assertMatchesContextRelevance(
  question,
  context,
  threshold = 0.8
) {
  const gradingResult = await matchesContextRelevance(
    question,
    context,
    threshold,
    LLMconfig
  );
  assert(
    gradingResult.pass,
    `expected
    "${context}"
to match context relevance with question
    "${question}"
but it did not. Reason:
    "${gradingResult.reason}"`
  );
  return gradingResult;
}

export async function assertMatchesContextFaithfulness(
  query,
  output,
  context,
  threshold = 0.8
) {
  const gradingResult = await matchesContextFaithfulness(
    query,
    output,
    context,
    threshold,
    LLMconfig
  );
  assert(
    gradingResult.pass,
    `expected
    "${output}"
to match context faithfulness with query
    "${query}" and context
    "${context}"
but it did not. Reason:
    "${gradingResult.reason}"`
  );
  return gradingResult;
}
