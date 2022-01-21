import { Form } from "ts-form";
import { FormProperties, FormValues } from "ts-form/build/types";
export declare class ReactForm<V extends FormValues> extends Form<V> {
    listeners: Record<string, (() => void)[]>;
    validId: string;
    touchedId: string;
    submitId: string;
    fieldId: (fieldName: keyof V) => string;
    createGetValue: <V_1>(id: string, getValue: () => V_1) => () => V_1;
    updateIsSubmitting: () => void;
    updateIsTouched: () => void;
    updateIsValid: () => void;
    updateField: (fieldName: keyof V) => void;
    updateAllFields: () => void;
    afterSubmit: () => void;
    beforeSubmit: () => void;
    afterReset: () => void;
    afterValidate: <F extends keyof V>(field: F) => void;
    constructor(props: FormProperties<V>);
}
