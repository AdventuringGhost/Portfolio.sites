import { Link } from 'react-router-dom'
import { SocialLinks } from './SocialLinks'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-sunrise-cyan mb-4">
              Adventuring Ghost
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Full-stack developer crafting digital experiences with modern technologies. 
              Exploring the intersection of code, design, and user experience.
            </p>
            <SocialLinks className="text-gray-400" size="md" />
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-sunrise-yellow">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-sunrise-cyan transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-sunrise-cyan transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/notes" className="text-gray-300 hover:text-sunrise-cyan transition-colors">
                  Notes
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-sunrise-cyan transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a 
                  href="https://glow-grove.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-sunrise-orange transition-colors"
                >
                  Glow Grove ↗
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-sunrise-yellow">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>hello@adventuringghost.com</li>
              <li>Remote / Worldwide</li>
              <li>Available for hire</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Adventuring Ghost. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
