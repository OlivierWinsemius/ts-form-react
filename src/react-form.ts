import { useEffect, useState } from "react";
import { Form } from "ts-form";
import { FormField, FormProperties, FormValues } from "ts-form/build/types";

export class ReactForm<V extends FormValues> extends Form<V> {
  listeners: Record<string, (() => void)[]> = {};
  validId = `isValid`;
  touchedId = `isTouched`;
  submitId = `isSubmitting`;
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

  updateIsSubmitting = () => this.listeners[this.submitId].forEach((f) => f());
  updateIsTouched = () => this.listeners[this.touchedId].forEach((f) => f());
  updateIsValid = () => this.listeners[this.validId].forEach((f) => f());
  updateField = (fieldName: keyof V) =>
    this.listeners[this.fieldId(fieldName)].forEach((f) => f());
  updateAllFields = () => this.fieldNames.forEach(this.updateField);

  afterSubmit = () => {
    this.updateIsSubmitting();
  };

  beforeSubmit = () => {
    this.updateIsSubmitting();
    this.updateIsValid();
  };

  afterReset = () => {
    this.updateAllFields();
    this.updateIsTouched();
    this.updateIsValid();
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
      createGetValue,
      getIsValid,
      getIsTouched,
      getField,
      submitId,
      touchedId,
      validId,
      fieldId,
    } = this;

    const fieldIds = fieldNames.map(fieldId);
    const listenerIds = [submitId, validId, touchedId, ...fieldIds];
    listenerIds.forEach((id) => (this.listeners[id] = []));

    this.getIsSubmitting = createGetValue(submitId, getIsSubmitting);
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
