import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import styles from "./IndustriesSection.module.css";

const industries = [
  {
    name: "Corporate & Professional Services",
    description:
      "Connecting businesses with professionals across essential corporate and specialist functions.",
  },
  {
    name: "Technology & Digital",
    description:
      "Helping companies find talent for an increasingly connected and technology-driven world.",
  },
  {
    name: "Engineering & Technical",
    description:
      "Matching skilled professionals with roles that require technical expertise and practical experience.",
  },
  {
    name: "Construction & Real Estate",
    description:
      "Supporting the people and businesses contributing to the region's continued development.",
  },
  {
    name: "Hospitality & Tourism",
    description:
      "Connecting service-focused professionals with opportunities across growing hospitality markets.",
  },
  {
    name: "Retail & Consumer",
    description:
      "Helping businesses find the talent needed to understand customers, strengthen operations and support growth.",
  },
  {
    name: "Logistics & Supply Chain",
    description:
      "Matching professionals with organisations responsible for keeping goods, services and operations moving.",
  },
  {
    name: "Healthcare",
    description:
      "Connecting healthcare organisations with professionals committed to quality, care and meaningful impact.",
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
                Every industry has its own challenges, expectations and talent
                requirements. We take the time to understand each sector so we can
                connect businesses with professionals who have the right experience,
                perspective and potential.
              </p>
              <p>
                Our approach combines industry awareness with local market knowledge and
                international reach.
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

          <p className={styles.closing}>
            Different industries. Different needs. The same focus on finding the right
            match.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
