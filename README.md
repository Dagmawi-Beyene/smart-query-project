## Smart Query Project Comprehensive Report

# Setup Guide

To set up the Smart Query project on your local machine, follow these simple steps:

1. Clone the repository:
    ```
    git clone https://github.com/Dagmawi-Beyene/smart-query-project
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

You can preview the Smart Query project live on the web before running it locally. Here's a placeholder link to the application: [https://smart-query-i5uu.vercel.app/](https://smart-query-i5uu.vercel.app/)


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

# Project Overview

The Smart Query project, spearheaded by Dagmawi Beyene and Terrance Watkins, is a pioneering web application that seamlessly integrates chat functionality with advanced AI and web crawling capabilities. Utilizing modern web technologies and APIs, this project offers a rich user experience backed by sophisticated backend processing.

# Repository Structure

The project's repository is a well-organized collection of API routes for chat, context, and web crawling, alongside React components for the user interface. It also includes utility functions for various operations and configuration files for Next.js and Tailwind CSS, ensuring a robust and scalable application architecture.
Deployment Strategy

# Vercel Deployment

    Platform: The project leverages Vercel, a cloud platform known for its efficiency in hosting static sites and Serverless Functions.
    Benefits:
        Ease of Use: Seamless GitHub integration for continuous deployment.
        Performance: Features like Edge Caching optimize application performance.
        Scalability: Automatic scaling caters to varying infrastructure needs.
    Process: Continuous deployment via GitHub ensures the application is always up-to-date.

# Data Source Integration

**Haaga-Helia.fi Website**

    Application:
        Web Crawling: Extracts vital information from the university's website.
        Data Indexing: Processes and indexes the crawled data, preparing it for efficient retrieval.
        Chatbot Training: Utilizes the indexed data to enhance the chatbot's knowledge base.

**User Experience Enhancement**

    Target Audience: Students, faculty, and visitors of Haaga-Helia University.
    Benefits:
        Relevance: Delivers accurate answers to university-related queries.
        Accessibility: Simplifies access to university information.

**Technical Deep Dive**

**Generating Embeddings**

    Function: getEmbeddings(input: string)
    Purpose: Creates text input embeddings using OpenAI's API.
    Usage: Facilitates understanding of text context and content.

**Interacting with Pinecone**

    Function: getMatchesFromEmbeddings(embeddings: number[], topK: number, namespace: string)
    Purpose: Retrieves relevant matches from Pinecone's vector database.

**Chat Route Handling**

    Functionality: Manages chat requests and responses.
    Process: Involves message extraction, context retrieval, prompt construction, and response streaming.

**Integration and Workflow**

    Embeddings Creation: Converts user input into embeddings.
    Contextual Understanding: Uses embeddings to comprehend user queries.
    Vector Database Search: Queries Pinecone with embeddings for relevant information.
    Response Generation: AI models generate responses based on retrieved context.
    User Interaction: Streams responses back to users.

**Understanding Vector Databases**

# Definition and Key Characteristics

    Vector Database: A specialized database designed for storing, indexing, and retrieving vector data, which are multi-dimensional numerical arrays representing various data features.
    Multi-Dimensional Data: Vectors represent data points in high-dimensional spaces, necessitating unique indexing methods.
    Similarity-Based Retrieval: Uses distance metrics like cosine similarity or Euclidean distance for finding the closest vectors to a query.

**How It Works**

    Storage: Efficiently stores large volumes of vector data, often using compression techniques.
    Indexing: Utilizes specialized indexing mechanisms like KD-trees or HNSW graphs to organize data for accelerated similarity searches.
    Query Processing: Involves querying with vectors and finding the most similar vectors based on chosen metrics.

**Applications**

    AI and Machine Learning: Stores embeddings for tasks like semantic search, face recognition, and content recommendation.
    Enhancing Chatbots and Search Engines: Improves response accuracy and search result relevance by understanding semantic meanings.

**Chunks in Vector Databases**

    Purpose: Chunks segment the database into smaller parts for efficient data management and retrieval, enabling parallel processing and load balancing.
    Functionality: Each chunk holds a subset of the database's vector data. During queries, the database searches these chunks concurrently, speeding up the retrieval process. Chunks also enhance fault tolerance and scalability in distributed systems.

**Retrieval-Augmented Generation (RAG)**

    Concept: RAG is a technique that merges data retrieval from a database with generative models, enhancing content generation quality.
    Application in Chatbots: Enables chatbots to pull relevant information from a vector database in real-time, based on the user's query context. This information is then used by generative models like GPT-3.5 and GPT 4 to create more accurate and contextually relevant responses.
    Benefits: Improves response accuracy by augmenting model-generated content with specific, up-to-date information from the database. Offers flexibility in handling diverse queries and enhances user experience with tailored responses.

# Testing and Optimization (Revised)

**Objective and Approach**

The testing and optimization phase was critical in ensuring the Smart Query chatbot's reliability and efficiency. This phase involved various testing methods to identify and address issues.

    Unit Testing: Testing individual components like embedding generation and Pinecone integration.
    Integration Testing: Ensuring seamless interaction between different components.
    Performance Testing: Assessing response times and concurrent request handling.
    User Acceptance Testing (UAT): Involving real users to validate functionality and user experience.

**Challenges and Solutions**

    API Response Time: Addressed timing out issues with the embeddings API through optimized asynchronous calls and improved error handling.

    Data Overload from Web Scraping: Managed excessive data from Haaga-Helia.fi by implementing stringent filters and adjusting the scraping process.

    Pinecone Token Consumption: Reduced token usage by refining query designs.

    Chatbot Hallucinations: During a test by the course instructor, the chatbot exhibited 'hallucinations' – generating incorrect or nonsensical responses. This was a significant challenge as it impacted the chatbot's reliability.
        Solution: The team implemented prompt engineering techniques to refine the way queries were presented to the AI model. This involved structuring prompts to guide the AI more effectively, reducing the likelihood of generating irrelevant or incorrect responses. The team also integrated additional checks to filter out potentially misleading information before presenting it to the user.

**Optimization Strategies**

    Code Refactoring: Continuous improvement of code for efficiency and maintainability.
    Resource Management: Effective use of APIs and server resources within budget constraints.
    
# Analysis of API-Related Challenges

**Embeddings API Issues**

    Timing Out: Addressed through better asynchronous handling and error management.
    Pinecone API Challenges: Managed excessive token consumption and optimized query design.

**Web Scraping Haaga-Helia.fi**

    Handling Excessive Information: Implemented data filtering and incremental scraping for efficiency.

# Project Successes

**Budget Management**

    Staying Within Budget: Demonstrated effective financial planning by completing the project with minimal expenditure.
    Leveraging Free Resources: Utilized free resources to maintain low costs.

**Meeting Deadlines**

    Project Timeline: Adhered to deadlines, showcasing excellent project management.
    Efficient Workflow: Maintained a clear understanding of project goals and efficient task handling.

**Knowledge Sharing and Skill Development**

    Learning from Team Members: Fostered an environment of mutual learning, particularly in AI and data processing.

**Technical Accomplishments**

    Successful Integration of Technologies: Managed complex integrations of AI models, vector databases, and web scraping tools.
    Effective Data Handling: Demonstrated strong data management skills in processing and utilizing scraped data.

**How to Make the Project Even Better (Past our budgeting contraints and technical know-how)?**

    Advanced Natural Language Understanding (NLU):

        Integrate more sophisticated NLU algorithms to improve the chatbot's comprehension of complex queries and nuances in language.
        Utilize sentiment analysis to better understand the tone and intent behind user queries.

    Dynamic Learning and Model Updating:

        Implement a system for the chatbot to learn from interactions and update its model accordingly. This could involve techniques like reinforcement learning.
        Regularly update the AI model with new data and trends to keep the responses relevant and accurate.

    User Personalization:

        Develop personalized user profiles to tailor responses based on individual user preferences and history.
        Implement a recommendation system within the chatbot to suggest relevant courses or information based on user interactions.

    Enhanced Data Sources and Integration:

        Expand the range of data sources, including integrating more academic databases or external educational resources.
        Improve the web scraping algorithms to capture a broader range of relevant information.

    User Feedback Loop:

        Create a mechanism for users to provide feedback on chatbot responses, which can be used for continuous improvement.
        Implement A/B testing to experiment with different response strategies and measure effectiveness.

    Scalability and Performance Optimization:

        Optimize backend infrastructure for higher scalability, especially if user traffic increases.
        Conduct stress testing to ensure the system can handle high loads without compromising performance.

    Security and Privacy Enhancements:

        Strengthen data security measures to protect user data and interactions.
        Ensure compliance with privacy regulations like GDPR, especially when handling personal data.

    Multilingual Support:

        Add support for multiple languages to cater to a diverse user base.
        Implement auto-translation features for seamless communication in different languages.
        We kind of have this in our project, but we are not sure how well the Chatbots are translating from Finnish or Swedish.

    Interactive and Engaging UI/UX:

        Enhance the user interface with more interactive elements, like chat bubbles, typing indicators, and custom avatars.
        Improve the overall user experience with intuitive navigation and responsive design.

    Community and Social Integration:

        Integrate community features, such as forums or discussion boards, where users can interact and share information.
        Allow sharing of chatbot responses or information on social media platforms.

    Extended Functionality:
    
        Add features like scheduling appointments with academic advisors or enabling course registration through the chatbot.
        Implement voice recognition and response capabilities for a more accessible interface.


# Conclusion

The Smart Query project exemplifies a well-executed technological initiative, marked by effective budget management, adherence to deadlines, collaborative learning, and technical proficiency. The project serves as a model for future technology-driven projects, highlighting the importance of strategic planning, teamwork, and innovation in achieving success.

# Works Cited

    Beyene, D.,and Watkins, T., 2023. Smart Query Project Repository. [online] GitHub. Available at: https://github.com/Dagmawi-Beyene/smart-query [Accessed 22 November 2023].

    OpenAI, 2023. API Documentation. [online] OpenAI. Available at: https://beta.openai.com/docs/ [Accessed 10 November 2023].

    Pinecone Systems Inc., 2023. Pinecone Documentation. [online] Pinecone. Available at: https://www.pinecone.io/docs/ [Accessed 20 November 2023].

    Vercel Inc., 2023. Vercel Documentation. [online] Vercel. Available at: https://vercel.com/docs [Accessed 10 November 2023].

    Haaga-Helia University of Applied Sciences, 2023. Haaga-Helia.fi. [online] Haaga-Helia.fi. Available at: https://www.haaga-helia.fi/en [Accessed 10 November 2023].

    Lewis, P., et al., 2020. Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. [e-journal] arXiv:2005.11401. Available at: https://arxiv.org/abs/2005.11401 [Accessed 10 November 2023].

