import { FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";
export declare const useTransformFormMethods: <V extends FormValues>(form: ReactForm<V>) => {
    isReady: boolean;
};
