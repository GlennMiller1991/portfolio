import {TypedString, TypedStringEventEmitter} from "@src/lib/typed-string";

let isEnd = false;
export class TypedStringControllerPortfolio extends TypedString {
    timeoutId: any

    constructor(public string: string, ee: TypedStringEventEmitter) {
        super({forwardOnly: true, cmdEventEmitter: ee});
        this.replaceString(this.string);
        this.endProcessing();
    }

    endProcessing() {
        if (isEnd) {
            while (!this.isEnd) this.increment();
        }
    }

    nextTick() {
        isEnd = this.isEnd;
        this.timeoutId = setTimeout(() => {
            super.nextTick()
            this.nextTick()
        }, this.carriage === this.typedString.length ? 2000 : Math.min(30, Math.random() * 100))
    }

    onRun(){
        this.nextTick();
    }

    onStop() {
        clearTimeout(this.timeoutId);
    }

    dispose() {
        this.onStop();
    }
}