import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "text";
  showArrow?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  showArrow = true,
  className = "",
}: ButtonLinkProps) {
  return (
    <Link className={`button button-${variant} ${className}`} href={href}>
      <span>{children}</span>
      {showArrow ? <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} /> : null}
    </Link>
  );
}
