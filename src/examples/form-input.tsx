import React from "react";
import { FormField } from "ts-form/build/types";

interface Props<F extends string> {
  fieldName: F;
  useField: (field: F) => FormField<string>;
}

export const TextInput = <F extends string>({
  fieldName,
  useField,
}: Props<F>) => {
  const { value, setValue } = useField(fieldName);

  return (
    <input
      id={fieldName}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
