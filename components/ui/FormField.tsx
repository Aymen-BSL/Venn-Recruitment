import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type CommonProps = {
  label: string;
  id: string;
  hint?: string;
  error?: string;
};

type InputProps = CommonProps & InputHTMLAttributes<HTMLInputElement> & { kind?: "input" };
type TextareaProps = CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { kind: "textarea" };
type SelectProps = CommonProps & SelectHTMLAttributes<HTMLSelectElement> & {
  kind: "select";
  options: string[];
};

type FormFieldProps = InputProps | TextareaProps | SelectProps;

export function FormField(props: FormFieldProps) {
  const describedBy = props.error ? `${props.id}-error` : props.hint ? `${props.id}-hint` : undefined;
  const fieldClass = `form-control ${props.error ? "form-control-error" : ""} ${props.className ?? ""}`;
  const nativeProps: Record<string, unknown> = { ...props };
  ["label", "hint", "error", "kind", "className", "options"].forEach((key) => delete nativeProps[key]);

  let control;
  if (props.kind === "textarea") {
    control = (
      <textarea
        {...(nativeProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        className={fieldClass}
        aria-invalid={Boolean(props.error)}
        aria-describedby={describedBy}
      />
    );
  } else if (props.kind === "select") {
    control = (
      <select
        {...(nativeProps as SelectHTMLAttributes<HTMLSelectElement>)}
        className={fieldClass}
        aria-invalid={Boolean(props.error)}
        aria-describedby={describedBy}
      >
        {props.options.map((option) => (
          <option key={option} value={option.startsWith("[") ? "" : option}>{option}</option>
        ))}
      </select>
    );
  } else {
    control = (
      <input
        {...(nativeProps as InputHTMLAttributes<HTMLInputElement>)}
        className={fieldClass}
        aria-invalid={Boolean(props.error)}
        aria-describedby={describedBy}
      />
    );
  }

  return (
    <div className="form-field">
      <label htmlFor={props.id}>{props.label}</label>
      {control}
      {props.error ? (
        <p className="field-error" id={`${props.id}-error`} role="alert">
          {props.error}
        </p>
      ) : props.hint ? (
        <p className="field-hint" id={`${props.id}-hint`}>
          {props.hint}
        </p>
      ) : null}
    </div>
  );
}
