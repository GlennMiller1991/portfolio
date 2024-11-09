import {urls} from "../../app/constants";
import {request} from "../../lib/network/request";

export const commonServerAPI = {
    serverAccess() {
        return request<string>(urls.bases.remote)
    }
}