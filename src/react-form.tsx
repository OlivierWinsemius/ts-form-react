import { Form } from "ts-form";
import { FormValues } from "ts-form/build/types";

export class ReactForm<V extends FormValues> extends Form<V> {
  _fieldNames = this.fieldNames;

  _setAfterValidateField = (
    afterValidateField: (field: keyof V, form: this) => void
  ) => {
    this.afterValidateField = afterValidateField;
  };

  _setAfterSubmit = (afterSubmit: (form: this) => void) => {
    this.afterSubmit = afterSubmit;
  };

  _setAfterValidateForm = (afterValidateForm: (form: this) => void) => {
    this.afterValidateForm = afterValidateForm;
  };

  _getField = this.getField;
  _setGetField = (getField: Form<V>["getField"]) => {
    this.getField = getField;
  };
}

export type HiddenFormMethods =
  | "_fieldNames"
  | "_setAfterValidateField"
  | "_setAfterSubmit"
  | "_setAfterValidateForm"
  | "_setGetField"
  | "_getField";
