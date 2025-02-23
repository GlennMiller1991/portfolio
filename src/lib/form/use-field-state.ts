import {Validator} from "./validator";
import {FormState} from "./form-state";
import {useState} from "react";

export const useFieldState = <T extends Record<string, any>>(validator: Validator<T>): FormState<T> => {
    const [formData, setFormData] = useState(() => {
        return {formState: new FormState(validator)}
    });

    formData.formState.setDispatcher(setFormData);

    return formData.formState;
}