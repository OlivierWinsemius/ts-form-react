import { Form } from "ts-form";
import { FormValues } from "ts-form/build/types";

export class ReactForm<V extends FormValues> extends Form<V> {
  _fieldNames = this.fieldNames;
  _getIsSubmitting = this.getIsSubmitting;
  _getIsTouched = this.getIsTouched;
  _getIsValid = this.getIsValid;
  _getField = this.getField;

  _setAfterValidate = (afterValidate: (field: keyof V, form: this) => void) => {
    this.afterValidate = afterValidate;
  };

  _setAfterSubmit = (afterSubmit: (form: this) => void) => {
    this.afterSubmit = afterSubmit;
  };

  _setBeforeSubmit = (beforeSubmit: (form: this) => void) => {
    this.beforeSubmit = beforeSubmit;
  };

  _setAfterReset = (afterReset: (form: this) => void) => {
    this.afterReset = afterReset;
  };

  _setGetIsSubmitting = (getIsSubmitting: Form<V>["getIsSubmitting"]) => {
    this.getIsSubmitting = getIsSubmitting;
  };

  _setGetIsTouched = (getIsTouched: Form<V>["getIsTouched"]) => {
    this.getIsTouched = getIsTouched;
  };

  _setGetIsValid = (getIsValid: Form<V>["getIsValid"]) => {
    this.getIsValid = getIsValid;
  };

  _setGetField = (getField: Form<V>["getField"]) => {
    this.getField = getField;
  };
}
