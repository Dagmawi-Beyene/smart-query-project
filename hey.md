# Setup Guide

To set up the Smart Query project on your local machine, follow these simple steps:

1. Clone the repository:
    ```
    git clone https://github.com/Dagmawi-Beyene/smart-query
    ```
2. Navigate to the project directory:
    ```
    cd smart-query
    ```
3. Install the required dependencies using pnpm:
    ```
    pnpm install
    ```
4. Run the application in development mode:
    ```
    pnpm dev
    ```

# Environment Variables

You need to set these environment variables before running the application:

- `OPENAI_API_KEY`: Get your OpenAI API Key at https://platform.openai.com/account/api-keys
- `PINECONE_API_KEY`: Your Pinecone API key, retrievable from the Pinecone console.
- `PINECONE_ENVIRONMENT`: Your Pinecone environment, retrievable from the Pinecone console.
- `PINECONE_INDEX`: Your Pinecone index name, retrievable from the Pinecone console.
- `NEXT_PUBLIC_REPLICATE_API_KEY`: Your Replicate API Key.

Once you have these values, create a `.env` file in the project root, and populate it like:

```
OPENAI_API_KEY=XXXXXXXX
PINECONE_API_KEY=xxxx
PINECONE_ENVIRONMENT=xxxx
PINECONE_INDEX=xxxx
NEXT_PUBLIC_REPLICATE_API_KEY=xxxx
```

# Live Preview

You can preview the Smart Query project live on the web before running it locally. Here's a placeholder link to the application: [https://your-live-preview-link.com](https://your-live-preview-link.com)


# Table of Contents

- [Project Overview](#project-overview)
- [Repository Structure](#repository-structure)
- [Vercel Deployment](#vercel-deployment)
- [Data Source Integration](#data-source-integration)
- [User Experience Enhancement](#user-experience-enhancement)
- [Technical Deep Dive](#technical-deep-dive)
- [Understanding Vector Databases](#understanding-vector-databases)
- [Retrieval-Augmented Generation (RAG)](#retrieval-augmented-generation-(rag))
- [Testing and Optimization (Revised)](#testing-and-optimization-(revised))
- [Analysis of API-Related Challenges](#analysis-of-api-related-challenges)
- [Project Successes](#project-successes)
- [How to Make the Project Even Better (Past our budgeting constraints and technical know-how)?](#how-to-make-the-project-even-better-(past-our-budgeting-constraints-and-technical-know-how)?)
- [Conclusion](#conclusion)
- [Works Cited](#works-cited)
