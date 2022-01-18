import { Form } from "ts-form";
import { FormValues } from "ts-form/build/types";
export declare class ReactForm<V extends FormValues> extends Form<V> {
    setAfterValidateField: (afterValidateField: () => void) => void;
}
