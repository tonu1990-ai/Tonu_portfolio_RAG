
import { useState } from 'react'
import { Send } from 'lucide-react'
import Markdown from 'react-markdown'


// Backend URL from the Vite environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


// Suggested questions for portfolio visitors
const SUGGESTED_QUESTIONS = [
  "What are Tonu's AI projects?",
  "What did Tonu do at SAP Labs?",
  "What was Tonu's MSc thesis about?"
]


function Chatbot({ onChatSuccess }) {

  // Current question typed by the visitor
  const [question, setQuestion] = useState('')

  // Conversation messages
  const [messages, setMessages] = useState([])

  // API loading state
  const [isLoading, setIsLoading] = useState(false)

  // Error message
  const [error, setError] = useState('')


  // Send a question to our FastAPI RAG backend
  async function sendQuestion(rawQuestion) {

    const submittedQuestion = rawQuestion.trim()

    if (!submittedQuestion || isLoading) {
      return
    }

    setIsLoading(true)
    setError('')
    setQuestion('')

    // Display the visitor's question immediately
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: 'user',
        text: submittedQuestion
      }
    ])

    try {

      if (!API_BASE_URL) {
        throw new Error('Backend URL is not configured.')
      }

      // Send POST request to FastAPI
      const response = await fetch(
        `${API_BASE_URL}/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            question: submittedQuestion
          })
        }
      )

      // Check whether the request succeeded
      if (!response.ok) {
        throw new Error(
          `Backend returned HTTP ${response.status}`
        )
      }

      // Convert the JSON response to JavaScript
      const data = await response.json()

      // Notify FloatingChatbot that the backend responded
      onChatSuccess?.()

      // Add AI response to the conversation
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: 'assistant',
          text: data.answer || 'No answer was returned.',
          sources: Array.isArray(data.retrieved_sources)
            ? data.retrieved_sources
            : []
        }
      ])

    } catch (err) {

      setError(
        `Unable to get an AI response. ${err.message}`
      )

    } finally {

      setIsLoading(false)

    }

  }


  // Handle questions submitted through the input form
  function handleSubmit(event) {

    event.preventDefault()

    sendQuestion(question)

  }


  return (

    <section
      id="ai-chatbot"
      className="portfolio-chatbot"
    >

      <div className="chatbot-container">

        {/* Chatbot introduction */}
        <div className="chatbot-heading">

          <h2>Ask My AI Assistant</h2>

          <p>
            Explore my professional experience,
            education, research and AI projects.
          </p>

        </div>


        {/* Conversation messages */}
        <div className="chatbot-messages">

          {/* Welcome screen and suggested questions */}
          {messages.length === 0 && (

            <div className="chatbot-welcome">

              <p>
                Hello! I'm Tonu's AI assistant.
              </p>

              <p>
                What would you like to know about
                his experience, research or AI projects?
              </p>

              <div className="chatbot-suggestions">

                {SUGGESTED_QUESTIONS.map((suggestion) => (

                  <button
                    key={suggestion}
                    type="button"
                    disabled={isLoading}
                    onClick={() => sendQuestion(suggestion)}
                  >
                    {suggestion}
                  </button>

                ))}

              </div>

            </div>

          )}


          {/* Display the conversation */}
          {messages.map((message, index) => (

            <div
              key={index}
              className={`chatbot-message ${message.role}`}
            >
 
          <strong>
            {message.role === 'user'
              ? 'You'
              : 'AI Assistant'}
          </strong>

          {message.role === 'assistant' ? (

            <div className="chatbot-markdown">
              <Markdown skipHtml>
                {message.text}
              </Markdown>
            </div>

          ) : (

            <p>{message.text}</p>

          )}


            </div>

          ))}


          {/* Loading notification */}
          {isLoading && (

            <p
              className="chatbot-loading"
              role="status"
            >
              Generating AI response...
            </p>

          )}

        </div>


        {/* Display API errors */}
        {error && (

          <p
            className="chatbot-error"
            role="alert"
          >
            {error}
          </p>

        )}


        {/* Question input */}
        <form
          className="chatbot-form"
          onSubmit={handleSubmit}
        >

          <label htmlFor="chatbot-question">
            Your question
          </label>

          <div className="chatbot-input-row">

            <input
              id="chatbot-question"
              type="text"
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              placeholder="Ask about my experience..."
              maxLength={500}
              disabled={isLoading}
            />


            <button
              type="submit"
              disabled={isLoading || !question.trim()}
            >

              {isLoading ? (

                'Thinking...'

              ) : (

                <>
                  <Send
                    size={16}
                    aria-hidden="true"
                  />
                  <span>Send</span>
                </>

              )}

            </button>

          </div>

        </form>

      </div>

    </section>

  )

}

export default Chatbot
