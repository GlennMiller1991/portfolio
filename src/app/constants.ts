import {Dictionary} from "./dictionary/dictionary";

export const d = new Dictionary()

export const app = {
    server: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://railwayapp-production-3c99.up.railway.app',
    get api() {
        return `${this.server}/api/v1`
    },
    get d() {
        return d.actual
    },
}