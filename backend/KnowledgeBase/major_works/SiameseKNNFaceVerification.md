# Face Similarity Research: Siamese Networks, KNN, Transfer Learning and Explainable AI

## Project identity and publication
- Researcher and contributor: Tonu James; he contributed across the research work.
- Academic context: Master of Science in Human-Centred Artificial Intelligence, Technological University Dublin (TU Dublin), Ireland.
- Research topic: Face similarity / face verification using a deep-learning Siamese network and a traditional K-Nearest Neighbours (KNN) comparison.
- Academic report title: A Comparative study of Black Box vs White Box models for Facial Recognition: Siamese Network and KNN.
- ACM poster title: Exploring Trade-offs Between Black-Box and Glass-Box Models in Face Similarity: Siamese Networks vs. KNN.
- ACM publication: Human Centred Artificial Intelligence – Education and Practice (HCAIep '24), Naples, Italy, 2–3 December 2024.
- Published authors: Abhijith Jyothi Jayachandran, Tonu James, Rajesh Jaiswal and Keith Quille.
- Publication format: One-page ACM conference poster, 2024.
- DOI and official publication: https://doi.org/10.1145/3701268.3701284

## Research problem
The study examined trade-offs between predictive performance and explainability when comparing face images. A Siamese neural network learns a representation suitable for comparing image pairs; KNN uses a more directly inspectable nearest-neighbour decision rule. The study investigated whether transfer learning could improve a custom Siamese model and explored visual explanations for model predictions.

## Dataset and preparation
- **Dataset:** Olivetti Faces, containing 400 grayscale images from 40 people, with 10 images per person.
- **Siamese learning:** Generated positive (same person) and negative (different people) image pairs.
- **VGG19 input:** Converted grayscale images to three channels for compatibility with the pretrained convolutional backbone.
- **KNN baseline:** Used a nearest-neighbour classifier (K=1 in the academic report) on the same face-image dataset.
- **Data limits:** The dataset is small and has limited demographic and imaging diversity. The research did not establish performance on real-world face verification deployments.

## Models implemented and compared
### Custom Siamese convolutional network
The initial Siamese architecture used a custom convolutional feature extractor and a distance-based comparison between paired image representations. The coursework report describes a model trained with binary cross-entropy for this version.

### Siamese network with VGG19 transfer learning
To address the custom network's low accuracy, the research used VGG19 pretrained on ImageNet as the feature-extraction backbone with additional task-specific layers. The published ACM poster also discusses contrastive-loss improvements; the coursework report and poster do not give identical descriptions of every training configuration.

### K-Nearest Neighbours
KNN was used as the comparatively transparent traditional machine-learning alternative. Its decisions depend on distances to reference examples, but that does not by itself eliminate model bias or guarantee good explanations.

## Reported experimental results
- Initial custom Siamese network: **49.61% accuracy**.
- VGG19-based Siamese network: **95.4% accuracy** in the ACM poster (approximately 95% in the coursework report).
- KNN baseline: **91.25% accuracy**.
- The academic report also lists KNN precision of **0.93**, recall of **0.91**, and F1-score of **0.90**.
- VGG19 transfer learning substantially improved the reported Siamese result over the original custom backbone.

**Comparison caveat:** The Siamese approach makes pair-based similarity predictions while the KNN experiment performs identity classification. The reported accuracies come from related experiments but should not be represented as an identical-task, fully controlled benchmark.

## Explainable AI methods
- **Grad-CAM:** Applied to the VGG19 Siamese approach to visualise regions influencing image-pair comparisons.
- **Perturbation-based saliency maps:** Applied to KNN predictions by measuring responses to changes in image pixels.
- **LIME:** Explored in the report but the attempted implementation encountered an error; it was **not** a completed, validated result.

## Key findings and contribution
The study demonstrated why pretrained visual representations may help with limited data, highlighted differences between a deep similarity-learning approach and nearest-neighbour classification, and applied explainability methods to inspect predictions. Tonu contributed to the broader research, including comparative modelling and analysis. The ACM poster has multiple named authors and should retain the correct publication attribution.

## Related expertise
Computer vision; machine learning; deep learning; Siamese neural networks; few-shot and similarity learning; VGG19 transfer learning; KNN; model evaluation; Grad-CAM; saliency maps; responsible AI.
