export class InvalidFormDataError extends Error {
  constructor() {
    super("Form data contains an invalid field value.");
    this.name = "InvalidFormDataError";
  }
}

export function readStringFields<const Field extends string>(
  formData: FormData,
  fields: readonly Field[],
): Record<Field, string> {
  return Object.fromEntries(fields.map((field) => {
    const values = formData.getAll(field);
    if (values.length === 0) {
      return [field, ""];
    }
    if (values.length !== 1 || typeof values[0] !== "string") {
      throw new InvalidFormDataError();
    }
    return [field, values[0]];
  })) as Record<Field, string>;
}
