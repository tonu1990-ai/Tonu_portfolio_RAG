
import { useState, useEffect } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const SUGGESTED_QUESTIONS = [
  "What are Tonu's AI projects areas?",
  "What is Tonu's educational backround?",
  "What about Tonu's professional career?"
]

function Chatbot() {

  // Store the visitor's current question
  const [question, setQuestion] = useState('')

  // Store the visible conversation
  const [messages, setMessages] = useState([])

  // Track whether the backend is processing a request
  const [isLoading, setIsLoading] = useState(false)

  // Store errors
  const [error, setError] = useState('')

  const [backendStatus, setBackendStatus] = useState('checking')


  // Wake up the Render backend when the page loads
  useEffect(() => {

    const controller = new AbortController()

    async function wakeUpBackend() {

      if (!API_BASE_URL) {
        setBackendStatus('offline')
        return
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/health`,
          {
            signal: controller.signal
          }
        )

        if (!response.ok) {
          throw new Error('Backend health check failed')
        }

        setBackendStatus('online')

      } catch (error) {

        // Ignore requests cancelled during component cleanup
        if (error.name !== 'AbortError') {
          setBackendStatus('offline')
        }

      }
    }

    wakeUpBackend()

    // Cancel the request if the component unmounts
    return () => controller.abort()

  }, [])



  async function sendQuestion(rawQuestion) {

    const submittedQuestion = rawQuestion.trim()

    if (!submittedQuestion || isLoading) {
      return
    }

    setIsLoading(true)
    setError('')
    setQuestion('')

    // Immediately show the visitor's question
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

      // Send the question to FastAPI
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

      if (!response.ok) {
        throw new Error(
          `Backend returned HTTP ${response.status}`
        )
      }

      // Convert JSON response into a JavaScript object
      const data = await response.json()
      setBackendStatus('online')

      // Add the AI response to the conversation
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

  function handleSubmit(event) {
  event.preventDefault()
  sendQuestion(question)
  }

  return (
    <section id="ai-chatbot" className="portfolio-chatbot">

      <div className="chatbot-container">

        <div className="chatbot-heading">
          <h2>Ask My AI Assistant</h2>
          <p>
            Explore my professional experience,
            education, research and AI projects.
          </p>
        </div>


        <p
          className={`chatbot-backend-status ${backendStatus}`}
          role="status"
        >
          {backendStatus === 'checking' &&
            'Connecting to AI server... This may take a minute after inactivity.'}

          {backendStatus === 'online' &&
            'AI server connected'}

          {backendStatus === 'offline' &&
            'Unable to reach the AI server yet. You can still try asking a question.'}
        </p>


        <div className="chatbot-messages">

 
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

              <p>{message.text}</p>

              {message.sources?.length > 0 && (
                <div className="chatbot-sources">

                  <strong>Retrieved source files:</strong>

                  <ul>
                    {message.sources.map((source) => (
                      <li key={source}>{source}</li>
                    ))}
                  </ul>

                </div>
              )}

            </div>
          ))}

          {isLoading && (
            <p className="chatbot-loading" role="status">
              Generating AI response...
            </p>
          )}

        </div>

        {error && (
          <p className="chatbot-error" role="alert">
            {error}
          </p>
        )}

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
              {isLoading ? 'Thinking...' : 'Send'}
            </button>

          </div>

        </form>

      </div>

    </section>
  )
}

export default Chatbot
