import React from "react";
import { createForm } from "../create-form";

const form = createForm({
  values: { name: "", email: "", message: "" },
  onSubmit: (values) => console.log("submitting values", values),
  validators: {
    name: (v) => v.string(),
    email: (v) => v.string(),
    message: (v) => v.string(),
  },
});

const { useForm, FormProvider } = form;

const ContactForm = () => {
  const form = useForm();
  const { getField, isValid, submit } = form;

  const nameField = getField("name");
  const emailField = getField("email");
  const messageField = getField("message");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <label htmlFor="name">name:</label>
      <input
        id="name"
        value={nameField.value}
        onChange={(e) => nameField.setValue(e.target.value)}
      />

      <label htmlFor="email">email:</label>
      <input
        id="email"
        value={emailField.value}
        onChange={(e) => emailField.setValue(e.target.value)}
      />

      <label htmlFor="message">message:</label>
      <textarea
        id="message"
        value={messageField.value}
        onChange={(e) => messageField.setValue(e.target.value)}
      />

      <button type="submit" disabled={!isValid}>
        submit
      </button>
    </form>
  );
};

export const ContactFormExample = () => (
  <FormProvider>
    <ContactForm />
  </FormProvider>
);
