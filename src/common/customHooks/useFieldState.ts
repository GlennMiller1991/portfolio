import {ChangeEvent, useCallback, useState, FocusEvent} from 'react'
import {tObjectType, Validator} from '../validators/Validator'


type IState<T> = {
    data: tObjectType<T>,
    error: string,
    touched: boolean,
    empty: boolean,
}
export const useFieldState = <T>(validator: Validator<T>): [
    IState<T>,
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    () => void,
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
] => {
    const [state, setState] = useState<IState<T>>(() => {
        return {
            data: validator.getObject(),
            error: validator.checkObject() || '',
            touched: false,
            empty: validator.checkEmptiness()
        }
    })

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = event.currentTarget.dataset.name as keyof T
        const value = event.currentTarget.value.trimStart()
        setState(prev => {
            const newState = {
                ...prev,
                data: {...prev.data, [field]: value},
                touched: true,
                empty: validator.checkEmptiness()
            }
            validator.updateObject(newState.data)
            return newState
        })
    }, [])

    const onBlur = useCallback((event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState((prev) => {
            return {
                ...prev,
                error: validator.checkObject() || '',
                touched: true,
                empty: validator.checkEmptiness()
            }
        })
    }, [])

    const clearState = useCallback(() => {
        setState((prev) => {
            const obj: any = {}
            const keys = Object.keys(prev.data)
            for (let key of keys) {
                obj[key] = ''
            }
            validator.updateObject(obj)
            return {
                data: obj,
                error: validator.checkObject() || '',
                touched: false,
                empty: validator.checkEmptiness()
            }
        })
    }, [])

    return [state, onChange, clearState, onBlur]
}