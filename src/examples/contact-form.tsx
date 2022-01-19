import React from "react";
import { createForm } from "../create-form";
import { FormButtons } from "./form-buttons";
import { TextInput } from "./form-input";

const { useForm, useField, FormProvider } = createForm({
  values: { name: "", email: "", message: "" },
  onSubmit: () => new Promise((resolve) => setTimeout(resolve, 1000)),
  validators: {
    name: (v) => v.string().truthy(),
    email: (v) => v.string().truthy(),
    message: (v) => v.string().truthy(),
  },
});

const ContactForm = () => (
  <form>
    <TextInput fieldName="name" useField={useField} />
    <TextInput fieldName="email" useField={useField} />
    <TextInput fieldName="message" useField={useField} />
    <FormButtons useForm={useForm} />
  </form>
);

export const ContactFormExample = () => (
  <FormProvider>
    <ContactForm />
  </FormProvider>
);
