import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function LegalLinksSection() {
  return (
    <section className="legal-section" id="legal" aria-label="Legal and policy links">
      <Container className="legal-inner">
        <p>&copy; {new Date().getFullYear()} Venn Recruitment. All rights reserved.</p>
        <nav aria-label="Legal policies">
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/terms-and-conditions">Terms and conditions</Link>
          <Link href="/cookie-policy">Cookie policy</Link>
          <Link href="/trust-and-safety">Trust and safety policy</Link>
        </nav>
      </Container>
    </section>
  );
}
