import React, { Context } from "react";
import { FormProperties, FormValues } from "ts-form/build/types";
import { ReactFormProvider } from "./react-form-provider";
import { ReactForm } from "./react-form";

export const createForm = <
  V extends FormValues,
  F extends ReactForm<V>,
  C extends Context<F>
>(
  formProperties: FormProperties<V>
) => {
  const form = new ReactForm(formProperties) as F;
  const FormContext = React.createContext(form) as C;
  const useForm = () => React.useContext(FormContext) as F;

  const FormProvider: React.FC = ({ children }) => (
    <ReactFormProvider<V, F, C> Context={FormContext} form={form}>
      {children}
    </ReactFormProvider>
  );

  return {
    useForm,
    FormProvider,
  };
};
