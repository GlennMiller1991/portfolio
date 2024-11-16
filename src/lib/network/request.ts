import {IErrorResponse, IRequestOptions, IResponse, ISuccessResponse} from "./contracts";
import {METHODS, REQUEST_MODES, REQUEST_HEADERS, CONTENT_TYPES} from "./constants";

export async function request<T>(src: string, options?: Partial<IRequestOptions>): Promise<IResponse<T>> {
    options = options || {}
    options.method = options.method || METHODS.GET
    options.mode = options.mode || REQUEST_MODES.CORS
    options.headers = options.headers || {}
    if (options.body && !options.headers[REQUEST_HEADERS.CONTENT_TYPE]) {
        options.headers[REQUEST_HEADERS.CONTENT_TYPE] = 'application/json'
    }

    try {
        let response = await fetch(src, {
            ...options,
            body: options.body ? JSON.stringify(options.body) : undefined
        })

        let contentType = response.headers.get(REQUEST_HEADERS.CONTENT_TYPE) || ''
        let method: 'text' | 'json'
        if (contentType.includes(CONTENT_TYPES.application.json)) {
            method = 'json'
        } else if (contentType.includes(CONTENT_TYPES.text.plain)) {
            method = 'text'
        } else {
            throw new Error('unrecognized content')
        }

        let data = await response[method]()

        if (!response.ok) {
            throw new Error(data.message)
        }
        return {
            data,
        } as ISuccessResponse<T>
    } catch (err: any) {
        return {
            error: err?.message || 'Something went wrong'
        } as IErrorResponse
    }
}