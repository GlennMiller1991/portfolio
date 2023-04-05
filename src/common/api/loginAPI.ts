import {tLoginParams} from '../types/types'
import {requests} from './requests'
import {baseUrl} from '../constants/baseUrl'
import {tSignupParams} from '../../components/Login/Login'

export const loginAPI = {
    login(params: tLoginParams) {
        return requests.postRequest<tLoginParams>(`${baseUrl}/auth/signin`, params)
    },
    authenticate() {
        return requests.getRequest(`${baseUrl}/auth/user`)
    },
    signup(params: tSignupParams) {
        return requests.postRequest<tSignupParams>(`${baseUrl}/auth/signup`, params)
    }
}