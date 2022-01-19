import React, { Context, useEffect, useMemo, useState } from "react";
import { FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";

interface Props<V extends FormValues, F extends ReactForm<V>> {
  form: F;
  Context: Context<F>;
  children: React.ReactNode;
}

const listeners: Record<string, () => void> = {};

const getField =
  <V extends FormValues>(id: number, form: ReactForm<V>) =>
  <F extends keyof V>(field: F) => {
    const [update, setUpdate] = useState(0);
    listeners[`getField_${field}_${id}`] = () => setUpdate(update + 1);
    return useMemo(() => form._getField(field), [update]);
  };

let id = 0;

export const ReactFormProvider = <
  V extends FormValues,
  F extends ReactForm<V>
>({
  form,
  Context,
  children,
}: Props<V, F>) => {
  const [isReady, setIsReady] = useState(false);
  const [isValid, setIsValid] = useState(!form.isValid);
  const [isSubmitting, setIsSubmitting] = useState(!!form.isSubmitting);

  useEffect(() => {
    const uniqueId = ++id;

    const updateBooleans = (f: F) => {
      setIsSubmitting(f.isSubmitting);
      setIsValid(f.isValid);
    };

    form._setAfterSubmit(updateBooleans);

    form._setAfterValidateForm(updateBooleans);

    form._setGetField(getField(uniqueId, form));

    form._setAfterValidateField((field, f) => {
      listeners[`getField_${field}_${uniqueId}`]?.();
      updateBooleans(f);
    });

    setIsReady(true);
  }, [form]);

  if (!isReady) {
    return null;
  }

  return (
    <Context.Provider value={{ ...form, isValid, isSubmitting }}>
      {children}
    </Context.Provider>
  );
};
