import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "article" | "div";
};

export function Card({ children, className = "", as = "article" }: CardProps) {
  const Component = as;
  return <Component className={`content-card ${className}`}>{children}</Component>;
}
