import { ArrowUp, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import styles from "./FooterSection.module.css";

const exploreLinks = [
  ["About Venn", "/#about"],
  ["Our Team", "/#team"],
  ["Industries", "/#industries"],
  ["Locations", "/#locations"],
  ["How It Works", "/#how-it-works"],
  ["Why Choose Venn", "/#why-choose-venn"],
  ["Frequently Asked Questions", "/#faq"],
  ["Trust and Safety", "/trust-and-safety"],
] as const;

const actionLinks = [
  ["Find Your Next Opportunity", "/submit-cv"],
  ["Hire Talent", "/hire-talent"],
  ["Contact Venn", "/#contact"],
  ["Report a Concern", "/#contact"],
] as const;

type FooterSectionProps = {
  backToTopHref?: string;
};

export function FooterSection({ backToTopHref = "#home" }: FooterSectionProps) {
  return (
    <footer className={styles.footer} id="footer">
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link
              aria-label="Venn Recruitment home"
              className={styles.wordmark}
              href="/"
            >
              <BrandLogo className={styles.logo} tone="light" />
            </Link>
            <p>
              Connecting companies and professionals across the Middle East and
              international markets through recruitment built around the right fit.
            </p>
          </div>

          <a className={styles.backToTop} href={backToTopHref} aria-label="Back to top">
            <ArrowUp aria-hidden="true" size={22} strokeWidth={1.8} />
          </a>
        </div>

        <div className={styles.directory}>
          <nav aria-labelledby="footer-explore-title">
            <h2 className={styles.columnTitle} id="footer-explore-title">
              Explore
            </h2>
            <div className={styles.linkList}>
              {exploreLinks.map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-labelledby="footer-actions-title">
            <h2 className={styles.columnTitle} id="footer-actions-title">
              Start here
            </h2>
            <div className={styles.linkList}>
              {actionLinks.map(([label, href]) => (
                <Link href={href} key={label}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          <section aria-labelledby="footer-contact-title">
            <h2 className={styles.columnTitle} id="footer-contact-title">
              Contact
            </h2>
            <div className={styles.contactList}>
              <div>
                <span>Email</span>
                <p>[General contact email]</p>
              </div>
              <div>
                <span>Phone</span>
                <p>[Contact number]</p>
              </div>
              <div>
                <span>Markets served</span>
                <p>Middle East and international markets</p>
              </div>
            </div>

            <div aria-label="Social media profiles" className={styles.socials}>
              <a
                aria-label="Visit Venn Recruitment on LinkedIn"
                href="https://www.linkedin.com"
                rel="noreferrer noopener"
                target="_blank"
              >
                <Linkedin aria-hidden="true" size={20} strokeWidth={1.8} />
              </a>
              <a
                aria-label="Visit Venn Recruitment on Instagram"
                href="https://www.instagram.com"
                rel="noreferrer noopener"
                target="_blank"
              >
                <Instagram aria-hidden="true" size={20} strokeWidth={1.8} />
              </a>
            </div>
          </section>
        </div>
      </Container>
    </footer>
  );
}
