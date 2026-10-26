# Face Similarity Research – Siamese Networks vs. KNN

## Project Overview

- **Research Title:** Exploring Trade-offs Between Black-Box and Glass-Box Models in Face Similarity: Siamese Networks vs. KNN
- **Researcher and Co-author:** Tonu James
- **Academic Institution:** Technological University Dublin (TU Dublin), Ireland
- **Academic Context:** MSc in Human-Centred Artificial Intelligence
- **Research Areas:** Computer Vision, Face Verification, Deep Learning, Machine Learning, Explainable AI
- **Research Type:** Academic research and comparative model evaluation
- **Publication Type:** ACM Conference Poster
- **Publication Year:** 2024

The research investigated the trade-offs between predictive accuracy and interpretability in face verification systems.

The study compared a Siamese Neural Network (SNN), representing a deep learning or black-box approach, with K-Nearest Neighbours (KNN), representing a comparatively transparent or glass-box approach.

The work also explored explainability techniques to understand which facial regions influenced model predictions.

## Research Problem and Motivation

Face verification systems determine whether two facial images belong to the same individual.

Deep learning models can achieve strong predictive performance but often provide limited explanations for their predictions.

Traditional machine learning methods such as KNN offer more transparent decision-making based on similarity to neighbouring examples, although their predictive performance and effectiveness may vary with the feature representation and data dimensionality.

The research aimed to examine these trade-offs between accuracy and interpretability in face verification.

## Dataset

- **Dataset:** Olivetti Faces Dataset
- **Application:** Face similarity and verification
- **Learning Context:** One-shot learning and similarity-based classification

The dataset was used to compare Siamese Neural Network and KNN approaches.

## Models and Techniques

### 1. Siamese Neural Network (SNN)

A Siamese Neural Network was investigated as a deep learning approach for learning similarities between pairs of facial images.

The model was considered suitable for one-shot learning because Siamese architectures can learn similarity relationships from limited examples.

The study explored:

- A custom Siamese Neural Network architecture.
- Contrastive loss for similarity-based learning.
- Transfer learning using VGG19.
- Pre-trained ImageNet weights.
- Grad-CAM for explaining model predictions.

### 2. K-Nearest Neighbours (KNN)

KNN was investigated as a traditional machine learning alternative.

KNN determines predictions using nearby examples in the feature space.

The study examined KNN's advantages in transparency and interpretability, along with challenges associated with high-dimensional facial data.

Explainability techniques included perturbation-based analysis and saliency maps.

## Experimental Results

### Model Accuracy Comparison

| Model | Reported Accuracy |
|---|---|
| Initial custom Siamese Neural Network | 49.61% |
| Siamese Network with VGG19 transfer learning | 95.4% |
| K-Nearest Neighbours (KNN) | 91.25% |

### Siamese Network Findings

The initial custom Siamese Neural Network achieved 49.61% accuracy on the Olivetti dataset.

The study reported that contrastive loss improved training.

Transfer learning was subsequently applied using VGG19 with pre-trained ImageNet weights.

The transfer-learning approach increased the reported accuracy to 95.4%, demonstrating the benefits of reusing learned visual representations.

### KNN Findings

KNN achieved 91.25% accuracy on the Olivetti dataset.

Although its reported accuracy was lower than the transfer-learning-based Siamese model, KNN provided a comparatively transparent alternative through its similarity-based decision process.

The research also noted challenges associated with high-dimensional data.

## Explainable AI and Model Interpretability

### Grad-CAM for Siamese Neural Network

Grad-CAM (Gradient-weighted Class Activation Mapping) was used to visualize important regions of facial images contributing to Siamese model predictions.

Heatmaps helped illustrate which facial features influenced verification decisions.

### Perturbation and Saliency Analysis for KNN

The research applied perturbation-based analysis and saliency maps to explore the behaviour of the KNN approach.

Perturbation analysis examined the effect of modifying image regions on predictions.

Saliency visualization helped identify facial regions that influenced model outputs.

These methods supported a comparison of predictive performance and explainability.

## Research Findings and Conclusions

The research highlighted several observations:

- Transfer learning with VGG19 substantially improved Siamese Network accuracy compared with the initial custom model.
- The Siamese model with VGG19 transfer learning achieved the highest reported accuracy of 95.4%.
- KNN achieved a competitive accuracy of 91.25% while offering comparatively transparent similarity-based decisions.
- Grad-CAM and perturbation/saliency methods provided additional insight into the models' predictions.
- Selecting a face verification approach involves considering both predictive performance and interpretability.

The research demonstrated the importance of evaluating accuracy and explainability together, particularly for facial verification applications where understanding model decisions can be important.

## Publication Details

- **Publication Title:** Exploring Trade-offs Between Black-Box and Glass-Box Models in Face Similarity: Siamese Networks vs. KNN
- **Authors:** Abhijith Jyothi Jayachandran, Tonu James, Rajesh Jaiswal, Keith Quille
- **Conference:** Human Centred Artificial Intelligence – Education and Practice (HCAIep '24)
- **Publisher:** Association for Computing Machinery (ACM)
- **Publication Type:** Conference poster, one page
- **Conference Location:** Naples, Italy
- **Conference Dates:** December 2–3, 2024
- **Publication Date:** December 2, 2024
- **Proceedings Page:** 62
- **DOI:** 10.1145/3701268.3701284
- **Official Publication Link:** https://doi.org/10.1145/3701268.3701284

The poster was published in the ACM conference proceedings and is accessible through the ACM Digital Library.

Tonu James is one of the four listed authors.

## Relevance to AI Engineering

This research contributes to Tonu's academic experience in:

- Computer Vision and facial image analysis.
- Siamese Neural Networks and similarity learning.
- Transfer learning using pre-trained deep learning models.
- Traditional machine learning model comparison.
- Explainable AI using Grad-CAM, perturbation, and saliency approaches.
- Evaluating accuracy and interpretability trade-offs.

The project complements Tonu's academic background in Human-Centred Artificial Intelligence and his interest in developing reliable and interpretable AI systems.