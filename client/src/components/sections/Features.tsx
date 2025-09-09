import { features } from "../../utils/features-data";
import { Feature } from "../cards/Feature";
import { Container } from "../shared/Container";
import { Title } from "../shared/Title";

export const Features = () => {
  return (
    <section id="features">
      {" "}
      <Container className="space-y-10 md:space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Title>Features</Title>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, key) => (
            <Feature
              key={key}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};