import {ChangeEvent, useCallback, useState, FocusEvent, useRef} from 'react'

type tKeys<T> = {
    prop: keyof T,
    validators: (() => string)[]
}
export const useFieldState = <T>(keys: Array<keyof T>): [T, (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, () => void] => {
    const [state, setState] = useState<T>(() => {
        let obj: Partial<T> = {}
        for (let key of keys) {
            //@ts-ignore
            obj[key] = ''
        }
        return obj as T
    })
    const stateRef = useRef<T>(state)

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = event.currentTarget.dataset.name as keyof T
        const value = event.currentTarget.value.trimStart()
        setState(prev => {
            const newState = {...prev, [field]: value}
            stateRef.current = newState
            return newState
        })
    }, [])

    const onBlur = useCallback((event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = event.currentTarget.dataset.name as keyof T
        const value = event.currentTarget.value.trimStart()
    }, [])

    const clearState = useCallback(() => {
        let obj: Partial<T> = {}
        for (let key of keys) {
            //@ts-ignore
            obj[key] = ''
        }
        stateRef.current = obj as T
        setState(obj as T)
    }, [])

    return [state, onChange, clearState]
}