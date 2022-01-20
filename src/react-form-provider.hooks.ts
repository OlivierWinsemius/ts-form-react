import { useEffect, useState } from "react";
import { FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";

const listeners: Record<string, (() => void)[]> = {};

const getField = <V extends FormValues>(id: string, form: ReactForm<V>) => {
  return <F extends keyof V>(field: F) => {
    const [value, setValue] = useState(form._getField(field));
    useEffect(() => {
      listeners[`${id}_${field}`].push(() => setValue(form._getField(field)));
    }, []);
    return value;
  };
};

const getBoolean = (id: string, method: () => boolean) => () => {
  const [value, setValue] = useState(method());
  useEffect(() => {
    listeners[id].push(() => setValue(method()));
  }, []);
  return value;
};

let id = 0;

export const useTransformFormMethods = <V extends FormValues>(
  form: ReactForm<V>
) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const uniqueId = ++id;
    const submittingId = `isSubmitting_${uniqueId}`;
    const touchedId = `isTouched_${uniqueId}`;
    const fieldId = `getField_${uniqueId}`;
    const validId = `isValid_${uniqueId}`;
    const fieldIds = form._fieldNames.map((field) => `${fieldId}_${field}`);

    form._setGetField(getField(fieldId, form));
    form._setGetIsValid(getBoolean(validId, form._getIsValid));
    form._setGetIsTouched(getBoolean(touchedId, form._getIsTouched));
    form._setGetIsSubmitting(getBoolean(submittingId, form._getIsSubmitting));

    listeners[submittingId] = [];
    listeners[touchedId] = [];
    listeners[validId] = [];
    fieldIds.forEach((id) => (listeners[id] = []));

    const updateIsSubmitting = () =>
      listeners[submittingId].forEach((f) => f());
    const updateIsTouched = () => listeners[touchedId].forEach((f) => f());
    const updateIsValid = () => listeners[validId].forEach((f) => f());
    const updateField = (f: keyof V) =>
      listeners[`${fieldId}_${f}`].forEach((f) => f());

    const updateAllFields = () => form._fieldNames.forEach(updateField);

    form._setAfterSubmit(updateIsSubmitting);

    form._setBeforeSubmit(() => {
      updateIsSubmitting();
      updateIsValid();
    });

    form._setAfterReset(() => {
      updateAllFields();
      updateIsTouched();
      updateIsValid();
    });

    form._setAfterValidate((field) => {
      updateField(field);
      updateIsTouched();
      updateIsValid();
    });

    setIsReady(true);
  }, [form]);

  return { isReady };
};
