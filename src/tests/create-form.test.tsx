import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {
  render,
  cleanup,
  screen,
  within,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import { TextInput, NumberInput } from "../examples/form-input";
import { createForm } from "../create-form";
import { FormButtons } from "../examples/form-buttons";
import { FormProperties } from "ts-form/build/types";
import { flushPromises } from "./utils/flushPromises";

describe("createForm", () => {
  afterEach(async () => {
    cleanup();
    await flushPromises();
    jest.resetAllMocks();
  });

  it("submitting / resetting form", async () => {
    const onSubmit = jest.fn();
    const values = { value1: "", value2: 0 };
    const validators: FormProperties<typeof values>["validators"] = {
      value1: (v) => v.string().truthy(),
      value2: (v) => v.minNumber(2),
    };

    const form = createForm({ values, onSubmit, validators });

    const {
      FormProvider,
      useForm,
      useField,
      form: { submit, reset },
    } = form;

    render(
      <FormProvider>
        <form data-testid="form" onSubmit={submit} onReset={reset}>
          <label htmlFor="value1">text</label>
          <TextInput fieldName="value1" useField={useField} />

          <label htmlFor="value2">number</label>
          <NumberInput useField={useField} fieldName="value2" />

          <FormButtons useForm={useForm} />
        </form>
      </FormProvider>
    );

    const formElement = await screen.findByTestId("form");
    const textInput = await within(formElement).findByLabelText("text");
    const numberInput = await within(formElement).findByLabelText("number");
    const submitButton = await within(formElement).findByText("submit");
    const resetButton = await within(formElement).findByText("reset");

    expect(resetButton).toBeDisabled();
    expect(submitButton).toBeDisabled();

    userEvent.type(textInput, "test");

    await waitFor(() => {
      expect(resetButton).toBeEnabled();
      expect(submitButton).toBeDisabled();
    });

    fireEvent.reset(formElement);

    await waitFor(() => {
      expect(resetButton).toBeDisabled();
      expect(submitButton).toBeDisabled();
    });

    userEvent.type(textInput, "test");
    userEvent.type(numberInput, "2");

    await waitFor(() => {
      expect(resetButton).toBeEnabled();
      expect(submitButton).toBeEnabled();
    });

    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(onSubmit).toBeCalled();
    });
  });
});
