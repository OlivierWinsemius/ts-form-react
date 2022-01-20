import React, { Context } from "react";
import { FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";
interface Props<V extends FormValues> {
    form: ReactForm<V>;
    Context: Context<ReactForm<V>>;
    children: React.ReactNode;
}
export declare const ReactFormProvider: <V extends FormValues>({ form, Context, children, }: Props<V>) => JSX.Element | null;
export {};
