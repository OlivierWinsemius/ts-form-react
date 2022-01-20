import { Form } from "ts-form";
import { FormValues } from "ts-form/build/types";
export declare class ReactForm<V extends FormValues> extends Form<V> {
    _fieldNames: (keyof V)[];
    _getIsSubmitting: () => boolean;
    _getIsTouched: () => boolean;
    _getIsValid: () => boolean;
    _getField: <F extends keyof V>(field: F) => import("ts-form/build/types").FormField<V[F]>;
    _setAfterValidate: (afterValidate: (field: keyof V, form: this) => void) => void;
    _setAfterSubmit: (afterSubmit: (form: this) => void) => void;
    _setBeforeSubmit: (beforeSubmit: (form: this) => void) => void;
    _setAfterReset: (afterReset: (form: this) => void) => void;
    _setGetIsSubmitting: (getIsSubmitting: Form<V>["getIsSubmitting"]) => void;
    _setGetIsTouched: (getIsTouched: Form<V>["getIsTouched"]) => void;
    _setGetIsValid: (getIsValid: Form<V>["getIsValid"]) => void;
    _setGetField: (getField: Form<V>["getField"]) => void;
}
