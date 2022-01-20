import React from "react";
import { Form } from "ts-form";
import { FormProperties, FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";
export declare const createForm: <V extends FormValues, RF extends ReactForm<V>, Ctx extends React.Context<RF>>(formProperties: FormProperties<V>) => {
    form: Form<V>;
    useForm: () => Form<V>;
    useField: <F extends keyof V>(field: F) => import("ts-form/build/types").FormField<V[F]>;
    FormProvider: React.FC<{}>;
};
