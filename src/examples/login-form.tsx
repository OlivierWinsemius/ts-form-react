import React from "react";
import { createForm } from "../create-form";
import { FormButtons } from "./form-buttons";
import { TextInput } from "./form-input";

const { useForm, useField, FormProvider, form } = createForm({
  values: { name: "", password: "" },
  validators: {
    name: (v) => v.string().truthy(),
    password: (v) => v.string().truthy(),
  },
  onSubmit: async (values, form) => {
    console.log("submitting values:", values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    form.reset();
  },
});

const LoginForm = () => (
  <form
    onReset={form.reset}
    onSubmit={(e) => {
      e.preventDefault();
      form.submit();
    }}
  >
    <fieldset>
      <legend>login form</legend>
      <label htmlFor="name">name:</label>
      <TextInput fieldName="name" useField={useField} />
      <label htmlFor="name">password:</label>
      <TextInput fieldName="password" useField={useField} />
      <FormButtons useForm={useForm} />
    </fieldset>
  </form>
);

export const LoginFormExample = () => (
  <FormProvider>
    <LoginForm />
  </FormProvider>
);
