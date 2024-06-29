import {tLoginParams} from '../types/types'
import {requests} from './requests'
import {tSignupParams} from '../../pages/auth/Login/Login'

export const loginAPI = {
    login(params: tLoginParams) {
        return requests.postRequest<tLoginParams>(`/auth/signin`, params)
    },
    authenticate() {
        return requests.getRequest(`/auth/user`)
    },
    signup(params: tSignupParams) {
        return requests.postRequest<tSignupParams>(`/auth/signup`, params)
    }
}