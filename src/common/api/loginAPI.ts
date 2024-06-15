import {tLoginParams} from '../types/types'
import {requests} from './requests'
import {tSignupParams} from '../../components/Login/Login'
import {app} from "../../app/constants";

export const loginAPI = {
    login(params: tLoginParams) {
        return requests.postRequest<tLoginParams>(`${app.api}/auth/signin`, params)
    },
    authenticate() {
        return requests.getRequest(`${app.api}/auth/user`)
    },
    signup(params: tSignupParams) {
        return requests.postRequest<tSignupParams>(`${app.api}/auth/signup`, params)
    }
}