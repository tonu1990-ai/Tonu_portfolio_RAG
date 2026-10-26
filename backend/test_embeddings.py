
from fastembed import TextEmbedding

# Load our selected embedding model
model = TextEmbedding(
    model_name="BAAI/bge-small-en-v1.5"
)

# Example text from our portfolio domain
texts = [
    "Tonu worked on SAP enterprise applications.",
    "Tonu researched regional bias in pedestrian detection."
]

# Generate document embeddings
embeddings = list(model.passage_embed(texts))

print("Number of embeddings:", len(embeddings))
print("Dimension of first embedding:", len(embeddings[0]))

# Display just the first five vector values
print("First five values:", embeddings[0][:5])

# Generate an embedding for a visitor question
question = "What did Tonu research during his MSc?"

query_embedding = list(model.query_embed(question))[0]

print("Question embedding dimensions:", len(query_embedding))
