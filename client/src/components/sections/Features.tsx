import { useFeaturesData } from "../../utils/featuresData"
import { Feature } from "../cards/FeatureCard"
import { Container } from "../shared/Container"
import { Title } from "../shared/Title"
import { useTranslation } from "react-i18next"

export const Features = () => {
  const { t } = useTranslation()
  const features = useFeaturesData()

  return (
    <section className="mb-20" id="features">
      <Container className="space-y-10 md:space-y-12">
        <div
          className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <Title>{t("features.sectionTitle")}</Title>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, key) => (
            <div
              key={key}
              className="animate-fade-in-scale opacity-0"
              style={{
                animationDelay: `${0.2 + key * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <Feature
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
