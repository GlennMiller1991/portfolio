import {tMessage} from '../types/types'
import {request} from "../../lib/network/request";
import {urls} from "../../app/constants";
import {METHODS} from "../../lib/network/constants";

export const messageAPI = {
    sendMessage(message: tMessage) {
        return request(`${urls.bases.remote}${urls.endpoints.messages}`, {
            method: METHODS.POST,
            body: message
        })
    },
}