import React, { Context } from "react";
import { FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";
interface Props<V extends FormValues, F extends ReactForm<V>> {
    form: F;
    Context: Context<F>;
    children: React.ReactNode;
}
export declare const ReactFormProvider: <V extends FormValues, F extends ReactForm<V>>({ form, Context, children, }: Props<V, F>) => JSX.Element | null;
export {};
