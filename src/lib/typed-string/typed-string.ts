import {action, makeObservable} from "mobx";
import type {ITypedStringConfig} from "@src/lib/typed-string/contracts";
import EventEmitter from "node:events";

export abstract class TypedString {
    carriage: number = 0;
    ltr = true;
    typedString: string = '';
    private _config: Required<ITypedStringConfig>;

    constructor(config: ITypedStringConfig = {}) {
        this._config = {
            forwardOnly: config.forwardOnly ?? false,
            cmdEventEmitter: config.cmdEventEmitter ?? new EventEmitter(),
        }

        makeObservable(this, {
            carriage: true,
            increment: action,
            decrement: action,
        });

        this.ee.on('run', this._onRun);
        this.ee.on('stop', this._onStop);
    }

    get isEnd() {
        return this._config.forwardOnly && this.carriage >= (this.typedString.length - 1)
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
        if (this.isEnd) return;
        this.carriage++
    }

    decrement() {
        this.carriage--
    }

    get currentPart() {
        return this.typedString.slice(0, this.carriage + 1)
    }

    dispose() {
        this.ee.off('run', this._onRun);
        this.ee.off('stop', this._onStop);
    }
}