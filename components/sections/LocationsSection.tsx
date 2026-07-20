import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import styles from "./LocationsSection.module.css";

const marketAreas = [
  {
    title: "Across the Middle East",
    description:
      "Supporting employers and candidates across established and growing regional markets.",
  },
  {
    title: "International connections",
    description:
      "Connecting businesses with global talent and professionals with opportunities beyond their home country.",
  },
  {
    title: "Market-aware recruitment",
    description:
      "Considering location, work environment and expectations alongside the role itself.",
  },
];

export function LocationsSection() {
  return (
    <section
      className={`page-section green-section locations-section ${styles.section}`}
      id="locations"
      aria-labelledby="locations-title"
    >
      <Container>
        <Reveal className={styles.layout}>
          <div className={styles.content}>
            <header className={styles.heading}>
              <p className="eyebrow text-sand">Locations and Markets</p>
              <h2 className={`section-title ${styles.title}`} id="locations-title">
                Local understanding. International opportunity.
              </h2>
            </header>

            <div className={styles.description}>
              <p>
                Cross-border recruitment depends on understanding local markets, business
                expectations and what candidates want from their next move.
              </p>
              <p>
                Venn Recruitment connects companies and professionals across the Middle
                East and beyond.
              </p>
            </div>
          </div>

          <div className={styles.areas}>
            <p className={styles.areasLabel}>Key areas</p>
            <ul aria-label="Venn Recruitment market coverage">
              {marketAreas.map((area) => (
                <li key={area.title}>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
