# Exercise 7

## Agents

The agent loop can be a pain to get right, but you can get the code, with the new prompt and tool config from the `index.js` file in this directory.

Once you have that, it's time to write some tools!

Check the Gemini docs on function calling: https://ai.google.dev/gemini-api/docs/function-calling, particularly around function declarations.

Then define some tools in `./src/tools.js`. You'll find an addition tool already defined.

Once you define a tool and its definition be sure to add the function to the `functions` export, and the definition to the `functionDeclarations`.

So that we don't lose all the good work on the RAG setup, create an faq search tool that can search the database if required.

Pay close attention to the descriptions of your tools and their parameters, as well as the prompt you use in `./src/index.js`. Check out the examples in this directory for guidance.

See what other tools you can create.
