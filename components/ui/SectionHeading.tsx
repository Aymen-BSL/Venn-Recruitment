type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: SectionHeadingProps) {
  return (
    <header
      className={`section-heading ${align === "center" ? "section-heading-center" : ""} ${inverse ? "text-white" : ""}`}
    >
      <p className={`eyebrow ${inverse ? "text-sand" : "text-green"}`}>{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {description ? (
        <p className={`section-description ${inverse ? "text-white/70" : "text-ink/65"}`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
