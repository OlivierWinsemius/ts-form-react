import React, { Context } from "react";
import { FormProperties, FormValues } from "ts-form/build/types";
import { HiddenFormMethods, ReactForm } from "./react-form";
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

  const useForm = () =>
    React.useContext(FormContext) as Omit<F, HiddenFormMethods>;

  const FormProvider: React.FC = ({ children }) => (
    <ReactFormProvider<V, F> Context={FormContext} form={form}>
      {children}
    </ReactFormProvider>
  );

  return { useForm, FormProvider };
};
