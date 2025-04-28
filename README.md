# Build with GenAI Workshop

Welcome to the **Build with GenAI Workshop**! This project is designed to help developers explore and build applications using generative AI technologies. The codebase includes exercises, tools, and configurations to work with AI models, evaluate their outputs, and integrate them into real-world applications.

## Features

- **Generative AI Integration**: Leverage Google's Gemini models for text generation, embeddings, and more.
- **Custom Tools**: Extend functionality with tools like FAQ search, addition, and date utilities.
- **Assertions and Evaluations**: Test AI outputs for factuality, relevance, faithfulness, and other criteria.
- **Interactive CLI**: Build and run interactive command-line applications powered by AI.
- **Database Integration**: Use Astra DB for storing and retrieving data with vector embeddings.
- **Streaming Responses**: Handle AI responses in real-time for a better user experience.

## Project Structure

### Key Directories and Files

- **`src/`**: Core application logic.

  - `bot.js`: Handles interactions with the Google GenAI API.
  - `db.js`: Manages database connections and queries.
  - `embedding.js`: Generates vector embeddings for text.
  - `tools.js`: Defines and implements custom tools for the AI bot.
  - `history.js`: Tracks user input history for better context handling.

- **`test/`**: Contains test cases and assertion functions.

  - `assertions/promptfoo.js`: Defines assertion functions to evaluate AI outputs.
  - `evals.test.js`: Example tests for evaluating AI responses.

- **`exercises/`**: Hands-on exercises to explore and build with GenAI.

  - `exercise_1/`: Basic interaction with the AI model.
  - `exercise_2/`: Streaming responses from the AI.
  - `exercise_3/`: Ingesting and embedding FAQ data.
  - `exercise_4/`: Context-aware AI responses.
  - `exercise_6/`: Testing and evaluating AI outputs.
  - `exercise_7/`: Advanced tools and function calling.

- **`test/`**: YAML configuration files for testing AI outputs.

  - `factuality.yml`: Tests for factual accuracy.
  - `context-recall.yml`: Tests for context recall.
  - `context-relevance.yml`: Tests for context relevance.
  - `context-faithfulness.yml`: Tests for context faithfulness.
  - `answer-relevance.yml`: Tests for answer relevance.

- **`bin/`**: Entry point for running the application.

  - `agent.js`: CLI entry point for the AI agent.

- **`.env`**: Environment variables for API keys and database configuration.

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- An API key for Google GenAI
- Astra DB credentials for database integration

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/build-with-genai-workshop.git
   cd build-with-genai-workshop
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Set up environment variables: Copy `.env.example` to `.env` and fill in your credentials:
   ```
   cp .env.example .env
   ```
4. Run the application
   ```
   npm run dev
   ```
