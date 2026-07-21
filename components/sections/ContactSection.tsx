import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import styles from "./ContactSection.module.css";

const quickPaths = [
  {
    title: "Looking for a job?",
    description: "Tell us what you want from your next opportunity.",
    action: "Submit Your CV",
    href: "/submit-cv",
  },
  {
    title: "Hiring talent?",
    description: "Share the role and recruitment support you need.",
    action: "Hire Talent",
    href: "/hire-talent",
  },
] as const;

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
              Looking for your next opportunity, hiring for your team or getting in
              touch for another reason? Choose the path that fits your needs.
            </p>
          </header>

          <div className={styles.contactGrid}>
            <section
              aria-labelledby="contact-enquiry-title"
              className={styles.formArea}
              id="contact-enquiry"
            >
              <div className={styles.formHeading}>
                <h3 id="contact-enquiry-title">General enquiries</h3>
                <p>
                  Ask about Venn Recruitment, partnerships or anything else we can
                  help with.
                </p>
              </div>
              <ContactForm className={styles.contactForm} />
            </section>

            <aside className={styles.aside}>
              <nav aria-label="Candidate and employer contact options">
                {quickPaths.map((path) => (
                  <div className={styles.quickPath} key={path.title}>
                    <h3>{path.title}</h3>
                    <p>{path.description}</p>
                    <Link href={path.href}>
                      <span>{path.action}</span>
                      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
                    </Link>
                  </div>
                ))}
              </nav>

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
