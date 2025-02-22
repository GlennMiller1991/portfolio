import {IOneOrBothTypes} from "../lib/utility-types";

type IMessageBase = {
    id?: string,
    author: string,
    subject: string,
    body: string,
}

export type IMessage = IMessageBase & IOneOrBothTypes<{ email: string }, { telegram: string }>
