
from pathlib import Path

import chromadb
from fastembed import TextEmbedding


# Configuration
BACKEND_DIR = Path(__file__).resolve().parent
VECTOR_DB_DIR = BACKEND_DIR / "vector_db"

MODEL_CACHE_DIR = BACKEND_DIR / "model_cache"

COLLECTION_NAME = "portfolio_kb_context_v1"
EMBEDDING_MODEL = "BAAI/bge-small-en-v1.5"


def search_knowledge_base(question, top_k=3):

    # 1. Load the embedding model
    model = TextEmbedding(
        model_name=EMBEDDING_MODEL,
        cache_dir=str(MODEL_CACHE_DIR)
    )

    # 2. Convert the question into an embedding
    query_vector = next(model.query_embed(question)).tolist()

    # 3. Open the existing ChromaDB database
    client = chromadb.PersistentClient(
        path=str(VECTOR_DB_DIR)
    )

    # 4. Access our previously created collection
    collection = client.get_collection(
        name=COLLECTION_NAME,
        embedding_function=None
    )

    # 5. Search for the most similar chunks
    results = collection.query(
        query_embeddings=[query_vector],
        n_results=top_k,
        include=["documents", "metadatas", "distances"]
    )

    return results



if __name__ == "__main__":

    test_questions = [
        "What was Tonu's MSc research about?",

        "What was Tonu's MSc thesis on regional bias "
        "in pedestrian detection between Europe and India?",

        "What responsibilities did Tonu have in "
        "SAP Multi-Bank Connectivity at SAP Labs?"
    ]

    for question in test_questions:

        print("\n" + "=" * 60)
        print(f"QUESTION: {question}")
        print("=" * 60)

        results = search_knowledge_base(
            question,
            top_k=5
        )

        for i in range(len(results["ids"][0])):

            metadata = results["metadatas"][0][i]
            distance = results["distances"][0][i]
            content = results["documents"][0][i]

            # Display a shorter preview
            preview = " ".join(content.split())[:200]

            print(f"\nRank: {i + 1}")
            print(f"Source: {metadata['source']}")
            print(f"Distance: {distance:.4f}")
            print(f"Chunk length: {len(content)}")
            print(f"Preview: {preview}...")
