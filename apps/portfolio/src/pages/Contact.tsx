import { useState } from 'react'
import { Card, Button, Input } from '@adventuringghost/ui'
import { SEO } from '../components/SEO'
import { SocialLinks } from '../components/SocialLinks'
import { sendContactEmail } from '../services/emailService'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const success = await sendContactEmail(formData)
      
      if (success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <SEO 
        title="Contact - Adventuring Ghost"
        description="Get in touch with me for new opportunities, collaborations, or just a friendly chat about technology."
        keywords="contact, hire, collaboration, full-stack developer, opportunities"
      />
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            I'm always interested in new opportunities, collaborations, or just a friendly chat about technology.
          </p>
        </div>

        {/* Follow Me Section - Top of Page */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
              <p className="text-gray-600 mb-4">
                These are my social media accounts. Feel free to connect with me!
              </p>
              <div className="flex justify-center">
                <SocialLinks size="lg" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
              <Input
                label="Subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunrise-cyan focus:border-transparent resize-none"
                  rows={5}
                  placeholder="Tell me about your project or just say hello!"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-green-800 font-medium">Message sent successfully!</p>
                  </div>
                  <p className="text-green-700 text-sm mt-1">I'll get back to you within 24 hours.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-800 font-medium">Failed to send message</p>
                  </div>
                  <p className="text-red-700 text-sm mt-1">Please try again or email me directly at adventuringghost@gmail.com</p>
                </div>
              )}
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">

            <Card>
              <h3 className="text-xl font-semibold mb-4 text-sunrise-cyan">Let's Connect</h3>
              
              {/* Preferred Method */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Preferred Method</p>
                    <p className="text-blue-700 text-sm">LinkedIn for professional inquiries</p>
                  </div>
                </div>
                <a
                  href="https://ca.linkedin.com/in/kitkat-schlosser-571203168"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-sunrise-cyan/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-sunrise-cyan" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">hello@adventuringghost.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-sunrise-orange/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-sunrise-orange" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-gray-600">Usually within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-sunrise-pink/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-sunrise-pink" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">Remote / Worldwide</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold mb-4 text-sunrise-yellow">What I'm Looking For</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Full-stack development opportunities</li>
                <li>• Frontend architecture consulting</li>
                <li>• Open source collaborations</li>
                <li>• Technical writing and tutorials</li>
                <li>• Mentoring and code reviews</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
