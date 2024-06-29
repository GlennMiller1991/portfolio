import {tMessage} from '../types/types'
import {requests} from './requests'
import {app} from "../../app/constants";

export const messageAPI = {
    sendMessage(message: tMessage) {
        return requests.postRequest<tMessage>(`/messages`, message)
    },

    getMessages(message: tMessage) {
        return requests.getRequest<tMessage>(`/messages`)
    }
}