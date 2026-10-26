
import { useState } from 'react'


function ContactForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)



async function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {}

    // Validate name
    if (name.trim() === '') {
        newErrors.name = 'Please enter your name.'
    }

    // Validate email
    if (email.trim() === '') {
        newErrors.email = 'Please enter your email address.'
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailPattern.test(email.trim())) {
        newErrors.email = 'Please enter a valid email address.'
        }
    }

  // Validate message
  if (message.trim() === '') {
    newErrors.message = 'Please enter a message.'
  }

  // Store errors in React state
  setErrors(newErrors)

  // Check whether any errors exist
  if (Object.keys(newErrors).length > 0) {
    return
  }
  
  if (isSubmitting) {
  return
}

setIsSubmitting(true)
  
    try {
      const response = await fetch('https://formspree.io/f/mdeeaqwb', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },

        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim()
        })
      })

      if (response.ok) {
        alert('Your message was submitted successfully!')
      } else {
        alert('Unable to send your message. Please try again.')
      }

    } catch (error) {
      console.error('Message submission failed:', error)
      alert('A network error occurred. Please try again.')
    }
    finally {
  setIsSubmitting(false)
}

}

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>

      <h3>Send Me a Message</h3>

      <div>
        <label htmlFor="contact-name">Your Name</label>
        <input
          type="text"
          id="contact-name"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}

        />

        {errors.name && (
            <p className="field-error" id="name-error" role="alert">
            {errors.name}
            </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email">Your Email</label>
        <input
          type="email"
          id="contact-email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
          {errors.email && (
            <p className="field-error" id="email-error" role="alert">
            {errors.email}
            </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message">Your Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="5"
          placeholder="Write your message here..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
            <p className="field-error" id="message-error" role="alert">
            {errors.message}
            </p>
        )}
      </div>

 
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Sending...' : 'Send Message'}
  </button>

    </form>
  )
}

export default ContactForm
