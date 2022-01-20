import { useEffect, useState } from "react";
import { FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";

const listeners: Record<string, (() => void)[]> = {};

const getField =
  <V extends FormValues, F extends keyof V>(id: string, form: ReactForm<V>) =>
  (field: F) => {
    const [value, setValue] = useState(form._getField(field));
    useEffect(() => {
      listeners[`${id}_${field}`].push(() => setValue(form._getField(field)));
    }, []);
    return value;
  };

const getBooleanValue = (id: string, method: () => boolean) => () => {
  const [value, setValue] = useState(method());
  useEffect(() => {
    listeners[id].push(() => setValue(method()));
  }, []);
  return value;
};

let formsAmount = 0;

export const useTransformFormMethods = <V extends FormValues>(
  form: ReactForm<V>
) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const formId = ++formsAmount;
    const submitId = `isSubmitting_${formId}`;
    const touchedId = `isTouched_${formId}`;
    const validId = `isValid_${formId}`;
    const fieldId = `getField_${formId}`;
    const fieldIds = form._fieldNames.map((field) => `${fieldId}_${field}`);

    form._setGetField(getField(fieldId, form));
    form._setGetIsValid(getBooleanValue(validId, form._getIsValid));
    form._setGetIsTouched(getBooleanValue(touchedId, form._getIsTouched));
    form._setGetIsSubmitting(getBooleanValue(submitId, form._getIsSubmitting));

    listeners[submitId] = [];
    listeners[touchedId] = [];
    listeners[validId] = [];
    fieldIds.forEach((id) => (listeners[id] = []));

    const updateIsSubmitting = () => listeners[submitId].forEach((f) => f());
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
