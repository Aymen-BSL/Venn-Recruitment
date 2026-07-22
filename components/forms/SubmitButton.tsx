"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  icon?: ReactNode;
  pendingLabel: string;
};

export function SubmitButton({
  children,
  disabled,
  icon,
  pendingLabel,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button {...props} type="submit" disabled={disabled || pending}>
      {icon}
      {pending ? pendingLabel : children}
    </button>
  );
}
