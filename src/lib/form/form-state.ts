import React, {ChangeEvent, FocusEvent} from "react";
import {Validator} from "./validator";

export class FormState<T extends Record<string, string>> {
    touchState!: { [Key in keyof T]: boolean }

    dispatcher!: React.Dispatch<React.SetStateAction<{ formState: FormState<T> }>>

    constructor(private validator: Validator<T>) {
        const obj: Partial<typeof this.touchState> = {};
        for (let key of Object.keys(this.data)) {
            obj[key as keyof typeof this.touchState] = false
        }

        this.touchState = obj as Required<typeof this.touchState>;

    }

    get data() {
        return this.validator.getObject();
    }

    get isTouched() {
        return Object.values(this.touchState).some((touched) => touched);
    }

    get isAllTouched() {
        return !Object.values(this.touchState).some((touched) => !touched);
    }

    get error() {
        if (!this.isTouched) {
            return '';
        }
        return this.validator.checkObject();
    }

    get empty() {
        return this.validator.checkEmptiness();
    }

    setDispatcher(dispatcher: typeof this.dispatcher) {
        this.dispatcher = dispatcher;
    }

    onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = event.currentTarget.dataset.name as keyof T;
        const value = event.currentTarget.value.trimStart();
        const oldObj = this.validator.getObject();
        if (value === oldObj[field]) return
        this.touchState[field] = true;
        this.dispatcher?.({formState: this});
        const newObj = {...oldObj, [field]: value};
        this.validator.updateObject(newObj);
    }

    onBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.dispatcher?.({formState: this});
    }

    clearState = () => {
        this.dispatcher?.({formState: this});
        let obj: Partial<T> = {}
        const keys = Object.keys(this.data)
        for (let key of keys) {
            // @ts-ignore
            obj[key] = ''
            this.touchState[key as keyof typeof this.touchState] = false;
        }
    }
}