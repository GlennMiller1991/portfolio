import {tValidator} from '../types/types'

export const required: tValidator = (value: string, text?) => {
    if (value) {
        return undefined
    }
    return text || 'Field is required'
}