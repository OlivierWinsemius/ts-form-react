import React from "react";
import { FormField, FormValues } from "ts-form/build/types";

interface Props<V extends FormValues, F extends keyof V> {
  fieldName: F;
  useField: (field: F) => FormField<string>;
}

export const TextInput = <V extends FormValues, F extends keyof V>({
  fieldName,
  useField,
}: Props<V, F>) => {
  const { value, setValue } = useField(fieldName);

  return (
    <>
      <label htmlFor={`${fieldName}:`}>{fieldName}</label>
      <input
        id={`${fieldName}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};
