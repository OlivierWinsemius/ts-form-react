import React, { Context } from "react";
import { Form } from "ts-form";
import { FormProperties, FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";
import { ReactFormProvider } from "./react-form-provider";

export const createForm = <
  V extends FormValues,
  F extends ReactForm<V>,
  C extends Context<F>
>(
  formProperties: FormProperties<V>
) => {
  const form = new ReactForm(formProperties) as F;

  const FormContext = React.createContext(form) as C;

  const useForm = () => React.useContext(FormContext) as unknown as Form<V>;

  const useField = (field: keyof V) =>
    React.useContext(FormContext).getField(field);

  const FormProvider: React.FC = ({ children }) => (
    <ReactFormProvider<V, F> Context={FormContext} form={form}>
      {children}
    </ReactFormProvider>
  );

  return { useForm, useField, FormProvider };
};
