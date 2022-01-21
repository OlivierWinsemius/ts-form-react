import React, { useState } from "react";
import { FormField } from "ts-form/build/types";

interface Props<F extends string, V> {
  fieldName: F;
  useField: (field: F) => FormField<V>;
}

export const TextInput = <F extends string>({
  fieldName,
  useField,
}: Props<F, string>) => {
  const { value, setValue, isValid, isTouched } = useField(fieldName);
  const isInvalid = isTouched && !isValid;
  return (
    <input
      id={fieldName}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      aria-invalid={isInvalid}
    />
  );
};

const usePasswordState = <F extends string>({
  fieldName,
  useField,
}: Props<F, string>) => {
  const [showPassword, setShowPassword] = useState(false);
  const { value, setValue, isValid, isTouched } = useField(fieldName);
  const isInvalid = isTouched && !isValid;
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return { value, setValue, isInvalid, showPassword, toggleShowPassword };
};

export const PasswordInput = <F extends string>(props: Props<F, string>) => {
  const { fieldName } = props;
  const { value, setValue, showPassword, toggleShowPassword, isInvalid } =
    usePasswordState(props);
  return (
    <div
      style={{
        gap: 10,
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
      }}
    >
      <input
        id={fieldName}
        style={{ flex: 1 }}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={isInvalid}
      />
      <button
        type="button"
        style={{ backgroundColor: showPassword ? "#f0f0f0" : "#c0c0c0" }}
        onClick={toggleShowPassword}
      />
    </div>
  );
};

export const TextAreaInput = <F extends string>({
  fieldName,
  useField,
}: Props<F, string>) => {
  const { value, setValue, isValid, isTouched } = useField(fieldName);
  return (
    <textarea
      id={fieldName}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      aria-invalid={isTouched && !isValid}
    />
  );
};

export const NumberInput = <F extends string>({
  fieldName,
  useField,
}: Props<F, number>) => {
  const { value, setValue, isValid, isTouched } = useField(fieldName);
  return (
    <input
      id={fieldName}
      type={"number"}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      aria-invalid={isTouched && !isValid}
    />
  );
};
