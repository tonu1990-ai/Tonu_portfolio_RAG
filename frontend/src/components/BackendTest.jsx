
import { useState } from 'react'

function BackendTest() {

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (!question.trim()) {
      setStatus('Please enter a question.')
      return
    }

    setIsLoading(true)
    setStatus('Sending request...')
    setAnswer('')

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/chat-test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            question: question.trim()
          })
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      const data = await response.json()

      setAnswer(data.answer)
      setStatus('Response received successfully!')

    } catch (error) {
      setStatus('Request failed: ' + error.message)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="backend-test">

      <h2>Frontend - Backend API Test</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="test-question">
          Enter a question:
        </label>

        <input
          id="test-question"
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask a question"
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send to FastAPI'}
        </button>
      </form>

      <p role="status">{status}</p>

      {answer && (
        <p>
          <strong>Backend Answer:</strong> {answer}
        </p>
      )}

    </section>
  )
}

export default BackendTest
