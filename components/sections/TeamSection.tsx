import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { TeamMemberCard } from "@/components/ui/TeamMemberCard";
import { teamMembers } from "./team-members";
import styles from "./TeamSection.module.css";

export function TeamSection() {
  return (
    <section
      aria-labelledby="team-title"
      className={`page-section violet-section ${styles.section}`}
      id="team"
    >
      <div
        aria-hidden="true"
        className="section-venn-orbits section-venn-orbits-team"
      >
        <span />
        <span />
      </div>
      <Container>
        <Reveal>
          <header className={styles.introduction}>
            <div>
              <p className="eyebrow text-sand">Our Team</p>
              <h2 className={`section-title ${styles.title}`} id="team-title">
                The people behind every connection.
              </h2>
            </div>
            <p className={styles.description}>
              We bring together recruitment experience, market understanding and
              genuine attention to what people and businesses need from their next
              move.
            </p>
          </header>

          <div className={styles.cards}>
            <Marquee pauseOnHover>
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
              ))}
            </Marquee>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
