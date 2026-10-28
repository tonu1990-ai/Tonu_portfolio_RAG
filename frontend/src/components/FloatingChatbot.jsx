
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Chatbot from './Chatbot.jsx'


// Backend URL configured through Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


function FloatingChatbot() {

  // Control whether the chatbot window is open
  const [isOpen, setIsOpen] = useState(false)

  // Track the Render backend connection status
  const [backendStatus, setBackendStatus] = useState('checking')


  // ==========================================
  // 1. Close chatbot using the Escape key
  // ==========================================

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


  // ==========================================
  // 2. Wake up Render when the webpage loads
  // ==========================================

  useEffect(() => {

    const controller = new AbortController()

    async function checkBackend() {

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

        if (!controller.signal.aborted) {
          setBackendStatus('online')
        }

      } catch (error) {

        if (!controller.signal.aborted) {
          setBackendStatus('offline')
        }

      }

    }

    checkBackend()

    // Cancel pending health check during cleanup
    return () => controller.abort()

  }, [])


  // ==========================================
  // 3. Display the floating chatbot
  // ==========================================

  return (

    <div className="floating-chatbot">

      {/* Greeting bubble when chat is closed */}
      {!isOpen && (

        <div className="chat-greeting">
          Ask me for more details..!
        </div>

      )}


      {/* Chat panel stays mounted when hidden */}
      <div
        id="floating-chat-panel"
        className="chat-widget-panel"
        role="region"
        aria-label="Tonu's AI Assistant"
        hidden={!isOpen}
      >

        {/* Chatbot header */}
        <div className="chat-widget-header">

          <div className="chat-widget-title">

            {/* Header avatar */}
            <img
              src="/tonu-avatar.png"
              alt=""
              className="chat-widget-header-avatar"
            />

            <div>

              <strong>Tonu's AI Assistant</strong>

              {/* Compact server connection indicator */}
              <div
                className={`chat-widget-connection ${backendStatus}`}
                role="status"
              >

                <span
                  className="chat-widget-dot"
                  aria-hidden="true"
                ></span>

                {backendStatus === 'checking' &&
                  'Connecting...'}

                {backendStatus === 'online' &&
                  'Server connected'}

                {backendStatus === 'offline' &&
                  'Server unavailable'}

              </div>

            </div>

          </div>


          {/* Close button using Lucide icon */}
          <button
            type="button"
            className="chat-widget-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close chatbot"
          >

            <X
              size={20}
              aria-hidden="true"
            />

          </button>

        </div>


        {/* Existing RAG chatbot component */}
        <Chatbot
          onChatSuccess={() => setBackendStatus('online')}
        />

      </div>


      {/* ==================================
          Floating chatbot avatar button
          ================================== */}

      <button
        type="button"
        className="chat-avatar-launcher"
        onClick={() => setIsOpen(previous => !previous)}
        aria-label={
          isOpen
            ? 'Close AI assistant'
            : 'Open AI assistant'
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
