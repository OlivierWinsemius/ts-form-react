import { useEffect, useState } from "react";
import { Form } from "ts-form";
import { FormField, FormProperties, FormValues } from "ts-form/build/types";

let numberOfForms = 0;
const listeners: Record<string, (() => void)[]> = {};

const createGetVal = (id: string, getValue: () => boolean) => () => {
  const [value, setValue] = useState(getValue());

  useEffect(() => {
    listeners[id].push(() => setValue(getValue()));
  }, []);

  return value;
};

const createGetField =
  <V extends FormValues, F extends keyof V>(
    fieldId: string,
    getField: (field: F) => FormField<V[F]>
  ) =>
  (fieldName: F) => {
    const [field, setField] = useState(getField(fieldName));

    useEffect(() => {
      listeners[`${fieldId}_${fieldName}`].push(() =>
        setField(getField(fieldName))
      );
    }, []);

    return field;
  };

export class ReactForm<V extends FormValues> extends Form<V> {
  id = ++numberOfForms;
  validId = `isValid_${this.id}`;
  touchedId = `isTouched_${this.id}`;
  submitId = `isSubmitting_${this.id}`;
  fieldId = `getField_${this.id}`;
  fieldIds = this.fieldNames.map((fieldName) => `${this.fieldId}_${fieldName}`);

  updateIsSubmitting = () => listeners[this.submitId].forEach((f) => f());
  updateIsTouched = () => listeners[this.touchedId].forEach((f) => f());
  updateIsValid = () => listeners[this.validId].forEach((f) => f());
  updateField = (fieldName: keyof V) =>
    listeners[`${this.fieldId}_${fieldName}`].forEach((f) => f());

  protected afterSubmit = () => {
    this.updateIsSubmitting();
  };

  protected beforeSubmit = () => {
    this.updateIsSubmitting();
    this.updateIsValid();
  };

  protected afterReset = () => {
    this.fieldNames.forEach(this.updateField);
    this.updateIsTouched();
    this.updateIsValid();
  };

  protected afterValidate = <F extends keyof V>(field: F) => {
    this.updateField(field);
    this.updateIsTouched();
    this.updateIsValid();
  };

  constructor(props: FormProperties<V>) {
    super(props);

    const {
      getIsSubmitting,
      getIsValid,
      getIsTouched,
      getField,
      submitId,
      touchedId,
      validId,
      fieldId,
      fieldIds,
    } = this;

    const listenerIds = [submitId, validId, touchedId, ...fieldIds];
    listenerIds.forEach((id) => (listeners[id] = []));

    this.getIsSubmitting = createGetVal(submitId, getIsSubmitting);
    this.getIsTouched = createGetVal(touchedId, getIsTouched);
    this.getIsValid = createGetVal(validId, getIsValid);
    this.getField = createGetField(fieldId, getField);
  }
}
