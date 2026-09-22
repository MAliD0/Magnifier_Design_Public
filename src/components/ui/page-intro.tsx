import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
}: PageIntroProps) {
  return (
    <Section>
      <Container>
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="mb-5 text-sm uppercase tracking-[0.2em] text-muted">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="text-balance text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl">
            {title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
            {description}
          </p>
        </div>
      </Container>
    </Section>
  );
}
