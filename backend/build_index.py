
from pathlib import Path

import chromadb
from fastembed import TextEmbedding

from ingest import load_knowledge_base, create_chunks


# Project configuration
BACKEND_DIR = Path(__file__).resolve().parent
VECTOR_DB_DIR = BACKEND_DIR / "vector_db"

MODEL_CACHE_DIR = BACKEND_DIR / "model_cache"

COLLECTION_NAME = "portfolio_kb_context_v1"
EMBEDDING_MODEL = "BAAI/bge-small-en-v1.5"


def build_vector_database():

    # Step 1: Load our Markdown documents
    documents = load_knowledge_base()

    # Step 2: Split documents into chunks
    chunks = create_chunks(documents)

    if not chunks:
        raise RuntimeError("No chunks found to index.")

    print(f"Documents loaded: {len(documents)}")
    print(f"Chunks created: {len(chunks)}")

    # Step 3: Extract text and metadata
    chunk_texts = [
        chunk.page_content for chunk in chunks
    ]

    chunk_metadatas = [
        chunk.metadata for chunk in chunks
    ]


    # Prepare context-enriched text for embeddings
    embedding_texts = []

    for chunk in chunks:

        metadata = chunk.metadata

        # Use the document's main heading as its title
        document_title = metadata.get(
            "heading_1",
            Path(metadata["source"]).stem
        )

        # Include available section headings
        section_headings = [
            metadata[key]
            for key in ("heading_2", "heading_3")
            if metadata.get(key)
        ]

        # Build text that carries its original context
        parts = [
            f"Document: {document_title}"
        ]

        if section_headings:
            parts.append(
                "Section: " + " > ".join(section_headings)
            )

        parts.append(chunk.page_content)

        embedding_texts.append("\n".join(parts))

    # Assign each chunk a unique ID
    chunk_ids = [
        f"chunk_{i:04d}" for i in range(len(chunks))
    ]

    # Step 4: Load the embedding model
    print("Loading embedding model...")

    model = TextEmbedding(
        model_name=EMBEDDING_MODEL,
        cache_dir=str(MODEL_CACHE_DIR)
    )

    # Step 5: Generate embeddings
    print("Generating document embeddings...")

    embeddings = [
        vector.tolist()
        for vector in model.passage_embed(embedding_texts)
    ]

    # Step 6: Open persistent ChromaDB
    client = chromadb.PersistentClient(
        path=str(VECTOR_DB_DIR)
    )

    collection = client.get_or_create_collection(
        name=COLLECTION_NAME,
        embedding_function=None,
        configuration={
            "hnsw": {"space": "cosine"}
        }
    )

    # Remove previously indexed chunks before rebuilding
    old_ids = collection.get(include=[])["ids"]

    if old_ids:
        collection.delete(ids=old_ids)

    # Step 7: Store embeddings, text and metadata
    collection.add(
        ids=chunk_ids,
        documents=chunk_texts,
        embeddings=embeddings,
        metadatas=chunk_metadatas
    )

    print("\nVector database created successfully!")
    print(f"Stored chunks: {collection.count()}")
    print(f"Embedding dimensions: {len(embeddings[0])}")
    print(f"Database location: {VECTOR_DB_DIR}")


if __name__ == "__main__":
    build_vector_database()
