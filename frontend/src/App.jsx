
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
            I am a software engineer with a background in enterprise
            application development, computer vision, and Artificial
            Intelligence. My professional experience and academic
            research have shaped my interest in building practical,
            reliable, and responsible AI systems.
          </p>

          <div className="about-grid">

            <article className="about-card">
              <h3>Professional Experience</h3>
              <p>
                Previously worked at SAP Labs India, developing and
                supporting enterprise applications, including SAP
                CRM and Multi-Bank Connectivity solutions.
              </p>
            </article>

            <article className="about-card">
              <h3>Education</h3>
              <p>
                MSc in Human-Centred Artificial Intelligence from
                Technological University Dublin, along with an
                M.Tech and B.Tech in Computer Science.
              </p>
            </article>

            <article className="about-card">
              <h3>Generative AI</h3>
              <p>
                Working with Retrieval-Augmented Generation,
                large language models, LangChain, and AI
                application development.
              </p>
            </article>

            <article className="about-card">
              <h3>Computer Vision</h3>
              <p>
                Experience with pedestrian detection research,
                object detection models, and Edge AI development
                using Raspberry Pi.
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
              title="Personal Portfolio RAG"
              description="An AI chatbot that answers questions using my personal knowledge base."
              technologies="Python, LangChain, ChromaDB, OpenAI"
            />

            <ProjectCard
              title="Edge AI Vision System"
              description="Computer vision development using Raspberry Pi and YOLO."
              technologies="Python, YOLO, GStreamer, PySide6, Docker"
            />

            <ProjectCard
              title="AI Fairness Research"
              description="Investigating regional bias in CNN-based pedestrian detection."
              technologies="Computer Vision, YOLOX, AI Fairness"
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
