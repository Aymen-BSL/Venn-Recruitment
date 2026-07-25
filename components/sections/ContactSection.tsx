import { Instagram, Linkedin } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section
      aria-labelledby="contact-title"
      className={`page-section violet-section ${styles.section}`}
      id="contact"
    >
      <div
        aria-hidden="true"
        className="section-venn-orbits section-venn-orbits-contact"
      >
        <span />
        <span />
      </div>
      <Container>
        <Reveal className={styles.header}>
          <p className={`eyebrow ${styles.eyebrow}`}>Contact Us</p>
          <h2 className={`section-title ${styles.title}`} id="contact-title">
            <span>Start a conversation</span>
            <span>with Venn</span>
          </h2>
          <p className={styles.description}>
            Every opportunity starts with a conversation. Tell us what brings you
            to Venn, and we will point you in the right direction.
          </p>
        </Reveal>

        <div className={styles.contactGrid}>
          <Reveal className={styles.formArea}>
            <ContactForm />
          </Reveal>

          <Reveal className={styles.aside}>
            <aside className={styles.asideContent}>
              <div className={styles.details}>
                <section aria-labelledby="contact-visit-title">
                  <h3 id="contact-visit-title">Visit us</h3>
                  <p>[Office location or markets served]</p>
                </section>

                <section aria-labelledby="contact-talk-title">
                  <h3 id="contact-talk-title">Talk to us</h3>
                  <p>[Contact number]</p>
                  <p>[General contact email]</p>
                </section>

                <section aria-labelledby="contact-hours-title">
                  <h3 id="contact-hours-title">Office hours</h3>
                  <p>[Business days and operating hours]</p>
                </section>
              </div>

              <div aria-label="Social media profiles" className={styles.socials}>
                <a
                  aria-label="Visit Venn Recruitment on LinkedIn"
                  href="https://www.linkedin.com"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <Linkedin aria-hidden="true" size={21} strokeWidth={1.8} />
                </a>
                <a
                  aria-label="Visit Venn Recruitment on Instagram"
                  href="https://www.instagram.com"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <Instagram aria-hidden="true" size={21} strokeWidth={1.8} />
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
