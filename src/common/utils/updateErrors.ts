import {tErrors} from '../types/types'

/**
 * Функция обновляющая ошибки, если ошибка в новом объекте false, то удаляется из старого объекта,
 * иначе обновляется
 * @param errors объект старых ошибок, который необходимо обновить
 * @param newErrors объект новых ошибок, который необходимо влить
 */
export const updateErrors = (errors: tErrors, newErrors: { [key: string]: string | undefined }) => {
    if (!errors) errors = {}
    const keys = Object.keys(newErrors)
    for (let key of keys) {
        const error = newErrors[key]
        if (error) {
            errors[key] = error
        } else {
            delete errors[key]
        }
    }
    return errors
}