import {makeObservable, action} from "mobx";

export class TypedStringController {
    carriage: number = 0
    ltr = true
    typedString: string = ''

    constructor() {
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
        } else if (this.carriage >= this.typedString.length) {
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