# Live AI Portfolio with Retrieval-Augmented Generation (RAG) Chatbot

## Project identity and links
- Developer: Tonu James.
- Project type: Personal, hands-on, end-to-end Generative AI and full-stack software project.
- Status: **Publicly deployed and functioning**, with ongoing improvements.
- Live site: https://tonu-james.vercel.app/
- GitHub repository: https://github.com/tonu1990/Tonu_portfolio_RAG
- Purpose: Help portfolio visitors ask natural-language questions about Tonu's education, professional experience, technical skills and projects using the portfolio's own knowledge base.

## Application architecture
- **Frontend:** React and Vite, deployed on **Vercel**.
- **Backend:** Python and **FastAPI**, deployed on **Render**, accessed through an HTTP API.
- **Knowledge source:** Markdown files organised by education, work experience, research, technical skills, projects and career goals.
- **Embeddings:** **FastEmbed** for creating semantic representations used during indexing and retrieval.
- **Vector storage and retrieval:** **ChromaDB**, using similarity search to select relevant text chunks.
- **LLM inference:** LLM API served through **Groq** to formulate answers from the retrieved text and user's question.
- **Code and deployment:** Git/GitHub, independent frontend/backend hosting and configured cross-origin communication for the deployed frontend and backend.

## RAG workflow: how the chatbot answers questions
1. Ingest Markdown portfolio knowledge-base documents.
2. Split documents into smaller text chunks for retrieval.
3. Create embeddings for chunks using an embedding model.
4. Store embeddings and accompanying text in ChromaDB.
5. For a visitor question, embed the query and retrieve similar knowledge-base chunks.
6. Send the question and retrieved context to the LLM through Groq's inference API.
7. Return an LLM-generated, source-grounded answer to the frontend chat interface.

The chatbot retrieves information from the **portfolio knowledge base** rather than training or fine-tuning a new LLM on Tonu's biography. RAG retrieval and LLM answer generation are separate stages.

## What is functioning
- Publicly accessible portfolio pages and interactive chatbot.
- Frontend-to-backend API communication across Vercel and Render.
- Document-based question answering about the profile, AI work, education and work experience.
- An implemented embedding/retrieval/LLM response flow, built as a practical learning project.

## Scope and limitations
- The chatbot currently handles **one user question per backend request**; prior visible chat messages are not sent back as conversational context for follow-up reasoning.
- Retrieval quality can vary for ambiguous questions or information spread across multiple chunks; ranking and evaluation improvements are planned.
- Further backend hardening, including rate limiting, stronger error handling and model initialization efficiency, is planned. CORS and basic validation do **not** by themselves provide abuse protection.
- LLM responses can be incorrect or incomplete even when based on retrieved passages; the portfolio's linked reports and publications are independent supporting evidence.
- This is a **live personal project**, not a claim of a production-grade, high-traffic enterprise RAG service.

## Technologies beyond this particular deployment
Tonu has also experimented with **FAISS**, Hugging Face embedding models and LangChain. He describes his LangChain skill as **intermediate**. These should not be confused with the specific deployed portfolio stack (FastEmbed, ChromaDB and Groq).

## Relevance to AI engineering
The project demonstrates end-to-end AI integration, semantic retrieval, prompt/context composition, API-driven applications, frontend/backend deployment, and practical development considerations such as availability, reliability and testing.
