import { Form } from "ts-form";
import { FormProperties, FormValues } from "ts-form/build/types";
export declare class ReactForm<V extends FormValues> extends Form<V> {
    id: number;
    validId: string;
    touchedId: string;
    submitId: string;
    fieldId: string;
    fieldIds: string[];
    updateIsSubmitting: () => void;
    updateIsTouched: () => void;
    updateIsValid: () => void;
    updateField: (fieldName: keyof V) => void;
    protected afterSubmit: () => void;
    protected beforeSubmit: () => void;
    protected afterReset: () => void;
    protected afterValidate: <F extends keyof V>(field: F) => void;
    constructor(props: FormProperties<V>);
}
