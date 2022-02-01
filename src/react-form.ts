import { useEffect, useState } from "react";
import { Form } from "ts-form";
import { FormField, FormProperties, FormValues } from "ts-form/build/types";

enum ListenerIds {
  IsValid = "isValid",
  IsTouched = "isTouched",
  IsSubmitting = "isSubmitting",
  IsSubmitted = "isSubmitted",
}

export class ReactForm<V extends FormValues> extends Form<V> {
  listeners: Record<string, (() => void)[]> = {};

  getFieldId = (fieldName: keyof V) => `getField_${fieldName}`;

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
    this.listeners[ListenerIds.IsSubmitting].forEach((f) => f());

  updateIsSubmitted = () =>
    this.listeners[ListenerIds.IsSubmitted].forEach((f) => f());

  updateIsTouched = () =>
    this.listeners[ListenerIds.IsTouched].forEach((f) => f());

  updateIsValid = () => this.listeners[ListenerIds.IsValid].forEach((f) => f());

  updateField = (fieldName: keyof V) =>
    this.listeners[this.getFieldId(fieldName)].forEach((f) => f());

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
      getFieldId,
    } = this;

    this.formEvents = {
      afterReset: this.afterReset,
      beforeSubmit: this.beforeSubmit,
      afterSubmit: this.afterSubmit,
      afterValidate: this.afterValidate,
    };

    const fieldIds = fieldNames.map(getFieldId);
    const listenerIds = [...Object.values(ListenerIds), ...fieldIds];
    listenerIds.forEach((id) => (this.listeners[id] = []));

    this.getIsSubmitting = createGetValue(
      ListenerIds.IsSubmitting,
      getIsSubmitting
    );
    this.getIsSubmitted = createGetValue(
      ListenerIds.IsSubmitted,
      getIsSubmitted
    );
    this.getIsTouched = createGetValue(ListenerIds.IsTouched, getIsTouched);
    this.getIsValid = createGetValue(ListenerIds.IsValid, getIsValid);
    const createGetField = <F extends keyof V>(fieldName: F) =>
      createGetValue(getFieldId(fieldName), () => getField(fieldName));

    const getFieldValues = Object.fromEntries(
      fieldNames.map((fieldName) => [fieldName, createGetField(fieldName)])
    ) as { [field in keyof V]: () => FormField<V[field]> };

    this.getField = (fieldName) => getFieldValues[fieldName]();
  }
}
