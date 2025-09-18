import { Link } from 'react-router-dom'
import { Card, Button } from '@adventuringghost/ui'
import { SEO } from '../components/SEO'
import { projects } from '../data/projects'

export const Home = () => {
  // Get the first two projects for the recent work section
  const recentProjects = projects.slice(0, 2)

  return (
    <>
      <SEO
        title="Home - Adventuring Ghost"
        description="Full-stack developer passionate about building digital experiences with user flow and functionality in mind."
        keywords="full-stack developer, react, typescript, web development, portfolio, frontend, backend"
      />
      <div className="space-y-20">
        {/* Hero Section */}
        <section className="text-center py-20 bg-gradient-to-br from-custom-sunshine/50 via-custom-sunshine/30 to-custom-coral/20 rounded-2xl border-2 border-custom-mint/20 shadow-lg">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight">
              <span className="text-custom-mint">Adventuring</span>{' '}
              <span className="text-custom-pink">Ghost</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Full-stack developer crafting digital experiences with modern technologies.
              Exploring the intersection of code, design, and user experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects">
                <button 
                  className="font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 py-3 px-6 text-lg"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: '#B1D690',
                    border: '2px solid #B1D690'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#B1D690';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#B1D690';
                  }}
                >
                  View Projects
                </button>
              </Link>
              <Link to="/contact">
                <button 
                  className="font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 py-3 px-6 text-lg"
                  style={{ 
                    backgroundColor: '#FEEC37',
                    color: '#1f2937',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF77B7';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FEEC37';
                    e.currentTarget.style.color = '#1f2937';
                  }}
                >
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="flex items-center justify-center py-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-custom-mint/30 to-transparent"></div>
          <div className="mx-6 w-3 h-3 bg-custom-mint rounded-full"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-custom-mint/30 to-transparent"></div>
        </div>

        {/* Skills Section */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">⚡ Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-xl font-semibold mb-4 text-sunrise-cyan">Cloud & Infrastructure</h3>
              <ul className="space-y-2 text-gray-600">
                <li>AWS (EC2, S3, IAM, Route 53, CloudFront, Lambda, DynamoDB, CloudWatch)</li>
                <li>Serverless Architecture & APIs</li>
                <li>Infrastructure as Code (IaC) with AWS CLI</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold mb-4 text-sunrise-orange">Networking & Systems</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Cisco Networking (Routing, Switching, VLANs, NAT, DHCP, Subnetting)</li>
                <li>Network Simulation with Cisco Packet Tracer</li>
                <li>VPN, Firewall, and Traffic Monitoring (Sniffer/Packet Analysis)</li>
                <li>Linux System Administration (Ubuntu, CentOS)</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold mb-4 text-sunrise-pink">Development & Automation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Node.js / Express (API Development)</li>
                <li>React / TypeScript (Frontend Development)</li>
                <li>Git & GitHub (Version Control & Collaboration)</li>
                <li>CI/CD Concepts (build, test, deploy pipelines)</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold mb-4 text-sunrise-yellow">Security & Monitoring</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Ethical Hacking Fundamentals (Metasploitable Labs, VMware)</li>
                <li>Identity & Access Management (MFA, Role-based Permissions)</li>
                <li>Basic Penetration Testing & Network Hardening</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold mb-4 text-sunrise-cyan">Other Tools & Practices</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Docker (Container Basics)</li>
                <li>Agile / Scrum Project Workflows</li>
                <li>Documentation & Diagramming (Markdown, Draw.io, Lucidchart)</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Section Separator */}
        <div className="flex items-center justify-center py-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-custom-coral/20 to-transparent"></div>
          <div className="mx-4 w-2 h-2 bg-custom-coral rounded-full"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-custom-coral/20 to-transparent"></div>
        </div>

        {/* Live Projects */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Live Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="hover:shadow-xl transition-shadow duration-300 border-2 border-sunrise-cyan/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 text-sunrise-cyan">Portfolio</h3>
                <p className="text-gray-600 mb-4">
                  This very site! A modern React portfolio with sunrise theme and responsive design.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button 
                    size="sm" 
                    onClick={() => window.open('https://adventuringghost.com', '_blank')}
                  >
                    View Live ↗
                  </Button>
                  <Link to="/projects/portfolio">
                    <Button variant="secondary" size="sm">Details</Button>
                  </Link>
                </div>
              </div>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300 border-2 border-sunrise-orange/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 text-sunrise-orange">Glow Grove</h3>
                <p className="text-gray-600 mb-4">
                  E-commerce demo with shopping cart, quiz functionality, and product catalog.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button 
                    size="sm" 
                    onClick={() => window.open('https://glow-grove.com', '_blank')}
                  >
                    View Live ↗
                  </Button>
                  <Link to="/projects/glow-grove">
                    <Button variant="secondary" size="sm">Details</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Section Separator */}
        <div className="flex items-center justify-center py-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-custom-pink/20 to-transparent"></div>
          <div className="mx-4 w-2 h-2 bg-custom-pink rounded-full"></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-custom-pink/20 to-transparent"></div>
        </div>

        {/* Recent Work */}
        <section>
          <div className="flex items-center justify-center mb-8 relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">All Projects</h2>
            <div className="absolute right-0">
              <Link to="/projects">
                <Button variant="secondary">View All Projects</Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentProjects.map((project) => (
              <Card key={project.slug} className="hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">
                  {project.tagline}
                </p>
                <div className="flex gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-sunrise-cyan/10 text-sunrise-cyan text-sm rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link to={`/projects/${project.slug}`}>
                    <Button size="sm">View Project</Button>
                  </Link>
                  {project.links.github && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => window.open(project.links.github, '_blank')}
                    >
                      Code
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
