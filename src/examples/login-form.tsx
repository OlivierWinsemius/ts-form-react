import React from "react";
import { createForm } from "../create-form";
import { FormButtons } from "./form-buttons";
import { TextInput } from "./form-input";

const { useForm, FormProvider } = createForm({
  values: { name: "", password: "" },
  onSubmit: () => new Promise((resolve) => setTimeout(resolve, 1000)),
  validators: {
    name: (v) => v.string().truthy(),
    password: (v) => v.string().truthy(),
  },
});

const LoginForm = () => {
  const { getField } = useForm();

  return (
    <form>
      <TextInput label="name" {...getField("name")} />
      <TextInput label="password" {...getField("password")} />
      <FormButtons useForm={useForm} />
    </form>
  );
};

export const LoginFormExample = () => (
  <FormProvider>
    <LoginForm />
  </FormProvider>
);
