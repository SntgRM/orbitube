import { Container } from "../shared/Container"
import logo from "/assets/icon.svg"
import { Github, Linkedin } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="bg-box-bg border-t border-gray-800 rounded-t-4xl">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side - Brand and social */}
            <div className="space-y-6">
              <div>
                <img src={logo} className="w-7 h-7" alt="OrbiTube Logo" />
                <h3 className="text-xl font-semibold text-white mb-3">OrbiTube</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  Graphy empowers teams to transform raw data into clear, compelling visuals — making insights easier to
                  share, understand, and act on.
                </p>
              </div>

              {/* Social icons */}
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/SntgRM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">© 2025 Graphy. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Cookies Settings
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
