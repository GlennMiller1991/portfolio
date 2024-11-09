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
