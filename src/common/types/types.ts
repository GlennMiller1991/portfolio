export type tMessage = {
    name: string,
    email: string,
    subject: string,
    message: string,
}

export type tLoginParams = {
    email: string,
    hash: string,
}

export type tErrors = {
    [key: string]: string
} | undefined

export type tPos = {
    x: number,
    y: number
}