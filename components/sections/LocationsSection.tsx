import { MapPin } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function LocationsSection() {
  return (
    <section className="page-section green-section locations-section" id="locations">
      <Container>
        <Reveal className="locations-layout">
          <div>
            <SectionHeading inverse eyebrow="Locations and Markets" title="[Section heading]" description="[Section description]" />
            <ul className="market-list" aria-label="[Locations and markets list]">
              {Array.from({ length: 4 }, (_, index) => (
                <li key={index}><MapPin aria-hidden="true" size={18} /><span>[Market or location]</span></li>
              ))}
            </ul>
          </div>
          <div className="market-graphic" aria-label="[Supporting locations visual]">
            <span className="market-ring market-ring-one" />
            <span className="market-ring market-ring-two" />
            <span className="market-core">[Supporting visual]</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
