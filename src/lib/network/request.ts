import {IErrorResponse, IRequestOptions, IResponse, ISuccessResponse} from "./contracts";
import {METHODS, REQUEST_MODES, REQUEST_HEADERS} from "./constants";

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
        let method: 'text' | 'json' = 'text'
        if (/json/.test(contentType)) {
            method = 'text'
        }

        let data = await response[method]()
        return {
            data,
        } as ISuccessResponse<T>
    } catch (err: any) {
        return {
            error: err?.message || ''
        } as IErrorResponse
    }
}