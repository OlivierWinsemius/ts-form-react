import React from "react";
import { createForm } from "../create-form";
import { FormButtons } from "./form-buttons";
import { TextInput } from "./form-input";

const { useForm, useField, FormProvider, form } = createForm({
  values: { name: "", password: "" },
  onSubmit: () => new Promise((resolve) => setTimeout(resolve, 1000)),
  validators: {
    name: (v) => v.string().truthy(),
    password: (v) => v.string().truthy(),
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
    <TextInput fieldName="name" useField={useField} />
    <TextInput fieldName="password" useField={useField} />
    <FormButtons useForm={useForm} />
  </form>
);

export const LoginFormExample = () => (
  <FormProvider>
    <LoginForm />
  </FormProvider>
);
