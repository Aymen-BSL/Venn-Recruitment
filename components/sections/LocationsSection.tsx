import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import {
  type MarketOrbitItem,
  RadialMarketOrbit,
} from "@/components/ui/RadialMarketOrbit";
import styles from "./LocationsSection.module.css";

const marketAreas: MarketOrbitItem[] = [
  {
    title: "Across the Middle East",
    description:
      "Supporting employers and candidates across established and growing regional markets.",
    icon: "region",
  },
  {
    title: "International connections",
    description:
      "Connecting businesses with global talent and professionals with opportunities beyond their home country.",
    icon: "international",
  },
  {
    title: "Market-aware recruitment",
    description:
      "Considering location, work environment and expectations alongside the role itself.",
    icon: "aware",
  },
];

export function LocationsSection() {
  return (
    <section
      className={`page-section violet-section locations-section ${styles.section}`}
      id="locations"
      aria-labelledby="locations-title"
    >
      <Container>
        <Reveal className={styles.layout}>
          <div className={styles.content}>
            <header className={styles.heading}>
              <p className="eyebrow text-paper">Locations and Markets</p>
              <h2
                className={`section-title ${styles.title}`}
                id="locations-title"
              >
                Local understanding. International opportunity.
              </h2>
            </header>

            <div className={styles.description}>
              <p>
                Cross-border recruitment depends on understanding local markets,
                business expectations and what candidates want from their next
                move.
              </p>
              <p>
                Venn Recruitment connects companies and professionals across the
                Middle East and beyond.
              </p>
            </div>
          </div>

          <div className={styles.areas}>
            <p className={styles.areasLabel_section_6}>Key areas</p>
            <RadialMarketOrbit
              items={marketAreas}
              label="Venn Recruitment market coverage"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
