import { Container } from "../shared/Container"
import { Title } from "../shared/Title"
import { Paragraph } from "../shared/Paragraph"
import { Github } from "lucide-react"
import AppPreview from "/assets/screenshots/app-preview.png"

const logos = ["python", "fastapi", "typescript", "react"]

export const About = () => {
  return (
    <section id="about">
      <Container className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <Title>About this Project</Title>
        </div>

        
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Learning Through Practice</h3>
            <Paragraph>
              This project was developed with the aim of deepening my knowledge of modern web development technologies. 
              My main focus has been on mastering the proper integration of APIs through REST API, exploring best practices for data handling and 
              communication between frontend and backend.
            </Paragraph>
            <Paragraph>
              In addition, it has been an excellent opportunity to become familiar with TypeScript, 
              leveraging its static typing advantages to create more robust and maintainable code. 
              Each line of code represents another step in my growth as a developer.
            </Paragraph>
            <div className="flex justify-self-start mt-4">
            <a
              href="https://github.com/SntgRM/orbitube"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border-r border-box-border bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
            >
              <Github size={20} />
              <span className="text-sm font-medium">View Repository</span>
            </a>
          </div>
            
          </div>
          <div className="flex justify-center">
            <div
              className="w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden flex items-center justify-center p-4"
            >
              <img
                src={AppPreview}
                alt="App preview"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-15">
          {logos.map((logo, key) => (
            <div key={key} className="p-6 sm:p-8 group overflow-hidden flex items-center justify-center">
              <img
                src={`/assets/logos/${logo}.svg`}
                width="100"
                height="100"
                alt={logo}
                className="h-10 sm:h-16 w-auto ease-linear duration-300 grayscale group-hover:!grayscale-0 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
