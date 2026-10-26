
import { useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function Chatbot() {

  // Store the visitor's current question
  const [question, setQuestion] = useState('')

  // Store the visible conversation
  const [messages, setMessages] = useState([])

  // Track whether the backend is processing a request
  const [isLoading, setIsLoading] = useState(false)

  // Store errors
  const [error, setError] = useState('')


  async function handleSubmit(event) {

    event.preventDefault()

    const submittedQuestion = question.trim()

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

        <div className="chatbot-messages">

          {messages.length === 0 && (
            <div className="chatbot-welcome">
              <p>
                Hello! I'm an AI assistant for
                Tonu James's portfolio.
              </p>

              <p>
                Ask me about his work, skills,
                academic research or projects.
              </p>
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
