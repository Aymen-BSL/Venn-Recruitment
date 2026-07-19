import { Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactSection() {
  return (
    <section className="page-section sand-section" id="contact">
      <Container>
        <Reveal className="contact-layout">
          <div>
            <SectionHeading eyebrow="Contact Us" title="[Section heading]" description="[Section description]" />
            <div className="contact-options">
              <div><Mail aria-hidden="true" /><span>[Contact email]</span></div>
              <div><MessageCircle aria-hidden="true" /><span>[Alternative contact channel]</span></div>
            </div>
          </div>
          <div className="form-panel"><ContactForm /></div>
        </Reveal>
      </Container>
    </section>
  );
}
