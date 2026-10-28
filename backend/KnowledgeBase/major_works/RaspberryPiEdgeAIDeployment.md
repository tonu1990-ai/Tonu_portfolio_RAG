# Raspberry Pi 5 Edge AI: Reusable Model/App Delivery Framework and YOLO GUI Application

## Project identity and links
- Developer: Tonu James.
- Hardware: **Raspberry Pi 5, 8 GB**.
- Project status: **Working hands-on implementation** of a reusable deployment framework and a Dockerised object-detection GUI application deployed on the Pi.
- Deployment-framework source: https://github.com/tonu1990/Pi5_App_Model_CD_pipeline
- GStreamer / PySide6 / YOLO application source: https://github.com/tonu1990/Gstreamer_Demo
- Technologies: GitHub Actions, self-hosted runner, Docker, GitHub Container Registry (GHCR), ONNX, ONNX Runtime, Python, GStreamer, PySide6/Qt, Linux and YOLO.

## Main engineering objective
Tonu first created a **reusable continuous delivery framework** for independently deploying an AI model and the application that consumes it to Raspberry Pi hardware. He subsequently used the framework to deliver a practical Dockerised GStreamer/PySide6/YOLO object-detection desktop application.

The reusable framework is the main platform-engineering contribution; the YOLO app demonstrates the framework in use. The framework is not tied exclusively to one YOLO model or one GUI.

## Architecture: two independent delivery lanes
### Model CD lane
- Runs through GitHub Actions using a **self-hosted runner installed on the Raspberry Pi**.
- Retrieves a prepared **ONNX model artifact** from a GitHub Release or designated repository location, along with optional class-label metadata.
- Generates a **SHA-256 checksum and deployment manifest** and verifies model integrity at deployment.
- Performs idempotency and available-space checks and stores versioned model files on the Pi.
- Maintains a `current.onnx` symlink for the active version and a `previous.onnx` reference for manual rollback support, along with deployment logs and a limited retention policy.
- Provides model updates independently of the application container. This lane **deploys a prebuilt model**; it does not claim to perform automated model training or benchmarking.

### Application CD lane
- Targets Docker application images published to **GitHub Container Registry (GHCR)**; the workflow then pulls and deploys the selected image on the Pi.
- Includes **GUI** and **web application** delivery workflow options in the reusable template.
- The GUI lane installs an application launcher and desktop/menu entry, configures camera/display access, and mounts the externally deployed model directory into the container as read-only.
- The application can load its active ONNX file through a path such as `MODEL_PATH=/models/current.onnx`.
- The web lane is a **framework capability**, not a claim that the YOLO demonstration was a separately completed web application.
- The documentation treats building/publishing the Docker image as a prerequisite; the CD workflow focuses on **delivery and deployment**, not automated training plus build plus release from scratch.

## Demonstration: GStreamer, PySide6 and YOLO GUI
- Developed a Python desktop GUI using **PySide6** to start/stop camera preview and object detection.
- Used **GStreamer** and a USB camera to capture video and feed preview/inference processing.
- Used a video pipeline with separate preview and AI-processing paths, integrating video frames into the application logic.
- Integrated **YOLO inference** through **ONNX Runtime** to detect objects and display detection information in the GUI.
- Containerised the application using **Docker**, including the GUI, video-processing dependencies and access to Raspberry Pi display/camera resources.
- Deployed the image to the Pi using the **GUI Application CD** lane, while delivering the ONNX model through **Model CD**.

## Why model and app separation matters
The application is packaged separately from the ONNX model. A new model artifact can be delivered and activated without rebuilding the application image, while changes to the GUI or Python logic can be deployed independently. Model version references, integrity checks and logs support traceability during iteration.

## Engineering challenges handled
- Integrating camera/video processing with an event-driven Qt desktop GUI.
- Managing display-system and camera-device permissions from a Docker container.
- Running software dependencies for GStreamer, Python and PySide6 on ARM64 Linux.
- Coordinating GitHub-hosted workflows with a self-hosted runner and device-specific paths.

## Scope and limitations
- This is a working **personal Edge AI implementation**, not a deployed industrial safety-monitoring or factory-inspection product.
- No verified FPS, inference latency, resource benchmark, model accuracy figure or automated failover metric is provided for this implementation; none should be invented.
- The framework includes **rollback support** through version references, not a verified automatic error-triggered rollback controller.
- Industrial PPE detection, workplace safety monitoring and manufacturing visual inspection are **future potential applications**, not completed product deployments.

## Relevance to applied AI engineering
This project demonstrates reusable delivery architecture, model lifecycle handling, GitHub Actions automation, containerisation, external model integration, computer vision, desktop UI integration and hardware-oriented debugging.
