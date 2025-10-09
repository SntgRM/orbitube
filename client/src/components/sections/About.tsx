import { Container } from "../shared/Container"
import { Title } from "../shared/Title"
import { Paragraph } from "../shared/Paragraph"
import { Github } from "lucide-react"
import AppPreview from "/assets/screenshots/app-preview.webp"
import { useTranslation } from "react-i18next"

const logos = ["python", "fastapi", "typescript", "react"]
const titleIcon = ["Python ", "FastAPI ", "TypeScript ", "React "]

export const About = () => {
  const { t } = useTranslation()

  return (
    <section id="about">
      <Container className="space-y-8">
        <div
          className="text-center max-w-3xl mx-auto animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <Title>{t("about.sectionTitle")}</Title>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div
            className="space-y-4 animate-slide-in-left opacity-0"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{t("about.learningTitle")}</h3>
            <Paragraph>{t("about.paragraph1")}</Paragraph>
            <Paragraph>{t("about.paragraph2")}</Paragraph>
            <div className="flex justify-self-start mt-4">
              <a
                href="https://github.com/SntgRM/orbitube"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full overflow-hidden transition-all duration-300 ease-out hover:bg-gray-800 dark:hover:bg-gray-200 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-lg hover:shadow-gray-900/20 dark:hover:shadow-gray-100/20 hover:-translate-y-0.5"
              >
                <div className="relative z-10 transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110">
                  <Github size={20} />
                </div>

                <span className="relative z-10 text-sm font-medium transition-all duration-300 ease-out group-hover:tracking-wide">
                  {t("about.viewRepo")}
                </span>
              </a>
            </div>
          </div>

          <div
            className="flex justify-center animate-slide-in-right opacity-0"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <div className="w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden flex items-center justify-center p-4">
              <img
                src={AppPreview || "/placeholder.svg"}
                alt="App preview"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 mb-15">
          {logos.map((logo, key) => (
            <div
              key={key}
              className="p-4 sm:p-6 group overflow-hidden flex items-center justify-center animate-fade-in-scale opacity-0"
              style={{
                animationDelay: `${0.5 + key * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <img
                src={`/assets/logos/${logo}.svg`}
                alt={logo}
                title={titleIcon[key]}
                className="w-12 h-12 sm:h-16 sm:w-16 object-contain ease-linear duration-300 grayscale group-hover:!grayscale-0 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
