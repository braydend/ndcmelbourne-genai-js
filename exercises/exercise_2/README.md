# Exercise 2

## Updating to use chat

In `src/index.js` change the import from "./bot.js" from `genAI` to the `Bot` class. This class handles the config for the bot in a tidier manner.

At the top of the main function, initialize a new `Bot` object, passing an object of options, including default parameters:

```js
const bot = new Bot({
  model: "gemini-2.0-flash",
  temperature: 0.2,
  topP: 0.95,
  topK: 30,
  systemPrompt: "You are a helpful assistant.",
});
```

Replace your use of `genAI.generateContentStream` with `bot.sendMessageStream`. You only need to pass the `userInput` to this function.

Now when you chat with the bot it will remember your previous answers.

## Experiment

In the bot you have used the suggested starting parameters for the model. Play around with the figures to see what results you get. You can also change the system prompt to get different results from the bot.

Try giving it a creative personality. Or a very boring one.
