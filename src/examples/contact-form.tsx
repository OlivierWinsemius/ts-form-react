import React from "react";
import { createForm } from "../create-form";

const form = createForm({
  values: { name: "", email: "", message: "" },

  onSubmit: (_, f) =>
    new Promise((resolve) => setTimeout(resolve, 1000)).then(f.reset),

  validators: {
    name: (v) => v.string().truthy(),
    email: (v) => v.string().truthy(),
    message: (v) => v.string().truthy(),
  },
});

const { useForm, FormProvider } = form;

const FormButtons = () => {
  const { submit, reset, isSubmitting, isValid } = useForm();

  if (isSubmitting) {
    return <span>submitting...</span>;
  }

  return (
    <>
      <button onClick={submit} type="submit" disabled={!isValid}>
        submit
      </button>
      <button onClick={reset} type="reset">
        reset
      </button>
    </>
  );
};

const Name = () => {
  const field = useForm().getField("name");

  return (
    <>
      <label htmlFor="name">name:</label>
      <input
        id="name"
        value={field.value}
        onChange={(e) => field.setValue(e.target.value)}
      />
    </>
  );
};

const Email = () => {
  const field = useForm().getField("email");

  return (
    <>
      <label htmlFor="email">email:</label>
      <input
        id="email"
        value={field.value}
        onChange={(e) => field.setValue(e.target.value)}
      />
    </>
  );
};

const Message = () => {
  const field = useForm().getField("message");

  return (
    <>
      <label htmlFor="message">message:</label>
      <textarea
        id="message"
        value={field.value}
        onChange={(e) => field.setValue(e.target.value)}
      />
    </>
  );
};

const ContactForm = () => {
  return (
    <form>
      <Name />
      <Email />
      <Message />
      <FormButtons />
    </form>
  );
};

export const ContactFormExample = () => (
  <FormProvider>
    <ContactForm />
  </FormProvider>
);
