import React, { Context } from "react";
import { Form } from "ts-form";
import { FormProperties, FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";
import { ReactFormProvider } from "./react-form-provider";

export const createForm = <
  V extends FormValues,
  RF extends ReactForm<V>,
  Ctx extends Context<RF>
>(
  formProperties: FormProperties<V>
) => {
  const reactForm = new ReactForm(formProperties) as RF;

  const form = reactForm as unknown as Form<V>;

  const FormContext = React.createContext(reactForm) as Ctx;

  const useForm = () => React.useContext(FormContext) as unknown as Form<V>;

  const useField = <F extends keyof V>(field: F) =>
    React.useContext(FormContext).getField<F>(field);

  const FormProvider: React.FC = ({ children }) => (
    <ReactFormProvider<V, RF> Context={FormContext} form={reactForm}>
      {children}
    </ReactFormProvider>
  );

  return { form, useForm, useField, FormProvider };
};
