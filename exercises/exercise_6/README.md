# Exercise 6

## Promptfoo tests in a JS test suite

Open `./test/evals.test.js` and take a look at the tests implemented with Promptfoo matchers. These currently test static text about France.

Import your search function and Bot class.

Create a test query and perform a search against the database to retrieve context.

Write out a ground truth for your query with the correct answer based on our fake data.

Create a prompt and then use the prompt to get the output from the model through the bot class.

With a query, context, ground truth, and model output, you can run all the RAG tests.

Check out the `evals.test.js` file in this exercise folder for more hints.

Experiment with the thresholds and parameters for the Bot and the search.
