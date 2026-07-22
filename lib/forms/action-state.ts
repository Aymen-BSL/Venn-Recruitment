export type FieldErrors = Readonly<Record<string, readonly string[] | undefined>>;

export type IdleActionState = Readonly<{
  status: "idle";
}>;

export type SuccessActionState = Readonly<{
  status: "success";
  message: string;
}>;

export type ValidationErrorActionState = Readonly<{
  status: "validation_error";
  message: string;
  fieldErrors: FieldErrors;
}>;

export type ServerErrorActionState = Readonly<{
  status: "server_error";
  message: string;
}>;

export type FormActionState =
  | IdleActionState
  | SuccessActionState
  | ValidationErrorActionState
  | ServerErrorActionState;

export const initialFormActionState: IdleActionState = { status: "idle" };
