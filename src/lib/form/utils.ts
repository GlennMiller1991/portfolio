export function getMessage(defaultMsg: string, userMsg?: string | (() => string)) {
    if (!userMsg) return defaultMsg;
    if (typeof userMsg === 'string') return userMsg
    return userMsg()
}