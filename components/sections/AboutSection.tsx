import Image from "next/image";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";

export function AboutSection() {
  return (
    <section className="page-section about-section" id="about">
      <Container>
        <Reveal className="about-layout">
          <div className="about-copy">
            <p className="eyebrow text-green">About Venn Recruitment</p>
            <h2 className="section-title">Recruitment built around the right fit.</h2>
            <div className="about-description">
              <p>
                Venn Recruitment was built on a simple idea: the best placements happen
                when a company&apos;s needs and a candidate&apos;s goals align.
              </p>
              <p>
                We combine market knowledge, international reach and a people-first
                approach to connect the right professionals with the right businesses.
              </p>
            </div>
          </div>

          <figure className="about-visual">
            <Image
              className="about-visual-image"
              src="/media/about-recruitment-v4.webp"
              alt="Recruitment professionals meeting alongside the Venn Recruitment mark and a recruitment agreement"
              width={1200}
              height={998}
              sizes="(min-width: 900px) 48vw, 100vw"
            />
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
