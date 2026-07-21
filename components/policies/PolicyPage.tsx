import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FooterSection } from "@/components/sections/FooterSection";
import { LegalLinksSection } from "@/components/sections/LegalLinksSection";
import { Container } from "@/components/ui/Container";
import { policies, policyOrder, type PolicyDocument } from "./policyContent";
import styles from "./PolicyPage.module.css";

const updatedDate = "21 July 2026";

type PolicyPageProps = {
  policy: PolicyDocument;
};

export function PolicyPage({ policy }: PolicyPageProps) {
  return (
    <div className={styles.page}>
      <a className="skip-link" href="#policy-content">
        Skip to policy content
      </a>

      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <Link className={styles.wordmark} href="/" aria-label="Venn Recruitment home">
            Venn Recruitment
          </Link>
          <Link className={styles.returnLink} href="/">
            <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.8} />
            Back to website
          </Link>
        </Container>
      </header>

      <main id="policy-content" tabIndex={-1}>
        <section className={styles.masthead} aria-labelledby="policy-title">
          <Container className={styles.mastheadInner}>
            <div className={styles.orbits} aria-hidden="true">
              <span />
              <span />
            </div>
            <p className={styles.eyebrow}>{policy.eyebrow}</p>
            <h1 id="policy-title">{policy.title}</h1>
            <p className={styles.intro}>{policy.intro}</p>
            <p className={styles.updated}>Last updated {updatedDate}</p>
          </Container>
        </section>

        <Container className={styles.documentLayout}>
          <aside className={styles.policyIndex} aria-label="Policy pages">
            <p>Policies</p>
            <nav>
              {policyOrder.map((slug) => {
                const item = policies[slug];
                const active = slug === policy.slug;

                return (
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={active ? styles.activePolicy : undefined}
                    href={`/${slug}`}
                    key={slug}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <article className={styles.article}>
            <div className={styles.reviewNote} role="note">
              <strong>Publication note</strong>
              <p>
                This is a practical website policy draft. Confirm Venn Recruitment&apos;s
                legal entity, contact details, operating jurisdictions, service providers,
                and actual data practices with qualified counsel before publishing.
              </p>
            </div>

            {policy.sections.map((section) => (
              <section className={styles.policySection} key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items ? (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <div className={styles.contactCard}>
              <div>
                <p className={styles.contactLabel}>Questions or concerns</p>
                <h2>Talk to Venn</h2>
                <p>Use the website contact form and tell us which policy your message concerns.</p>
              </div>
              <Link href="/#contact">
                Contact Venn
                <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
              </Link>
            </div>
          </article>
        </Container>
      </main>

      <FooterSection backToTopHref="#policy-title" />
      <LegalLinksSection />
    </div>
  );
}
