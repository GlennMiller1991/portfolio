export type tErrors = {
    [key: string]: string
} | undefined

export type tPos = {
    x: number,
    y: number
}

export type tValidator = (value: string, text?: string) => string | undefined