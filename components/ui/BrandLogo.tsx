import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  eager?: boolean;
  tone: "dark" | "light";
};

export function BrandLogo({ className, eager = false, tone }: BrandLogoProps) {
  return (
    <Image
      aria-hidden="true"
      className={className}
      src={`/brand/venn-logo-${tone}.svg`}
      alt=""
      width={2745}
      height={973}
      loading={eager ? "eager" : "lazy"}
      unoptimized
    />
  );
}
