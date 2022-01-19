import React from "react";
import { createForm } from "../create-form";
import { FormButtons } from "./form-buttons";
import { TextAreaInput, TextInput } from "./form-input";

const { useForm, FormProvider } = createForm({
  values: { name: "", email: "", message: "" },
  onSubmit: () => new Promise((resolve) => setTimeout(resolve, 1000)),
  validators: {
    name: (v) => v.string().truthy(),
    email: (v) => v.string().truthy(),
    message: (v) => v.string().truthy(),
  },
});

const ContactForm = () => {
  const { getField } = useForm();
  return (
    <form>
      <TextInput label="name" {...getField("name")} />
      <TextInput label="email" {...getField("email")} />
      <TextAreaInput label="message" {...getField("message")} />
      <FormButtons useForm={useForm} />
    </form>
  );
};

export const ContactFormExample = () => (
  <FormProvider>
    <ContactForm />
  </FormProvider>
);
