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
  <V extends FormValues>(id: string, form: ReactForm<V>) =>
  <F extends keyof V>(field: F) => {
    const [update, setUpdate] = useState(id);
    listeners[`${id}_${field}`] = () => setUpdate(update + 1);
    return useMemo(() => form._getField(field), [update]);
  };

const getBoolean = (id: string, method: () => boolean) => () => {
  const [update, setUpdate] = useState(id);
  const value = useMemo(method, [update]);
  listeners[id] = () => value !== method() && setUpdate(update + 1);
  return value;
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

  useEffect(() => {
    const uniqueId = ++id;
    const submittingId = `isSubmitting_${uniqueId}`;
    const touchedId = `isTouched_${uniqueId}`;
    const fieldId = `getField_${uniqueId}`;
    const validId = `isValid_${uniqueId}`;

    form._setAfterSubmit(() => {
      listeners[submittingId]();
    });

    form._setBeforeSubmit(() => {
      listeners[submittingId]();
      listeners[validId]();
    });

    form._setAfterReset(() => {
      listeners[touchedId]();
      listeners[validId]();
      for (const field of form._fieldNames) {
        listeners[`${fieldId}_${field}`]();
      }
    });

    form._setAfterValidate((field) => {
      listeners[`${fieldId}_${field}`]();
      listeners[touchedId]();
      listeners[validId]();
    });

    form._setGetField(getField(fieldId, form));
    form._setGetIsValid(getBoolean(validId, form._getIsValid));
    form._setGetIsTouched(getBoolean(touchedId, form._getIsTouched));
    form._setGetIsSubmitting(getBoolean(submittingId, form._getIsSubmitting));

    setIsReady(true);
  }, [form]);

  if (!isReady) {
    return null;
  }

  return <Context.Provider value={form}>{children}</Context.Provider>;
};
