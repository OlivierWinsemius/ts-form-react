import React from "react";
import { FormField } from "ts-form/build/types";

interface Props<F extends string, V> {
  fieldName: F;
  useField: (field: F) => FormField<V>;
}

export const TextInput = <F extends string>({
  fieldName,
  useField,
}: Props<F, string>) => {
  const { value, setValue } = useField(fieldName);

  return (
    <input
      id={fieldName}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const NumberInput = <F extends string>({
  fieldName,
  useField,
}: Props<F, number>) => {
  const { value, setValue } = useField(fieldName);

  return (
    <input
      id={fieldName}
      type={"number"}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
    />
  );
};
