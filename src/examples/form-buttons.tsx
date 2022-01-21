import React from "react";
import { Form } from "ts-form";
import { FormValues } from "ts-form/build/types";

interface Props<V extends FormValues> {
  useForm: () => Form<V>;
}

const SubmitButton = ({ isDisabled }: { isDisabled: boolean }) => (
  <button type="submit" disabled={isDisabled}>
    submit
  </button>
);

const ResetButton = ({ isDisabled }: { isDisabled: boolean }) => (
  <button type="reset" disabled={isDisabled}>
    reset
  </button>
);

export const FormButtons = <V extends FormValues>({ useForm }: Props<V>) => {
  const { isTouched, isValid } = useForm();
  return (
    <div className="formButtons">
      <SubmitButton isDisabled={!isValid} />
      <ResetButton isDisabled={!isTouched} />
    </div>
  );
};
