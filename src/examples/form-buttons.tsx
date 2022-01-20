import React from "react";
import { Form } from "ts-form";
import { FormValues } from "ts-form/build/types";

interface Props<V extends FormValues> {
  useForm: () => Form<V>;
}

export const FormButtons = <V extends FormValues>({ useForm }: Props<V>) => {
  const { isSubmitting, isValid, isTouched } = useForm();

  return (
    <div className="formButtons">
      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "submitting..." : "submit"}
      </button>
      <button type="reset" disabled={!isTouched || isSubmitting}>
        reset
      </button>
    </div>
  );
};
