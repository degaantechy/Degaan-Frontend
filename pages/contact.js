import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/`, data)
      toast.success('Message sent! We will contact you soon.')
      router.push('/')
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
      console.error('Form error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Contact Us | Degaan Real Estate</title>
        <meta name="description" content="Get in touch with our team for any inquiries" />
      </Head>

      <div className="container">
        <h1>Contact Us</h1>

        <div className="contact-section">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="info-item">
              <h4>Location</h4>
              <p>Burjomar, Hargeisa, Somaliland</p>
            </div>
            <div className="info-item">
              <h4>Phone</h4>
              <p>+252 638 888 250</p>
            </div>
            <div className="info-item">
              <h4>Email</h4>
              <p>info@degaanrealestate.com</p>
            </div>
            <div className="info-item">
              <h4>WhatsApp</h4>
              <a href="https://wa.link/9pfqyn" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <ContactForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </>
  )
}
