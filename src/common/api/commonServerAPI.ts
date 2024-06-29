import {requests} from "./requests";

export const commonServerAPI = {
    serverAccess() {
        return requests.getRequest(`/commonacess`)
    }
}