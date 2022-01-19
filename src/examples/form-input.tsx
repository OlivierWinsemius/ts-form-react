import React from "react";
import { FormField } from "ts-form/build/types";

interface Props extends FormField<string> {
  label: string;
}

export const TextInput = ({ value, setValue, label }: Props) => (
  <>
    <label htmlFor={label}>{label}</label>
    <input
      id={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </>
);

export const TextAreaInput = ({ value, setValue, label }: Props) => (
  <>
    <label htmlFor={label}>{label}</label>
    <textarea
      id={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </>
);
