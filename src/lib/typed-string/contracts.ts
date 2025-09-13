import EventEmitter from "node:events";

type ITypedStringCommand = 'run' | 'stop';
export type ITypedStringConfig = {
    forwardOnly?: boolean,
    cmdEventEmitter?: TypedStringEventEmitter,
}

export declare class TypedStringEventEmitter extends EventEmitter {
    emit(eventName: ITypedStringCommand, ...args): boolean;
}