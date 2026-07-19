import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type FormPageShellProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  switchHref: string;
  switchLabel: string;
  title: string;
};

export function FormPageShell({
  children,
  description,
  eyebrow,
  switchHref,
  switchLabel,
  title,
}: FormPageShellProps) {
  return (
    <div className="form-page">
      <header className="form-page-header">
        <Container className="form-page-nav">
          <Link className="form-page-wordmark" href="/" aria-label="Venn Recruitment home">
            Venn Recruitment
          </Link>
          <nav className="form-page-nav-actions" aria-label="Form page navigation">
            <Link className="form-page-back" href="/">
              <ArrowLeft aria-hidden="true" size={16} />
              Back to Home
            </Link>
            <Link className="form-page-switch" href={switchHref}>
              {switchLabel}
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </nav>
        </Container>
      </header>

      <main className="form-page-main">
        <Container className="form-page-grid">
          <section className="form-page-intro" aria-labelledby="form-page-title">
            <p className="form-page-eyebrow">{eyebrow}</p>
            <h1 id="form-page-title">{title}</h1>
            <p className="form-page-description">{description}</p>
          </section>

          <section className="form-page-card" aria-label={`${title} form`}>
            {children}
          </section>
        </Container>
      </main>

      <footer className="form-page-footer">
        <Container className="form-page-footer-inner">
          <p>&copy; {new Date().getFullYear()} Venn Recruitment</p>
          <Link href="/">Return to Landing Page</Link>
        </Container>
      </footer>
    </div>
  );
}
