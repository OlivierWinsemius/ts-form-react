import React, { useState } from "react";
import { createForm } from "../create-form";
import { FormButtons } from "./form-buttons";
import { TextAreaInput, TextInput } from "./form-input";

const { useForm, useField, FormProvider, form } = createForm({
  values: { name: "", email: "", message: "" },
  validators: {
    name: (v) => v.string().truthy(),
    email: (v) =>
      v.email().custom((value, formValues) => {
        if (formValues.name && !value) {
          return "email must be set if name is set";
        }
      }),
    message: (v) => v.string().truthy(),
  },
  onSubmit: () => new Promise((resolve) => setTimeout(resolve, 1000)),
});

const ContactForm = () => {
  const [hide, setHide] = useState(false);
  const { isSubmitted, isSubmitting } = useForm();

  if (hide) {
    return null;
  }

  return (
    <form
      aria-disabled={isSubmitted || isSubmitting}
      onReset={form.reset}
      onSubmit={(e) => {
        e.preventDefault();
        form.submit();
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          setHide(true);
        }}
      >
        hide
      </button>
      <fieldset>
        <legend>contact form</legend>
        <label htmlFor="name">name:</label>
        <TextInput fieldName="name" useField={useField} />
        <label htmlFor="email">email:</label>
        <TextInput fieldName="email" useField={useField} />
        <label htmlFor="message">message:</label>
        <TextAreaInput fieldName="message" useField={useField} />
        <FormButtons useForm={useForm} />
      </fieldset>
    </form>
  );
};

export const ContactFormExample = () => (
  <FormProvider>
    <ContactForm />
  </FormProvider>
);
