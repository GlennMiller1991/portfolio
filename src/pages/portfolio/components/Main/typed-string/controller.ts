import {app} from "../../../../../app/constants";
import {TypedString} from "../../../../../lib/typed-string";

export class TypedStringControllerPortfolio extends TypedString {
    strings = app.d.typedString
    stringIndex = 0
    timeoutId: any

    constructor() {
        super()
        this.init()
    }

    init() {
        this.replaceString(this.strings[this.stringIndex])
        this.nextTick()
    }

    nextTick() {
        this.timeoutId = setTimeout(() => {
            super.nextTick()
            if (!this.carriage) {
                this.replaceString(this.strings[(++this.stringIndex) % this.strings.length])
            }
            this.nextTick()
        }, this.carriage === this.typedString.length ? 2000 : Math.random() * 300 + 100)
    }

    dispose() {
        clearTimeout(this.timeoutId)
    }
}