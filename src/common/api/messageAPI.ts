import {tMessage} from '../types/types'
import {baseUrl} from '../constants/baseUrl'
import {requests} from './requests'

export const messageAPI = {
    sendMessage(message: tMessage) {
        return requests.postRequest<tMessage>(`${baseUrl}/messages`, message)
    },

    getMessages(message: tMessage) {
        return requests.getRequest<tMessage>(`${baseUrl}/messages`)
    }
}