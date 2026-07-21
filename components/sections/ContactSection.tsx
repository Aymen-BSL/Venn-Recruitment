import { Reveal } from "@/components/animation/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import styles from "./ContactSection.module.css";

const contactDetails = [
  { label: "Email", value: "[General contact email]" },
  { label: "Phone", value: "[Contact number]" },
  { label: "Office hours", value: "[Business days and operating hours]" },
  { label: "Location", value: "[Office location or markets served]" },
] as const;

export function ContactSection() {
  return (
    <section
      aria-labelledby="contact-title"
      className={`page-section violet-section ${styles.section}`}
      id="contact"
    >
      <Container>
        <Reveal>
          <header className={styles.header}>
            <p className="eyebrow text-sand">Contact Us</p>
            <h2 className={`section-title ${styles.title}`} id="contact-title">
              <span>Start a conversation</span>
              <span>with Venn</span>
            </h2>
            <p className={styles.description}>
              Every opportunity starts with a conversation. Tell us what brings you
              to Venn, and we will point you in the right direction.
            </p>
          </header>

          <div className={styles.contactGrid}>
            <div className={styles.formArea} id="contact-enquiry">
              <ContactForm className={styles.contactForm} />
            </div>

            <aside className={styles.aside}>
              <dl aria-label="Contact details" className={styles.details}>
                {contactDetails.map((detail) => (
                  <div key={detail.label}>
                    <dt>{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
