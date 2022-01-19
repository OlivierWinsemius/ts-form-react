import { Form } from "ts-form";
import { FormValues } from "ts-form/build/types";
export declare class ReactForm<V extends FormValues> extends Form<V> {
    _fieldNames: (keyof V)[];
    _getField: <F extends keyof V>(field: F) => import("ts-form/build/types").FormField<V[F]>;
    _setAfterValidateField: (afterValidateField: (field: keyof V, form: this) => void) => void;
    _setAfterSubmit: (afterSubmit: (form: this) => void) => void;
    _setAfterValidateForm: (afterValidateForm: (form: this) => void) => void;
    _setGetField: (getField: Form<V>["getField"]) => void;
}
