export const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

/**
 * минимум 5 символов, среди которых только буквы, цифры, подчеркивания
 */
export const telegramRegexp = /^@[A-Z0-9_]{5,32}$/i