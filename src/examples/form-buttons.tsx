import React from "react";
import { Form } from "ts-form";
import { FormValues } from "ts-form/build/types";

interface Props<V extends FormValues> {
  useForm: () => Form<V>;
}

export const FormButtons = <V extends FormValues>({ useForm }: Props<V>) => {
  const { submit, reset, isSubmitting, isValid, isTouched } = useForm();

  if (isSubmitting) {
    return <span>submitting...</span>;
  }

  return (
    <>
      <button onClick={submit} type="submit" disabled={!isValid}>
        submit
      </button>
      <button onClick={reset} type="reset" disabled={!isTouched}>
        reset
      </button>
    </>
  );
};