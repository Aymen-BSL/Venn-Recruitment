import Link from "next/link";
import {
  ArrowUpRight,
  FileUser,
  MessageSquareText,
  UsersRound,
} from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import styles from "./ContactSection.module.css";

const pathways = [
  {
    icon: FileUser,
    title: "Looking for a job?",
    description:
      "Submit your CV and tell us what you want from your next opportunity.",
    action: "Submit Your CV",
    href: "/submit-cv",
  },
  {
    icon: UsersRound,
    title: "Hiring talent?",
    description:
      "Share your recruitment needs and the role you need to fill.",
    action: "Hire Talent",
    href: "/hire-talent",
  },
  {
    icon: MessageSquareText,
    title: "General enquiries",
    description:
      "Ask about Venn Recruitment, partnerships or anything else we can help with.",
    action: "Send an Enquiry",
    href: "#contact-enquiry",
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
      className={`page-section sand-section ${styles.section}`}
      id="contact"
    >
      <Container>
        <Reveal>
          <header className={styles.header}>
            <p className="eyebrow text-green">Contact Us</p>
            <h2 className={`section-title ${styles.title}`} id="contact-title">
              Start a conversation with Venn.
            </h2>
            <p className={styles.description}>
              Looking for your next opportunity, hiring for your team or getting in
              touch for another reason? Choose the path that fits your needs.
            </p>
          </header>

          <div className={styles.workspace}>
            <section aria-label="Contact pathways" className={styles.pathways}>
              {pathways.map(({ action, description, href, icon: Icon, title }) => (
                <article className={styles.pathway} key={title}>
                  <Icon
                    aria-hidden="true"
                    className={styles.pathwayIcon}
                    size={27}
                    strokeWidth={1.6}
                  />
                  <div className={styles.pathwayCopy}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <Link className={styles.pathwayAction} href={href}>
                    <span>{action}</span>
                    <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
                  </Link>
                </article>
              ))}
            </section>

            <section
              aria-labelledby="contact-enquiry-title"
              className={styles.formPanel}
              id="contact-enquiry"
            >
              <h3 id="contact-enquiry-title">Send an enquiry</h3>
              <ContactForm />
            </section>
          </div>

          <dl aria-label="Contact details" className={styles.details}>
            {contactDetails.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
