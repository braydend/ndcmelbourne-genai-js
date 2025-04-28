# Exercise 3

## Vectorizing and ingesting data

Create a file called `./src/ingest.js` and copy `./exercises/exercise_3/faqs.md` to the `src` directory.

Our ingestion script will need to load the data from `./src/faqs.md`, split it up by the horizontal rules. Then map over each of the documents and turn them into a vector embedding. There is an `embed` function in `./src/embedding.js` you can use for that.

Once you have vector embeddings for the cotent, you'll need to create a list of documents, where each document has a `content` property and a `$vector` property.

With that list you can insert them into the database. Check the Astra DB docs for more on inserting: https://docs.datastax.com/en/astra-db-serverless/api-reference/document-methods/insert-many.html.

Once you are ready, run your ingestion script. Don't forget to run your script with `--env-file=.env` to add the credentials to the environment.

Check the `ingest.js` file in this exercise folder for a complete solution.

## Searching the database

In `./src/db.js` add a new function that will be used to perform a vector search.

You will need to use the `embed` function again, this time to turn a user query into a vector embedding.

Then you will perform a vector search (sort) and set some sort of limit, finally returning the list of documents that matched the search.

Astra DB documentation for vector search: https://docs.datastax.com/en/astra-db-serverless/api-reference/document-methods/find-many.html
