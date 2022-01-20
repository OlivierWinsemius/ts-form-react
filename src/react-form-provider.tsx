import React, { Context } from "react";
import { FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";
import { useTransformFormMethods } from "./react-form-provider.hooks";

interface Props<V extends FormValues> {
  form: ReactForm<V>;
  Context: Context<ReactForm<V>>;
  children: React.ReactNode;
}

export const ReactFormProvider = <V extends FormValues>({
  form,
  Context,
  children,
}: Props<V>) => {
  const { isReady } = useTransformFormMethods(form);

  if (!isReady) {
    return null;
  }

  return <Context.Provider value={form}>{children}</Context.Provider>;
};
