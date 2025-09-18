import emailjs from '@emailjs/browser'

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_portfolio' // You'll need to create this in EmailJS
const EMAILJS_TEMPLATE_ID = 'template_contact' // You'll need to create this in EmailJS
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY' // You'll get this from EmailJS

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'adventuringghost@gmail.com'
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )

    console.log('Email sent successfully:', response)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}


