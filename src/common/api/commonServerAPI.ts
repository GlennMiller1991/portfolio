import {baseUrl} from "../constants/baseUrl";
import {requests} from "./requests";

export const commonServerAPI = {
    serverAccess() {
        return requests.getRequest(`${baseUrl}/commonacess`)
    }
}