import React from "react";
import { FormProperties, FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";
export declare const createForm: <V extends FormValues, F extends ReactForm<V>, C extends React.Context<F>>(formProperties: FormProperties<V>) => {
    useForm: () => F;
    FormProvider: React.FC<{}>;
};
