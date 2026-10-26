
from retriever import search_knowledge_base


def prepare_rag_context(question, top_k=5):

    # Step 1: Retrieve relevant chunks
    results = search_knowledge_base(
        question,
        top_k=top_k
    )

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]

    context_parts = []
    sources = []

    # Step 2: Prepare readable context
    for i, (document, metadata) in enumerate(
        zip(documents, metadatas)
    ):

        source = metadata["source"]

        # Use available Markdown headings
        heading = metadata.get(
            "heading_2",
            metadata.get("heading_1", "")
        )

        context_part = (
            f"[Context {i + 1}]\n"
            f"Source: {source}\n"
            f"Heading: {heading}\n"
            f"Content:\n{document}"
        )

        context_parts.append(context_part)

        # Keep unique source filenames
        if source not in sources:
            sources.append(source)

    # Step 3: Combine all retrieved chunks
    context = "\n\n---\n\n".join(context_parts)

    return {
        "context": context,
        "sources": sources
    }


if __name__ == "__main__":

    question = "What was Tonu's MSc thesis about?"

    result = prepare_rag_context(question)

    print("\nQUESTION:")
    print(question)

    print("\nRETRIEVED CONTEXT:")
    print(result["context"])

    print("\nSOURCES:")
    for source in result["sources"]:
        print(source)
