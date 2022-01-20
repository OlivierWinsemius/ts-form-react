import React from "react";
import { createForm } from "../create-form";
import { FormButtons } from "./form-buttons";
import { TextAreaInput, TextInput } from "./form-input";

const { useForm, useField, FormProvider, form } = createForm({
  values: { name: "", email: "", message: "" },
  validators: {
    name: (v) => v.string().truthy(),
    email: (v) => v.email(),
    message: (v) => v.string().truthy(),
  },
  onSubmit: async (values, form) => {
    console.log("submitting values:", values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    form.reset();
  },
});

const ContactForm = () => (
  <form
    aria-disabled={useForm().isSubmitting}
    onReset={form.reset}
    onSubmit={(e) => {
      e.preventDefault();
      form.submit();
    }}
  >
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

export const ContactFormExample = () => (
  <FormProvider>
    <ContactForm />
  </FormProvider>
);
