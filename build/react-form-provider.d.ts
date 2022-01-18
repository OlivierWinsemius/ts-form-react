import { Component, Context } from "react";
import { FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";
export declare class ReactFormProvider<V extends FormValues, F extends ReactForm<V>, C extends Context<F>> extends Component<{
    form: F;
    Context: C;
}, F> {
    state: F;
    updateForm(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
