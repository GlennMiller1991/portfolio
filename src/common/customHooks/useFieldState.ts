import {ChangeEvent, useCallback, useState} from 'react'

export const useFieldState = <T>(keys: Array<keyof T>): [T, (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, () => void] => {
    const [state, setState] = useState<T>(() => {
        let obj: Partial<T> = {}
        for (let key of keys) {
            //@ts-ignore
            obj[key] = ''
        }
        return obj as T
    })

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = event.currentTarget.dataset.name as keyof T
        const value = event.currentTarget.value.trim()
        setState(prev => ({...prev, [field]: value}))
    }, [])

    const clearState = useCallback(() => {
        let obj: Partial<T> = {}
        for (let key of keys) {
            //@ts-ignore
            obj[key] = ''
        }
        setState(obj as T)
    }, [])

    return [state, onChange, clearState]
}