import { useEffect, useState } from "react";
import { Form } from "ts-form";
import { FormField, FormProperties, FormValues } from "ts-form/build/types";

export class ReactForm<V extends FormValues> extends Form<V> {
  listeners: Record<string, (() => void)[]> = {};
  validId = `isValid`;
  touchedId = `isTouched`;
  submittingId = `isSubmitting`;
  submittedId = `isSubmitted`;

  fieldId = (fieldName: keyof V) => `getField_${fieldName}`;

  createGetValue =
    <V>(id: string, getValue: () => V) =>
    () => {
      const [value, setValue] = useState(getValue());

      useEffect(() => {
        let isMounted = true;
        this.listeners[id].push(() => isMounted && setValue(getValue()));
        return () => {
          isMounted = false;
        };
      }, []);

      return value;
    };

  updateIsSubmitting = () =>
    this.listeners[this.submittingId].forEach((f) => f());
  updateIsSubmitted = () =>
    this.listeners[this.submittedId].forEach((f) => f());
  updateIsTouched = () => this.listeners[this.touchedId].forEach((f) => f());
  updateIsValid = () => this.listeners[this.validId].forEach((f) => f());
  updateField = (fieldName: keyof V) =>
    this.listeners[this.fieldId(fieldName)].forEach((f) => f());
  updateAllFields = () => this.fieldNames.forEach(this.updateField);

  afterSubmit = () => {
    this.updateIsSubmitting();
    this.updateIsSubmitted();
  };

  beforeSubmit = () => {
    this.updateIsValid();
    this.updateIsSubmitting();
    this.updateIsSubmitted();
  };

  afterReset = () => {
    this.updateAllFields();
    this.updateIsTouched();
    this.updateIsValid();
    this.updateIsSubmitted();
  };

  afterValidate = <F extends keyof V>(field: F) => {
    this.updateField(field);
    this.updateIsTouched();
    this.updateIsValid();
  };

  constructor(props: FormProperties<V>) {
    super(props);

    const {
      fieldNames,
      getIsSubmitting,
      getIsSubmitted,
      createGetValue,
      getIsValid,
      getIsTouched,
      getField,
      submittingId,
      submittedId,
      touchedId,
      validId,
      fieldId,
    } = this;

    this.formEvents = {
      afterReset: this.afterReset,
      beforeSubmit: this.beforeSubmit,
      afterSubmit: this.afterSubmit,
      afterValidate: this.afterValidate,
    };

    const fieldIds = fieldNames.map(fieldId);
    const listenerIds = [submittingId, validId, touchedId, ...fieldIds];
    listenerIds.forEach((id) => (this.listeners[id] = []));

    this.getIsSubmitting = createGetValue(submittingId, getIsSubmitting);
    this.getIsSubmitted = createGetValue(submittedId, getIsSubmitted);
    this.getIsTouched = createGetValue(touchedId, getIsTouched);
    this.getIsValid = createGetValue(validId, getIsValid);
    const createGetField = <F extends keyof V>(fieldName: F) =>
      createGetValue(fieldId(fieldName), () => getField(fieldName));

    const getFieldValues = Object.fromEntries(
      fieldNames.map((fieldName) => [fieldName, createGetField(fieldName)])
    ) as { [field in keyof V]: () => FormField<V[field]> };

    this.getField = (fieldName) => getFieldValues[fieldName]();
  }
}
