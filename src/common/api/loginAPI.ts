import {tLoginParams} from '../types/types'
import {requests} from './requests'
import {baseUrl} from '../constants/baseUrl'

export const loginAPI = {
    login(params: tLoginParams) {
        return requests.postRequest<tLoginParams>(`${baseUrl}/auth/signin`, params)
    },
    authenticate() {
        return requests.getRequest(`${baseUrl}/auth/user`)
    }
}