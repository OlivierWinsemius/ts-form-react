import { Component, Context } from "react";
import { Form } from "ts-form";
import { FormValues } from "ts-form/build/types";
export declare class ReactForm<V extends FormValues> extends Form<V> {
  setAfterSubmit: (afterSubmit: (form: this) => void) => void;
  setAfterValidateForm: (afterValidateForm: (form: this) => void) => void;
  setAfterValidateField: (
    afterValidateField: (field: keyof V, form: this) => void
  ) => void;
}
export declare class ReactFormProvider<
  V extends FormValues,
  F extends ReactForm<V>,
  C extends Context<F>
> extends Component<
  {
    form: F;
    Context: C;
  },
  F
> {
  state: F;
  updateForm(form: F): void;
  updateField(_: keyof V, form: F): void;
  componentDidMount(): void;
  render(): JSX.Element;
}
