import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import styles from "./IndustriesSection.module.css";

const industries = [
  {
    name: "Corporate & Professional Services",
    description:
      "Professionals for essential corporate and specialist functions.",
  },
  {
    name: "Technology & Digital",
    description:
      "Talent for an increasingly connected, technology-driven world.",
  },
  {
    name: "Engineering & Technical",
    description:
      "Technical specialists with practical, role-ready experience.",
  },
  {
    name: "Construction & Real Estate",
    description:
      "People supporting the region's continued development.",
  },
  {
    name: "Hospitality & Tourism",
    description:
      "Service-focused professionals for growing hospitality markets.",
  },
  {
    name: "Retail & Consumer",
    description:
      "Talent that understands customers, operations and growth.",
  },
  {
    name: "Logistics & Supply Chain",
    description:
      "Professionals who keep goods, services and operations moving.",
  },
  {
    name: "Healthcare",
    description:
      "Professionals committed to quality care and meaningful impact.",
  },
];

export function IndustriesSection() {
  return (
    <section
      className={`page-section industries-section ${styles.section}`}
      id="industries"
      aria-labelledby="industries-title"
    >
      <Container>
        <Reveal>
          <header className={styles.introduction}>
            <div className={styles.heading}>
              <p className="eyebrow text-green">Industries We Serve</p>
              <h2 className={`section-title ${styles.title}`} id="industries-title">
                Connecting talent with the industries shaping tomorrow.
              </h2>
            </div>

            <div className={styles.description}>
              <p>
                Each industry has distinct challenges and talent needs. We learn what
                matters in every sector before connecting businesses with experienced
                professionals.
              </p>
              <p>
                Our approach combines sector awareness, local knowledge and international
                reach.
              </p>
            </div>
          </header>

          <div className={styles.grid}>
            {industries.map((industry) => (
              <article className={styles.card} key={industry.name}>
                <h3>{industry.name}</h3>
                <p>{industry.description}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
