export const METHODS = {
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    PUT: 'PUT',
    POST: 'POST',
    GET: 'GET'
} as const

export const REQUEST_MODES = {
    CORS: 'cors',
    NO_CORS: 'no-cors',
    SAME_ORIGIN: 'same-origin'
} as const

export const REQUEST_HEADERS = {
    CONTENT_TYPE: 'content-type'
} as const

export const CONTENT_TYPES = {
    // types
    application: {
        json: 'application/json',
    },
    text: {
        css: 'text/css',
        csv: 'text/csv',
        html: 'text/html',
        javascript: 'text/javascript',
        plain: 'text/plain',
        xml: 'text/xml',
    }
}
