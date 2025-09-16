import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogUrl?: string
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Adventuring Ghost - Full-Stack Developer',
  description = 'Full-stack developer crafting digital experiences with modern technologies. Exploring the intersection of code, design, and user experience.',
  keywords = 'full-stack developer, react, typescript, web development, portfolio',
  ogImage = '/og-image.jpg',
  ogUrl
}) => {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', description)

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.setAttribute('name', 'keywords')
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute('content', keywords)

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`)
      if (!ogTag) {
        ogTag = document.createElement('meta')
        ogTag.setAttribute('property', property)
        document.head.appendChild(ogTag)
      }
      ogTag.setAttribute('content', content)
    }

    updateOGTag('og:title', title)
    updateOGTag('og:description', description)
    updateOGTag('og:image', ogImage)
    if (ogUrl) {
      updateOGTag('og:url', ogUrl)
    }
    updateOGTag('og:type', 'website')

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`)
      if (!twitterTag) {
        twitterTag = document.createElement('meta')
        twitterTag.setAttribute('name', name)
        document.head.appendChild(twitterTag)
      }
      twitterTag.setAttribute('content', content)
    }

    updateTwitterTag('twitter:card', 'summary_large_image')
    updateTwitterTag('twitter:title', title)
    updateTwitterTag('twitter:description', description)
    updateTwitterTag('twitter:image', ogImage)
  }, [title, description, keywords, ogImage, ogUrl])

  return null
}
