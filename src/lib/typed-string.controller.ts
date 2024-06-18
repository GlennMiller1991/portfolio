import {makeObservable} from "mobx";

export class TypedStringController {
    carriage: number = 0
    ltr = true
    typedString: string = ''

    constructor() {
        makeObservable(this, {
            carriage: true
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

    setCarriage(value: number) {
        this.carriage = value
    }

    increment() {
        this.setCarriage(this.carriage + 1)
    }

    decrement() {
        this.setCarriage(this.carriage - 1)
    }

    get currentPart() {
        return this.typedString.slice(0, this.carriage)
    }
}