import React from "react";
import { Form } from "ts-form";
import { FormProperties, FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";
import { ReactFormProvider } from "./react-form-provider";

export const createForm = <V extends FormValues>(
  formProperties: FormProperties<V>
) => {
  const reactForm = new ReactForm(formProperties);

  const form = reactForm as unknown as Form<V>;

  const FormContext = React.createContext(reactForm);

  const useForm = () => React.useContext(FormContext) as unknown as Form<V>;

  const useField = <F extends keyof V>(field: F) =>
    React.useContext(FormContext).useField<F>(field);

  const FormProvider = ({ children }: { children: React.ReactNode }) => (
    <ReactFormProvider Context={FormContext} form={reactForm}>
      {children}
    </ReactFormProvider>
  );

  return {
    form,
    useForm,
    useField,
    FormProvider,
  };
};
