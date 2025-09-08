import { Container } from "../shared/Container";
import { Title } from "../shared/Title";

const logos = ["python", "fastapi", "typescript", "react"];

export const Technologies = () => {
  return (
    <section>
      {" "}
      <Container className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <Title>Impulsado por</Title>
        </div>
        <div className="flex justify-center flex-wrap gap-4 mb-15">
          {logos.map((logo, key) => (
            <div
              key={key}
              className="p-6 sm:p-8 rounded-2xl bg-body group overflow-hidden flex items-center justify-center"
            >
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
  );
};