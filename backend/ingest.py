
from pathlib import Path
from langchain_core.documents import Document
from langchain_text_splitters import (
    MarkdownHeaderTextSplitter,
    RecursiveCharacterTextSplitter
)


# Get the directory containing this Python file
BACKEND_DIR = Path(__file__).resolve().parent

# Locate our KnowledgeBase directory
KNOWLEDGE_BASE_DIR = BACKEND_DIR / "KnowledgeBase"


def load_knowledge_base():

    documents = []

    # Find all Markdown files, including those in subfolders
    files = sorted(KNOWLEDGE_BASE_DIR.rglob("*.md"))

    for file_path in files:

        # Read the complete Markdown document
        content = file_path.read_text(encoding="utf-8").strip()

        if not content:
            print(f"Skipping empty file: {file_path.name}")
            continue

        # Get the path relative to KnowledgeBase
        relative_path = file_path.relative_to(KNOWLEDGE_BASE_DIR)

        # Store content along with its metadata
        document = {
            "content": content,
            "source": relative_path.as_posix(),
            "category": relative_path.parent.as_posix()
        }

        documents.append(document)

    return documents



def create_chunks(documents):

    # Stage 1: Split by Markdown headings
    header_splitter = MarkdownHeaderTextSplitter(
        headers_to_split_on=[
            ("#", "heading_1"),
            ("##", "heading_2"),
            ("###", "heading_3")
        ],
        strip_headers=False
    )

    # Stage 2: Split long sections into smaller chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=900,
        chunk_overlap=120
    )

    all_chunks = []

    for doc in documents:

        sections = header_splitter.split_text(doc["content"])

        # Fallback if no sections are produced
        if not sections:
            sections = [Document(page_content=doc["content"])]

        chunk_index = 0

        for section in sections:

            # Preserve the original file information
            section.metadata["source"] = doc["source"]
            section.metadata["category"] = doc["category"]

            # Split the section if it is too long
            smaller_chunks = text_splitter.split_documents([section])

            for chunk in smaller_chunks:
                chunk.metadata["chunk_index"] = chunk_index
                all_chunks.append(chunk)
                chunk_index += 1

    return all_chunks


if __name__ == "__main__":

    if not KNOWLEDGE_BASE_DIR.is_dir():
        raise FileNotFoundError(
            f"KnowledgeBase directory not found: {KNOWLEDGE_BASE_DIR}"
        )

    documents = load_knowledge_base()

    print(f"\nTotal documents loaded: {len(documents)}\n")

    for doc in documents:
        print(f"Source: {doc['source']}")
        print(f"Category: {doc['category']}")
        print(f"Characters: {len(doc['content'])}")
        print("-" * 50)


    # Create chunks from the loaded documents
    chunks = create_chunks(documents)

    print(f"\nTotal chunks created: {len(chunks)}")

    # Display how many chunks came from each file
    print("\nChunks per document:")

    for doc in documents:
        source = doc["source"]

        count = sum(
            1 for chunk in chunks
            if chunk.metadata["source"] == source
        )

        print(f"{source}: {count} chunks")

    # Inspect a sample chunk
    if chunks:
        print("\n--- Sample Chunk ---")
        print(chunks[0].page_content[:400])

        print("\n--- Sample Metadata ---")
        print(chunks[0].metadata)


