import {IMessageDto} from "./contracts";
import {IMessage} from "../../models/message.model";
import {request} from "../../lib/network/request";
import {urls} from "../../app/constants";
import {METHODS} from "../../lib/network/constants";

export class MessageService {
    base = urls.bases.remote

    async create(message: IMessage) {
        const response = await request<IMessageDto>(`${this.base}${urls.endpoints.messages}`, {
            method: METHODS.POST,
            body: MessageService.toServer(message)
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
            Id: obj.id || new Date().toISOString(),
            Author: obj.author,
            Subject: obj.subject,
            Body: obj.body,
            Email: obj.email,
        }
    }
}