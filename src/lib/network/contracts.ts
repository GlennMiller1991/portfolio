import {METHODS, REQUEST_HEADERS, REQUEST_MODES} from "./constants";

export type ISuccessResponse<T> = {
    data: T,
    error?: never,
}
export type IErrorResponse = {
    data?: never,
    error: string,
}
export type IResponse<T> = ISuccessResponse<T> | IErrorResponse
export type IRequestOptions = {
    method: keyof typeof METHODS,
    mode: typeof REQUEST_MODES[keyof typeof REQUEST_MODES],
    body: Record<string, any>,
    headers: Partial<{
        -readonly [Prop in keyof typeof REQUEST_HEADERS as typeof REQUEST_HEADERS[Prop]]: IRequestHeadersTypes[typeof REQUEST_HEADERS[Prop]]
    }>
}

export type IRequestHeadersTypes = {
    [REQUEST_HEADERS.CONTENT_TYPE]: 'application/json' | 'text/html' | 'multipart/form-data'
}

