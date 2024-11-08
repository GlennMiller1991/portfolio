import {endpoints} from "../../app/constants";
import {request} from "../../lib/network/request";
import {METHODS} from "../../lib/network/constants";

export const commonServerAPI = {
    serverAccess() {
        return request<string>(endpoints.baseUrl.url, {
            method: METHODS.GET,
            mode: 'no-cors',
        })
    }
}