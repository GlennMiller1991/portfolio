import {requests} from "./requests";
import {app} from "../../app/constants";

export const commonServerAPI = {
    serverAccess() {
        return requests.getRequest(`${app.api}/commonacess`)
    }
}