import {AppController} from "../app/app.controller";
import {urls} from "../app/constants";

export class ServerService {
    base = urls.bases.remote

    constructor(private app: AppController) {

    }

    async isAvailable(): Promise<boolean> {
        const response = await this.app.request<null>(this.base)
        return !response.error
    };
}