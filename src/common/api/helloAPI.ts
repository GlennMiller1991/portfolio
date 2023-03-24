import {requests} from './requests'
import {baseUrl} from '../constants/baseUrl'

export const helloAPI = {
    hello() {
        requests.getRequest(baseUrl)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.warn(err.message)
            })
    }
}