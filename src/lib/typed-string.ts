import {makeObservable, action} from "mobx";

type ITypedStringConfig = {
    forwardOnly?: boolean
}
export class TypedString {
    carriage: number = 0
    ltr = true
    typedString: string = ''

    constructor(private config: ITypedStringConfig = {}) {
        makeObservable(this, {
            carriage: true,
            increment: action,
            decrement: action,
        })
    }

    nextTick() {
        if (this.ltr) {
            this.increment()
        } else {
            this.decrement()
        }

        if (this.carriage <= 0) {
            this.ltr = true
        } else if (this.carriage >= this.typedString.length && !this.config.forwardOnly) {
            this.ltr = false
        }

    }

    replaceString(newString: string) {
        this.typedString = newString
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
}