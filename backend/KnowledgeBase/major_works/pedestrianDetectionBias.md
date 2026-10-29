# MSc Thesis: Fairness in Pedestrian Detection Using YOLOX

## Project identity
- Researcher: Tonu James.
- Thesis title shown on submitted report: **Fairness in Pedestrian Detection: A Comparative Study of Regional and Demographic Bias Using YOLOX**.
- Alternate short description previously used in portfolio: Investigating Regional Bias in CNN-based Pedestrian Detection: Europe vs India.
- Academic context: Master of Science in Human-Centred Artificial Intelligence, Technological University Dublin (TU Dublin), Ireland; thesis dated January 2025, MSc completed in 2025.
- Thesis supervisor: Dr Abdelsalam Busalim, TU Dublin.
- Listed industry partner: Dr Chiara Marullo, ICAR-CNR.
- Areas: Computer vision, YOLOX object detection, fairness, model evaluation, dataset curation and statistical analysis.
- Status: Completed academic MSc thesis, **not** a commercially deployed autonomous-driving application.

## Research questions
1. How does a pretrained YOLOX model perform when detecting pedestrians in Indian street-scene data compared with a European comparison dataset?
2. Does the evaluated model show different miss rates among visually annotated pedestrian subgroups (male, female and child) within and across those datasets?

## Data preparation and original dataset work
Tonu examined public street-scene datasets and identified limitations in their suitability for evaluating Indian pedestrian detection. The study used European comparison images from CityPersons and BDD100k and Indian-region source material including IDD, IRUVD and rsuD20k; the latter includes road scenes from Bangladesh and was treated as regionally relevant but is not an exclusively Indian source.

To supplement the available Indian-condition data, Tonu curated imagery from publicly available road-travel videos and manually annotated pedestrians using LabelImg. The final Indian-condition research dataset combined filtered source images and additional extracted frames.

**Recorded dataset figures:**
- Final Indian-condition dataset: **2,173 images**.
- Initial annotation work: **7,192 pedestrian bounding boxes** before final filtering.
- Final evaluated Indian-condition annotations: **5,416 pedestrian bounding boxes** after filtering, including removal of bounding boxes below 50 pixels in height.
- European comparison dataset: **3,129 images** and **9,082 pedestrian bounding boxes**.
- For subgroup comparison, visible individuals were annotated as male, female, or child where possible; indistinct cases were not assigned a subgroup. These are image-based research labels, not verified personal demographic identities.

The work involved dataset filtering, quality review, XML/JSON-related annotation handling, bounding-box preparation and consistency checks. The thesis describes making the Indian dataset public as a future direction, **not as a verified completed public release**.

## Model and evaluation method
- Evaluated a **pretrained YOLOX** object detection model; the core thesis was an evaluation of model fairness and generalisation, **not** a report of having trained YOLOX from scratch or fine-tuned it to deploy in production.
- Matched predicted and ground-truth boxes using **Intersection over Union (IoU)**, with IoU above 0.50 considered a successful match in the reported method.
- Calculated true positives and false negatives and defined **miss rate = FN / (TP + FN)**.
- Compared miss rates across regional datasets and visually labelled subgroups.
- Used **two-proportion z-tests** with a 0.05 significance threshold to investigate whether observed differences in miss proportions were statistically significant.

## Main reported results
- Indian-condition dataset: **3,885 true positives** and **1,531 false negatives**, giving a **28.27% pedestrian miss rate**.
- European comparison dataset: **8,486 true positives** and **596 false negatives**, giving a **6.56% pedestrian miss rate**.
- The reported regional miss-rate difference was statistically significant in the thesis's two-proportion test.
- The subgroup analysis reported gender-related disparity in the Indian-condition dataset and age/child-related disparity in the European dataset.

## Interpretation and limitations
The findings show that **this particular pretrained YOLOX model**, evaluated using the selected research datasets, missed proportionally more pedestrians in the Indian-condition comparison. This is evidence of a disparity in the tested setting. It does **not** establish that all YOLO versions, all pedestrian detectors, or every Indian road environment behave in the same way. Differences in dataset composition, camera position, occlusion and scene complexity may contribute to the observed gap.

The study evaluated one main detector rather than multiple independently trained models. Dataset quality and subgroup labels also limit how broadly findings can be generalised. No validated bias-mitigation model or deployed autonomous-driving product was reported as a completed outcome.

## Practical relevance
This thesis demonstrates hands-on dataset development, computer-vision evaluation, bounding-box matching, statistical comparison, experimental reporting and consideration of fairness, reliability and responsible AI.
