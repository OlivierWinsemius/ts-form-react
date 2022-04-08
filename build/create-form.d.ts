import React from "react";
import { Form } from "ts-form";
import { FormProperties, FormValues } from "ts-form/build/types";
export declare const createForm: <V extends FormValues>(formProperties: FormProperties<V>) => {
    form: Form<V>;
    useForm: () => Form<V>;
    useField: <F extends keyof V>(field: F) => import("ts-form/build/types").FormField<V[F]>;
    FormProvider: ({ children }: {
        children: React.ReactNode;
    }) => JSX.Element;
};
