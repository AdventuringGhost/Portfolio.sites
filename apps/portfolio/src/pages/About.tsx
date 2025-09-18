import { Card } from '@adventuringghost/ui'
import { SocialLinks } from '../components/SocialLinks'
import { images } from '../assets/images'

export const About = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-sunrise-pink/5 via-sunrise-yellow/5 to-sunrise-orange/5">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                About Me
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Full-stack developer passionate about creating digital experiences that make a difference
              </p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <Card className="text-center p-8 bg-gradient-to-br from-pink-200 via-yellow-200 to-orange-200 border-pink-300 shadow-lg">
                  <div className="w-42 h-42 mx-auto mb-6">
                    <img 
                      src={images.profilePhoto}
                      alt="Katherine Schlosser" 
                      className="w-full h-full object-cover rounded-full border-4 border-sunrise-pink/20 shadow-lg"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-sunrise-pink to-sunrise-orange rounded-full flex items-center justify-center"><span class="text-4xl font-bold text-white">KS</span></div>';
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Katherine Schlosser</h3>
                  <p className="text-sunrise-orange font-medium mb-4">DevOps-in-Training | Full-Stack Problem Solver</p>
                  <p className="text-gray-600 mb-6">
                    Remote / Worldwide
                  </p>
                  <SocialLinks size="md" />
                </Card>
              </div>

              {/* About Content */}
              <div className="lg:col-span-2 space-y-8">
                <Card className="bg-gradient-to-br from-sunrise-cyan/10 to-sunrise-yellow/10 border-sunrise-cyan/20">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">My Story</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 mb-4">
                      I'm a full-stack developer with a growing focus on cloud and DevOps, passionate about turning complex problems into clear, scalable solutions. I thrive at the intersection of frontend, backend, and infrastructure, building applications that not only work beautifully but also deploy and scale reliably in the cloud.
                    </p>
                    <p className="text-gray-600 mb-4">
                      My journey started with a simple curiosity about what happens "behind the screen." That curiosity grew into hands-on exploration: from crafting React apps to designing Node.js APIs, and from fine-tuning databases to configuring AWS services and Cisco networks.
                    </p>
                    <p className="text-gray-600 mb-4">
                      Beyond coding, I'm committed to continuous learning and experimentation. I sharpen my skills through projects, labs, and open-source contributions, and I enjoy sharing knowledge with others. For me, tech isn't just about code — it's about building systems that are resilient, secure, and impactful.
                    </p>
                    <p className="text-gray-600">
                      When I'm not in front of a screen, you'll probably find me hiking trails, exploring new ideas, or dreaming about how technology can push human potential further — maybe even all the way to space. 🚀
                    </p>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-sunrise-orange/10 to-sunrise-pink/10 border-sunrise-orange/20">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What I Do</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-sunrise-pink mb-2">Frontend Development</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• React & TypeScript applications</li>
                        <li>• Modern CSS frameworks (Tailwind)</li>
                        <li>• Responsive design & accessibility</li>
                        <li>• Performance optimization</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sunrise-orange mb-2">Backend Development</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Node.js & Express APIs</li>
                        <li>• Database design & optimization</li>
                        <li>• Cloud infrastructure (AWS)</li>
                        <li>• Serverless architectures</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Skills & Technologies */}
            <div className="mb-12">
              <Card className="p-8 bg-gradient-to-br from-sunrise-yellow/10 to-sunrise-cyan/10 border-sunrise-yellow/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Skills & Technologies</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-sunrise-cyan mb-3">🌩️ Cloud & Infrastructure</h3>
                    <p className="text-gray-600 leading-relaxed">
                      I design and deploy solutions on AWS, including EC2 for compute, S3 for storage, IAM for secure access control, 
                      Route 53 for DNS, and CloudFront for content delivery. I've built serverless APIs with Lambda and DynamoDB, 
                      and I use CloudWatch for monitoring.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-sunrise-orange mb-3">🌐 Networking & Systems</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Hands-on experience with Cisco networking fundamentals: routing, switching, VLANs, NAT, DHCP, and subnetting. 
                      I regularly simulate enterprise-scale networks in Packet Tracer, configure VPNs and firewalls, and monitor 
                      traffic with sniffers. Comfortable managing Linux environments for both development and operations.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-sunrise-pink mb-3">⚙️ Development & Automation</h3>
                    <p className="text-gray-600 leading-relaxed">
                      I build full-stack apps with Node.js/Express on the backend and React/TypeScript on the frontend. 
                      I use Git & GitHub for version control and follow CI/CD practices to ensure clean, repeatable builds and deployments.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-sunrise-yellow mb-3">🔐 Security & Monitoring</h3>
                    <p className="text-gray-600 leading-relaxed">
                      I'm exploring ethical hacking and penetration testing through labs (Metasploitable on VMware) and applying 
                      that knowledge to network hardening and IAM policies. I take security-first approaches like MFA, least-privilege 
                      roles, and system monitoring to safeguard data.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-sunrise-cyan mb-3">🛠️ Tools & Practices</h3>
                    <p className="text-gray-600 leading-relaxed">
                      I work with Docker to containerize apps, follow Agile/Scrum workflows, and keep documentation organized 
                      with Markdown, diagrams, and visual tools like Lucidchart.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Call to Action */}
            <Card className="text-center p-8 bg-gradient-to-r from-sunrise-pink/10 to-sunrise-orange/10 border-sunrise-pink/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's Work Together</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                I'm always interested in new opportunities, collaborations, and interesting projects. 
                Whether you need a full-stack developer, technical consultant, or just want to chat about tech, 
                I'd love to hear from you.
              </p>
              <div className="flex flex-col gap-4 items-center">
                <a 
                  href="/contact" 
                  className="px-6 py-3 bg-sunrise-orange text-white rounded-lg font-medium hover:bg-sunrise-orange/90 transition-colors"
                >
                  Get In Touch
                </a>
                <a 
                  href="/projects" 
                  className="px-6 py-3 border border-green-500 text-green-500 rounded-lg font-medium hover:bg-green-500 hover:text-white transition-colors"
                >
                  View My Work
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
