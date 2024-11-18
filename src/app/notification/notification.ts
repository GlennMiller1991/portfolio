import {INotificationType} from "./contracts";

export class Notification {
    constructor(
        public readonly id: any,
        public message: string = '',
        public type: INotificationType = 'error',
    ) {

    }
}