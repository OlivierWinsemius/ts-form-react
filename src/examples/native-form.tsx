import React from "react";
import { createForm } from "../create-form";
import { FormButtons } from "./form-buttons";
import { TextInput } from "./form-input";

class SomethingElse {
  doStuff = () => {
    const testValue = form.getField("test").value;
    console.log(testValue);
  };
}

const somethingElse = new SomethingElse();

const { useForm, useField, FormProvider, form } = createForm({
  values: { test: "" },
  onSubmit: somethingElse.doStuff,
});

const NativeForm = () => {
  const { isSubmitted, isSubmitting } = useForm();

  return (
    <form
      aria-disabled={isSubmitted || isSubmitting}
      onReset={form.reset}
      onSubmit={(e) => {
        e.preventDefault();
        form.submit();
      }}
    >
      <fieldset>
        <legend>native form</legend>
        <label htmlFor="name">test:</label>
        <TextInput fieldName="test" useField={useField} />
        <FormButtons useForm={useForm} />
      </fieldset>
    </form>
  );
};

export const NativeFormExample = () => (
  <FormProvider>
    <NativeForm />
  </FormProvider>
);
