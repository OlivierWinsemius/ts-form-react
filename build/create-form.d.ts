import React from "react";
import { Form } from "ts-form";
import { FormProperties, FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";
export declare const createForm: <V extends FormValues, F extends ReactForm<V>, C extends React.Context<F>>(formProperties: FormProperties<V>) => {
    useForm: () => Form<V>;
    useField: (field: keyof V) => import("ts-form/build/types").FormField<V[keyof V]>;
    FormProvider: React.FC<{}>;
};
