import React, { Component, Context } from "react";
import { FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";

export class ReactFormProvider<
  V extends FormValues,
  F extends ReactForm<V>,
  C extends Context<F>
> extends Component<{ form: F; Context: C }, F> {
  state = this.props.form;

  updateForm() {
    const { isValid } = this.props.form;
    this.setState({ ...this.props.form, isValid });
  }

  componentDidMount() {
    this.props.form.setAfterValidateField(this.updateForm.bind(this));
  }

  render() {
    const { Context } = this.props;

    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
