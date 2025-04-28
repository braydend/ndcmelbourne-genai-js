# Exercise 1

## Generating content

In `src/index.js` we need to stop the user input being repeated back to the user and instead send it to Gemini for a response.

Ensure you have filled in the `GOOGLE_API_KEY` in `.env` with your API key from the Google AI Studio.

Open `src/index.js` and start by importing `genAI` from `./bot.js`. This is an authorised function that can make calls to the Gemini API using [Google's `@google/genai` library](https://www.npmjs.com/package/@google/genai). Check the documentation for the Gemini APIs here: https://ai.google.dev/gemini-api/docs/quickstart?lang=node

On line 25 you will find where we echo the response.

You should use the [`generateContent` function](https://ai.google.dev/gemini-api/docs/text-generation) of the `genAI` object to generate a response from Gemini. You will need to pass an object with two properties, a `model` (I recommend "gemini-2.0-flash" for this workshop) and `contents`, the user input.

That will return a response object and you can print out the `text` property.

To see the completed code, check out `index.js` in the `exercise_1` directory.

## Streaming content

To update `index.js` to match the functionality of `index_streaming.js`, follow these steps:

1. Replace the call to `generateContent` with a call to the `generateContentStream` method of the `genAI` object.
2. Use a `for await` loop to handle the streaming chunks of the response and write them to the output.

Refer to the `index_streaming.js` file for the complete implementation.
