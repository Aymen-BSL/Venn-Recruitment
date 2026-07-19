import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function LegalLinksSection() {
  return (
    <section className="legal-section" id="legal" aria-label="Legal and policy links">
      <Container className="legal-inner">
        <p>© {new Date().getFullYear()} Venn Recruitment. [Rights statement]</p>
        <nav aria-label="Legal policies">
          <Link href="#legal">[Privacy policy]</Link>
          <Link href="#legal">[Terms and conditions]</Link>
          <Link href="#legal">[Cookie policy]</Link>
          <Link href="#trust-safety">[Trust and safety policy]</Link>
        </nav>
      </Container>
    </section>
  );
}
