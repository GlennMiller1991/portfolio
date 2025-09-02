import {action, makeObservable} from "mobx";
import EventEmitter from "node:events";

type ITypedStringCommand = 'run' | 'stop';

type ITypedStringConfig = {
    forwardOnly?: boolean,
    cmdEventEmitter?: TypedStringEventEmitter,
}

export declare class TypedStringEventEmitter extends EventEmitter {
    emit(eventName: ITypedStringCommand, ...args): boolean;
}

export abstract class TypedString {
    carriage: number = 0
    ltr = true
    typedString: string = '';
    get isEnd() {
        return this._config.forwardOnly && this.carriage >= (this.typedString.length - 1)
    }


    private _config: Required<ITypedStringConfig>

    constructor(config: ITypedStringConfig = {}) {
        this._config = {
            forwardOnly: config.forwardOnly ?? false,
            cmdEventEmitter: config.cmdEventEmitter ?? new TypedStringEventEmitter(),
        }

        makeObservable(this, {
            carriage: true,
            increment: action,
            decrement: action,
        });

        this.ee.on('run', this._onRun);
        this.ee.on('stop', this._onStop);
    }

    private _onRun = () => {
        if (this.isEnd) return;

        this.onRun();
    };
    abstract onRun(): void;
    private _onStop = () => {
        this.onStop();
    };
    abstract onStop(): void;

    private get ee() {
        return this._config.cmdEventEmitter;
    }

    nextTick() {
        if (this.ltr) {
            this.increment()
        } else {
            this.decrement()
        }

        if (this.carriage <= 0) {
            this.ltr = true
        } else if (this.carriage >= this.typedString.length && !this._config.forwardOnly) {
            this.ltr = false
        }

    }

    replaceString(newString: string) {
        this.carriage = 0;
        this.typedString = newString;
    }

    increment() {
        this.carriage++
    }

    decrement() {
        this.carriage--
    }

    get currentPart() {
        return this.typedString.slice(0, this.carriage)
    }

    dispose() {
        this.ee.off('run', this._onRun);
        this.ee.off('stop', this._onStop);
    }
}