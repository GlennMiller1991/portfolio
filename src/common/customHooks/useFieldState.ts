import {ChangeEvent, useCallback, useState, FocusEvent, useEffect} from 'react'
import {tValidator} from '../types/types'
import {tObjectType, Validator} from '../validators/Validator'

export type tKeys<T> = {
    [Property in keyof T]: {
        validators: Array<tValidator>
    }
}

type tState<T> = {
    data: tObjectType<T>,
    resError: string | undefined
}
export const useFieldState = <T>(validator: Validator<T>): [
    tState<T>,
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    () => void,
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
] => {
    const [state, setState] = useState<tState<T>>({
        data: validator.getObject(),
        resError: undefined
    })

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = event.currentTarget.dataset.name as keyof T
        const value = event.currentTarget.value.trimStart()
        setState(prev => {
            const newState = {...prev, data: {...prev.data, [field]: value}}
            validator.updateObject(newState.data)
            return newState
        })
    }, [])

    const checkFields = useCallback(() => {
        setState((prev) => {
            return {
                ...prev,
                resError: validator.checkObject()
            }
        })
        return validator.checkObject()
    }, [])
    const onBlur = useCallback((event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        checkFields()
    }, [])

    const clearState = useCallback(() => {
        setState((prev) => {
            const obj: any = {}
            const keys = Object.keys(prev)
            for (let key of keys) {
                obj[key] = ''
            }
            validator.updateObject(obj)
            return {data: obj, resError: undefined}
        })
    }, [])

    useEffect(() => {
        checkFields()
    }, [])

    return [state, onChange, clearState, onBlur]
}