export type tMessage = {
    name: string,
    email: string,
    subject: string,
    message: string,
}

export type tErrors = {
    [key: string]: string
} | undefined

export type tPos = {
    x: number,
    y: number
}

export type tValidator = (value: string, text?: string) => string | undefined