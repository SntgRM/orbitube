import { Container } from "../shared/Container"
import { Title } from "../shared/Title"
import { Paragraph } from "../shared/Paragraph"
import { Github } from "lucide-react"
import AppPreview from "/assets/screenshots/app-preview.webp"
import { useTranslation } from "react-i18next"

const logos = ["python", "fastapi", "typescript", "react"]

export const About = () => {
  const { t } = useTranslation()

  return (
    <section id="about">
      <Container className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <Title>{t("about.sectionTitle")}</Title>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {t("about.learningTitle")}
            </h3>
            <Paragraph>{t("about.paragraph1")}</Paragraph>
            <Paragraph>{t("about.paragraph2")}</Paragraph>
            <div className="flex justify-self-start mt-4">
              <a
                href="https://github.com/SntgRM/orbitube"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border-r border-box-border bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
              >
                <Github size={20} />
                <span className="text-sm font-medium">{t("about.viewRepo")}</span>
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden flex items-center justify-center p-4">
              <img
                src={AppPreview}
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
      className="p-4 sm:p-6 group overflow-hidden flex items-center justify-center"
    >
      <img
        src={`/assets/logos/${logo}.svg`}
        alt={logo}
        className="w-12 h-12 sm:h-16 sm:w-16 object-contain ease-linear duration-300 grayscale group-hover:!grayscale-0 group-hover:scale-110"
      />
    </div>
  ))}
</div>

      </Container>
    </section>
  )
}
