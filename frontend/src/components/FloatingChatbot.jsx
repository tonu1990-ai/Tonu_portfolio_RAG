
import { useState, useEffect } from 'react'
import Chatbot from './Chatbot.jsx'

function FloatingChatbot() {

  const [isOpen, setIsOpen] = useState(false)

  // Close chat when the visitor presses Escape
  useEffect(() => {

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }

  }, [])


  return (
    <div className="floating-chatbot">

      {/* Greeting bubble when chat is closed */}
      {!isOpen && (
        <div className="chat-greeting">
          Ask me for more details..!
        </div>
      )}

      {/* Chat panel remains mounted even when hidden */}
      <div
        id="floating-chat-panel"
        className="chat-widget-panel"
        role="region"
        aria-label="Tonu's AI Assistant"
        hidden={!isOpen}
      >

        {/* Chat window heading */}
        <div className="chat-widget-header">

          <div className="chat-widget-title">
            <img
              src="/tonu-avatar.png"
              alt=""
              className="chat-widget-header-avatar"
            />

            <div>
              <strong>Tonu's AI Assistant</strong>
              <small>Ask about Tonu's background and projects</small>
            </div>
          </div>

          <button
            type="button"
            className="chat-widget-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close chatbot"
          >
            ×
          </button>

        </div>

        {/* Reuse our existing working chatbot */}
        <Chatbot />

      </div>

      {/* Floating avatar launcher */}
      <button
        type="button"
        className="chat-avatar-launcher"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={
          isOpen ? 'Close AI assistant' : 'Open AI assistant'
        }
        aria-expanded={isOpen}
        aria-controls="floating-chat-panel"
      >

        <img
          src="/tonu-chat-avatar.png"
          alt=""
          className="chat-avatar-image"
        />

      </button>

    </div>
  )
}

export default FloatingChatbot
