import { Container } from "../shared/Container"
import logo from "/assets/icon.svg"
import { Github, Linkedin } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="bg-box-bg border-t border-gray-800 rounded-t-4xl py-8">
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-8 text-gray-400">
          
          <div className="md:w-1/3 space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logo} className="w-8 h-8" alt="OrbiTube Logo" />
              <h3 className="text-white font-semibold">OrbiTube</h3>
            </div>
            <p className="text-sm">
              OrbiTube is a secure YouTube video converter. Download your favorite videos in MP3 or MP4 format with the best quality — always free, simple, and without complications.
            </p>
          </div>

          <div className="flex gap-16 md:w-auto">
            
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Quick links</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>

            {/* Social */}
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Social</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <a
                    href="https://www.linkedin.com/in/santiago-rodriguez-marenco-060ba7326/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Linkedin className="w-5 h-5" />LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/SntgRM"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
