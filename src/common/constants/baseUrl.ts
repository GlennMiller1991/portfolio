export const serverUrl = process.env.NODE_ENV === 'development' ?
    'http://localhost:5000' :
    'https://railwayapp-production-3c99.up.railway.app'
export const baseUrl = `${serverUrl}/api/v1`
