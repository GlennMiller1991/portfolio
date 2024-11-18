import {IMessageDto} from "./contracts";
import {IMessage} from "../../models/message.model";
import {urls} from "../../app/constants";
import {METHODS} from "../../lib/network/constants";
import {AppController} from "../../app/app.controller";

export class MessageService {
    base = urls.bases.remote

    constructor(private app: AppController) {

    }

    async create(message: IMessage) {
        const response = await this.app.request<IMessageDto>(`${this.base}${urls.endpoints.messages}`, {
            method: METHODS.POST,
            body: MessageService.toServer(message),
        })

        if (response.data) {
            return MessageService.fromServer(response.data)
        } else {
            throw new Error(response.error)
        }
    }

    static fromServer(dto: IMessageDto): IMessage {
        return {
            id: dto.Id,
            author: dto.Author,
            subject: dto.Subject,
            body: dto.Body,
            email: dto.Email,
        }
    }

    static toServer(obj: IMessage): IMessageDto {
        return {
            Id: obj.id,
            Author: obj.author,
            Subject: obj.subject,
            Body: obj.body,
            Email: obj.email,
        }
    }
}