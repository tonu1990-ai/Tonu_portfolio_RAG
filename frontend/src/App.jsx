
import './App.css'
import Navbar from './components/Navbar.jsx'
import ProjectCard from './components/ProjectCard.jsx'
import ContactForm from './components/ContactForm.jsx'
import FloatingChatbot from './components/FloatingChatbot.jsx'

 

function App() {
  return (
    <div>

      <Navbar name="Tonu James " />

      <main> 
        
        <section id="home" className="hero">

          <div className="hero-layout">

            {/* LEFT SIDE: Existing introduction */}
            <div className="hero-intro">

              <h1>Hi, I'm Tonu James</h1>

              <h2>Building intelligent systems with AI</h2>

              <p>
                Explore my work in Generative AI,
                Computer Vision and Enterprise AI.
              </p>

              <div className="hero-buttons">
                <a href="#projects">
                  Explore My Projects
                </a>

                <a href="#contact">
                  Contact Me
                </a>
              </div>

            </div>

            {/* RIGHT SIDE: Professional photograph */}
            <div className="hero-photo">

              <img
                src="/tonu-profile.png"
                alt="Portrait of Tonu James"
              />

            </div>

          </div>

        </section>


        <section id="about" className="about-section">

          <h2>About Me</h2>

          <p className="about-intro">
          I am a software engineer with nearly nine years of experience in enterprise application development 
          and an MSc in Human-Centred Artificial Intelligence from Technological University Dublin. 
          My background combines professional software engineering with applied AI research and 
          hands-on development in generative AI, computer vision, and Edge AI. 
          I focus on building practical, reliable, and responsible AI solutions for real-world applications.
    
          </p>

          <div className="about-grid">

            <article className="about-card">
              <h3>Professional Experience</h3>
              <p>
              Nearly nine years of professional software engineering experience, including enterprise application development at SAP Labs India. 
              Worked on SAP CRM and Multi-Bank Connectivity solutions, involving application development, integration, debugging, defect resolution, technical support, and collaborative problem-solving.
              </p>
            </article>

            <article className="about-card">
              <h3>Education</h3>
              <p>
              MSc in Human-Centred Artificial Intelligence from Technological University Dublin, 
              Master of Technology (M.Tech) in Computer Science with Image Processing, 
              and Bachelor of Technology (B.Tech) in Computer Science and Engineering.
              </p>
            </article>

            <article className="about-card">
              <h3>Generative AI</h3>
              <p>
              Hands-on experience developing and deploying Retrieval-Augmented Generation applications using document embeddings, semantic search, vector databases, and LLM APIs. 
              Built a live AI-powered portfolio chatbot integrating FastEmbed, ChromaDB, Groq, FastAPI, and React.
              </p>
            </article>

            <article className="about-card">
              <h3>Computer Vision</h3>
              <p>
              Applied computer vision and deep learning through pedestrian detection fairness research, face similarity analysis, and YOLO-based object detection. 
              Developed a Raspberry Pi Edge AI application and worked on reusable model and application delivery workflows using Docker and automated deployment techniques.
              </p>
            </article>

          </div>

          <div className="resume-actions">

            <a
              href="/TonuJames_AI_Engineer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-view"
            >
              View Resume
            </a>

            <a
              href="/TonuJames_AI_Engineer_Resume.pdf"
              download="TonuJames_AI_Engineer_Resume.pdf"
              className="resume-download"
            >
              Download Resume
            </a>

          </div>


        </section>

        <section id="projects">
          <h2>My Works</h2>
          <div className="projects-grid">
          
          <ProjectCard
            title="Personal Portfolio RAG Chatbot"
            description="Designed and deployed a full-stack RAG chatbot that answers questions using a structured knowledge base. Implemented document chunking, semantic embeddings, ChromaDB retrieval, and Groq-powered LLM responses, with React on Vercel and FastAPI on Render."
            technologies="React, FastAPI, Python, FastEmbed, ChromaDB, Groq, Vercel, Render"
            links={[
            {
              label: "GitHub Repository",
              href: "https://github.com/tonu1990/Tonu_portfolio_RAG",
              type: "github"
            }
      ]}
            
          />
          

          <ProjectCard
            title="Reusable Edge AI Model & Application Delivery"
            description="Developed a reusable GitHub Actions pipeline for independently deploying versioned ONNX models and Dockerised applications to Raspberry Pi 5 using self-hosted runners. Demonstrated the pipeline through a GStreamer/PySide6 application integrating YOLO object detection and camera streaming."
            technologies="GitHub Actions, Docker, GHCR, Raspberry Pi 5, ONNX, GStreamer, PySide6, YOLO"
            links={[
            {
              label: "Delivery Pipeline",
              href: "https://github.com/tonu1990/Pi5_App_Model_CD_pipeline",
              type: "github"
            },
            {
              label: "GStreamer / YOLO App",
              href: "https://github.com/tonu1990/Gstreamer_Demo",
              type: "github"
            }
          ]}
          
          />

          <ProjectCard
            title="AI Fairness in Pedestrian Detection"
            description="MSc research investigating regional bias in CNN-based pedestrian detection across European and Indian environments. Compared detection performance under different geographical conditions to examine model generalisation and fairness."
            technologies="Python, Deep Learning, YOLOX, Computer Vision, AI Fairness"

            links={[
              {
                label: "View Research Report",
                href: "/reports/pedestrian-detection-bias.pdf",
                type: "report"
              }
            ]}

          />

          {/* Project 4: Face Similarity & Verification */}

          <ProjectCard
            title="Face Similarity & Verification"
            description="Compared Siamese neural networks, VGG19 transfer learning, and K-Nearest Neighbours for face similarity and verification using the Olivetti Faces dataset. Evaluated predictive performance and model explainability using Grad-CAM and saliency analysis. Presented the research as an ACM conference poster."
            technologies="Python, Siamese Networks, VGG19, Transfer Learning, KNN, Grad-CAM"

            links={[
              {
                label: "View Project Report",
                href: "/reports/face-similarity-verification.pdf",
                type: "report"
              },
              {
                label: "ACM Publication",
                href: "https://doi.org/10.1145/3701268.3701284",
                type: "publication"
              }
            ]}

          />


          {/* Project 5: Pedestrian Footfall Forecasting */}

          <ProjectCard
            title="Pedestrian Footfall Time-Series Forecasting"
            description="Analysed Dublin City Council pedestrian footfall sensor data, including data cleaning, missing-value handling, and daily time-series preparation. Compared Holt-Winters, SARIMA, and Prophet forecasting approaches to evaluate pedestrian footfall trends and predictive performance."
            technologies="Python, Time-Series Analysis, Data Preprocessing, Holt-Winters, SARIMA, Prophet"

            links={[
              {
                label: "View Research Report",
                href: "/reports/pedestrian-footfall-forecasting.pdf",
                type: "report"
              }
            ]}

          />
          </div>
        </section>

        <section id="contact" className="contact-section">

          <h2>Get in Touch</h2>

          <p className="contact-intro">
            Interested in discussing AI engineering opportunities,
            collaborating on projects, or learning more about my work?
            Feel free to connect.
          </p>

          <div className="contact-links">

            <a
              href="https://www.linkedin.com/in/tonu-james"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <h3>LinkedIn</h3>
              <p>Connect with me professionally</p>
            </a>

            <a
              href="https://github.com/tonu1990"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <h3>GitHub</h3>
              <p>Explore my projects and source code</p>
            </a>

          </div>
          
          <ContactForm />

        </section>


     <FloatingChatbot />
      </main>

    </div>
  )
}

export default App
