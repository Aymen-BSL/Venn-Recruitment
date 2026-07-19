import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/Container";

const footerLinks = [
  ["Home", "#home"], ["About Venn", "#about"], ["For Employers", "#employers"],
  ["For Candidates", "#candidates"], ["Find a Job", "#find-a-job"], ["Industries", "#industries"],
  ["Locations", "#locations"], ["Contact", "#contact"],
] as const;

export function FooterSection() {
  return (
    <footer className="site-footer" id="footer">
      <Container>
        <div className="footer-top">
          <div>
            <Link href="#home" className="footer-wordmark">Venn Recruitment</Link>
            <p>[Footer description]</p>
          </div>
          <a className="back-to-top" href="#home" aria-label="Back to top"><ArrowUp aria-hidden="true" /></a>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {footerLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
        <div className="footer-contact-grid">
          <div><span>General enquiries</span><p>[Contact details]</p></div>
          <div><span>For candidates</span><p>[Candidate contact details]</p></div>
          <div><span>For employers</span><p>[Employer contact details]</p></div>
        </div>
      </Container>
    </footer>
  );
}
