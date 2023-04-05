export type tObjectType<T> = {
    [property in keyof T]: string
}
export type tObjectValidators<T> = {
    [Property in keyof T]: {
        validators: Array<(value: keyof T, message?: string, args?: any) => string | undefined>
    }
}

export interface iValidator<T> {
    required: (key: keyof T, message?: string) => string | undefined
}

export class Validator<T> implements iValidator<T> {
    constructor(private obj: tObjectType<T>, private validators?: tObjectValidators<T>) {
        this.obj = obj
        this.validators = validators
    }

    updateObject = (obj: tObjectType<T>) => {
        this.obj = obj
    }

    updateValidators = (validators: tObjectValidators<T>) => {
        this.validators = validators
    }

    getObject = () => {
        return this.obj
    }

    required = (key: keyof T, message?: string) => {
        if (this.obj[key]) return undefined
        return message || 'Field is required'
    }

    compareWith = (key2: keyof T, message?: string) => {
        return (key: keyof T) => {
            if (this.obj[key] === this.obj[key2]) return undefined
            return message || 'Fields are not equal'
        }
    }

    checkStringLength = (length: number, message?: string) => {
        return (key: keyof T) => {
            if (this.obj[key].length <= length) return undefined
            return 'Field is exceed maximum length'
        }
    }

    checkTemplate = (template: RegExp) => {
        return (key: keyof T) => {
            if (!template.test(this.obj[key])) {
                return 'Template mismatching'
            }
        }
    }

    checkField = (key: keyof T, message?: string, args?: any) => {
        const value = this.obj[key]
        if (this.validators) {
            for (let i = 0; i < this.validators[key].validators.length; i++) {
                const res = this.validators[key].validators[i](key)
                if (res) return res
            }
        }
        return undefined
    }

    checkObject = (): string | undefined => {
        let resError
        const keys = Object.keys(this.obj) as Array<keyof T>
        for (let key of keys) {
            resError = this.checkField(key)
        }
        return resError
    }
}
